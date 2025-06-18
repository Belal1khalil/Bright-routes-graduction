import { Helmet } from "react-helmet";
import Categoryslider from "../../Components/CategorySlider/Categoryslider";
import CoursesCategories from "../../Components/Courses Categories/Courses Categories";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import Instructors from "../../Components/Instructors/instructors";
import AboutSection from "../About/AboutSection";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Helmet>
        <title>Bright-Routes | Home Page</title>
        <meta
          name="description"
          content="Discover top-quality online courses at Bright-Routes. Learn from industry experts and advance your skills from anywhere."
        />
      </Helmet>

      {/* Hero Section - Full Width */}
      <HomeSlider />

      {/* Main Content Sections */}
      <div className="overflow-hidden">
        <AboutSection />

        <div className="container mx-auto px-4 py-10">
          <CoursesCategories />
        </div>

        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <Categoryslider />
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <Instructors />
        </div>
      </div>
    </div>
  );
}
