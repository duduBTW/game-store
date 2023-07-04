import { useCallback, useState } from "react";

type Action<T> = {
  add: (newValue: T) => void;
  delete: (valueToDelete: T) => void;
};

type Return<T> = [Omit<Set<T>, "delete" | "add">, Action<T>];

function useSet<T>(): Return<T> {
  const [set, setSet] = useState(new Set<T>());

  const action = {
    add: useCallback((newValue: T) => {
      setSet((prev) => {
        const copy = new Set(prev);
        copy.add(newValue);

        return copy;
      });
    }, []),
    delete: useCallback((valueToDelete: T) => {
      setSet((prev) => {
        const copy = new Set(prev);
        copy.delete(valueToDelete);
        return copy;
      });
    }, []),
  };

  return [set, action];
}

export default useSet;
