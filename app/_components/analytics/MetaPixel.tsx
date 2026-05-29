import { Suspense } from "react";
import { META_PIXEL_ID } from "@/_lib/meta-pixel";
import { MetaPixelPageViewTracker } from "./MetaPixelPageViewTracker";

export function MetaPixel() {
  if (!META_PIXEL_ID) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <MetaPixelPageViewTracker />
    </Suspense>
  );
}
