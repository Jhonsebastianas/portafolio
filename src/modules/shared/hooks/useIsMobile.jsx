import { theme } from "@styles/theme";
import { useState, useEffect } from "react";
import useIsClient from "@hooks/useIsClient";

function useIsMobile(breakpoint = theme.breakpoints.mobile) {
  const isClient = useIsClient();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!isClient) return;

    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isClient, breakpoint]);

  return isMobile;
}

export default useIsMobile;
