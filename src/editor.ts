import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant, MultiroomCardConfig } from "./types";
import { hasKey, setLang, tr } from "./i18n";

const schema = () => [
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
          { value: "playlist", label: tr("types_playlist") },
          { value: "album", label: tr("types_album") },
          { value: "artist", label: tr("types_artist") },
          { value: "track", label: tr("types_track") },
          { value: "radio", label: tr("types_radio") },
          { value: "podcast", label: tr("types_podcast") },
          { value: "audiobook", label: tr("types_audiobook") },
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
          { value: "speakers", label: tr("tab_speakers") },
          { value: "queue", label: tr("queue_tab") },
          { value: "favorites", label: tr("tab_favorites") },
          { value: "search", label: tr("tab_search") },
          { value: "announce", label: tr("tab_announce") },
        ],
      },
    },
  },
  { name: "tts_engine", selector: { entity: { domain: "tts" } } },
  { name: "announce_volume", selector: { number: { min: 0, max: 100, step: 5, mode: "slider" } } },
  { name: "show_unavailable", selector: { boolean: {} } },
  { name: "config_entry_id", selector: { config_entry: { integration: "music_assistant" } } },
];

export class MultiroomCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: MultiroomCardConfig;

  setConfig(config: MultiroomCardConfig) {
    this._config = config;
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;
    setLang(this.hass);
    return html`<ha-form
      .hass=${this.hass}
      .data=${this._config}
      .schema=${schema()}
      .computeLabel=${(s: { name: string }) => (hasKey(`label_${s.name}`) ? tr(`label_${s.name}`) : s.name)}
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

if (!customElements.get("multiroom-ma-card-editor")) customElements.define("multiroom-ma-card-editor", MultiroomCardEditor);
