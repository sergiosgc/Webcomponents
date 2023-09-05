import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { watch } from "../../internal/watch.js";
import SsgcElement from "../../internal/ssgc-element.js";
import styles from "./panel-toggle.styles.js";
import type { CSSResultGroup } from "lit";

export default class SsgcPanelToggle extends SsgcElement {
  static styles: CSSResultGroup = styles;

  @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";
  @property({ type: Boolean, reflect: true }) right = false;
  get left(): boolean {
    return !this.right;
  }
  set left(v: boolean) {
    this.right = !v;
  }

  @query("div.panel-toggle") basePart: HTMLDivElement;
  @query("div.left-panel") leftPanel: HTMLDivElement;
  @query("div.right-panel") rightPanel: HTMLDivElement;

  firstUpdated() {
    this.handleRightChange();
  }
  @watch("right", { waitUntilFirstUpdate: true })
  handleRightChange() {
    const visibleDisplay =
      window.getComputedStyle(this.leftPanel).display == "none"
        ? window.getComputedStyle(this.rightPanel).display
        : window.getComputedStyle(this.leftPanel).display;
    if (this.right) {
      this.basePart.classList.add("right");
      this.basePart.classList.remove("left");
      this.leftPanel.style.display = "none";
      this.rightPanel.style.display = visibleDisplay;
    } else {
      this.basePart.classList.remove("right");
      this.basePart.classList.add("left");
      this.leftPanel.style.display = visibleDisplay;
      this.rightPanel.style.display = "none";
    }
  }
  handleClick(ev: MouseEvent) {
    this.right = !this.right;
    ev.preventDefault();
    ev.stopPropagation();
  }
  render() {
    return html`
      <div
        part="base"
        class=${classMap({
          "panel-toggle": true,
        })}
      >
        <span part="left-label" class="left-label"
          ><slot name="left-label">Left</slot></span
        >
        <a href="#" part="control" class="control" @click=${this.handleClick}
          ><span part="thumb" class="switch-thumb"></span
        ></a>
        <span part="right-label" class="right-label"
          ><slot name="right-label">Right</slot></span
        >
        <div part="left-panel" class="left-panel">
          <slot name="left-panel">Left content</slot>
        </div>
        <div part="right-panel" class="right-panel">
          <slot name="right-panel">Right content</slot>
        </div>
      </div>
    `;
  }
}
