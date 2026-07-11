export {};

declare global {
  interface Window {
    HCPWidget?: { openModal: () => void };
  }
}
