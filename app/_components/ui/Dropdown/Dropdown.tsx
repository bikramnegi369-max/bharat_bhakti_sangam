"use client";

import { useControllableState } from "@/_hooks/useControllableState";
import { getLabelStyles } from "@/_components/ui/Field/Field.styles";
import { DropdownOption, DropdownProps } from "@/_types/Dropdown";
import { useMemo, useState } from "react";
import { wrapperStyles } from "./Dropdown.styles";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownTrigger } from "./DropdownTrigger";
import { useDropdown } from "./useDropdown";

export function Dropdown<T>({
  options,
  placeholder = "Select option",
  searchable = false,
  disabled = false,
  multiple = false,
  value,
  defaultValue,
  onChange,
  className,
  dropdownClassName,
  optionClassName,
  searchPlaceholder = "Search...",
  label,
  labelClassName,
  error,
}: DropdownProps<T>) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useControllableState({
    value,
    defaultValue,
    onChange,
  } as Parameters<
    typeof useControllableState<DropdownOption<T> | DropdownOption<T>[] | null>
  >[0]);

  const { refs, floatingStyles, getReferenceProps, getFloatingProps } =
    useDropdown(open, setOpen);

  const filteredOptions = useMemo(() => {
    if (!searchable || !search.trim()) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search, searchable]);

  const handleSelect = (option: DropdownOption<T>) => {
    if (option.disabled) return;
    if (multiple) {
      const current = Array.isArray(selected) ? selected : [];
      const exists = current.some((item) => item.value === option.value);
      const updated = exists
        ? current.filter((item) => item.value !== option.value)
        : [...current, option];
      setSelected(updated as DropdownOption<T> | DropdownOption<T>[] | null);
    } else {
      setSelected(option as DropdownOption<T> | DropdownOption<T>[] | null);
      setOpen(false);
    }
  };

  const handleRemoveTag = (option: DropdownOption<T>) => {
    if (!multiple) return;
    const current = Array.isArray(selected) ? selected : [];
    setSelected(
      current.filter((item) => item.value !== option.value) as
        | DropdownOption<T>
        | DropdownOption<T>[]
        | null,
    );
  };

  return (
    <div className={wrapperStyles}>
      {label && (
        <label className={getLabelStyles({ error, className: labelClassName })}>
          {label}
        </label>
      )}

      <DropdownTrigger
        selected={selected}
        placeholder={placeholder}
        multiple={multiple}
        disabled={disabled}
        className={className}
        triggerRef={refs.setReference}
        onRemoveTag={handleRemoveTag}
        triggerProps={getReferenceProps() as Record<string, unknown>}
        open={open}
      />

      {open && (
        <DropdownMenu
          options={filteredOptions}
          selected={selected}
          multiple={multiple}
          searchable={searchable}
          search={search}
          onSearch={setSearch}
          onSelect={handleSelect}
          searchPlaceholder={searchPlaceholder}
          dropdownClassName={dropdownClassName}
          optionClassName={optionClassName}
          floatingRef={refs.setFloating}
          floatingStyles={floatingStyles}
          floatingProps={getFloatingProps() as Record<string, unknown>}
        />
      )}
    </div>
  );
}
