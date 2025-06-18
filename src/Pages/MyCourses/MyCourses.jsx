import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination, Empty } from "antd";
import CourseItem from "../../Components/Courses/Courseitem";
import Loading from "../../Components/Loading/loading";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

// Custom course item component for My Courses page without "Add to Cart" button
function MyCoursesItem({ CourseInfo }) {
  const {
    id,
    name,
    price,
    updatedDate,
    pictureUrl,
    instructorName,
    description,
    categoryName,
    level,
    rate,
  } = CourseInfo;

  const [courseDetails, setCourseDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Format date to more readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Fetch additional course details from the API
  useEffect(() => {
    async function fetchCourseDetails() {
      if (!id) return;

      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://brightminds.runasp.net/api/Course/${id}`
        );
        if (response.data) {
          setCourseDetails(response.data);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourseDetails();
  }, [id]);

  // Use actual data or fallbacks
  const displayLevel = level || courseDetails?.level || "All Levels";
  const sectionCount = courseDetails?.sections?.length || 0;
  const lessonCount =
    courseDetails?.totalLessons || (sectionCount > 0 ? sectionCount * 3 : 5);
  const students = courseDetails?.enrollmentCount || 0;
  const rating = rate || courseDetails?.rate || 4.5;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img
          src={pictureUrl}
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
        />

        {/* Level Badge */}
        <div className="absolute top-3 left-3 bg-white bg-opacity-90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
          {displayLevel}
        </div>

        {/* Price Tag */}
        <div className="absolute top-3 right-3 bg-green-500 text-white font-bold px-3 py-1 rounded-full text-sm">
          Enrolled
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 flex items-end justify-center">
          <div className="mb-4">
            <Link
              to={`/course/${id}`}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium flex items-center transition-colors"
            >
              <i className="fa-solid fa-play-circle mr-1"></i> Continue Learning
            </Link>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Category & Instructor */}
        <div className="flex flex-wrap items-center justify-between mb-2">
          <span className="text-sm text-primary-600 font-medium">
            <i className="fa-solid fa-user-tie mr-1"></i> {instructorName}
          </span>
          {categoryName && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {categoryName}
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={`/course/${id}`}>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-primary-500 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">{description}</p>

        {/* Stats */}
        <div className="flex items-center text-sm text-gray-500 mb-3 gap-3">
          {sectionCount > 0 && (
            <div className="flex items-center">
              <i className="fa-solid fa-layer-group text-primary-400 mr-1"></i>{" "}
              {sectionCount} sections
            </div>
          )}
          <div className="flex items-center">
            <i className="fa-solid fa-book text-primary-400 mr-1"></i>{" "}
            {lessonCount} lessons
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-users text-primary-400 mr-1"></i>{" "}
            {students} students
          </div>
        </div>

        {/* Divider */}
        <div className="border-b my-3"></div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-1">
          {/* Rating */}
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-1">
              <i className="fa-solid fa-star"></i>
            </div>
            <span className="text-sm">{rating?.toFixed(1) || "N/A"}</span>
          </div>

          {/* Last Updated */}
          <div className="text-xs text-gray-500">
            Updated {formatDate(updatedDate)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const pageSize = 12;

  async function getMyCourses(pageIndex) {
    setIsLoading(true);
    try {
      const options = {
        url: `https://brightminds.runasp.net/api/Course/usercourses`,
        method: "GET",
        params: {
          pageSize: pageSize,
          pageIndex: pageIndex,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { data } = await axios.request(options);

      if (data && data.data) {
        setMyCourses(data.data.items || []);
        setTotalCourses(data.data.totalCount || 0);
      }
    } catch (error) {
      console.error("Error fetching user courses:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMyCourses(currentPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <Helmet>
        <title>My Courses | Learning Dashboard</title>
        <meta
          name="description"
          content="Access your enrolled courses and continue your learning journey."
        />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">My Learning Dashboard</h1>
          <p className="text-lg opacity-90">
            Continue your learning journey and track your progress
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="min-h-[400px] flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <>
              {myCourses.length === 0 ? (
                <div className="bg-white p-10 rounded-lg shadow-sm text-center min-h-[400px] flex flex-col justify-center items-center">
                  <Empty
                    description={
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          No courses yet
                        </h3>
                        <p className="text-gray-600 mb-4">
                          You haven't purchased any courses yet.
                        </p>
                      </div>
                    }
                  />
                  <a
                    href="/courses"
                    className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Explore Courses
                  </a>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Your Learning Journey
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {myCourses.map((course) => (
                      <MyCoursesItem key={course.id} CourseInfo={course} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalCourses > pageSize && (
                    <div className="mt-8 flex justify-center">
                      <Pagination
                        current={currentPage}
                        onChange={(page) => setCurrentPage(page)}
                        total={totalCourses}
                        pageSize={pageSize}
                        showSizeChanger={false}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
