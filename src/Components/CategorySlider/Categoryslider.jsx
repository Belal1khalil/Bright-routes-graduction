import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/loading";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectCoverflow,
  EffectFade,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/Cart.Context";
import { Link } from "react-router-dom";

// Import the style directly
import "./CategorySlider.css";

export default function Categoryslider() {
  const { addCourseToCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState({});

  async function CategprySlider() {
    const options = {
      url: "https://brightminds.runasp.net/api/Course",
      method: "GET",
      params: {
        pageSize: 10,
      },
    };
    console.log(options);
    return axios.request(options);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["categoryslider"],
    queryFn: CategprySlider,
    refetchOnMount: false,
  });

  const handleAddToCart = async (courseId) => {
    setIsAdding((prev) => ({ ...prev, [courseId]: true }));
    await addCourseToCart({ courseId });
    setTimeout(() => {
      setIsAdding((prev) => ({ ...prev, [courseId]: false }));
    }, 1000);
  };

  if (isLoading)
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary-100 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-yellow-100 rounded-full filter blur-3xl opacity-30"></div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-14 relative">
          <div className="block relative mb-3">
            <span className="text-primary-500 font-semibold uppercase tracking-wider bg-primary-50 px-5 py-2 rounded-full shadow-sm">
              Learn at your own pace
            </span>
            {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-400 rounded-full animate-ping"></div> */}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 text-gray-800 relative inline-block">
            Popular Courses
            <div className="w-full h-3 bg-yellow-300 absolute bottom-1 left-0 -z-10 opacity-30"></div>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our most popular courses and start your learning journey
            today
          </p>
          <div className="w-24 h-1 bg-primary-500 mx-auto mt-6"></div>
        </div>

        {data.data.data && (
          <div className="mx-auto">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              coverflowEffect={{
                rotate: 5,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: true,
              }}
              loop={true}
              modules={[
                Autoplay,
                Navigation,
                Pagination,
                EffectCoverflow,
                EffectFade,
              ]}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              navigation={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1.5 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 3, coverflowEffect: { depth: 180 } },
              }}
              className="courses-slider px-4 py-6"
            >
              {data.data.data.items.map((course) => (
                <SwiperSlide key={course.id}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col border border-gray-100 group">
                    {/* Course Image with Overlay */}
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={
                          course.pictureUrl ||
                          "https://via.placeholder.com/600x400?text=Course+Image"
                        }
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={course.name}
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold px-4 py-1.5 rounded-full text-sm z-10 shadow-md">
                        ${course.price}
                      </div>
                      <div className="absolute top-4 left-4 bg-white/90 text-primary-600 font-medium px-3 py-1 rounded-full text-xs shadow-sm backdrop-blur-sm">
                        {course.categoryName || "Development"}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-5 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-yellow-400 flex items-center gap-1 bg-gray-900/70 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                              <i className="fa-solid fa-star"></i>{" "}
                              {course.rate || 4.5}
                            </span>
                            <span className="text-white text-sm bg-gray-900/70 px-3 py-1 rounded-full backdrop-blur-sm">
                              <i className="fa-solid fa-users mr-1"></i> 500+
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <Link
                              to={`/course/${course.id}`}
                              className="bg-white text-primary-600 font-medium py-2.5 px-4 text-center rounded-lg hover:bg-primary-50 transition duration-300 text-sm shadow-lg hover:shadow-xl"
                            >
                              <i className="fa-solid fa-eye mr-1.5"></i> Details
                            </Link>
                            <button
                              onClick={() => handleAddToCart(course.id)}
                              disabled={isAdding[course.id]}
                              className="bg-primary-500 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-primary-600 transition duration-300 flex items-center justify-center gap-1.5 text-sm shadow-lg hover:shadow-xl disabled:opacity-70"
                            >
                              {isAdding[course.id] ? (
                                <i className="fa-solid fa-spinner fa-spin"></i>
                              ) : (
                                <>
                                  <i className="fa-solid fa-cart-plus"></i>
                                  <span>Add to Cart</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <div className="w-9 h-9 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 mr-2 border border-primary-100">
                            <i className="fa-solid fa-user-tie text-sm"></i>
                          </div>
                          <p className="text-gray-700 font-medium text-sm">
                            {course.instructorName || "Expert Instructor"}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                          <i className="fa-regular fa-clock mr-1"></i>
                          {new Date(course.createdDate).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="font-bold text-gray-800 text-xl mb-3 line-clamp-2 hover:text-primary-500 transition-colors">
                        {course.name}
                      </h3>

                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {course.description ||
                          "Master the fundamentals and advanced concepts in this comprehensive course designed for learners of all levels."}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <i className="fa-solid fa-book-open text-primary-400 mr-1.5"></i>
                          <span className="text-sm text-gray-600 font-medium">
                            6 Lessons
                          </span>
                        </div>
                        <div className="flex items-center">
                          <i className="fa-solid fa-certificate text-primary-400 mr-1.5"></i>
                          <span className="text-sm text-gray-600 font-medium">
                            Certificate
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* View All Courses Button */}
            <div className="mt-12 text-center">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium py-3.5 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 group"
              >
                <span>View All Courses</span>
                <i className="fa-solid fa-arrow-right ml-2 group-hover:ml-3 transition-all"></i>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
