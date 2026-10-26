import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import {
  computeGroups,
  discoverPlayers,
  findConfigEntryId,
  getFavorites,
  getQueueInfo,
  getQueueItems,
  groupOf,
  hasQueueActions,
  isUnavailable,
  itemSubtitle,
  join,
  mediaCommand,
  playMedia,
  playerName,
  queueItemCommand,
  search,
  setVolume,
  supportsGrouping,
  transferQueue,
  unjoin,
} from "./ma";
import {
  type AnnounceData,
  FEATURE_ANNOUNCE,
  defaultTtsEngine,
  loadAnnounceData,
  playAnnouncement,
  saveAnnounceData,
} from "./announce";
import type {
  AnnouncePreset,
  HomeAssistant,
  MaItem,
  MaSearchResponse,
  MediaType,
  MultiroomCardConfig,
  PlayerGroup,
  QueueInfo,
  QueueItem,
  Tab,
} from "./types";
import "./editor";

const VERSION = "0.5.0";

/** Titres de file chargés à chaque « Afficher plus ». */
const QUEUE_PAGE = 50;
/** Titres déjà joués affichés au-dessus du titre en cours. */
const QUEUE_BEFORE = 5;

const MEDIA_TYPES: Record<MediaType, { label: string; plural: string; icon: string }> = {
  playlist: { label: "Playlist", plural: "Playlists", icon: "mdi:playlist-music" },
  album: { label: "Album", plural: "Albums", icon: "mdi:album" },
  artist: { label: "Artiste", plural: "Artistes", icon: "mdi:account-music" },
  track: { label: "Titre", plural: "Titres", icon: "mdi:music-note" },
  radio: { label: "Radio", plural: "Radios", icon: "mdi:radio" },
  podcast: { label: "Podcast", plural: "Podcasts", icon: "mdi:podcast" },
  audiobook: { label: "Livre audio", plural: "Livres audio", icon: "mdi:book-music" },
};

const DEFAULT_FAVORITE_TYPES: MediaType[] = ["playlist", "album", "artist", "radio", "track"];

/** Ordre et clé de chaque section de la réponse `music_assistant.search`. */
const SEARCH_SECTIONS: { key: keyof MaSearchResponse; type: MediaType }[] = [
  { key: "artists", type: "artist" },
  { key: "albums", type: "album" },
  { key: "tracks", type: "track" },
  { key: "playlists", type: "playlist" },
  { key: "radio", type: "radio" },
  { key: "podcasts", type: "podcast" },
  { key: "audiobooks", type: "audiobook" },
];

const STATE_LABELS: Record<string, string> = {
  playing: "Lecture",
  paused: "En pause",
  idle: "Inactif",
  off: "Éteint",
  on: "Allumé",
  buffering: "Chargement",
  unavailable: "Indisponible",
  unknown: "Inconnu",
};

@customElement("multiroom-ma-card")
export class MultiroomCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: MultiroomCardConfig;
  @state() private _tab: Tab = "speakers";
  @state() private _target?: string;
  @state() private _editing?: string;
  @state() private _editMode: "group" | "transfer" = "group";
  @state() private _selection = new Set<string>();
  @state() private _volumes = new Map<string, number>();
  @state() private _entryId?: string;
  @state() private _favType: MediaType = "playlist";
  @state() private _favorites = new Map<MediaType, MaItem[]>();
  @state() private _favLoading = false;
  @state() private _query = "";
  @state() private _searchType?: MediaType;
  @state() private _results?: MaSearchResponse;
  @state() private _searching = false;
  @state() private _error?: string;
  @state() private _toast?: string;
  @state() private _ann: AnnounceData = { presets: [], selected: [], volume: null };
  @state() private _annMessage = "";
  @state() private _annSaving = false;
  @state() private _annName = "";
  @state() private _annSending = false;
  /** URI du média en cours de lancement : bloque les clics répétés. */
  @state() private _pendingUri?: string;
  @state() private _queue?: { entity: string; items: QueueItem[]; info?: QueueInfo };
  @state() private _queueLoading = false;
  /** Nombre de titres chargés après le titre en cours. */
  @state() private _queueAfter = QUEUE_PAGE;
  /** Lecteur et titre pour lesquels la file a été chargée : un changement déclenche un rechargement. */
  private _queueKey?: string;

  private _searchTimer?: number;
  private _toastTimer?: number;
  private _searchSeq = 0;

  static getConfigElement() {
    return document.createElement("multiroom-ma-card-editor");
  }

  static getStubConfig(): Partial<MultiroomCardConfig> {
    return { title: "Multiroom" };
  }

  setConfig(config: MultiroomCardConfig) {
    if (!config) throw new Error("Configuration invalide");
    this._config = { ...config };
    this._tab = config.default_tab ?? this._tab;
    const types = this._favoriteTypes;
    if (!types.includes(this._favType)) this._favType = types[0];
    this._entryId = config.config_entry_id ?? this._entryId;
    if (config.announce_volume != null && this._ann.volume == null) {
      this._ann = { ...this._ann, volume: config.announce_volume };
    }
  }

  getCardSize() {
    return 6;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: "auto" };
  }

  private get _favoriteTypes(): MediaType[] {
    return this._config.favorite_types?.length ? this._config.favorite_types : DEFAULT_FAVORITE_TYPES;
  }

  private get _players(): string[] {
    if (this._config.entities?.length) {
      return this._config.entities.filter(
        (id) => this.hass.states[id] && (this._config.show_unavailable || !isUnavailable(this.hass.states[id])),
      );
    }
    return discoverPlayers(this.hass, !!this._config.show_unavailable);
  }

  protected willUpdate(changed: PropertyValues) {
    if (changed.has("hass") && this.hass && !changed.get("hass")) this._loadAnnounceData();
    if (changed.has("hass") && this.hass && !this._entryId && !changed.get("hass")) {
      findConfigEntryId(this.hass).then((id) => {
        if (id) this._entryId = id;
        else if (!this._config.config_entry_id)
          this._error = "Config entry Music Assistant introuvable : renseignez config_entry_id.";
      });
    }
  }

  protected updated(changed: PropertyValues) {
    if ((changed.has("_tab") || changed.has("_favType") || changed.has("_entryId")) && this._tab === "favorites") {
      this._loadFavorites();
    }
    if (this._tab === "queue") {
      const leader = this._resolveTarget(computeGroups(this.hass, this._players))?.leader;
      const s = leader ? this.hass.states[leader] : undefined;
      const key = `${leader}|${s?.attributes.media_content_id}|${this._queueAfter}`;
      if (leader && key !== this._queueKey) {
        this._queueKey = key;
        this._loadQueue(leader);
      }
    }
  }

  // ----------------------------------------------------------------- actions

  private _resolveTarget(groups: PlayerGroup[]): PlayerGroup | undefined {
    if (this._target) {
      const g = groupOf(groups, this._target);
      if (g) return g;
    }
    const playing = groups.find((g) => this.hass.states[g.leader]?.state === "playing");
    return playing ?? groups.find((g) => !isUnavailable(this.hass.states[g.leader])) ?? groups[0];
  }

  private async _run(action: Promise<unknown>, success?: string) {
    try {
      await action;
      if (success) this._showToast(success);
    } catch (err: any) {
      this._showToast(`Erreur : ${err?.message ?? err}`);
    }
  }

  /** `duration` à 0 : le message reste affiché jusqu'au suivant. */
  private _showToast(msg: string, duration = 2500) {
    this._toast = msg;
    clearTimeout(this._toastTimer);
    if (duration > 0) this._toastTimer = window.setTimeout(() => (this._toast = undefined), duration);
  }

  private _startEditing(group: PlayerGroup, mode: "group" | "transfer", ev: Event) {
    ev.stopPropagation();
    if (this._editing === group.leader && this._editMode === mode) {
      this._editing = undefined;
      return;
    }
    this._editing = group.leader;
    this._editMode = mode;
    this._selection = new Set(group.members);
  }

  private async _transfer(source: PlayerGroup, target: PlayerGroup) {
    this._editing = undefined;
    await this._run(
      transferQueue(this.hass, source.leader, target.leader),
      `Lecture transférée vers ${this._groupLabel(target)}`,
    );
    this._target = target.leader;
  }

  private _toggleSelection(id: string) {
    const next = new Set(this._selection);
    next.has(id) ? next.delete(id) : next.add(id);
    this._selection = next;
  }

  private async _applyGroup(group: PlayerGroup) {
    const toAdd = [...this._selection].filter((id) => !group.members.includes(id));
    const toRemove = group.members.filter((id) => id !== group.leader && !this._selection.has(id));
    this._editing = undefined;
    const ops: Promise<unknown>[] = [];
    if (toRemove.length) ops.push(unjoin(this.hass, toRemove));
    if (toAdd.length) ops.push(join(this.hass, group.leader, toAdd));
    if (ops.length) await this._run(Promise.all(ops), "Groupe mis à jour");
  }

  private _groupAll(target: PlayerGroup) {
    const others = this._players.filter(
      (id) => id !== target.leader && !isUnavailable(this.hass.states[id]) && supportsGrouping(this.hass.states[id]),
    );
    if (others.length) this._run(join(this.hass, target.leader, others), "Toutes les enceintes groupées");
  }

  private _ungroupAll(groups: PlayerGroup[]) {
    const members = groups.flatMap((g) => g.members.filter((m) => m !== g.leader));
    if (members.length) this._run(unjoin(this.hass, members), "Enceintes dégroupées");
  }

  private _onVolumeInput(id: string, ev: Event) {
    const value = Number((ev.target as HTMLInputElement).value) / 100;
    this._volumes = new Map(this._volumes).set(id, value);
  }

  private async _onVolumeChange(id: string, ev: Event) {
    const value = Number((ev.target as HTMLInputElement).value) / 100;
    await this._run(setVolume(this.hass, id, value));
    this._clearVolume(id);
  }

  /** Le volume de groupe décale chaque membre du même écart, sans dépasser 0–100 %. */
  private async _onGroupVolumeChange(group: PlayerGroup, ev: Event) {
    const value = Number((ev.target as HTMLInputElement).value) / 100;
    const delta = value - this._groupVolume(group, false);
    await this._run(
      Promise.all(
        group.members.map((m) => setVolume(this.hass, m, (this.hass.states[m]?.attributes.volume_level ?? 0) + delta)),
      ),
    );
    this._clearVolume(`group:${group.leader}`);
  }

  private _clearVolume(key: string) {
    const next = new Map(this._volumes);
    next.delete(key);
    this._volumes = next;
  }

  private _volume(id: string): number {
    return this._volumes.get(id) ?? this.hass.states[id]?.attributes.volume_level ?? 0;
  }

  private _groupVolume(group: PlayerGroup, withDrag = true): number {
    const drag = this._volumes.get(`group:${group.leader}`);
    if (withDrag && drag !== undefined) return drag;
    const levels = group.members.map((m) => this.hass.states[m]?.attributes.volume_level ?? 0);
    return levels.reduce((a, b) => a + b, 0) / Math.max(levels.length, 1);
  }

  private async _loadFavorites(force = false) {
    if (!this._entryId) return;
    const type = this._favType;
    if (!force && this._favorites.has(type)) return;
    this._favLoading = true;
    try {
      const items = await getFavorites(this.hass, this._entryId, type);
      this._favorites = new Map(this._favorites).set(type, items);
      this._error = undefined;
    } catch (err: any) {
      this._error = `Impossible de charger les favoris : ${err?.message ?? err}`;
    } finally {
      this._favLoading = false;
    }
  }

  private _onSearchInput(ev: Event) {
    this._query = (ev.target as HTMLInputElement).value;
    clearTimeout(this._searchTimer);
    this._searchTimer = window.setTimeout(() => this._doSearch(), 400);
  }

  private _setSearchType(type?: MediaType) {
    this._searchType = type;
    this._doSearch();
  }

  private async _doSearch() {
    const query = this._query.trim();
    if (query.length < 2 || !this._entryId) {
      this._results = undefined;
      return;
    }
    const seq = ++this._searchSeq;
    this._searching = true;
    try {
      const res = await search(
        this.hass,
        this._entryId,
        query,
        this._searchType ? [this._searchType] : undefined,
        this._searchType ? 25 : 8,
      );
      if (seq === this._searchSeq) {
        this._results = res;
        this._error = undefined;
      }
    } catch (err: any) {
      if (seq === this._searchSeq) this._error = `Recherche impossible : ${err?.message ?? err}`;
    } finally {
      if (seq === this._searchSeq) this._searching = false;
    }
  }

  private async _play(item: MaItem, target: PlayerGroup | undefined, enqueue: string, ev?: Event) {
    ev?.stopPropagation();
    if (!target) {
      this._showToast("Aucune enceinte disponible");
      return;
    }
    // Music Assistant met plusieurs secondes à résoudre une playlist ou un album : sans
    // retour immédiat on reclique, et chaque clic relance la lecture depuis le début.
    if (this._pendingUri) return;
    const labels: Record<string, string> = {
      play: "Lecture",
      next: "Lu ensuite",
      add: "Ajouté à la file",
    };
    this._pendingUri = item.uri;
    this._showToast(`Lancement : ${item.name}…`, 0);
    await this._run(
      playMedia(this.hass, target.leader, item, enqueue),
      `${labels[enqueue] ?? "Lecture"} : ${item.name} · ${this._groupLabel(target)}`,
    );
    this._pendingUri = undefined;
  }

  private async _loadQueue(entity: string) {
    if (!hasQueueActions(this.hass)) return;
    this._queueLoading = true;
    try {
      const [info, items] = await Promise.all([
        getQueueInfo(this.hass, entity).catch(() => undefined),
        getQueueItems(this.hass, entity, QUEUE_BEFORE, this._queueAfter),
      ]);
      this._queue = { entity, items, info };
      this._error = undefined;
    } catch (err: any) {
      this._error = `Impossible de lire la file : ${err?.message ?? err}`;
    } finally {
      this._queueLoading = false;
    }
  }

  private async _queueAction(
    service: "play_queue_item" | "move_queue_item_next" | "remove_queue_item",
    item: QueueItem,
    message: string,
    ev?: Event,
  ) {
    ev?.stopPropagation();
    if (!this._queue) return;
    const entity = this._queue.entity;
    await this._run(queueItemCommand(this.hass, service, entity, item.queue_item_id), message);
    // Le titre en cours ne change pas forcément : on recharge explicitement.
    this._loadQueue(entity);
  }

  private async _loadAnnounceData() {
    try {
      const data = await loadAnnounceData(this.hass);
      this._ann = { ...data, volume: data.volume ?? this._config.announce_volume ?? null };
    } catch (err) {
      console.warn("multiroom-ma-card : lecture des annonces enregistrées impossible", err);
    }
  }

  private _updateAnn(patch: Partial<AnnounceData>) {
    this._ann = { ...this._ann, ...patch };
    saveAnnounceData(this.hass, this._ann).catch((err: any) =>
      this._showToast(`Enregistrement impossible : ${err?.message ?? err}`),
    );
  }

  /** Enceintes pouvant diffuser une annonce. */
  private get _announcePlayers(): string[] {
    return this._players.filter(
      (id) => ((this.hass.states[id]?.attributes.supported_features ?? 0) & FEATURE_ANNOUNCE) !== 0,
    );
  }

  private get _presets(): (AnnouncePreset & { userIndex?: number })[] {
    return [...(this._config.announcements ?? []), ...this._ann.presets.map((p, userIndex) => ({ ...p, userIndex }))];
  }

  private _toggleAnnSpeaker(id: string) {
    const selected = new Set(this._ann.selected);
    selected.has(id) ? selected.delete(id) : selected.add(id);
    this._updateAnn({ selected: [...selected] });
  }

  private _toggleAnnEverywhere(all: boolean) {
    const available = this._announcePlayers.filter((id) => !isUnavailable(this.hass.states[id]));
    this._updateAnn({ selected: all ? [] : available });
  }

  private async _announce(message: string) {
    message = message.trim();
    if (!message) return this._showToast("Le message est vide");
    const targets = this._ann.selected.filter(
      (id) => this._announcePlayers.includes(id) && !isUnavailable(this.hass.states[id]),
    );
    if (!targets.length) return this._showToast("Sélectionnez au moins une enceinte");
    const engine = this._config.tts_engine ?? defaultTtsEngine(this.hass);
    if (!engine) return this._showToast("Aucun moteur de synthèse vocale configuré");

    this._annSending = true;
    await this._run(
      playAnnouncement(this.hass, targets, message, engine, this._ann.volume),
      `Annonce envoyée sur ${targets.length} enceinte${targets.length > 1 ? "s" : ""}`,
    );
    this._annSending = false;
  }

  private _startSavePreset() {
    const message = this._annMessage.trim();
    if (!message) return this._showToast("Écrivez d'abord un message");
    this._annName = message.slice(0, 30);
    this._annSaving = true;
  }

  private _confirmSavePreset() {
    const name = this._annName.trim();
    if (!name) return;
    this._updateAnn({ presets: [...this._ann.presets, { name, message: this._annMessage.trim() }] });
    this._annSaving = false;
    this._showToast(`Annonce « ${name} » enregistrée`);
  }

  private _deletePreset(userIndex: number, ev: Event) {
    ev.stopPropagation();
    this._updateAnn({ presets: this._ann.presets.filter((_, i) => i !== userIndex) });
  }

  // ----------------------------------------------------------------- rendu

  private _groupLabel(group: PlayerGroup): string {
    return group.members.map((m) => playerName(this.hass, m)).join(" + ");
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const players = this._players;
    const groups = computeGroups(this.hass, players);
    const target = this._resolveTarget(groups);

    return html`
      <ha-card style="position: relative">
        <div class="header">
          <div class="title">${this._config.title ?? ""}</div>
          <div class="tabs" role="tablist">
            ${this._renderTab("speakers", "mdi:speaker-multiple", "Enceintes")}
            ${this._renderTab("queue", "mdi:playlist-play", "File")}
            ${this._renderTab("favorites", "mdi:heart", "Favoris")}
            ${this._renderTab("search", "mdi:magnify", "Recherche")}
            ${this._renderTab("announce", "mdi:bullhorn", "Annonces")}
          </div>
        </div>
        ${target ? this._renderNowPlaying(target) : nothing}
        <div class="content">
          ${this._error ? html`<div class="error">${this._error}</div>` : nothing}
          ${players.length === 0
            ? html`<div class="empty">Aucun lecteur Music Assistant trouvé.</div>`
            : this._tab === "speakers"
              ? this._renderSpeakers(groups, target)
              : this._tab === "queue"
                ? this._renderQueue(target)
                : this._tab === "favorites"
                ? this._renderFavorites(groups, target)
                : this._tab === "search"
                  ? this._renderSearch(groups, target)
                  : this._renderAnnounce()}
        </div>
        ${this._toast ? html`<div class="toast">${this._toast}</div>` : nothing}
      </ha-card>
    `;
  }

  private _renderTab(tab: Tab, icon: string, label: string) {
    return html`<button
      class="tab"
      role="tab"
      aria-selected=${this._tab === tab}
      title=${label}
      @click=${() => (this._tab = tab)}
    >
      <ha-icon .icon=${icon}></ha-icon><span>${label}</span>
    </button>`;
  }

  private _art(picture: string | undefined | null, icon = "mdi:music") {
    const url = picture ? (picture.startsWith("/") ? this.hass.hassUrl(picture) : picture) : undefined;
    return html`<div class="art" style=${url ? `background-image:url("${url}")` : ""}>
      ${url ? nothing : html`<ha-icon .icon=${icon}></ha-icon>`}
    </div>`;
  }

  private _renderNowPlaying(target: PlayerGroup) {
    const s = this.hass.states[target.leader];
    const a = s?.attributes ?? {};
    const playing = s?.state === "playing";
    const hasMedia = !!a.media_title;
    return html`
      <div class="now-playing">
        ${this._art(a.entity_picture, "mdi:speaker")}
        <div class="np-text">
          <div class="np-title">${hasMedia ? a.media_title : STATE_LABELS[s?.state ?? ""] ?? s?.state}</div>
          ${hasMedia
            ? html`<div class="np-sub">${[a.media_artist, a.media_album_name].filter(Boolean).join(" · ")}</div>`
            : nothing}
          <div class="np-target">
            <ha-icon icon="mdi:speaker-wireless"></ha-icon>${this._groupLabel(target)}
          </div>
        </div>
        <div class="controls">
          <button
            class="icon-btn"
            title="Précédent"
            @click=${() => this._run(mediaCommand(this.hass, target.leader, "media_previous_track"))}
          >
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button
            class="icon-btn primary"
            title=${playing ? "Pause" : "Lecture"}
            @click=${() => this._run(mediaCommand(this.hass, target.leader, "media_play_pause"))}
          >
            <ha-icon .icon=${playing ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          <button
            class="icon-btn"
            title="Suivant"
            @click=${() => this._run(mediaCommand(this.hass, target.leader, "media_next_track"))}
          >
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }

  private _renderSpeakers(groups: PlayerGroup[], target: PlayerGroup | undefined) {
    const hasGroups = groups.some((g) => g.members.length > 1);
    return html`
      <div class="toolbar">
        ${target
          ? html`<button class="btn" @click=${() => this._groupAll(target)}>
              <ha-icon icon="mdi:link-variant"></ha-icon>Tout grouper sur ${playerName(this.hass, target.leader)}
            </button>`
          : nothing}
        ${hasGroups
          ? html`<button class="btn" @click=${() => this._ungroupAll(groups)}>
              <ha-icon icon="mdi:link-variant-off"></ha-icon>Tout dégrouper
            </button>`
          : nothing}
      </div>
      ${groups.map((g) => this._renderGroup(g, g.leader === target?.leader, groups))}
    `;
  }

  private _renderGroup(group: PlayerGroup, isTarget: boolean, groups: PlayerGroup[]): TemplateResult {
    const leader = this.hass.states[group.leader];
    const a = leader?.attributes ?? {};
    const unavailable = isUnavailable(leader);
    const multi = group.members.length > 1;
    const playing = leader?.state === "playing";
    // Une file transférable : un média chargé. Music Assistant repasse en « idle »
    // après un arrêt tout en gardant la file, l'état seul ne suffit donc pas.
    const hasQueue = !!a.media_title;
    const stateText = a.media_title
      ? [a.media_title, a.media_artist].filter(Boolean).join(" — ")
      : STATE_LABELS[leader?.state ?? ""] ?? leader?.state;

    return html`
      <div class="group ${isTarget ? "target" : ""}">
        <div class="group-head" @click=${() => (this._target = group.leader)} title="Choisir comme enceinte active">
          ${this._art(a.entity_picture, multi ? "mdi:speaker-multiple" : "mdi:speaker")}
          <div class="group-info">
            <div class="group-name">
              ${this._groupLabel(group)}${isTarget ? html`<span class="badge">active</span>` : nothing}
            </div>
            <div class="group-state">${stateText}</div>
          </div>
          ${unavailable
            ? nothing
            : html`
                <button
                  class="icon-btn"
                  title=${playing ? "Pause" : "Lecture"}
                  @click=${(ev: Event) => {
                    ev.stopPropagation();
                    this._run(mediaCommand(this.hass, group.leader, "media_play_pause"));
                  }}
                >
                  <ha-icon .icon=${playing ? "mdi:pause" : "mdi:play"}></ha-icon>
                </button>
                ${hasQueue
                  ? html`<button
                      class="icon-btn ${this._isEditing(group, "transfer") ? "active" : ""}"
                      title="Transférer la lecture vers une autre enceinte"
                      @click=${(ev: Event) => this._startEditing(group, "transfer", ev)}
                    >
                      <ha-icon icon="mdi:transfer-right"></ha-icon>
                    </button>`
                  : nothing}
                ${supportsGrouping(leader)
                  ? html`<button
                      class="icon-btn ${this._isEditing(group, "group") ? "active" : ""}"
                      title="Ajouter / retirer des enceintes"
                      @click=${(ev: Event) => this._startEditing(group, "group", ev)}
                    >
                      <ha-icon icon="mdi:speaker-multiple"></ha-icon>
                    </button>`
                  : nothing}
                ${multi
                  ? html`<button
                      class="icon-btn"
                      title="Dégrouper"
                      @click=${(ev: Event) => {
                        ev.stopPropagation();
                        this._run(
                          unjoin(
                            this.hass,
                            group.members.filter((m) => m !== group.leader),
                          ),
                          "Groupe dissous",
                        );
                      }}
                    >
                      <ha-icon icon="mdi:link-variant-off"></ha-icon>
                    </button>`
                  : nothing}
              `}
        </div>
        ${unavailable
          ? nothing
          : html`<div class="members">
              ${multi ? this._renderGroupVolume(group) : nothing}
              ${group.members.map((m) => this._renderMember(group, m))}
            </div>`}
        ${this._isEditing(group, "group") ? this._renderPicker(group) : nothing}
        ${this._isEditing(group, "transfer") ? this._renderTransferPicker(group, groups) : nothing}
      </div>
    `;
  }

  private _isEditing(group: PlayerGroup, mode: "group" | "transfer") {
    return this._editing === group.leader && this._editMode === mode;
  }

  private _renderTransferPicker(source: PlayerGroup, groups: PlayerGroup[]) {
    const targets = groups.filter((g) => g.leader !== source.leader && !isUnavailable(this.hass.states[g.leader]));
    return html`
      <div class="picker">
        <div class="picker-title">Transférer la lecture de ${this._groupLabel(source)} vers :</div>
        <div class="picker-list">
          ${targets.length
            ? targets.map(
                (g) => html`<button class="chip" @click=${() => this._transfer(source, g)}>
                  <ha-icon icon="mdi:speaker-wireless"></ha-icon>${this._groupLabel(g)}
                </button>`,
              )
            : html`<span class="picker-title">Aucune autre enceinte disponible.</span>`}
        </div>
        <div class="picker-actions">
          <button class="btn" @click=${() => (this._editing = undefined)}>Annuler</button>
        </div>
      </div>
    `;
  }

  private _renderGroupVolume(group: PlayerGroup) {
    const vol = Math.round(this._groupVolume(group) * 100);
    return html`
      <div class="member group-volume">
        <span class="icon-spacer"><ha-icon icon="mdi:volume-high"></ha-icon></span>
        <span class="member-name">Groupe</span>
        <input
          type="range"
          min="0"
          max="100"
          .value=${String(vol)}
          @input=${(ev: Event) => this._onVolumeInput(`group:${group.leader}`, ev)}
          @change=${(ev: Event) => this._onGroupVolumeChange(group, ev)}
        />
        <span class="vol-value">${vol}</span>
        <span class="icon-spacer"></span>
      </div>
    `;
  }

  private _renderMember(group: PlayerGroup, id: string) {
    const a = this.hass.states[id]?.attributes ?? {};
    const muted = !!a.is_volume_muted;
    const vol = Math.round(this._volume(id) * 100);
    const isLeader = id === group.leader;
    return html`
      <div class="member">
        <button
          class="icon-btn"
          title=${muted ? "Réactiver le son" : "Couper le son"}
          @click=${() => this._run(mediaCommand(this.hass, id, "volume_mute", { is_volume_muted: !muted }))}
        >
          <ha-icon .icon=${muted ? "mdi:volume-off" : "mdi:volume-medium"}></ha-icon>
        </button>
        <span class="member-name ${isLeader && group.members.length > 1 ? "leader" : ""}"
          >${playerName(this.hass, id)}</span
        >
        <input
          type="range"
          min="0"
          max="100"
          .value=${String(vol)}
          @input=${(ev: Event) => this._onVolumeInput(id, ev)}
          @change=${(ev: Event) => this._onVolumeChange(id, ev)}
        />
        <span class="vol-value">${vol}</span>
        ${group.members.length > 1 && !isLeader
          ? html`<button
              class="icon-btn"
              title="Retirer du groupe"
              @click=${() => this._run(unjoin(this.hass, id), `${playerName(this.hass, id)} retirée du groupe`)}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>`
          : group.members.length > 1
            ? html`<span class="icon-spacer"></span>`
            : nothing}
      </div>
    `;
  }

  private _renderPicker(group: PlayerGroup) {
    const candidates = this._players.filter((id) => id !== group.leader);
    return html`
      <div class="picker">
        <div class="picker-title">Enceintes jouant avec ${playerName(this.hass, group.leader)} :</div>
        <div class="picker-list">
          ${candidates.map((id) => {
            const s = this.hass.states[id];
            const disabled = isUnavailable(s) || !supportsGrouping(s);
            const selected = this._selection.has(id);
            return html`<button
              class="chip"
              aria-pressed=${selected}
              ?disabled=${disabled}
              @click=${() => this._toggleSelection(id)}
            >
              <ha-icon .icon=${selected ? "mdi:check" : "mdi:plus"}></ha-icon>${playerName(this.hass, id)}
            </button>`;
          })}
        </div>
        <div class="picker-actions">
          <button class="btn" @click=${() => (this._editing = undefined)}>Annuler</button>
          <button class="btn primary" @click=${() => this._applyGroup(group)}>Appliquer</button>
        </div>
      </div>
    `;
  }

  private _renderTargetSelect(groups: PlayerGroup[], target: PlayerGroup | undefined) {
    const available = groups.filter((g) => !isUnavailable(this.hass.states[g.leader]));
    return html`
      <div class="target-row">
        <ha-icon icon="mdi:speaker-wireless"></ha-icon>
        <span>Lire sur</span>
        <select @change=${(ev: Event) => (this._target = (ev.target as HTMLSelectElement).value)}>
          ${available.map(
            (g) => html`<option value=${g.leader} ?selected=${g.leader === target?.leader}>
              ${this._groupLabel(g)}
            </option>`,
          )}
        </select>
      </div>
    `;
  }

  private _renderFavorites(groups: PlayerGroup[], target: PlayerGroup | undefined) {
    const items = this._favorites.get(this._favType);
    return html`
      ${this._renderTargetSelect(groups, target)}
      <div class="chips">
        ${this._favoriteTypes.map(
          (t) => html`<button class="chip" aria-pressed=${this._favType === t} @click=${() => (this._favType = t)}>
            <ha-icon .icon=${MEDIA_TYPES[t].icon}></ha-icon>${MEDIA_TYPES[t].plural}
          </button>`,
        )}
        <button class="icon-btn" title="Rafraîchir" @click=${() => this._loadFavorites(true)}>
          <ha-icon icon="mdi:refresh"></ha-icon>
        </button>
      </div>
      ${!this._entryId
        ? nothing
        : this._favLoading && !items
          ? html`<div class="empty">Chargement…</div>`
          : !items?.length
            ? html`<div class="empty">Aucun favori de ce type.</div>`
            : html`<div class="grid">${items.map((i) => this._renderTile(i, target))}</div>`}
    `;
  }

  private _renderSearch(groups: PlayerGroup[], target: PlayerGroup | undefined) {
    const types = Object.keys(MEDIA_TYPES) as MediaType[];
    const sections = this._results
      ? SEARCH_SECTIONS.filter((s) => this._results![s.key]?.length)
      : [];
    return html`
      ${this._renderTargetSelect(groups, target)}
      <div class="search-box">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input
          type="search"
          placeholder="Artiste, album, titre, radio…"
          .value=${this._query}
          @input=${this._onSearchInput}
          @keydown=${(ev: KeyboardEvent) => {
            if (ev.key !== "Enter") return;
            this._doSearch();
            // Ferme le clavier tactile : sinon il se ferme au premier appui sur un résultat
            // et la liste se décale sous le doigt.
            (ev.target as HTMLInputElement).blur();
          }}
        />
        ${this._searching ? html`<ha-icon icon="mdi:loading" class="spin"></ha-icon>` : nothing}
      </div>
      <div class="chips">
        <button class="chip" aria-pressed=${!this._searchType} @click=${() => this._setSearchType(undefined)}>
          Tout
        </button>
        ${types.map(
          (t) => html`<button
            class="chip"
            aria-pressed=${this._searchType === t}
            @click=${() => this._setSearchType(t)}
          >
            <ha-icon .icon=${MEDIA_TYPES[t].icon}></ha-icon>${MEDIA_TYPES[t].plural}
          </button>`,
        )}
      </div>
      ${this._query.trim().length < 2
        ? html`<div class="empty">Recherchez dans toutes les sources connectées à Music Assistant.</div>`
        : this._results && !sections.length && !this._searching
          ? html`<div class="empty">Aucun résultat pour « ${this._query} ».</div>`
          : sections.map(
              (s) => html`
                <div class="section-title">${MEDIA_TYPES[s.type].plural}</div>
                ${s.type === "track"
                  ? html`<div class="list">${this._results![s.key].map((i) => this._renderRow(i, target))}</div>`
                  : html`<div class="grid">${this._results![s.key].map((i) => this._renderTile(i, target))}</div>`}
              `,
            )}
    `;
  }

  private _renderQueue(target: PlayerGroup | undefined) {
    if (!hasQueueActions(this.hass)) {
      return html`<div class="empty">
        L'affichage de la file nécessite l'intégration « Music Assistant Queue Actions » (mass_queue, via HACS).
      </div>`;
    }
    if (!target) return html`<div class="empty">Aucune enceinte disponible.</div>`;
    const queue = this._queue?.entity === target.leader ? this._queue : undefined;
    if (!queue) return html`<div class="empty">${this._queueLoading ? "Chargement…" : "File vide."}</div>`;

    const { items, info } = queue;
    const leader = this.hass.states[target.leader];
    // Repère le titre en cours par son identifiant de file, à défaut par son média.
    let current = items.findIndex((i) => i.queue_item_id === info?.current_item?.queue_item_id);
    if (current < 0) current = items.findIndex((i) => i.media_content_id === leader?.attributes.media_content_id);
    const position = info?.current_index != null ? info.current_index + 1 : undefined;
    const remaining = info && info.current_index != null ? info.items - info.current_index - 1 : 0;
    const shownAfter = current >= 0 ? items.length - current - 1 : items.length;

    return html`
      <div class="queue-head">
        <ha-icon icon="mdi:speaker-wireless"></ha-icon>
        <span class="queue-title">${this._groupLabel(target)}</span>
        ${info ? html`<span class="queue-count">${position ?? "–"} / ${info.items}</span>` : nothing}
        <button class="icon-btn" title="Rafraîchir" @click=${() => this._loadQueue(target.leader)}>
          <ha-icon class=${this._queueLoading ? "spin" : ""} icon="mdi:refresh"></ha-icon>
        </button>
      </div>
      ${items.length
        ? html`<div class="list">
            ${items.map((item, i) => this._renderQueueRow(item, i < current ? "past" : i === current ? "current" : ""))}
          </div>`
        : html`<div class="empty">File vide.</div>`}
      ${remaining > shownAfter && this._queueAfter < 1000
        ? html`<div class="picker-actions">
            <button class="btn" @click=${() => (this._queueAfter = Math.min(1000, this._queueAfter + QUEUE_PAGE))}>
              <ha-icon icon="mdi:chevron-down"></ha-icon>Afficher plus (${remaining - shownAfter} restants)
            </button>
          </div>`
        : nothing}
    `;
  }

  private _renderQueueRow(item: QueueItem, status: "past" | "current" | "") {
    const art = this._art(item.media_image, "mdi:music-note");
    if (status === "current") {
      return html`<div class="row current">
        ${art}
        <div class="row-text">
          <div class="tile-name">${item.media_title}</div>
          <div class="tile-sub">${item.media_artist ?? ""}</div>
        </div>
        <ha-icon class="now-icon" icon="mdi:volume-high"></ha-icon>
      </div>`;
    }
    return html`<div
      class="row ${status}"
      title=${`Lire ${item.media_title}`}
      @click=${() => this._queueAction("play_queue_item", item, `Lecture : ${item.media_title}`)}
    >
      ${art}
      <div class="row-text">
        <div class="tile-name">${item.media_title}</div>
        <div class="tile-sub">${item.media_artist ?? ""}</div>
      </div>
      ${status === "past"
        ? nothing
        : html`<button
            class="icon-btn"
            title="Lire ensuite"
            @click=${(ev: Event) => this._queueAction("move_queue_item_next", item, `${item.media_title} sera lu ensuite`, ev)}
          >
            <ha-icon icon="mdi:playlist-play"></ha-icon>
          </button>`}
      <button
        class="icon-btn"
        title="Retirer de la file"
        @click=${(ev: Event) => this._queueAction("remove_queue_item", item, `${item.media_title} retiré de la file`, ev)}
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </button>
    </div>`;
  }

  private _renderAnnounce() {
    const speakers = this._announcePlayers;
    const available = speakers.filter((id) => !isUnavailable(this.hass.states[id]));
    const allSelected = available.length > 0 && available.every((id) => this._ann.selected.includes(id));
    const presets = this._presets;
    const volume = this._ann.volume;
    return html`
      <div class="section-title">Enceintes</div>
      <div class="picker-list">
        ${speakers.map(
          (id) => html`<button
            class="chip"
            aria-pressed=${this._ann.selected.includes(id)}
            ?disabled=${isUnavailable(this.hass.states[id])}
            @click=${() => this._toggleAnnSpeaker(id)}
          >
            <ha-icon icon="mdi:speaker"></ha-icon>${playerName(this.hass, id)}
          </button>`,
        )}
        ${speakers.length > 1
          ? html`<button class="chip all" aria-pressed=${allSelected} @click=${() => this._toggleAnnEverywhere(allSelected)}>
              <ha-icon icon="mdi:home-sound-out"></ha-icon>Partout
            </button>`
          : nothing}
        ${speakers.length ? nothing : html`<span class="picker-title">Aucune enceinte compatible.</span>`}
      </div>

      <div class="section-title">Annonces enregistrées</div>
      <div class="presets">
        ${presets.length
          ? presets.map(
              (p) => html`<div
                class="preset"
                title=${p.message}
                @click=${() => (this._annMessage = p.message)}
              >
                <ha-icon .icon=${p.icon ?? "mdi:message-text-outline"}></ha-icon>
                <span class="preset-name">${p.name}</span>
                <button
                  class="icon-btn"
                  title="Diffuser maintenant"
                  ?disabled=${this._annSending}
                  @click=${(ev: Event) => {
                    ev.stopPropagation();
                    this._announce(p.message);
                  }}
                >
                  <ha-icon icon="mdi:play"></ha-icon>
                </button>
                ${p.userIndex !== undefined
                  ? html`<button
                      class="icon-btn"
                      title="Supprimer"
                      @click=${(ev: Event) => this._deletePreset(p.userIndex!, ev)}
                    >
                      <ha-icon icon="mdi:close"></ha-icon>
                    </button>`
                  : nothing}
              </div>`,
            )
          : html`<span class="picker-title">Aucune annonce. Écrivez un message puis « Enregistrer ».</span>`}
      </div>

      <div class="section-title">Message</div>
      <textarea
        rows="2"
        placeholder="Tapez votre message…"
        .value=${this._annMessage}
        @input=${(ev: Event) => (this._annMessage = (ev.target as HTMLTextAreaElement).value)}
        @keydown=${(ev: KeyboardEvent) => ev.key === "Enter" && (ev.ctrlKey || ev.metaKey) && this._announce(this._annMessage)}
      ></textarea>

      ${this._annSaving
        ? html`<div class="save-row">
            <input
              type="text"
              placeholder="Nom de l'annonce"
              .value=${this._annName}
              @input=${(ev: Event) => (this._annName = (ev.target as HTMLInputElement).value)}
              @keydown=${(ev: KeyboardEvent) => ev.key === "Enter" && this._confirmSavePreset()}
            />
            <button class="btn" @click=${this._confirmSavePreset}>OK</button>
            <button class="btn" @click=${() => (this._annSaving = false)}>Annuler</button>
          </div>`
        : nothing}

      <div class="member">
        <span class="icon-spacer"><ha-icon icon="mdi:volume-high"></ha-icon></span>
        <span class="member-name">Volume</span>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          .value=${String(volume ?? 30)}
          @input=${(ev: Event) => (this._ann = { ...this._ann, volume: Number((ev.target as HTMLInputElement).value) })}
          @change=${() => this._updateAnn({})}
        />
        <button
          class="vol-label"
          title="Cliquer pour ne pas changer le volume des enceintes"
          @click=${() => this._updateAnn({ volume: null })}
        >
          ${volume == null ? "inchangé" : `${volume} %`}
        </button>
      </div>

      <div class="picker-actions">
        <button class="btn" @click=${this._startSavePreset}>
          <ha-icon icon="mdi:content-save-outline"></ha-icon>Enregistrer
        </button>
        <button
          class="btn primary"
          ?disabled=${this._annSending}
          @click=${() => this._announce(this._annMessage)}
        >
          <ha-icon icon="mdi:bullhorn-outline"></ha-icon>Annoncer
        </button>
      </div>
    `;
  }

  private _typeIcon(item: MaItem) {
    return MEDIA_TYPES[item.media_type as MediaType]?.icon ?? "mdi:music";
  }

  private _itemImage(item: MaItem) {
    return item.image ?? item.album?.image ?? undefined;
  }

  /** `pending` sur le média en cours de lancement, `busy` sur les autres pendant ce temps. */
  private _pendingClass(item: MaItem) {
    if (!this._pendingUri) return "";
    return this._pendingUri === item.uri ? "pending" : "busy";
  }

  private _itemArt(item: MaItem) {
    return html`<div class="art-wrap">
      ${this._art(this._itemImage(item), this._typeIcon(item))}
      ${this._pendingUri === item.uri
        ? html`<div class="art-overlay"><ha-icon class="spin" icon="mdi:loading"></ha-icon></div>`
        : nothing}
    </div>`;
  }

  private _renderTile(item: MaItem, target: PlayerGroup | undefined) {
    return html`
      <div
        class="tile ${item.media_type === "artist" ? "round" : ""} ${this._pendingClass(item)}"
        tabindex="0"
        title=${`Lire ${item.name}`}
        @click=${() => this._play(item, target, "play")}
        @keydown=${(ev: KeyboardEvent) => ev.key === "Enter" && this._play(item, target, "play")}
      >
        ${this._itemArt(item)}
        <div class="tile-actions">
          <button class="icon-btn" title="Lire ensuite" @click=${(ev: Event) => this._play(item, target, "next", ev)}>
            <ha-icon icon="mdi:playlist-play"></ha-icon>
          </button>
          <button class="icon-btn" title="Ajouter à la file" @click=${(ev: Event) => this._play(item, target, "add", ev)}>
            <ha-icon icon="mdi:playlist-plus"></ha-icon>
          </button>
        </div>
        <div class="tile-name">${item.name}</div>
        <div class="tile-sub">${itemSubtitle(item)}</div>
      </div>
    `;
  }

  private _renderRow(item: MaItem, target: PlayerGroup | undefined) {
    return html`
      <div
        class="row ${this._pendingClass(item)}"
        @click=${() => this._play(item, target, "play")}
        title=${`Lire ${item.name}`}
      >
        ${this._itemArt(item)}
        <div class="row-text">
          <div class="tile-name">${item.name}</div>
          <div class="tile-sub">${itemSubtitle(item)}</div>
        </div>
        <button class="icon-btn" title="Lire ensuite" @click=${(ev: Event) => this._play(item, target, "next", ev)}>
          <ha-icon icon="mdi:playlist-play"></ha-icon>
        </button>
        <button class="icon-btn" title="Ajouter à la file" @click=${(ev: Event) => this._play(item, target, "add", ev)}>
          <ha-icon icon="mdi:playlist-plus"></ha-icon>
        </button>
      </div>
    `;
  }
}

declare global {
  interface Window {
    customCards?: { type: string; name: string; description: string; preview?: boolean }[];
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "multiroom-ma-card",
  name: "Multiroom MA Card",
  description: "Gérer, grouper et alimenter les enceintes Music Assistant.",
  preview: false,
});

console.info(`%c MULTIROOM-MA-CARD %c v${VERSION} `, "color:#fff;background:#03a9f4", "color:#03a9f4");
