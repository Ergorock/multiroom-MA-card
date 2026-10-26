# Multiroom MA Card

*[Version française](README.fr.md)*

A Lovelace card to control multiroom speakers through [Music Assistant](https://music-assistant.io/).

- **Speakers**: see every speaker and what it is playing, set the volume (per speaker or for the whole group), mute.
- **Groups**: add or remove speakers from a group, dissolve a group, group or ungroup everything in one click.
- **Play queue**: see the active speaker's queue (current track, past and upcoming tracks), play a track, play it next or remove it. Requires the [Music Assistant Queue Actions](https://github.com/droans/mass_queue) HACS integration (`mass_queue`).
- **Transfer**: move the play queue (and the current track) from one speaker or group to another.
- **Favorites**: browse Music Assistant's favorite playlists, albums, artists, radios and tracks.
- **Search**: search all the sources connected to Music Assistant.
- Play now, “play next” or “add to queue” on the active speaker (or group).
- **Announcements**: broadcast a voice message to a selection of speakers (or “Everywhere”), with reusable saved announcements; the music resumes afterwards.
- Interface in English and French (follows the Home Assistant language).

## Screenshots

![Speakers and groups](https://raw.githubusercontent.com/Ergorock/multiroom-MA-card/master/images/speakers.png)

![Play queue](https://raw.githubusercontent.com/Ergorock/multiroom-MA-card/master/images/queue.png)

![Announcements](https://raw.githubusercontent.com/Ergorock/multiroom-MA-card/master/images/announcements.png)

![Visual editor](https://raw.githubusercontent.com/Ergorock/multiroom-MA-card/master/images/editor.png)

## Installation

### HACS (custom repository)

1. HACS → ⋮ menu → *Custom repositories* → add `https://github.com/Ergorock/multiroom-MA-card`, category **Dashboard**.
2. Install **Multiroom MA Card**, then reload your browser.

### Manual

1. Run `npm install` then `npm run build`.
2. Copy `dist/multiroom-ma-card.js` to `config/www/multiroom-ma-card.js`.
3. *Settings → Dashboards → ⋮ → Resources*: add `/local/multiroom-ma-card.js` (type *JavaScript module*).

## Configuration

Add the card from the visual editor (“Multiroom MA Card”). With no configuration, it finds every Music Assistant speaker by itself.

```yaml
type: custom:multiroom-ma-card
title: Multiroom
entities:            # optional, otherwise every Music Assistant speaker
  - media_player.beam
  - media_player.era_100
  - media_player.landing
  - media_player.play
favorite_types: [playlist, album, artist, radio, track]
default_tab: speakers    # speakers | queue | favorites | search | announce
show_unavailable: false
config_entry_id: 01KK…   # optional, see below
tts_engine: tts.google_translate_en_com   # optional, otherwise the first tts.* engine
announce_volume: 35      # default announcement volume (0-100)
announcements:           # fixed announcements, in addition to the ones saved from the card
  - name: Dinner
    message: Dinner is ready!
    icon: mdi:silverware-fork-knife
```

| Option | Description | Default |
| --- | --- | --- |
| `title` | Card title | — |
| `entities` | Music Assistant `media_player` players to show | automatic discovery |
| `favorite_types` | Favorite types offered (`playlist`, `album`, `artist`, `track`, `radio`, `podcast`, `audiobook`) | playlist, album, artist, radio, track |
| `default_tab` | Tab open on load | `speakers` |
| `show_unavailable` | Show unavailable speakers | `false` |
| `config_entry_id` | Music Assistant instance | automatic discovery |
| `tts_engine` | Text-to-speech engine for announcements | first `tts.*` found |
| `announce_volume` | Default announcement volume (0-100); the setting made from the card takes precedence | volume unchanged |
| `announcements` | Fixed announcements (`name`, `message`, `icon`) | — |

> Automatic discovery of the Music Assistant instance requires an **administrator** account. For other accounts, set `config_entry_id` (pick the instance in the visual editor).

## Usage

- **Active speaker**: a click on a group's header makes it the target. The top banner, favorites and search play on this speaker (or group).
- **Group**: a group's <kbd>speakers</kbd> button opens the list of the other speakers. Check or uncheck them, then click *Apply*.
- **Queue**: the *Queue* tab follows the active speaker and reloads on every track change. Tapping a track plays it; “Play next” puts it right after the current track; ✕ removes it. “Show more” loads 50 more tracks (up to 1000).
- **Transfer**: the ⇥ button of a group with a loaded queue offers the other speakers; a click moves the queue there and resumes playback.
- **Announce**: in the *Announcements* tab, choose the speakers, then ▶ on a saved announcement, or type a message and “Announce” (Ctrl+Enter). A click on an announcement fills in the message; “Save” adds it to the announcements. Saved announcements, the selection and the volume belong to each user and follow them across devices; those of the Customizable TTS Card are picked up on first use. Clicking the volume value switches back to “unchanged”.
- **Remove** a speaker: ✕ button on its row. **Dissolve** a group: the “broken link” button.
- **Group volume**: shifts each speaker's volume by the same amount, keeping their differences.

## Development

```bash
npm install
npm run watch      # continuous rebuild
node demo/serve.mjs  # demo with a mock Home Assistant on http://localhost:5173
```

The card calls the `music_assistant.get_library`, `music_assistant.search`, `music_assistant.play_media`, `music_assistant.transfer_queue` and `music_assistant.play_announcement` services, as well as `media_player.join`, `media_player.unjoin` and `media_player.volume_set`.

For the play queue: `music_assistant.get_queue`, and `mass_queue.get_queue_items`, `play_queue_item`, `move_queue_item_next`, `remove_queue_item`.

Interface texts live in `src/i18n.ts` (English and French).

### Updating the inline resource

The build is not minified and stays indented: from one version to the next, only the changed lines differ. To update a resource stored inline (`data:`) without resending the whole file:

1. `npm run build`, then `node scripts/make-patch.mjs`: compares `dist/multiroom-ma-card.js` with `.deploy/deployed.js` (copy of the deployed version) and writes `.deploy/patch.json`.
2. In a Home Assistant page opened with an administrator account, run `scripts/apply-patch.browser.js` after pasting the content of `patch.json` into it. The script refuses to write if the deployed version or the result don't match the expected CRC32 checksums.
3. Copy `dist/multiroom-ma-card.js` to `.deploy/deployed.js`.
