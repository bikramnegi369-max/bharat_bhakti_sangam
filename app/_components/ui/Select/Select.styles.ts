import clsx from "clsx";

export const wrapperStyles = "relative w-full";

export const getLabelStyles = ({
  error,
  className,
}: {
  error?: string;
  className?: string;
}) =>
  clsx(
    "absolute left-3 -top-2 z-10 bg-white px-2",
    "text-[clamp(0.813rem,calc(0.741rem+0.357vw),1.063rem)] uppercase tracking-[0.25em] font-semibold",
    error ? "text-red-500" : "text-gray-500",
    className,
  );

export const getSelectStyles = ({
  error,
  className,
}: {
  error?: string;
  className?: string;
}) =>
  clsx(
    "w-full appearance-none rounded-md border bg-white",
    "px-4 pt-6 pb-3 pr-12 text-[clamp(0.688rem,calc(0.616rem+0.357vw),0.938rem)] outline-none transition-all",
    "disabled:bg-gray-100 disabled:cursor-not-allowed",
    error
      ? "border-red-500 focus:border-red-500"
      : "border-para/40 focus:border-para",
    className,
  );

export const getMessageStyles = ({
  error,
  success,
}: {
  error?: string;
  success?: string;
}) =>
  clsx(
    "mt-1 text-xs",
    error ? "text-red-500" : success ? "text-green-600" : "text-gray-500",
  );

export const iconWrapperStyles =
  "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2";
