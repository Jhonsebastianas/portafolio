import { useMediaQuery } from "react-responsive";
import { theme } from "@styles/theme";

function useIsMobile(breakpoint = theme.breakpoints.mobile) {
  const isMobile = useMediaQuery({ maxWidth: breakpoint });
  return isMobile;
}

export default useIsMobile;
