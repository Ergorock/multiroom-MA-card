import type {
  HassEntity,
  HomeAssistant,
  MaItem,
  MaLibraryResponse,
  MaSearchResponse,
  MediaType,
  PlayerGroup,
  QueueInfo,
  QueueItem,
} from "./types";

const DOMAIN = "music_assistant";
/** MediaPlayerEntityFeature.GROUPING */
const FEATURE_GROUPING = 524288;

export const isMaPlayer = (e: HassEntity | undefined): boolean =>
  !!e && e.entity_id.startsWith("media_player.") && e.attributes.mass_player_type !== undefined;

export const supportsGrouping = (e: HassEntity | undefined): boolean =>
  !!e && ((e.attributes.supported_features ?? 0) & FEATURE_GROUPING) !== 0;

export const isUnavailable = (e: HassEntity | undefined): boolean =>
  !e || e.state === "unavailable" || e.state === "unknown";

export function playerName(hass: HomeAssistant, entityId: string): string {
  return hass.states[entityId]?.attributes.friendly_name ?? entityId;
}

/** Lecteurs Music Assistant détectés automatiquement, triés par nom. */
export function discoverPlayers(hass: HomeAssistant, showUnavailable: boolean): string[] {
  return Object.values(hass.states)
    .filter((e) => isMaPlayer(e) && (showUnavailable || !isUnavailable(e)))
    .sort((a, b) => playerName(hass, a.entity_id).localeCompare(playerName(hass, b.entity_id)))
    .map((e) => e.entity_id);
}

/**
 * Regroupe les lecteurs selon l'attribut `group_members`.
 * Par convention HA, le premier élément de `group_members` est le leader.
 */
export function computeGroups(hass: HomeAssistant, players: string[]): PlayerGroup[] {
  const groups: PlayerGroup[] = [];
  const assigned = new Set<string>();

  for (const id of players) {
    const members: string[] = hass.states[id]?.attributes.group_members ?? [];
    if (members.length > 1 && members[0] === id) {
      const visible = members.filter((m) => players.includes(m));
      groups.push({ leader: id, members: visible });
      visible.forEach((m) => assigned.add(m));
    }
  }
  for (const id of players) {
    if (!assigned.has(id)) groups.push({ leader: id, members: [id] });
  }
  return groups;
}

export function groupOf(groups: PlayerGroup[], entityId: string): PlayerGroup | undefined {
  return groups.find((g) => g.members.includes(entityId));
}

/** Retrouve la config entry Music Assistant (nécessite un compte admin). */
export async function findConfigEntryId(hass: HomeAssistant): Promise<string | undefined> {
  try {
    const entries = await hass.callWS<{ entry_id: string; state: string }[]>({
      type: "config_entries/get",
      domain: DOMAIN,
    });
    return (entries.find((e) => e.state === "loaded") ?? entries[0])?.entry_id;
  } catch {
    return undefined;
  }
}

async function callWithResponse<T>(
  hass: HomeAssistant,
  service: string,
  data: Record<string, any>,
): Promise<T> {
  const res = await hass.callWS<{ response: T }>({
    type: "call_service",
    domain: DOMAIN,
    service,
    service_data: data,
    return_response: true,
  });
  return res.response;
}

export async function getFavorites(
  hass: HomeAssistant,
  configEntryId: string,
  mediaType: MediaType,
  limit = 100,
): Promise<MaItem[]> {
  const res = await callWithResponse<MaLibraryResponse>(hass, "get_library", {
    config_entry_id: configEntryId,
    media_type: mediaType,
    favorite: true,
    limit,
    order_by: "name",
  });
  return res?.items ?? [];
}

export async function search(
  hass: HomeAssistant,
  configEntryId: string,
  query: string,
  mediaTypes?: MediaType[],
  limit = 8,
): Promise<MaSearchResponse> {
  const data: Record<string, any> = { config_entry_id: configEntryId, name: query, limit };
  if (mediaTypes?.length) data.media_type = mediaTypes;
  return callWithResponse<MaSearchResponse>(hass, "search", data);
}

export function playMedia(hass: HomeAssistant, entityId: string, item: MaItem, enqueue = "play") {
  return hass.callService(DOMAIN, "play_media", {
    entity_id: entityId,
    media_id: item.uri,
    media_type: item.media_type,
    enqueue,
  });
}

/** Intégration HACS « Music Assistant Queue Actions », seule à exposer le contenu de la file. */
const QUEUE_DOMAIN = "mass_queue";

export const hasQueueActions = (hass: HomeAssistant) => !!hass.services?.[QUEUE_DOMAIN];

/** Position et taille de la file (`music_assistant.get_queue`). */
export async function getQueueInfo(hass: HomeAssistant, entityId: string): Promise<QueueInfo | undefined> {
  const res = await hass.callWS<{ response: Record<string, QueueInfo> }>({
    type: "call_service",
    domain: DOMAIN,
    service: "get_queue",
    target: { entity_id: entityId },
    return_response: true,
  });
  return res.response?.[entityId];
}

/** Titres de la file autour du titre en cours. */
export async function getQueueItems(
  hass: HomeAssistant,
  entityId: string,
  before: number,
  after: number,
): Promise<QueueItem[]> {
  const res = await hass.callWS<{ response: Record<string, QueueItem[]> }>({
    type: "call_service",
    domain: QUEUE_DOMAIN,
    service: "get_queue_items",
    service_data: { entity: entityId, limit_before: before, limit_after: after },
    return_response: true,
  });
  return res.response?.[entityId] ?? [];
}

export function queueItemCommand(
  hass: HomeAssistant,
  service: "play_queue_item" | "move_queue_item_next" | "remove_queue_item",
  entityId: string,
  queueItemId: string,
) {
  return hass.callService(QUEUE_DOMAIN, service, { entity: entityId, queue_item_id: queueItemId });
}

/** Déplace la file d'attente (et la lecture en cours) de `source` vers `target`. */
export function transferQueue(hass: HomeAssistant, source: string, target: string) {
  return hass.callService(DOMAIN, "transfer_queue", {
    entity_id: target,
    source_player: source,
    auto_play: true,
  });
}

export function join(hass: HomeAssistant, leader: string, members: string[]) {
  return hass.callService("media_player", "join", { entity_id: leader, group_members: members });
}

export function unjoin(hass: HomeAssistant, entityId: string | string[]) {
  return hass.callService("media_player", "unjoin", { entity_id: entityId });
}

export function setVolume(hass: HomeAssistant, entityId: string, volume: number) {
  return hass.callService("media_player", "volume_set", {
    entity_id: entityId,
    volume_level: Math.max(0, Math.min(1, volume)),
  });
}

export function mediaCommand(hass: HomeAssistant, entityId: string, service: string, data = {}) {
  return hass.callService("media_player", service, { entity_id: entityId, ...data });
}

export function itemSubtitle(item: MaItem): string {
  const artists = item.artists?.map((a) => a.name).join(", ");
  if (item.media_type === "track") return [artists, item.album?.name].filter(Boolean).join(" · ");
  if (item.media_type === "album") return artists ?? "";
  if (item.media_type === "playlist") return item.owner ?? "";
  return "";
}
