import { useScrollTop } from "../../hooks/useScrollTop";

/**
 * Component that handles scrolling to top on route changes
 * This component doesn't render anything visible
 */
export default function ScrollToTop() {
  useScrollTop();
  return null;
}
