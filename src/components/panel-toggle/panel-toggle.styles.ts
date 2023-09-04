import { css } from "lit";
import componentStyles from "../../styles/component.styles.js";

export default css`
  ${componentStyles}

  :host {
    display: inline-block;
    --height: var(--ssgc-toggle-size-medium);
    --thumb-size: calc(var(--ssgc-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--ssgc-input-font-size-medium);
  }
  :host([size="small"]) {
    --height: var(--ssgc-toggle-size-small);
    --thumb-size: calc(var(--ssgc-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--ssgc-input-font-size-small);
  }

  :host([size="medium"]) {
    --height: var(--ssgc-toggle-size-medium);
    --thumb-size: calc(var(--ssgc-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--ssgc-input-font-size-medium);
  }

  :host([size="large"]) {
    --height: var(--ssgc-toggle-size-large);
    --thumb-size: calc(var(--ssgc-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--ssgc-input-font-size-large);
  }

  .panel-toggle {
    display: grid;
    grid-template-areas:
      "left-label control right-label"
      "panel      panel   panel";
    grid-template-columns: 1fr min-content 1fr;
  }
  .right-label,
  .left-label {
    font-size: var(--height);
  }
  .left-label {
    grid-area: left-label;
    text-align: right;
  }
  .right-label {
    grid-area: right-label;
  }
  .control {
    grid-area: control;
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--ssgc-color-neutral-400);
    border: solid var(--ssgc-input-border-width) var(--ssgc-color-neutral-400);
    border-radius: var(--height);
    transition: var(--ssgc-transition-fast) border-color,
      var(--ssgc-transition-fast) backgrou5d-color;
    margin-left: calc(var(--height) * 0.5);
    margin-right: calc(var(--height) * 0.5);
  }
  .switch-thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--ssgc-color-neutral-0);
    border-radius: 50%;
    border: solid var(--ssgc-input-border-width) var(--ssgc-color-neutral-400);
    transition: var(--ssgc-transition-fast) translate ease,
      var(--ssgc-transition-fast) background-color,
      var(--ssgc-transition-fast) border-color,
      var(--ssgc-transition-fast) box-shadow;
  }
  .panel-toggle.left .switch-thumb {
    translate: calc((var(--width) - var(--height)) / -2);
  }
  .panel-toggle.right .switch-thumb {
    translate: calc((var(--width) - var(--height)) / 2);
  }
  .left-panel {
    grid-area: panel;
  }
  .right-panel {
    grid-area: panel;
  }
`;
