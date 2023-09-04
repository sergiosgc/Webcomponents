import { classMap } from "lit/directives/class-map.js";
import { html, LitElement } from "lit";
import { property , query } from "lit/decorators.js";
import { watch } from "../../internal/watch.js";
import SsgcElement from "../../internal/ssgc-element.js";
import styles from "./slider.styles.js";
import type { CSSResultGroup } from "lit";

/**
 * @summary A slider allows visual input of a bounded integer by dragging an indicator handle over a track
 * @status stable
 * @since 1.0
 *
 * @csspart base - The component's base wrapper.
 * @csspart indicator - The skeleton's indicator which is responsible for its color and animation.
 *
 * @cssproperty --border-radius - The skeleton's border radius.
 * @cssproperty --color - The color of the skeleton.
 * @cssproperty --sheen-color - The sheen color when the skeleton is in its loading state.
 */
export default class SsgcSlider extends SsgcElement {
  static styles: CSSResultGroup = styles;
  static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true};
  @property({ reflect: true, attribute: "significant-digits" }) significantDigits: number = 0;
  @property({ reflect: true }) min: number = 0;
  @property({ reflect: true }) max: number = 100;
  @property({ reflect: true }) value: number = 0;
  get valueHumanReadable() {
    const magnitude = Math.floor(Math.log10(this.value) / 3);
    if (!isFinite(magnitude)) return this.value;
    return [ /^(?<mantissa>[0-9]+?)(?:[0-9]{3})*$/.exec("" + this.value)?.groups?.mantissa ?? "", (magnitude > 5 ? '>' : ["", "k", "M", "G", "T", "P"][magnitude])].join("");
  }
  @property({ reflect: true }) minorstep: string = "1";
  get _minorstep() {
    const percent: string | null = /^(?<percent>[0-9.]+)%$/.exec(this.minorstep)?.groups?.percent ?? null;
    if (percent == null) return parseInt(this.minorstep);
    return Math.round(parseFloat(percent) / 100 * (this.max - this.min));
  }
  @property({ reflect: true }) majorstep: string = "10%";
  get _majorstep() {
    const percent: string | null = /^(?<percent>[0-9.]+)%$/.exec(this.majorstep)?.groups?.percent ?? null;
    if (percent == null) return parseInt(this.majorstep);
    return Math.round(parseFloat(percent) / 100 * (this.max - this.min));
  }
  @query("div[part='base']") base_part: HTMLDivElement;
  @query("div[part='track']") track_part: HTMLDivElement;
  @query("div[part='indicator']") indicator_part: HTMLDivElement;
  @query("div[part='valuelabel']") valuelabel_part: HTMLDivElement;

  @watch("min", { waitUntilFirstUpdate: true })
  handleMinChange() { this.handleValueChange(); }
  @watch("max", { waitUntilFirstUpdate: true })
  handleMaxChange() { this.handleValueChange(); }
  @watch("value", { waitUntilFirstUpdate: true })
  handleValueChange() {
    if (this.significantDigits > 0 && isFinite(Math.log10(this.value)) && this.significantDigits < ("" + this.value).length) {
      const valueMagnitude = Math.ceil(Math.log10(this.value));
      const newValue = Math.round(this.value / 10**(valueMagnitude - this.significantDigits)) * 10**(valueMagnitude - this.significantDigits);
      if (this.value != newValue) {
        this.value = newValue;
      }
    }
    if (this.min > this.max) [this.min, this.max] = [this.max, this.min];
    if (this.value < this.min) this.value = this.min;
    if (this.value > this.max) this.value = this.max;
    const proportion: number = (this.value - this.min) / (this.max - this.min);
    const position = (this.track_part.clientWidth - parseFloat(window.getComputedStyle(this.track_part).paddingLeft) - parseFloat(window.getComputedStyle(this.track_part).paddingRight) - this.indicator_part.offsetWidth) * proportion;
    this.indicator_part.style.position = 'relative';
    this.indicator_part.style.left = "" + position + "px";
    this.emit('ssgc-change', {detail: { value: this.value }});
  }
  handleClick(ev: MouseEvent) {
    const boundingRect = this.track_part.getBoundingClientRect();
    const clickPosition = ev.x - boundingRect.left - parseFloat(window.getComputedStyle(this.track_part).paddingLeft) - this.indicator_part.offsetWidth / 2;
    const proportion = clickPosition / (this.track_part.clientWidth - parseFloat(window.getComputedStyle(this.track_part).paddingLeft) - parseFloat(window.getComputedStyle(this.track_part).paddingRight) - this.indicator_part.offsetWidth);
    if (proportion < 0 || proportion > 1) return;
    this.value = Math.round(proportion * (this.max - this.min) + this.min);
    ev.preventDefault();
  }
  handleMouseMove(ev: MouseEvent) {
    if (ev.buttons == 1) this.handleClick(ev);
  }
  handleKeyDown(ev: KeyboardEvent) {
    if (!["ArrowLeft", "ArrowRight", "PageUp", "PageDown"].includes(ev.key) ) return;
    this.value += ( ["ArrowLeft", "PageDown" ].includes(ev.key) ? -1 : 1) * (ev.ctrlKey ? this._minorstep : this._majorstep );
    ev.preventDefault();
  }
  firstUpdated() {
     this.handleValueChange();
    }
  render() {
    let style = html``;
    if (this.track_part != null && this.valuelabel_part != null) {
      const colorMatch = /^(?:rgba|rgb)\((?<r>[0-9]+),\s*(?<g>[0-9]+),\s*(?<b>[0-9]+),\s*/.exec(window.getComputedStyle(this.valuelabel_part).backgroundColor);
      const [valueLabelBgR, valueLabelBgG, valueLabelBgB] = [ colorMatch?.groups?.r ?? "0", colorMatch?.groups?.g ?? "0", colorMatch?.groups?.b ?? "0" ];
      const base64Valuelabelbg = btoa(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
    <g>
      <path
        style="stroke-width:0;fill:rgb(${valueLabelBgR}, ${valueLabelBgG}, ${valueLabelBgB})"
        d="M 25,0 C 5,0 0,5 0,20 C 0,35 5,40 25,40 C 45,40 50,35 50,20 C 50,5 45,0 25,0 Z" />
      <path
        style="stroke-width:0;fill:rgb(${valueLabelBgR}, ${valueLabelBgG}, ${valueLabelBgB})"
        d="M 20,39 L 25,50 L 30,39  Z"/>
    </g>
</svg>
      `);
      const base64Endbg = btoa(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <svg
    width="2"
    height="10"
    viewBox="0 0 2 10"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
    <g>
      <path
        style="stroke:${window.getComputedStyle(this.track_part).color};stroke-width:2;stroke-dasharray:none;stroke-opacity:1"
        d="M 0,0 L 0,10" />
    </g>
  </svg>
      `);
      const base64Middlebg = btoa(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <svg
    width="10"
    height="2"
    viewBox="0 0 10 2"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg">
    <g>
      <path
        style="stroke:${window.getComputedStyle(this.track_part).color};stroke-width:2;stroke-dasharray:none;stroke-opacity:1"
        d="M 0,0 L 10,0" />
    </g>
  </svg>
      `);
      style = html`<style>
  div[part="track"] {
    background-image: url(data:image/svg+xml;base64,${base64Endbg}),url(data:image/svg+xml;base64,${base64Middlebg}),url(data:image/svg+xml;base64,${base64Endbg})
  }
  div[part="valuelabel"] {
    background-image: url(data:image/svg+xml;base64,${base64Valuelabelbg})
  }
</style>
      `;
    }
    return html`
        ${style}
        <div
            part="base"
            class=${classMap({
            "slider": true,
            })}
        ><div part="min-label"><slot name="min-label">${this.min}</slot></div>
        <div 
          part="track" 
          tabindex="0" 
          @keydown=${this.handleKeyDown}
          @click=${this.handleClick} 
          @mousemove=${this.handleMouseMove}><div part="indicator"><div part="valuelabel"><slot name="valuelabel">${this.valueHumanReadable}</slot></div></div></div>
        <div part="max-label"><slot name="max-label">${this.max}</slot></div>
        </div>
    `;
  }
}

