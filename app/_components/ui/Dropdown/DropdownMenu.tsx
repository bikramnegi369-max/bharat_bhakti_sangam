import { isSelected } from "@/_lib/helpers";
import { DropdownOption } from "@/_types/Dropdown";
import clsx from "clsx";
import { getOptionStyles, menuStyles } from "./Dropdown.styles";

type Props<T> = {
  options: DropdownOption<T>[];
  selected: DropdownOption<T> | DropdownOption<T>[] | null | undefined;
  multiple: boolean;
  searchable: boolean;
  search: string;
  onSearch: (val: string) => void;
  onSelect: (option: DropdownOption<T>) => void;
  searchPlaceholder: string;
  dropdownClassName?: string;
  optionClassName?: string;
  floatingRef: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
  floatingProps: Record<string, unknown>;
};

export function DropdownMenu<T>({
  options,
  selected,
  multiple,
  searchable,
  search,
  onSearch,
  onSelect,
  searchPlaceholder,
  dropdownClassName,
  optionClassName,
  floatingRef,
  floatingStyles,
  floatingProps,
}: Props<T>) {
  return (
    <div
      ref={floatingRef}
      style={floatingStyles}
      className={clsx(menuStyles, dropdownClassName)}
      {...floatingProps}
    >
      {searchable && (
        <div className="border-b p-2">
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded border px-3 py-2 outline-none"
          />
        </div>
      )}

      <ul className="max-h-60 overflow-auto">
        {options.length === 0 && (
          <li className="px-4 py-3 text-sm text-gray-500">No options found</li>
        )}

        {options.map((option) => (
          <li
            key={String(option.value)}
            onClick={() => onSelect(option)}
            className={getOptionStyles({
              selected: isSelected(option, selected, multiple),
              disabled: option.disabled,
              className: optionClassName,
            })}
          >
            <span className="text-xs">{option.label}</span>
            {option.price !== undefined && (
              <span className="text-lg">₹{option.price}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
