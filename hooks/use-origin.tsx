import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''; //On verifie si window. location est disponible si c'est le cas on verifie que window.location.origin est disponible.

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return ''
  }

  return origin;
};