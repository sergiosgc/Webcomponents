export type SsgcChangeEvent = CustomEvent<{value: number}>;

declare global {
  interface GlobalEventHandlersEventMap {
    'ssgc-change': SsgcChangeEvent;
  }
}
