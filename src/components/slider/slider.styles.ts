import { css } from "lit";
import componentStyles from "../../styles/component.styles.js";

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
    --height: var(--ssgc-toggle-size-medium);
    --thumb-size: calc(var(--ssgc-toggle-size-medium) + 4px);
    width: 100%;

    font-size: var(--ssgc-input-font-size-medium);
  }
  :host([size="small"]) {
    --height: var(--ssgc-toggle-size-small);
    --thumb-size: calc(var(--ssgc-toggle-size-small) + 4px);

    font-size: var(--ssgc-input-font-size-small);
  }

  :host([size="medium"]) {
    --height: var(--ssgc-toggle-size-medium);
    --thumb-size: calc(var(--ssgc-toggle-size-medium) + 4px);

    font-size: var(--ssgc-input-font-size-medium);
  }

  :host([size="large"]) {
    --height: var(--ssgc-toggle-size-large);
    --thumb-size: calc(var(--ssgc-toggle-size-large) + 4px);

    font-size: var(--ssgc-input-font-size-large);
  }
  div[part="base"] {
    display: grid;
    grid-template-areas:
     "min-label track max-label";
    grid-template-columns: min-content 1fr min-content;
    align-items: center;
  }
  div[part="min-label"] {
    grid-area: min-label;
    min-width: 5rem;
    text-align: right;
    margin: 0 0.2rem 0 0;
    user-select: none;
  }
  div[part="max-label"] {
    grid-area: max-label;
    min-width: 5rem;
    margin: 0 0 0 0.2rem;
    user-select: none;
  }
  div[part="track"] {
    grid-area: track;
    background-repeat: repeat-y,repeat-x,repeat-y;
    background-position: left center,left center,right center;
    padding-left: 1px;
    padding-right: 1px;
    padding-top: 3px;
    padding-bottom: 3px;
    user-select: none;
  }
  div[part="track"]:focus-visible {
    outline: 1px dashed black;
  }
  div[part="indicator"] {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--ssgc-color-neutral-0);
    border-radius: 50%;
    border: solid var(--ssgc-input-border-width) var(--ssgc-color-neutral-400);
    transition: var(--sl-transition-fast) translate ease, var(--sl-transition-fast) left;
    position: relative;
  }
  div[part="valuelabel"] {
    position: absolute;
    width: calc(var(--thumb-size) * 5);
    height: calc(var(--thumb-size) * 2);
    top: calc(-1 * var(--thumb-size) * 2 - 0.3rem);
    left: calc(-1 * var(--thumb-size) * 5 / 2 + var(--thumb-size) / 2);
    z-index: 1;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-bottom: 10px;
    background-color: #ff000000;
  }
`;
