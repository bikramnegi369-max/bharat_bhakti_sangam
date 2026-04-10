import { SelectHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
  price?: number;
  disabled?: boolean;
}

export interface SelectFieldProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> {
  label?: string;
  error?: string;
  helperText?: string;
  success?: string;
  required?: boolean;

  options: SelectOption[];

  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  iconClassName?: string;
}
