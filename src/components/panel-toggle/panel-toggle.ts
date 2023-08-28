import SsgcPanelToggle from "./panel-toggle.component.js";

export * from "./panel-toggle.component.js";
export default SsgcPanelToggle;

SsgcPanelToggle.define("ssgc-panel-toggle");

declare global {
  interface HTMLElementTagNameMap {
    "ssgc-panel-toggle": SsgcPanelToggle;
  }
}
