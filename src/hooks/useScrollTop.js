import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook that scrolls the window to the top when the route changes
 */
export const useScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use smooth scrolling for a better UX
    });
  }, [pathname]);
};
