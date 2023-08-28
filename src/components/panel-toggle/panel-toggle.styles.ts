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
  .left-label {
    grid-area: left-label;
    text-align: right;
    font-size: var(--height);
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
  .right-label {
    grid-area: right-label;
  }
  .left-panel {
    grid-area: panel;
  }
  .right-panel {
    grid-area: panel;
  }
`;

//  :host([size="small"]) {
//    --height: var(--ssgc-toggle-size-small);
//    --thumb-size: calc(var(--ssgc-toggle-size-small) + 4px);
//    --width: calc(var(--height) * 2);
//
//    font-size: var(--ssgc-input-font-size-small);
//  }
//
//  :host([size="medium"]) {
//    --height: var(--ssgc-toggle-size-medium);
//    --thumb-size: calc(var(--ssgc-toggle-size-medium) + 4px);
//    --width: calc(var(--height) * 2);
//
//    font-size: var(--ssgc-input-font-size-medium);
//  }
//
//  :host([size="large"]) {
//    --height: var(--ssgc-toggle-size-large);
//    --thumb-size: calc(var(--ssgc-toggle-size-large) + 4px);
//    --width: calc(var(--height) * 2);
//
//    font-size: var(--ssgc-input-font-size-large);
//  }
//
//  .switch {
//    position: relative;
//    display: inline-flex;
//    align-items: center;
//    font-family: var(--ssgc-input-font-family);
//    font-size: inherit;
//    font-weight: var(--ssgc-input-font-weight);
//    color: var(--ssgc-input-label-color);
//    vertical-align: middle;
//    cursor: pointer;
//  }
//
//  .switch__control {
//    flex: 0 0 auto;
//    position: relative;
//    display: inline-flex;
//    align-items: center;
//    justify-content: center;
//    width: var(--width);
//    height: var(--height);
//    background-color: var(--ssgc-color-neutral-400);
//    border: solid var(--ssgc-input-border-width) var(--ssgc-color-neutral-400);
//    border-radius: var(--height);
//    transition: var(--ssgc-transition-fast) border-color,
//      var(--ssgc-transition-fast) background-color;
//  }
//
//  .switch__control .switch__thumb {
//    width: var(--thumb-size);
//    height: var(--thumb-size);
//    background-color: var(--ssgc-color-neutral-0);
//    border-radius: 50%;
//    border: solid var(--ssgc-input-border-width) var(--ssgc-color-neutral-400);
//    translate: calc((var(--width) - var(--height)) / -2);
//    transition: var(--ssgc-transition-fast) translate ease,
//      var(--ssgc-transition-fast) background-color,
//      var(--ssgc-transition-fast) border-color,
//      var(--ssgc-transition-fast) box-shadow;
//  }
//
//  .switch__input {
//    position: absolute;
//    opacity: 0;
//    padding: 0;
//    margin: 0;
//    pointer-events: none;
//  }
//
//  /* Hover */
//  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
//    background-color: var(--ssgc-color-neutral-400);
//    border-color: var(--ssgc-color-neutral-400);
//  }
//
//  .switch:not(.switch--checked):not(.switch--disabled)
//    .switch__control:hover
//    .switch__thumb {
//    background-color: var(--ssgc-color-neutral-0);
//    border-color: var(--ssgc-color-neutral-400);
//  }
//
//  /* Focus */
//  .switch:not(.switch--checked):not(.switch--disabled)
//    .switch__input:focus-visible
//    ~ .switch__control {
//    background-color: var(--ssgc-color-neutral-400);
//    border-color: var(--ssgc-color-neutral-400);
//  }
//
//  .switch:not(.switch--checked):not(.switch--disabled)
//    .switch__input:focus-visible
//    ~ .switch__control
//    .switch__thumb {
//    background-color: var(--ssgc-color-neutral-0);
//    border-color: var(--ssgc-color-primary-600);
//    outline: var(--ssgc-focus-ring);
//    outline-offset: var(--ssgc-focus-ring-offset);
//  }
//
//  /* Checked */
//  .switch--checked .switch__control {
//    background-color: var(--ssgc-color-primary-600);
//    border-color: var(--ssgc-color-primary-600);
//  }
//
//  .switch--checked .switch__control .switch__thumb {
//    background-color: var(--ssgc-color-neutral-0);
//    border-color: var(--ssgc-color-primary-600);
//    translate: calc((var(--width) - var(--height)) / 2);
//  }
//
//  /* Checked + hover */
//  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
//    background-color: var(--ssgc-color-primary-600);
//    border-color: var(--ssgc-color-primary-600);
//  }
//
//  .switch.switch--checked:not(.switch--disabled)
//    .switch__control:hover
//    .switch__thumb {
//    background-color: var(--ssgc-color-neutral-0);
//    border-color: var(--ssgc-color-primary-600);
//  }
//
//  /* Checked + focus */
//  .switch.switch--checked:not(.switch--disabled)
//    .switch__input:focus-visible
//    ~ .switch__control {
//    background-color: var(--ssgc-color-primary-600);
//    border-color: var(--ssgc-color-primary-600);
//  }
//
//  .switch.switch--checked:not(.switch--disabled)
//    .switch__input:focus-visible
//    ~ .switch__control
//    .switch__thumb {
//    background-color: var(--ssgc-color-neutral-0);
//    border-color: var(--ssgc-color-primary-600);
//    outline: var(--ssgc-focus-ring);
//    outline-offset: var(--ssgc-focus-ring-offset);
//  }
//
//  /* Disabled */
//  .switch--disabled {
//    opacity: 0.5;
//    cursor: not-allowed;
//  }
//
//  .switch__label {
//    display: inline-block;
//    line-height: var(--height);
//    margin-inline-start: 0.5em;
//    user-select: none;
//  }
//
//  :host([required]) .switch__label::after {
//    content: var(--ssgc-input-required-content);
//    margin-inline-start: var(--ssgc-input-required-content-offset);
//  }
//
//  @media (forced-colors: active) {
//    .switch.switch--checked:not(.switch--disabled)
//      .switch__control:hover
//      .switch__thumb,
//    .switch--checked .switch__control .switch__thumb {
//      background-color: ButtonText;
//    }
//  }
//
//`;
//
