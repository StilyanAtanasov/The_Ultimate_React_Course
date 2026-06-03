import { useEffect } from "react";

export function useKeydown(key, keyAction, callback) {
  useEffect(() => {
    function handleKeyAction(e) {
      if (e.code === key) callback();
    }

    window.addEventListener(keyAction, handleKeyAction);

    return () => window.removeEventListener(keyAction, handleKeyAction);
  }, [key, keyAction, callback]);
}
