import { theme } from "@styles/theme";
import { useState, useEffect } from "react";

function useIsMobile(breakpoint = theme.breakpoints.mobile) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}
export default useIsMobile;
