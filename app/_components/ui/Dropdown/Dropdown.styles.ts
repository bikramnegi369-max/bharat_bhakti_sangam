import clsx from "clsx";

export const wrapperStyles = "relative w-full";

export const getTriggerStyles = ({ className }: { className?: string }) =>
  clsx(
    "flex w-full items-center justify-between rounded-md border  px-4 py-3 text-left bg-white",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "border-para/40 focus:border-primary",
    "h-[clamp(2.625rem,calc(2.393rem+1.161vw),3.438rem)]",
    className,
  );

export const getOptionStyles = ({
  selected,
  disabled,
  className,
}: {
  selected: boolean;
  disabled?: boolean;
  className?: string;
}) =>
  clsx(
    "flex cursor-pointer items-center justify-between px-4 py-3",
    selected ? "bg-primary" : "hover:bg-primary/75",
    disabled && "cursor-not-allowed opacity-50",
    "h-[clamp(2.625rem,calc(2.393rem+1.161vw),3.438rem)]",
    className,
  );

export const menuStyles =
  "z-50 overflow-hidden rounded-md border bg-white shadow-lg";

export const tagStyles =
  "inline-flex items-center gap-1 rounded border px-2 py-1 text-sm";
