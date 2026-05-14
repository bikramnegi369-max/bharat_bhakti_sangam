import { useEffect, useState } from "react";

/**
 * A hook to manage the mounting and unmounting of a component with a transition.
 * It provides `isMounted` to control the component's presence in the DOM and
 * `isTransitioning` to control the animation classes.
 *
 * @param isVisible - A boolean indicating if the component should be visible.
 * @param animationMs - The duration of the transition in milliseconds.
 * @returns An object with `isMounted` and `isTransitioning` states.
 */
export function useMountTransition(isVisible: boolean, animationMs: number) {
  const [isMounted, setIsMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isVisible && !isMounted) {
      // Schedule setIsMounted asynchronously to avoid cascading renders
      requestAnimationFrame(() => setIsMounted(true));
    } else if (!isVisible && isMounted) {
      requestAnimationFrame(() => setIsTransitioning(false));
      timeoutId = setTimeout(() => setIsMounted(false), animationMs);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isVisible, isMounted, animationMs]);

  useEffect(() => {
    if (isMounted) {
      // Use a RAF to apply the transition class on the next frame
      const raf = requestAnimationFrame(() => setIsTransitioning(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [isMounted]);

  return { isMounted, isTransitioning };
}
