export type TagsFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  required?: boolean;

  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;

  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;

  maxTags?: number;
  maxTagLength?: number;
  allowDuplicates?: boolean;
};
