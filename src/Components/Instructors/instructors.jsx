import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/loading";
import InstructorCard from "../Instructor/InstructorCard";
import { Link } from "react-router-dom";

export default function Instructors() {
  async function GetPopularInstruc() {
    const options = {
      url: "https://brightminds.runasp.net/api/Instructor",
      method: "get",
      params: {
        PageSize: 5,
        pageIndex: 3,
      },
    };
    return await axios.request(options);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["instructors"],
    queryFn: GetPopularInstruc,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 py-16 rounded-3xl my-8">
        <div className="container mx-auto px-4">
          <div>
            <h1 className="text-center text-2xl uppercase text-primary-500 font-semibold">
              Our Instructors
            </h1>
            <div className="w-16 h-0.5 bg-primary-500 mx-auto mt-2"></div>
            <div className="w-12 h-0.5 bg-primary-500 mx-auto mt-1"></div>
          </div>

          <h1 className="text-4xl text-center mt-3 mb-8 font-bold">
            Learn From{" "}
            <span className="text-primary-500">Expert Instructors</span>
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Our instructors are industry leaders with years of real-world
            experience, committed to providing you with cutting-edge knowledge
            and practical skills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-4">
            {data.data.data.items.map((item) => (
              <InstructorCard itemInfo={item} key={item._id} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/instructors"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition-all duration-300 shadow-md hover:shadow-lg"
            >
              View All Instructors
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
