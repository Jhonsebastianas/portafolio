import { useEffect, useState } from "react";

/**
 * Hook que devuelve true solo cuando el componente se renderiza en cliente.
 * En servidor (SSR) devuelve false.
 */
function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Se activa solo después del primer render en cliente
  }, []);

  return isClient;
}

export default useIsClient;
