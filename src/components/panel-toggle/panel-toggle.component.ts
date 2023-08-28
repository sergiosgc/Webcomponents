import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { watch } from "../../internal/watch.js";
import SsgcElement from "../../internal/ssgc-element.js";
import styles from "./panel-toggle.styles.js";
import type { CSSResultGroup } from "lit";

/**
 * @summary Skeletons are used to provide a visual representation of where content will eventually be drawn.
 * @documentation https://shoelace.style/components/skeleton
 * @status stable
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 * @csspart indicator - The skeleton's indicator which is responsible for its color and animation.
 *
 * @cssproperty --border-radius - The skeleton's border radius.
 * @cssproperty --color - The color of the skeleton.
 * @cssproperty --sheen-color - The sheen color when the skeleton is in its loading state.
 */
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
  /*
  private _basePart: HTMLElement | null = null;
  basePart(anyChild: HTMLElement): HTMLElement {
    if (this._basePart == null) {
      this._basePart = document.evaluate(
        "(.//ancestor::div[contains(@class, 'panel-toggle')])[position() = last()]",
        anyChild,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE
      ).singleNodeValue as HTMLElement;
    }
    return this._basePart as HTMLElement;
  }
*/
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
