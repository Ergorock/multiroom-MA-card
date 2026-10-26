# Multiroom Card

Une carte Lovelace pour piloter des enceintes multiroom via [Music Assistant](https://music-assistant.io/).

- **Enceintes** : voir toutes les enceintes et ce qu'elles jouent, régler le volume (par enceinte ou pour tout le groupe), couper le son.
- **Groupes** : ajouter ou retirer des enceintes d'un groupe, dissoudre un groupe, tout grouper ou tout dégrouper en un clic.
- **Transfert** : déplacer la file de lecture (et le morceau en cours) d'une enceinte ou d'un groupe vers une autre.
- **Favoris** : parcourir les playlists, albums, artistes, radios et titres favoris de Music Assistant.
- **Recherche** : chercher dans toutes les sources connectées à Music Assistant.
- Lecture immédiate, « lire ensuite » ou « ajouter à la file » sur l'enceinte (ou le groupe) active.
- **Annonces** : diffuser un message vocal sur une sélection d'enceintes (ou « Partout »), avec des annonces enregistrées réutilisables ; la musique reprend ensuite.

## Installation

### HACS (dépôt personnalisé)

1. HACS → menu ⋮ → *Dépôts personnalisés* → ajoutez l'URL du dépôt, catégorie **Dashboard**.
2. Installez **Multiroom Card**, puis rechargez le navigateur.

### Manuelle

1. Lancez `npm install` puis `npm run build`.
2. Copiez `dist/multiroom-card.js` dans `config/www/multiroom-card.js`.
3. *Paramètres → Tableaux de bord → ⋮ → Ressources* : ajoutez `/local/multiroom-card.js` (type *Module JavaScript*).

## Configuration

La carte s'ajoute depuis l'éditeur visuel (« Multiroom Card »). Sans configuration, elle trouve d'elle-même toutes les enceintes Music Assistant.

```yaml
type: custom:multiroom-card
title: Multiroom
entities:            # facultatif, sinon toutes les enceintes Music Assistant
  - media_player.beam
  - media_player.era_100
  - media_player.pallier_2
  - media_player.play
favorite_types: [playlist, album, artist, radio, track]
default_tab: speakers    # speakers | favorites | search
show_unavailable: false
config_entry_id: 01KK…   # facultatif, voir plus bas
tts_engine: tts.google_translate_fr_com   # facultatif, sinon premier moteur tts.*
announce_volume: 35      # volume d'annonce par défaut (0-100)
announcements:           # annonces fixes, en plus de celles enregistrées depuis la carte
  - name: À table
    message: À table, le repas est prêt !
    icon: mdi:silverware-fork-knife
```

| Option | Description | Défaut |
| --- | --- | --- |
| `title` | Titre de la carte | — |
| `entities` | Lecteurs `media_player` de Music Assistant à afficher | détection automatique |
| `favorite_types` | Types de favoris proposés (`playlist`, `album`, `artist`, `track`, `radio`, `podcast`, `audiobook`) | playlist, album, artist, radio, track |
| `default_tab` | Onglet ouvert au chargement | `speakers` |
| `show_unavailable` | Afficher les enceintes indisponibles | `false` |
| `config_entry_id` | Instance Music Assistant | détection automatique |
| `tts_engine` | Moteur de synthèse vocale des annonces | premier `tts.*` trouvé |
| `announce_volume` | Volume d'annonce par défaut (0-100) ; le réglage fait depuis la carte prime | volume inchangé |
| `announcements` | Annonces fixes (`name`, `message`, `icon`) | — |

> La détection automatique de l'instance Music Assistant demande un compte **administrateur**. Pour les autres comptes, renseignez `config_entry_id` (choisissez l'instance dans l'éditeur visuel).

## Utilisation

- **Enceinte active** : un clic sur l'en-tête d'un groupe le désigne comme cible. Le bandeau du haut, les favoris et la recherche jouent sur cette enceinte (ou ce groupe).
- **Grouper** : le bouton <kbd>enceintes</kbd> d'un groupe ouvre la liste des autres enceintes. Cochez ou décochez-les, puis cliquez sur *Appliquer*.
- **Transférer** : le bouton ⇥ d'un groupe qui a une file chargée propose les autres enceintes ; un clic y déplace la file et relance la lecture.
- **Annoncer** : dans l'onglet *Annonces*, choisissez les enceintes, puis ▶ sur une annonce enregistrée ou tapez un message et « Annoncer » (Ctrl+Entrée). Un clic sur une annonce remplit le message ; « Enregistrer » l'ajoute aux annonces. Les annonces enregistrées, la sélection et le volume sont propres à chaque utilisateur et suivis d'un appareil à l'autre ; ceux de la carte Annonce sont repris au premier usage. Cliquer sur la valeur du volume repasse en « inchangé ».
- **Retirer** une enceinte : bouton ✕ sur sa ligne. **Dissoudre** un groupe : bouton « maillon barré ».
- **Volume du groupe** : décale le volume de chaque enceinte du même écart, en gardant leurs différences.

## Développement

```bash
npm install
npm run watch      # rebuild en continu
node demo/serve.mjs  # démo avec un Home Assistant simulé sur http://localhost:5173
```

La carte appelle les services `music_assistant.get_library`, `music_assistant.search`, `music_assistant.play_media`, `music_assistant.transfer_queue` et `music_assistant.play_announcement`, ainsi que `media_player.join`, `media_player.unjoin` et `media_player.volume_set`.
