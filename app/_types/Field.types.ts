import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export type BaseFieldProps = {
  label?: string;
  error?: string;
  helperText?: string;
  success?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
};

export interface InputProps
  extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {
  as?: "input";
}

export interface TextareaProps
  extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: "textarea";
}

export type FieldProps = InputProps | TextareaProps;
