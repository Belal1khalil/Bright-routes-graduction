import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/Cart.Context";
import toast from "react-hot-toast";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function CourseItem({ CourseInfo }) {
  // Destructure the course information dynamically
  // eslint-disable-next-line react/prop-types
  const {
    id,
    name,
    price,
    updatedDate,
    pictureUrl,
    instructorName,
    createdDate,
    description,
    categoryName,
    level,
    rate,
  } = CourseInfo;

  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let { addCourseToCart, CourseInfo: cartInfo } = useContext(CartContext);

  // Check if course is already in cart
  const isInCart = cartInfo?.data?.items?.some((item) => item.courseId === id);

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

  const handleAddToCart = async () => {
    if (isInCart) {
      toast.error("This course is already in your cart!");
      return;
    }

    setIsAdding(true);
    await addCourseToCart({ courseId: id, courseName: name });
    setIsAdding(false);
  };

  const handleCourseClick = () => {
    window.scrollTo(0, 0);
    navigate(`/course/${id}`);
  };

  // Use actual data or fallbacks
  const displayLevel = level || courseDetails?.level || "All Levels";
  const sectionCount = courseDetails?.sections?.length || 0;
  const lessonCount =
    courseDetails?.totalLessons || (sectionCount > 0 ? sectionCount * 3 : 5); // Estimate if not available
  const students = courseDetails?.enrollmentCount || 0;
  const rating = rate || courseDetails?.rate || 4.5;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md group">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={pictureUrl}
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
        />

        {/* Price Tag */}
        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full text-sm">
          ${price}
        </div>

        {/* Level Badge */}
        <div className="absolute top-3 left-3 bg-white bg-opacity-90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
          {displayLevel}
        </div>

        {/* Overlay with Quick Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleAddToCart}
              disabled={isAdding || isInCart}
              className={`px-3 py-1.5 rounded-lg text-white font-medium text-sm flex items-center ${
                isInCart
                  ? "bg-green-500"
                  : "bg-primary-500 hover:bg-primary-600"
              } transition-colors`}
            >
              {isAdding ? (
                <i className="fa-solid fa-spinner fa-spin mr-1"></i>
              ) : isInCart ? (
                <>
                  <i className="fa-solid fa-check mr-1"></i> Added
                </>
              ) : (
                <>
                  <i className="fa-solid fa-cart-plus mr-1"></i> Add to Cart
                </>
              )}
            </button>

            <button
              onClick={handleCourseClick}
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-800 text-white rounded-lg text-sm font-medium flex items-center transition-colors"
            >
              <i className="fa-solid fa-eye mr-1"></i> Details
            </button>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-5">
        {/* Category & Instructor */}
        <div className="flex flex-wrap items-center justify-between mb-2">
          <span className="text-sm text-primary-600 font-medium flex items-center">
            <i className="fa-solid fa-user-tie mr-1"></i> {instructorName}
          </span>
          {categoryName && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {categoryName}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={handleCourseClick}
          className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-primary-500 transition-colors cursor-pointer"
        >
          {name}
        </h3>

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
          {students > 0 && (
            <div className="flex items-center">
              <i className="fa-solid fa-users text-primary-400 mr-1"></i>{" "}
              {students} students
            </div>
          )}
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
