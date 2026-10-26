import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, MultiroomCardConfig } from "./types";

const SCHEMA = [
  { name: "title", selector: { text: {} } },
  {
    name: "entities",
    selector: {
      entity: { multiple: true, filter: { domain: "media_player", integration: "music_assistant" } },
    },
  },
  {
    name: "favorite_types",
    selector: {
      select: {
        multiple: true,
        options: [
          { value: "playlist", label: "Playlists" },
          { value: "album", label: "Albums" },
          { value: "artist", label: "Artistes" },
          { value: "track", label: "Titres" },
          { value: "radio", label: "Radios" },
          { value: "podcast", label: "Podcasts" },
          { value: "audiobook", label: "Livres audio" },
        ],
      },
    },
  },
  {
    name: "default_tab",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "speakers", label: "Enceintes" },
          { value: "queue", label: "File de lecture" },
          { value: "favorites", label: "Favoris" },
          { value: "search", label: "Recherche" },
          { value: "announce", label: "Annonces" },
        ],
      },
    },
  },
  { name: "tts_engine", selector: { entity: { domain: "tts" } } },
  { name: "announce_volume", selector: { number: { min: 0, max: 100, step: 5, mode: "slider" } } },
  { name: "show_unavailable", selector: { boolean: {} } },
  { name: "config_entry_id", selector: { config_entry: { integration: "music_assistant" } } },
];

const LABELS: Record<string, string> = {
  title: "Titre",
  entities: "Enceintes (vide = toutes les enceintes Music Assistant)",
  favorite_types: "Types de favoris affichés",
  default_tab: "Onglet par défaut",
  tts_engine: "Moteur de synthèse vocale des annonces (vide = automatique)",
  announce_volume: "Volume d'annonce par défaut",
  show_unavailable: "Afficher les enceintes indisponibles",
  config_entry_id: "Instance Music Assistant (vide = automatique)",
};

@customElement("multiroom-card-editor")
export class MultiroomCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: MultiroomCardConfig;

  setConfig(config: MultiroomCardConfig) {
    this._config = config;
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;
    return html`<ha-form
      .hass=${this.hass}
      .data=${this._config}
      .schema=${SCHEMA}
      .computeLabel=${(s: { name: string }) => LABELS[s.name] ?? s.name}
      @value-changed=${this._valueChanged}
    ></ha-form>`;
  }

  private _valueChanged(ev: CustomEvent) {
    const config = { ...ev.detail.value };
    for (const key of Object.keys(config)) {
      const v = config[key];
      if (v === "" || v === undefined || (Array.isArray(v) && v.length === 0)) delete config[key];
    }
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }
}
