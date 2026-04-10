import clsx from "clsx";

export const wrapperStyles = "relative w-full";

export const getFieldStyles = ({
  error,
  hasIcon,
  className,
}: {
  error?: string;
  hasIcon?: boolean;
  className?: string;
}) =>
  clsx(
    "peer w-full bg-white border rounded-md outline-none transition-all text-[clamp(0.688rem,calc(0.616rem+0.357vw),0.938rem)]",
    "px-4 pt-4 pb-3",
    hasIcon && "pr-12",
    "disabled:bg-gray-100 disabled:cursor-not-allowed",
    error
      ? "border-red-500 focus:border-red-500"
      : "border-para/40 focus:border-primary",
    "autofill:shadow-[inset_0_0_0px_1000px_white]",
    "h-[clamp(2.625rem,calc(2.393rem+1.161vw),3.438rem)]",
    className,
  );

export const getLabelStyles = ({
  error,
  className,
}: {
  error?: string;
  className?: string;
}) =>
  clsx(
    "absolute left-3 -top-2 bg-white px-2 text-[clamp(0.813rem,calc(0.741rem+0.357vw),1.063rem)] tracking-[0.25em] uppercase z-10 font-semibold",
    error ? "text-red-500" : "text-gray-500",
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
    "text-xs mt-1",
    error ? "text-red-500" : success ? "text-green-600" : "text-gray-500",
  );

export const iconButtonStyles =
  "absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center";
