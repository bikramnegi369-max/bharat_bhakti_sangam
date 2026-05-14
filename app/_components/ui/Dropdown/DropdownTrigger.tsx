import { DropdownOption } from "@/_types/Dropdown";
import clsx from "clsx";
import { ChevronDown, X } from "lucide-react";
import { getTriggerStyles, tagStyles } from "./Dropdown.styles";

type Props<T> = {
  selected: DropdownOption<T> | DropdownOption<T>[] | null | undefined;
  placeholder: string;
  multiple: boolean;
  disabled: boolean;
  error?: string;
  className?: string;
  triggerRef: (node: HTMLElement | null) => void;
  onRemoveTag: (option: DropdownOption<T>) => void;
  triggerProps: Record<string, unknown>;
  open: boolean;
  listboxId: string;
};

export function DropdownTrigger<T>({
  selected,
  placeholder,
  multiple,
  disabled,
  error,
  className,
  triggerRef,
  onRemoveTag,
  triggerProps,
  open,
  listboxId,
}: Props<T>) {
  const displayValue = () => {
    if (multiple) {
      const vals = Array.isArray(selected) ? selected : [];
      if (!vals.length) return placeholder;

      return (
        <div className="flex flex-wrap gap-2">
          {vals.map((item) => (
            <span key={String(item.value)} className={tagStyles}>
              {item.label}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveTag(item);
                }}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      );
    }

    if (!Array.isArray(selected) && selected) {
      return (
        <div className="flex items-center justify-between w-full pr-2 text-[clamp(0.688rem,calc(0.616rem+0.357vw),0.938rem)]">
          <span>{selected.label}</span>
          {selected.price !== undefined && <span>₹{selected.price}</span>}
        </div>
      );
    }

    return placeholder;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      (triggerProps.onClick as React.EventHandler<React.SyntheticEvent>)?.(e);
    }
  };

  return (
    <div
      ref={triggerRef}
      tabIndex={disabled ? -1 : 0}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-disabled={disabled}
      aria-controls={open ? listboxId : undefined}
      onKeyDown={handleKeyDown}
      className={clsx(
        getTriggerStyles({ className }),
        error && "border-red-500! focus-within:ring-red-500",
        disabled && "pointer-events-none opacity-50",
      )}
      {...triggerProps}
    >
      <div className="flex-1 truncate text-para/80">{displayValue()}</div>
      <ChevronDown
        size={18}
        className={clsx("transition-transform", open && "rotate-180")}
      />
    </div>
  );
}
