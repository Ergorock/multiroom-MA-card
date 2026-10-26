import type { AnnouncePreset, HomeAssistant } from "./types";

/** MediaPlayerEntityFeature.MEDIA_ANNOUNCE */
export const FEATURE_ANNOUNCE = 1048576;

// Clé antérieure au renommage de la carte, conservée pour garder les réglages déjà enregistrés.
const STORAGE_KEY = "multiroom-card-announce";
/** Clé utilisée par la carte Annonce : ses annonces enregistrées sont reprises au premier usage. */
const LEGACY_STORAGE_KEY = "annonce-card";

/** Données propres à l'utilisateur, synchronisées entre ses appareils par HA. */
export interface AnnounceData {
  presets: AnnouncePreset[];
  selected: string[];
  /** Volume d'annonce (0-100), `null` = volume inchangé. */
  volume: number | null;
}

async function getUserData(hass: HomeAssistant, key: string): Promise<Partial<AnnounceData> | undefined> {
  const res = await hass.callWS<{ value?: Partial<AnnounceData> | null }>({ type: "frontend/get_user_data", key });
  return res?.value ?? undefined;
}

export async function loadAnnounceData(hass: HomeAssistant): Promise<AnnounceData> {
  const data = (await getUserData(hass, STORAGE_KEY)) ?? (await getUserData(hass, LEGACY_STORAGE_KEY)) ?? {};
  return {
    presets: Array.isArray(data.presets) ? data.presets : [],
    selected: Array.isArray(data.selected) ? data.selected : [],
    volume: data.volume ?? null,
  };
}

export function saveAnnounceData(hass: HomeAssistant, data: AnnounceData) {
  return hass.callWS({ type: "frontend/set_user_data", key: STORAGE_KEY, value: data });
}

export function defaultTtsEngine(hass: HomeAssistant): string | undefined {
  return Object.keys(hass.states).find((id) => id.startsWith("tts."));
}

/** Diffuse un message TTS ; Music Assistant reprend ensuite la musique en cours. */
export function playAnnouncement(
  hass: HomeAssistant,
  entities: string[],
  message: string,
  ttsEngine: string | undefined,
  volume: number | null,
) {
  const data: Record<string, any> = { entity_id: entities, message };
  if (ttsEngine) data.tts_entity_id = ttsEngine;
  // Le service attend un volume entre 1 et 100.
  if (volume != null) data.announce_volume = Math.max(1, Math.min(100, volume));
  return hass.callService("music_assistant", "play_announcement", data);
}
