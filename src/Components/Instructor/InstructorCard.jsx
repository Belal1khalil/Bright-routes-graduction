import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars, react/prop-types
export default function InstructorCard({ itemInfo }) {
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const { displayName, imageCover, jobTitle, email, userId } = itemInfo;

  return (
    <div className="relative my-4 mx-auto rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-xl group bg-white">
      {/* Badge */}
      <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
        Expert
      </div>

      {/* Image Section */}
      <div className="relative">
        <div className="h-60 overflow-hidden">
          <img
            src={
              imageCover ||
              "https://via.placeholder.com/300x400?text=Instructor"
            }
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            alt={displayName}
            loading="lazy"
          />
        </div>

        {/* Overlay for social icons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
          <div className="flex items-center justify-center space-x-3 pb-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-500 transition-all duration-300"
            >
              <i className="fa-brands fa-facebook-f text-white"></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-500 transition-all duration-300"
            >
              <i className="fa-brands fa-twitter text-white"></i>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary-500 transition-all duration-300"
            >
              <i className="fa-brands fa-linkedin-in text-white"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 text-center">
        <Link to={`/instructors/${userId}`}>
          <h2 className="font-bold text-lg text-gray-800 mb-1 hover:text-primary-500 transition-colors">
            {displayName}
          </h2>
        </Link>
        <p className="text-sm text-gray-600 italic mb-3 line-clamp-1">
          {jobTitle}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-center mb-3">
          <div className="flex text-yellow-400">
            <i className="fa-solid fa-star text-xs"></i>
            <i className="fa-solid fa-star text-xs"></i>
            <i className="fa-solid fa-star text-xs"></i>
            <i className="fa-solid fa-star text-xs"></i>
            <i className="fa-solid fa-star-half-alt text-xs"></i>
          </div>
          <span className="text-xs text-gray-500 ml-1">4.8</span>
        </div>

        {/* Contact */}
        <div className="text-xs text-gray-500 hover:text-primary-500 transition-colors">
          <a
            href={`mailto:${email}`}
            className="flex items-center justify-center"
          >
            <i className="fa-regular fa-envelope mr-1"></i> {email}
          </a>
        </div>
      </div>
    </div>
  );
}
