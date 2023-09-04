import SsgcSlider from "./slider.component.js";

export * from "./slider.component.js";
export default SsgcSlider;

SsgcSlider.define("ssgc-slider");

declare global {
  interface HTMLElementTagNameMap {
    "ssgc-slider": SsgcSlider;
  }
}

