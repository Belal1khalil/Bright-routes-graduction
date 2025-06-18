import axios from "axios";
import cat1 from "../../assets/img/cat-1.jpg";
import cat2 from "../../assets/img/cat-2.jpg";
import cat3 from "../../assets/img/cat-3.jpg";
import cat4 from "../../assets/img/cat-4.jpg";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/loading";
import { useNavigate } from "react-router-dom";

export default function CoursesCategories() {
  const navigate = useNavigate();

  async function GetCoursesCategories() {
    const options = {
      url: "https://brightminds.runasp.net/api/Category",
      method: "GET",
    };
    return axios.request(options);
  }
  let { data, isLoading } = useQuery({
    queryKey: ["CoursesCategories"],
    queryFn: GetCoursesCategories,
    refetchOnMount: false,
  });

  const handleCategoryClick = (categoryId) => {
    navigate("/Courses", { state: { categoryId } });
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <div key={data.data.data.id}>
        <h1 className="text-center text-2xl uppercase text-primary-500 font-semibold mt-12">
          Categories
        </h1>
        <div className="w-16 h-0.5 bg-primary-500 mx-auto mt-2"></div>
        <div className="w-12 h-0.5 bg-primary-500 mx-auto mt-1"></div>
      </div>
      <h1 className="text-4xl  text-center mt-3 mb-14 font-bold">
        {" "}
        Courses Categories
      </h1>
      <div className="grid col-span-1  md:grid-cols-12 md:gap-7">
        <div className=" col-span-1 md:col-span-8 grid grid-cols-12 gap-6">
          {/* Top Card with Decreased Height */}
          <div
            className="col-span-12 relative h-64 overflow-hidden cursor-pointer"
            onClick={() => handleCategoryClick(data.data.data[0].id)}
          >
            <img
              src={cat1}
              alt="Video Editing"
              className="w-full h-full object-cover hover:scale-110 transition-all duration-300  rounded-lg"
            />
            <div className="layer absolute bottom-0 right-0 bg-white bg-opacity-80 p-4 shadow-md rounded-tl-lg">
              <h5 className="text-black-800 font-bold text-xl">
                {data.data.data[0].name}
              </h5>
              <p className="text-primary-600 text-center font-bold">
                49 Courses
              </p>
            </div>
          </div>

          {/* Two Side-by-Side Cards */}
          <div
            className="col-span-12 md:col-span-6 overflow-hidden relative cursor-pointer"
            onClick={() => handleCategoryClick(data.data.data[1]?.id || 0)}
          >
            <img
              src={cat2}
              alt="Graphic Design"
              className="w-full h-auto object-cover hover:scale-110 transition-all duration-300 rounded-lg"
            />
            <div className="layer absolute bottom-0 right-0 bg-white bg-opacity-80 p-4 shadow-md rounded-tl-lg">
              <h5 className="text-black font-bold">Graphic Design</h5>
              <p className="text-primary-600 text-center font-bold">
                49 Courses
              </p>
            </div>
          </div>

          <div
            className="col-span-12 md:col-span-6 overflow-hidden relative cursor-pointer"
            onClick={() => handleCategoryClick(data.data.data[2]?.id || 0)}
          >
            <img
              src={cat3}
              alt="Graphic Design"
              className="w-full h-auto object-cover hover:scale-110 transition-all duration-300 rounded-lg"
            />
            <div className="layer absolute bottom-0 right-0 bg-white bg-opacity-80 p-4 shadow-md rounded-tl-lg">
              <h5 className="text-black font-bold">{data.data.data[2].name}</h5>
              <p className="text-primary-600 text-center font-bold">
                49 Courses
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="col-span-4 relative overflow-hidden my-5 md:my-0 cursor-pointer"
          onClick={() => handleCategoryClick(data.data.data[6]?.id || 0)}
        >
          <img
            src={cat4}
            alt="Marketing"
            className="w-full h-full object-cover hover:scale-110 transition-all duration-300 rounded-lg shadow-lg"
          />
          <div className="layer absolute bottom-0 right-0 bg-white bg-opacity-80 p-4 shadow-md rounded-tl-lg">
            <h5 className="text-black font-bold">{data.data.data[6].name}</h5>
            <p className="text-primary-600 text-center font-bold">49 Courses</p>
          </div>
        </div>
      </div>
    </>
  );
}
