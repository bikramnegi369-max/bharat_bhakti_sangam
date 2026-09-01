let scrollbarWidth: number | undefined;
let activeLocks = 0;
let scrollY = 0;
let originalBodyStyle = {
  overflow: "",
  position: "",
  top: "",
  left: "",
  right: "",
  width: "",
  paddingRight: "",
};
let originalHtmlOverflow = "";

const preventDefault = (e: Event) => {
  e.preventDefault();
};

export const lockBodyScroll = (): void => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  if (activeLocks === 0) {
    scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;

    if (scrollbarWidth === undefined) {
      scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    }

    originalBodyStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      paddingRight: document.body.style.paddingRight,
    };
    originalHtmlOverflow = document.documentElement.style.overflow;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Lock documentElement & body
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    // Prevent touchmove bounce on iOS/mobile touch devices
    document.addEventListener("touchmove", preventDefault, { passive: false });
  }

  activeLocks += 1;
};

export const unlockBodyScroll = (): void => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  activeLocks = Math.max(0, activeLocks - 1);

  if (activeLocks === 0) {
    document.documentElement.style.overflow = originalHtmlOverflow;
    document.body.style.overflow = originalBodyStyle.overflow;
    document.body.style.position = originalBodyStyle.position;
    document.body.style.top = originalBodyStyle.top;
    document.body.style.left = originalBodyStyle.left;
    document.body.style.right = originalBodyStyle.right;
    document.body.style.width = originalBodyStyle.width;
    document.body.style.paddingRight = originalBodyStyle.paddingRight;

    document.removeEventListener("touchmove", preventDefault);

    window.scrollTo({
      top: scrollY,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }
};

