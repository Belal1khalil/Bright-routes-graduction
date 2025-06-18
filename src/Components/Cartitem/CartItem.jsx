import { useContext } from "react";
import { CartContext } from "../../Context/Cart.Context";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function CartItem({ courseinfo }) {
  // eslint-disable-next-line no-unused-vars, react/prop-types
  const {
    count,
    price,
    courseName,
    imageUrl,
    id,
    courseId,
    instructorName,
    description,
    duration,
  } = courseinfo;
  const { RemoveCoursefromCart } = useContext(CartContext);

  // Use courseId if available, otherwise use id
  const courseDetailId = courseId || id;

  // Use actual data from courseinfo when available
  // If not available in the API response, we can use defaults or omit the fields
  const rating = courseinfo.rate || 4.7;

  // Always display an instructor name, with "Instructor" as fallback
  const displayInstructorName = instructorName || "Instructor";

  // Check if these properties exist in courseinfo, otherwise don't display them
  const hasLessons = courseinfo.lessons !== undefined;
  const hasDuration = duration !== undefined;
  const hasLevel = courseinfo.level !== undefined;

  // Default level if not provided
  const level = courseinfo.level || "All Levels";

  // Format duration if available (convert minutes to hours and minutes format)
  const formattedDuration = hasDuration ? formatDuration(duration) : null;

  // Helper function to format duration
  function formatDuration(minutes) {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0 && mins > 0) {
      return `${hours}h ${mins}m`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"}`;
    } else {
      return `${mins} ${mins === 1 ? "minute" : "minutes"}`;
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 relative">
      {/* Course Image */}
      <div className="sm:w-1/4 flex-shrink-0">
        <div className="relative h-48 sm:h-36 md:h-40 rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={courseName}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold text-gray-800 px-2 py-1 rounded">
            ${price}
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="sm:w-3/4 flex flex-col justify-between">
        <div>
          <Link
            to={`/course/${courseDetailId}`}
            className="text-xl font-semibold text-gray-800 hover:text-primary-500 transition-colors line-clamp-2 mb-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent any parent handlers from being called
            }}
          >
            {courseName}
          </Link>

          {/* Instructor Tag */}
          <div className="mb-3">
            <span className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800">
              <i className="fa-solid fa-user-tie text-primary-500 mr-2"></i>
              By {displayInstructorName}
            </span>
          </div>

          {/* Level (if available) */}
          {hasLevel && (
            <div className="mb-2 text-sm text-gray-500">
              <span className="flex items-center">
                <i className="fa-solid fa-signal text-primary-500 mr-1"></i>
                {level}
              </span>
            </div>
          )}

          {/* Course Metadata */}
          {(rating || hasLessons || hasDuration) && (
            <div className="flex flex-wrap gap-3 mb-3">
              {rating && (
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                  <span>{rating}</span>
                </div>
              )}
              {hasLessons && (
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fa-solid fa-book text-gray-400 mr-1"></i>
                  <span>{courseinfo.lessons} lessons</span>
                </div>
              )}
              {hasDuration && (
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fa-regular fa-clock text-gray-400 mr-1"></i>
                  <span>{formattedDuration}</span>
                </div>
              )}
            </div>
          )}

          {/* Course Description */}
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary-500">${price}</span>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to={`/course/${id}`}
              className="inline-flex items-center justify-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent any parent handlers from being called
              }}
            >
              <i className="fa-solid fa-eye mr-1"></i>
              View
            </Link>
            <button
              onClick={() =>
                RemoveCoursefromCart({ id: id, courseName })
              }
              className="inline-flex items-center justify-center px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded transition-colors"
            >
              <i className="fa-solid fa-trash-can mr-1"></i>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
