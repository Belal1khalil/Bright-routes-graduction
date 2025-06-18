import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/loading";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FeedbackForm, FeedbackList } from "../../Components/Feedback";

export default function CourseDetails() {
  const [CourseDetails, setCourseDetails] = useState(null);
  const [sectionVideos, setSectionVideos] = useState({});
  const [openItems, setOpenItems] = useState({});
  const [activeTab, setActiveTab] = useState("overview");
  const [feedbackRefreshKey, setFeedbackRefreshKey] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch Course Details
  async function getCourseDetails() {
    try {
      const options = {
        url: `https://brightminds.runasp.net/api/Course/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);

      setCourseDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch Section Videos (Per Section)
  async function getSectionVideos(sectionId) {
    try {
      const options = {
        url: `https://brightminds.runasp.net/api/Video/section/${sectionId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      let { data } = await axios.request(options);
      console.log("sectionVideos", data.data.isPaid);

      // Store videos separately for each section
      setSectionVideos((prev) => ({
        ...prev,
        [sectionId]: data.data,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  // Toggle section open/close
  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the state for the clicked item
    }));
  };

  // Refresh feedback when a new one is submitted
  const handleFeedbackSubmitted = () => {
    // Force refresh the feedback list by updating the key
    setFeedbackRefreshKey((prevKey) => prevKey + 1);

    // Switch to feedback tab if not already there
    if (activeTab !== "feedback") {
      setActiveTab("feedback");
    }
  };

  useEffect(() => {
    getCourseDetails();
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  // Calculate course stats
  const getTotalLessonsCount = () => {
    if (!CourseDetails?.sections) return 0;

    return CourseDetails.sections.reduce((total, section) => {
      const videos = sectionVideos[section.id] || [];
      return total + videos.length;
    }, 0);
  };

  return (
    <>
      <Helmet>
        <title>{CourseDetails?.name || "Course Details"}</title>
        <meta
          name="description"
          content={CourseDetails?.description || "Course details page"}
        />
      </Helmet>

      {CourseDetails ? (
        <>
          {/* Hero Section - No gradient on small screens */}
          <div className="bg-white md:bg-gradient-to-r md:from-primary-600 md:to-primary-800 text-gray-800 md:text-white w-full">
            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Course Image - Moved first for mobile but appears second on desktop */}
                <div className="w-full md:w-1/2 order-first md:order-last">
                  <div className="relative w-full rounded-xl overflow-hidden shadow-lg md:shadow-2xl border-2 md:border-4 border-gray-200 md:border-white/20">
                    <img
                      src={CourseDetails.pictureUrl}
                      className="w-full h-64 md:h-80 object-cover"
                      alt={CourseDetails.name}
                    />
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition">
                        <div className="w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center text-white">
                          <i className="fa-solid fa-play text-xl"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Info - Appears first on desktop but second on mobile */}
                <div className="w-full md:w-1/2 order-last md:order-first mt-8 md:mt-0">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-left">
                    {CourseDetails.name}
                  </h1>

                  <p className="text-lg text-gray-700 md:text-gray-100 mb-6 line-clamp-2 md:line-clamp-3 text-left">
                    {CourseDetails.description}
                  </p>

                  <div className="flex flex-wrap items-start justify-start gap-6 mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-100 md:bg-white/10 flex items-center justify-center mr-2">
                        <i className="fa-solid fa-user-tie text-primary-600 md:text-white"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 md:text-gray-200">
                          Instructor
                        </p>
                        <p className="font-medium">
                          {CourseDetails.instructorName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-100 md:bg-white/10 flex items-center justify-center mr-2">
                        <i className="fa-solid fa-layer-group text-primary-600 md:text-white"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 md:text-gray-200">
                          Sections
                        </p>
                        <p className="font-medium">
                          {CourseDetails.sections.length}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary-100 md:bg-white/10 flex items-center justify-center mr-2">
                        <i className="fa-solid fa-video text-primary-600 md:text-white"></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 md:text-gray-200">
                          Lessons
                        </p>
                        <p className="font-medium">{getTotalLessonsCount()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-start gap-4">
                    <span className="text-3xl font-bold">
                      ${CourseDetails.price}
                    </span>
                    {/* Cart button code removed */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full container mx-auto px-4 sm:px-6 py-12">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8 overflow-x-auto whitespace-nowrap">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`pb-4 px-1 font-medium text-lg ${
                    activeTab === "overview"
                      ? "border-b-2 border-primary-500 text-primary-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("curriculum")}
                  className={`pb-4 px-1 font-medium text-lg ${
                    activeTab === "curriculum"
                      ? "border-b-2 border-primary-500 text-primary-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Content
                </button>
                <button
                  onClick={() => setActiveTab("feedback")}
                  className={`pb-4 px-1 font-medium text-lg ${
                    activeTab === "feedback"
                      ? "border-b-2 border-primary-500 text-primary-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Feedback
                </button>{" "}
                <button
                  onClick={() => navigate("/static-quiz")}
                  className={`pb-4 px-1 font-medium text-lg ${
                    activeTab === "quiz"
                      ? "border-b-2 border-primary-500 text-primary-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Take Quiz
                </button>
              </nav>
            </div>

            {/* Tab Content - Left aligned */}
            <div className="w-full max-w-4xl mx-0">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-left">
                    Course Description
                  </h2>
                  <div className="prose prose-lg max-w-none mb-8 text-left">
                    <p className="text-gray-700">{CourseDetails.description}</p>
                  </div>

                  <h2 className="text-2xl font-bold mb-4 text-left">
                    What You&apos;ll Learn
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start">
                      <i className="fa-solid fa-circle-check text-primary-500 mt-1 mr-3"></i>
                      <p>Master the fundamentals of this course</p>
                    </div>
                    <div className="flex items-start">
                      <i className="fa-solid fa-circle-check text-primary-500 mt-1 mr-3"></i>
                      <p>Apply your knowledge to real-world projects</p>
                    </div>
                    <div className="flex items-start">
                      <i className="fa-solid fa-circle-check text-primary-500 mt-1 mr-3"></i>
                      <p>Understand advanced techniques and methods</p>
                    </div>
                    <div className="flex items-start">
                      <i className="fa-solid fa-circle-check text-primary-500 mt-1 mr-3"></i>
                      <p>Prepare for certification in this field</p>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-4 text-left">
                    Course Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Created Date
                      </h3>
                      <p>
                        {new Date(
                          CourseDetails.createdDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Last Updated
                      </h3>
                      <p>
                        {new Date(
                          CourseDetails.updatedDate || CourseDetails.createdDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Instructor
                      </h3>
                      <p>{CourseDetails.instructorName}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-700 mb-2">
                        Price
                      </h3>
                      <p>${CourseDetails.price}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Curriculum Tab */}
              {activeTab === "curriculum" && (
                <div className="w-full">
                  <h2 className="text-2xl font-bold mb-6 text-left">
                    Course Content
                  </h2>
                  <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-200 w-full">
                    {CourseDetails.sections.map((item, index) => (
                      <div key={index} className="bg-white">
                        <div
                          className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition"
                          onClick={() => {
                            toggleItem(index);
                            getSectionVideos(item.id);
                          }}
                        >
                          <div className="flex items-center">
                            <span className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mr-3">
                              <i
                                className={`fa-solid ${
                                  openItems[index] ? "fa-minus" : "fa-plus"
                                }`}
                              ></i>
                            </span>
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {sectionVideos[item.id]
                                  ? `${sectionVideos[item.id].length} lectures`
                                  : "Loading..."}
                              </p>
                            </div>
                          </div>
                          <div className="text-gray-500">
                            <i
                              className={`fa-solid ${
                                openItems[index]
                                  ? "fa-chevron-up"
                                  : "fa-chevron-down"
                              }`}
                            ></i>
                          </div>
                        </div>

                        {/* Videos (If Section is Open) */}
                        {openItems[index] && (
                          <div className="bg-gray-50 p-4">
                            <div className="space-y-3 pl-11">
                              {sectionVideos[item.id] ? (
                                sectionVideos[item.id].map((video) => (
                                  <div
                                    key={video.id}
                                    className="flex items-center justify-between"
                                  >
                                    <div className="flex items-center">
                                      <i className="fa-solid fa-circle-play text-primary-500 mr-3"></i>
                                      {video.isPaid ? (
                                        <Link
                                          to={`/video?videoUrl=${
                                            video.videoUrl
                                          }&videoid=${
                                            video.id
                                          }&videoname=${encodeURIComponent(
                                            video.name
                                          )}`}
                                          className="text-gray-700 hover:text-primary-600 transition"
                                        >
                                          {video.name}
                                        </Link>
                                      ) : (
                                        <Link
                                          to={"#"}
                                          className="text-gray-700 hover:text-primary-600 transition"
                                        >
                                          {video.name}
                                        </Link>
                                      )}
                                    </div>
                                    <span className="text-gray-500 text-sm">
                                      {video.duration} min
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <div className="flex justify-center py-4">
                                  <div className="animate-pulse flex space-x-4">
                                    <div className="flex-1 space-y-3">
                                      <div className="h-3 bg-gray-200 rounded"></div>
                                      <div className="h-3 bg-gray-200 rounded"></div>
                                      <div className="h-3 bg-gray-200 rounded"></div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback Tab */}
              {activeTab === "feedback" && (
                <div className="w-full">
                  <FeedbackForm
                    courseId={id}
                    onFeedbackSubmitted={handleFeedbackSubmitted}
                  />
                  <FeedbackList courseId={id} key={feedbackRefreshKey} />
                </div>
              )}

              {/* Quiz Tab - New */}
              {activeTab === "quiz" && (
                <div className="w-full">
                  <h2 className="text-2xl font-bold mb-6 text-left">
                    Course Quiz
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Test your knowledge with this quiz. Good luck!
                  </p>
                  <Link
                    to={`/static-quiz`}
                    className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg shadow hover:bg-primary-600 transition-colors"
                  >
                    Start Quiz
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full py-20">
          <Loading />
        </div>
      )}
    </>
  );
}
