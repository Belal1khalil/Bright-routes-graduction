import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import GeminiChat from "../GeminiChat/GeminiChat";

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="container min-h-[75vh] pt-20 pb-10">
        <Outlet />
      </div>
      <Footer />
      <GeminiChat />
    </>
  );
}
