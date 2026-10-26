import { css } from "lit";

export const cardStyles = css`
  :host {
    container-type: inline-size;
    --mr-radius: var(--ha-card-border-radius, 12px);
    --mr-accent: var(--primary-color, #03a9f4);
    --mr-muted: var(--secondary-text-color, #727272);
    --mr-surface: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
    --mr-divider: var(--divider-color, rgba(127, 127, 127, 0.2));
  }
  ha-card {
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px 16px 8px;
  }
  .title {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }
  .tabs {
    display: flex;
    background: var(--mr-surface);
    border-radius: 999px;
    padding: 3px;
    gap: 2px;
  }
  .tab {
    border: none;
    background: none;
    color: var(--mr-muted);
    border-radius: 999px;
    padding: 6px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font: inherit;
    font-size: 0.875rem;
  }
  .tab[aria-selected="true"] {
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }
  .tab ha-icon {
    --mdc-icon-size: 18px;
  }
  .content {
    padding: 8px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Lecture en cours */
  .now-playing {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 10px;
    border-radius: var(--mr-radius);
    background: var(--mr-surface);
    margin: 0 16px;
  }
  .art {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    background: var(--mr-divider) center / cover no-repeat;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--mr-muted);
  }
  .np-text {
    flex: 1;
    min-width: 0;
  }
  .np-title,
  .np-sub,
  .np-target {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .np-title {
    font-weight: 500;
  }
  .np-sub,
  .np-target {
    font-size: 0.85rem;
    color: var(--mr-muted);
  }
  .np-target {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .np-target ha-icon {
    --mdc-icon-size: 14px;
  }
  .controls {
    display: flex;
    align-items: center;
  }

  /* Boutons */
  .icon-btn {
    border: none;
    background: none;
    color: var(--primary-text-color);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    padding: 0;
  }
  .icon-btn:hover {
    background: var(--mr-divider);
  }
  .icon-btn.primary {
    background: var(--mr-accent);
    color: var(--text-primary-color, #fff);
  }
  .icon-btn.active {
    color: var(--mr-accent);
  }
  .icon-btn[disabled] {
    opacity: 0.4;
    cursor: default;
  }
  .btn {
    border: 1px solid var(--mr-divider);
    background: none;
    color: var(--primary-text-color);
    border-radius: 999px;
    padding: 6px 12px;
    font: inherit;
    font-size: 0.85rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .btn ha-icon {
    --mdc-icon-size: 18px;
  }
  .btn:hover {
    background: var(--mr-surface);
  }
  .btn.primary {
    background: var(--mr-accent);
    border-color: var(--mr-accent);
    color: var(--text-primary-color, #fff);
  }
  .toolbar {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  /* Groupes / enceintes */
  .group {
    border: 1px solid var(--mr-divider);
    border-radius: var(--mr-radius);
    overflow: hidden;
  }
  .group.target {
    border-color: var(--mr-accent);
    box-shadow: 0 0 0 1px var(--mr-accent);
  }
  .group-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 8px 10px 12px;
    cursor: pointer;
  }
  .group-head .art {
    width: 44px;
    height: 44px;
  }
  .group-info {
    flex: 1;
    min-width: 0;
  }
  .group-name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .group-state {
    font-size: 0.8rem;
    color: var(--mr-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .badge {
    font-size: 0.7rem;
    padding: 1px 6px;
    border-radius: 999px;
    background: var(--mr-accent);
    color: var(--text-primary-color, #fff);
    margin-left: 6px;
    vertical-align: middle;
  }
  .members {
    border-top: 1px solid var(--mr-divider);
    padding: 4px 8px 8px 12px;
  }
  .member {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 40px;
  }
  .member-name {
    width: 30%;
    min-width: 70px;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .member-name.leader {
    font-weight: 500;
  }
  .member.group-volume .member-name {
    color: var(--mr-muted);
  }
  .vol-value {
    width: 32px;
    text-align: right;
    font-size: 0.8rem;
    color: var(--mr-muted);
    font-variant-numeric: tabular-nums;
  }
  .icon-spacer {
    width: 36px;
    flex-shrink: 0;
    display: inline-flex;
    justify-content: center;
    color: var(--mr-muted);
  }
  input[type="range"] {
    flex: 1;
    min-width: 60px;
    accent-color: var(--mr-accent);
    cursor: pointer;
  }

  /* Sélecteur de membres */
  .picker {
    border-top: 1px solid var(--mr-divider);
    padding: 8px 12px 12px;
    background: var(--mr-surface);
  }
  .picker-title {
    font-size: 0.8rem;
    color: var(--mr-muted);
    margin-bottom: 6px;
  }
  .picker-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
  }
  .chip {
    border: 1px solid var(--mr-divider);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    border-radius: 999px;
    padding: 5px 10px 5px 8px;
    font: inherit;
    font-size: 0.85rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .chip ha-icon {
    --mdc-icon-size: 16px;
  }
  .chip[aria-pressed="true"] {
    background: var(--mr-accent);
    border-color: var(--mr-accent);
    color: var(--text-primary-color, #fff);
  }
  .chip[disabled] {
    opacity: 0.4;
    cursor: default;
  }
  .picker-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  /* Navigation médias */
  .target-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: var(--mr-muted);
  }
  select {
    flex: 1;
    font: inherit;
    padding: 6px 8px;
    border-radius: 8px;
    border: 1px solid var(--mr-divider);
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
  }
  .chips {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 2px;
  }
  .search-box {
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--mr-divider);
    border-radius: 999px;
    padding: 2px 6px 2px 12px;
  }
  .search-box:focus-within {
    border-color: var(--mr-accent);
  }
  .search-box input {
    flex: 1;
    border: none;
    outline: none;
    background: none;
    font: inherit;
    padding: 8px 0;
    color: var(--primary-text-color);
  }
  .section-title {
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--mr-muted);
    margin-top: 4px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 10px;
  }
  .tile {
    position: relative;
    cursor: pointer;
    min-width: 0;
  }
  .tile .art {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    border-radius: 10px;
  }
  .tile .art ha-icon {
    --mdc-icon-size: 40px;
  }
  .tile.round .art {
    border-radius: 50%;
  }
  .tile-name {
    font-size: 0.85rem;
    margin-top: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tile-sub {
    font-size: 0.75rem;
    color: var(--mr-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tile-actions {
    position: absolute;
    top: 6px;
    right: 6px;
    display: flex;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .tile:hover .tile-actions,
  .tile:focus-within .tile-actions {
    opacity: 1;
  }
  .tile-actions .icon-btn {
    width: 30px;
    height: 30px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
  }
  .tile-actions ha-icon {
    --mdc-icon-size: 18px;
  }
  .list {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 0;
    cursor: pointer;
    border-radius: 8px;
  }
  .row:hover {
    background: var(--mr-surface);
  }
  .row .art {
    width: 40px;
    height: 40px;
    border-radius: 6px;
  }
  .row-text {
    flex: 1;
    min-width: 0;
  }
  .empty {
    color: var(--mr-muted);
    text-align: center;
    padding: 24px 8px;
    font-size: 0.9rem;
  }
  .error {
    color: var(--error-color, #db4437);
    font-size: 0.85rem;
  }
  .toast {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--primary-text-color);
    color: var(--card-background-color, #fff);
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 0.85rem;
    pointer-events: none;
    white-space: nowrap;
  }

  /* File de lecture */
  .queue-head {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--mr-muted);
    font-size: 0.85rem;
  }
  .queue-title {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .queue-count {
    font-variant-numeric: tabular-nums;
  }
  .row.past {
    opacity: 0.55;
  }
  .row.current {
    cursor: default;
    background: var(--mr-surface);
    padding-left: 6px;
    padding-right: 10px;
  }
  .row.current .tile-name {
    font-weight: 500;
    color: var(--mr-accent);
  }
  .now-icon {
    color: var(--mr-accent);
    --mdc-icon-size: 20px;
  }

  /* Lancement en cours */
  .art-wrap {
    position: relative;
    flex-shrink: 0;
  }
  .art-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    background: rgba(0, 0, 0, 0.45);
    color: #fff;
  }
  .tile .art-overlay {
    border-radius: 10px;
  }
  .tile.round .art-overlay {
    border-radius: 50%;
  }
  .row .art-overlay {
    border-radius: 6px;
  }
  .tile .art-overlay ha-icon {
    --mdc-icon-size: 40px;
  }
  .busy {
    cursor: progress;
    opacity: 0.6;
  }

  /* Annonces */
  .chip.all {
    border-style: dashed;
  }
  .presets {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .preset {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    max-width: 100%;
    padding: 2px 2px 2px 10px;
    border-radius: 10px;
    background: var(--mr-surface);
    cursor: pointer;
  }
  .preset > ha-icon {
    --mdc-icon-size: 18px;
    color: var(--mr-muted);
  }
  .preset .icon-btn {
    width: 30px;
    height: 30px;
  }
  .preset .icon-btn ha-icon {
    --mdc-icon-size: 18px;
  }
  .preset-name {
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  textarea,
  .save-row input {
    box-sizing: border-box;
    width: 100%;
    font: inherit;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid var(--mr-divider);
    background: var(--mr-surface);
    color: var(--primary-text-color);
    resize: vertical;
  }
  textarea:focus,
  .save-row input:focus {
    outline: 2px solid var(--mr-accent);
    outline-offset: -1px;
  }
  .save-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .vol-label {
    min-width: 64px;
    border: none;
    background: none;
    padding: 0;
    font: inherit;
    font-size: 0.8rem;
    text-align: right;
    color: var(--mr-muted);
    cursor: pointer;
  }
  .btn[disabled] {
    opacity: 0.5;
    cursor: progress;
  }

  .spin {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Carte étroite : seul l'onglet actif garde son libellé. */
  @container (max-width: 560px) {
    .tab:not([aria-selected="true"]) span {
      display: none;
    }
  }

  @media (hover: none) {
    .tile-actions {
      opacity: 1;
    }
  }
`;
