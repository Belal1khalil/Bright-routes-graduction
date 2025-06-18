import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function InstructorsCard({ CardInfo }) {
  // eslint-disable-next-line react/prop-types
  const { displayName, email, imageCover, jobTitle, mobile, userId } = CardInfo;

  // Generate random course count and student count for demo purposes
  const courseCount = Math.floor(Math.random() * 10) + 1;
  const studentCount = Math.floor(Math.random() * 1000) + 100;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-xl group">
      {/* Tags & Status */}
      <div className="absolute top-3 left-3 z-10 flex space-x-2">
        {Math.random() > 0.5 && (
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </span>
        )}
        {courseCount > 5 && (
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Top Rated
          </span>
        )}
      </div>

      {/* Expert Badge */}
      <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
        Expert
      </div>

      {/* Image Section */}
      <div className="relative">
        <div className="h-64 overflow-hidden">
          <img
            src={
              imageCover ||
              "https://via.placeholder.com/400x400?text=Instructor"
            }
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            alt={displayName}
            loading="lazy"
          />
        </div>

        {/* Overlay for social icons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
          <div className="flex items-center justify-center space-x-3 pb-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-500 transition-all duration-300"
            >
              <i className="fa-brands fa-facebook-f text-white"></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-500 transition-all duration-300"
            >
              <i className="fa-brands fa-twitter text-white"></i>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-500 transition-all duration-300"
            >
              <i className="fa-brands fa-linkedin-in text-white"></i>
            </a>
            {mobile && (
              <a
                href={`tel:${mobile}`}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-500 transition-all duration-300"
              >
                <i className="fa-solid fa-phone text-white"></i>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <Link to={`/instructors/${userId}`}>
          <h2 className="font-bold text-xl text-gray-800 mb-1 hover:text-primary-500 transition-colors">
            {displayName}
          </h2>
        </Link>
        <p className="text-sm text-gray-600 italic mb-4 line-clamp-1">
          {jobTitle}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center justify-center">
              <i className="fa-solid fa-book-open text-primary-500 mr-2"></i>
              <span className="font-medium">{courseCount}</span>
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">Courses</p>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="flex items-center justify-center">
              <i className="fa-solid fa-users text-primary-500 mr-2"></i>
              <span className="font-medium">{studentCount}</span>
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">Students</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            <i className="fa-solid fa-star text-xs"></i>
            <i className="fa-solid fa-star text-xs"></i>
            <i className="fa-solid fa-star text-xs"></i>
            <i className="fa-solid fa-star text-xs"></i>
            <i className="fa-solid fa-star-half-alt text-xs"></i>
          </div>
          <span className="text-xs text-gray-500 ml-1">4.8</span>
          <span className="text-xs text-gray-400 ml-1">
            ({Math.floor(Math.random() * 100) + 10} reviews)
          </span>
        </div>

        {/* Contact */}
        <div className="flex flex-col space-y-2">
          <a
            href={`mailto:${email}`}
            className="text-xs text-gray-600 hover:text-primary-500 transition-colors flex items-center"
          >
            <i className="fa-regular fa-envelope mr-1"></i> {email}
          </a>
        </div>
      </div>
    </div>
  );
}
