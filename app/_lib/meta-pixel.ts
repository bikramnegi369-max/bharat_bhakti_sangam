export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type MetaPixelParameters = Record<string, string | number | boolean | null>;

export function trackMetaPixel(
  eventName: string,
  parameters?: MetaPixelParameters,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  if (parameters) {
    window.fbq("track", eventName, parameters);
    return;
  }

  window.fbq("track", eventName);
}

export function trackMetaPixelCustom(
  eventName: string,
  parameters?: MetaPixelParameters,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return;
  }

  if (parameters) {
    window.fbq("trackCustom", eventName, parameters);
    return;
  }

  window.fbq("trackCustom", eventName);
}

export function trackMetaPixelPageView() {
  trackMetaPixel("PageView");
}
