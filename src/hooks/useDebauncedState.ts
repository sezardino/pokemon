import { useEffect, useState } from "react";

export const useDebouncedState = <T>(initialValue: T, delay: number) => {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return [debouncedValue, setValue, value] as [
    T,
    React.Dispatch<React.SetStateAction<T>>,
    T
  ];
};
