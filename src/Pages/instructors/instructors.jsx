import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/loading";
import { Pagination } from "antd";
import InstructorsCard from "../../Components/instructorss/instructors";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(20);

  async function GetInstructors(pageIndex) {
    setIsLoading(true);
    try {
      const options = {
        url: "https://brightminds.runasp.net/api/Instructor",
        method: "GET",
        params: {
          pageSize: 8,
          pageIndex,
        },
      };
      const response = await axios.request(options);
      setInstructors(response.data.data.items);
      setTotal(response.data.data.totalCount || 20);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetInstructors(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Meet Our Expert Instructors | Bright-Routes</title>
        <meta
          name="description"
          content="Learn from industry-leading professionals with years of experience. Discover our expert instructors and start your learning journey today."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Expert Instructors
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Learn from industry-leading professionals with years of real-world
              experience
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary-500">50+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary-500">100+</div>
              <div className="text-gray-600">Courses</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary-500">10k+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-primary-500">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center mb-2">
            Our Instructors
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Discover our talented team of instructors who are passionate about
            sharing their knowledge and expertise with you.
          </p>
        </div>

        {instructors.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">
              No instructors found
            </h3>
            <p className="text-gray-600">Please try again later</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {instructors.map((instructor) => (
              <InstructorsCard CardInfo={instructor} key={instructor.userId} />
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Pagination
            current={currentPage}
            onChange={setCurrentPage}
            total={total}
            pageSize={8}
            showSizeChanger={false}
          />
        </div>
      </div>

      {/* Join Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to Become an Instructor?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-300">
            Join our team of expert instructors and share your knowledge with
            thousands of eager students around the world.
          </p>
          <Link
            to="/contact"
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
          >
            Apply to Teach
          </Link>
        </div>
      </div>
    </>
  );
}
