import { DropdownOption } from "@/_types/Dropdown";

export function isSelected<T>(
  option: DropdownOption<T>,
  selected: DropdownOption<T>[] | DropdownOption<T> | null | undefined,
  multiple: boolean,
) {
  if (multiple) {
    return (
      Array.isArray(selected) &&
      selected.some((item) => item.value === option.value)
    );
  }

  return !Array.isArray(selected) && selected?.value === option.value;
}
