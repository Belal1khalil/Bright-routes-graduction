import course1 from "../../assets/img/carousel-1.jpg";
import course2 from "../../assets/img/carousel-2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";

export default function HomeSlider() {
  return (
    <section className="w-full overflow-hidden">
      <Swiper
        loop={true}
        effect="fade"
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        className="w-full hero-slider"
      >
        <SwiperSlide>
          <div className="relative h-[90vh] w-full">
            <img
              src={course1}
              alt="Education platform"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/70 to-black/50 text-white">
              <div className="container mx-auto px-4 md:px-8 lg:px-16">
                <div className="max-w-3xl">
                  <h4 className="text-primary-500 text-xl md:text-2xl font-bold mb-3 animate-fadeInUp">
                    BEST ONLINE LEARNING PLATFORM
                  </h4>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fadeInUp animation-delay-200">
                    The Best Online Learning Experience
                  </h1>
                  <p className="text-gray-200 text-base md:text-lg max-w-2xl mb-8 animate-fadeInUp animation-delay-400">
                    Discover a world of knowledge with our comprehensive online
                    courses taught by industry experts. Advance your career with
                    flexible learning options designed to fit your schedule.
                  </p>
                  <div className="flex flex-wrap gap-4 animate-fadeInUp animation-delay-600">
                    <Link
                      to="/courses"
                      className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-block"
                    >
                      Explore Courses
                    </Link>

                    <Link
                      to="/courses"
                      className="px-6 py-3 bg-white/90 hover:bg-white text-gray-800 font-semibold rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-[90vh] w-full">
            <img
              src={course2}
              alt="Online education"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/70 to-black/50 text-white">
              <div className="container mx-auto px-4 md:px-8 lg:px-16">
                <div className="max-w-3xl">
                  <h4 className="text-primary-500 text-xl md:text-2xl font-bold mb-3 animate-fadeInUp">
                    LEARN FROM ANYWHERE
                  </h4>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fadeInUp animation-delay-200">
                    Get Educated Online From Your Home
                  </h1>
                  <p className="text-gray-200 text-base md:text-lg max-w-2xl mb-8 animate-fadeInUp animation-delay-400">
                    Access high-quality education from the comfort of your home.
                    Our interactive platform provides you with the tools and
                    resources you need to succeed in today's digital world.
                  </p>
                  <div className="flex flex-wrap gap-4 animate-fadeInUp animation-delay-600">
                    <Link
                      to="/courses"
                      className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-block"
                    >
                      View Courses
                    </Link>
                    <Link
                      to="/courses"
                      className="px-6 py-3 bg-white/90 hover:bg-white text-gray-800 font-semibold rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      Start Learning
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom CSS for animations */}
      <style jsx="true">{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 50px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .hero-slider .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: white;
          opacity: 0.7;
        }

        .hero-slider .swiper-pagination-bullet-active {
          background-color: var(--primary-500, #3b82f6);
          opacity: 1;
        }

        .hero-slider .swiper-button-next,
        .hero-slider .swiper-button-prev {
          color: white;
        }

        .hero-slider .swiper-button-next:hover,
        .hero-slider .swiper-button-prev:hover {
          color: var(--primary-500, #3b82f6);
        }
      `}</style>
    </section>
  );
}
