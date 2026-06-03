import { useState, useEffect } from "react";

export function useLocalStorage(key, defaultValue = null) {
  const [state, setState] = useState(() => JSON.parse(localStorage.getItem(key)) ?? defaultValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
