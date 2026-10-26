export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  services?: Record<string, Record<string, unknown>>;
  user?: { is_admin: boolean };
  language?: string;
  callService(domain: string, service: string, data?: Record<string, any>): Promise<unknown>;
  callWS<T>(msg: Record<string, any>): Promise<T>;
  hassUrl(path?: string): string;
}

export type MediaType = "playlist" | "album" | "artist" | "track" | "radio" | "podcast" | "audiobook";

export interface MultiroomCardConfig {
  type: string;
  title?: string;
  /** Lecteurs Music Assistant à afficher. Vide = détection automatique. */
  entities?: string[];
  /** Config entry Music Assistant. Vide = détection automatique. */
  config_entry_id?: string;
  /** Types de médias proposés dans les favoris. */
  favorite_types?: MediaType[];
  /** Afficher les lecteurs indisponibles. */
  show_unavailable?: boolean;
  /** Onglet ouvert au chargement. */
  default_tab?: Tab;
  /** Moteur TTS des annonces. Vide = premier moteur `tts.*` trouvé. */
  tts_engine?: string;
  /** Volume d'annonce par défaut (0-100). */
  announce_volume?: number;
  /** Annonces fixes, en plus de celles enregistrées depuis la carte. */
  announcements?: AnnouncePreset[];
}

export type Tab = "speakers" | "queue" | "favorites" | "search" | "announce";

/** Élément de file renvoyé par `mass_queue.get_queue_items`. */
export interface QueueItem {
  queue_item_id: string;
  media_title: string;
  media_artist?: string;
  media_album_name?: string;
  media_content_id: string;
  media_image?: string | null;
}

/** Réponse de `music_assistant.get_queue` (partielle). */
export interface QueueInfo {
  items: number;
  current_index: number | null;
  current_item?: { queue_item_id: string } | null;
}

export interface AnnouncePreset {
  name: string;
  message: string;
  icon?: string;
}

export interface MaItemRef {
  media_type: string;
  uri: string;
  name: string;
  image?: string | null;
}

export interface MaItem extends MaItemRef {
  version?: string;
  favorite?: boolean;
  artists?: MaItemRef[];
  album?: MaItemRef | null;
  owner?: string;
}

export interface MaLibraryResponse {
  items: MaItem[];
  limit: number;
  offset: number;
}

export interface MaSearchResponse {
  artists: MaItem[];
  albums: MaItem[];
  tracks: MaItem[];
  playlists: MaItem[];
  radio: MaItem[];
  audiobooks: MaItem[];
  podcasts: MaItem[];
}

/** Un groupe de lecture : un leader et ses membres (le leader inclus). */
export interface PlayerGroup {
  leader: string;
  members: string[];
}
