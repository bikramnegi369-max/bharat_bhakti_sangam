let scrollbarWidth: number | undefined;

export const lockBodyScroll = (): void => {
  if (typeof window === "undefined") return;

  if (scrollbarWidth === undefined) {
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  }

  const bodyStyle = document.body.style;

  if (document.body.scrollHeight > window.innerHeight) {
    bodyStyle.paddingRight = `${scrollbarWidth}px`;
  }

  bodyStyle.overflow = "hidden";
};

export const unlockBodyScroll = (): void => {
  const bodyStyle = document.body.style;
  bodyStyle.overflow = "";
  bodyStyle.paddingRight = "";
};
