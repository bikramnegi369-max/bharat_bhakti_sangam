import { useState } from "react";

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue?: T;
  onChange?: (val: T) => void;
}) {
  const [internal, setInternal] = useState<T | undefined>(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internal;

  const setValue = (val: T) => {
    if (!isControlled) setInternal(val);
    onChange?.(val);
  };

  return [currentValue, setValue] as const;
}
