export type DropdownOption<T = string> = {
  label: string;
  value: T;
  disabled?: boolean;
  price?: number;
};

type BaseProps<T> = {
  options: DropdownOption<T>[];
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  searchPlaceholder?: string;
  label?: string;
  labelClassName?: string;
  error?: string;
};

type SingleDropdownProps<T> = BaseProps<T> & {
  multiple?: false;
  value?: DropdownOption<T> | null;
  defaultValue?: DropdownOption<T> | null;
  onChange?: (option: DropdownOption<T> | null) => void;
};

type MultiDropdownProps<T> = BaseProps<T> & {
  multiple: true;
  value?: DropdownOption<T>[];
  defaultValue?: DropdownOption<T>[];
  onChange?: (option: DropdownOption<T>[]) => void;
};

export type DropdownProps<T> = SingleDropdownProps<T> | MultiDropdownProps<T>;
