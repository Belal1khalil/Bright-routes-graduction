import { useState, useEffect } from "react";
import { Pagination, Input, Select } from "antd";
import axios from "axios";
import Loading from "../../Components/Loading/loading";
import CourseItem from "../../Components/Courses/Courseitem";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

export default function Courses() {
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCourses, setTotalCourses] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedInstructorId, setSelectedInstructorId] = useState(null);

  // Check if category ID was passed via location state
  useEffect(() => {
    if (location.state && location.state.categoryId) {
      setSelectedCategoryId(location.state.categoryId);
    }
  }, [location.state]);

  // Fetch categories to display course category names
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "https://brightminds.runasp.net/api/Category"
        );
        if (response.data && response.data.data) {
          setCategories(response.data.data.items || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  // Fetch instructors for filtering
  useEffect(() => {
    async function fetchInstructors() {
      try {
        const response = await axios.get(
          "https://brightminds.runasp.net/api/Instructor"
        );
        if (response.data && response.data.data) {
          setInstructors(response.data.data.items || []);
        }
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    }

    fetchInstructors();
  }, []);

  async function GetCourses(pageIndex) {
    setIsLoading(true);
    try {
      const options = {
        url: "https://brightminds.runasp.net/api/Course",
        method: "get",
        params: {
          pageSize: 12,
          pageIndex,
          SearchName: searchTerm || undefined,
          InstructorId: selectedInstructorId || undefined,
          CategoryId: selectedCategoryId || undefined,
        },
      };
      const response = await axios.request(options);

      if (response.data && response.data.data && response.data.data.items) {
        // Add category name to each course based on categoryId
        const coursesWithCategory = response.data.data.items.map((course) => {
          const category = categories.find(
            (cat) => cat.id === course.categoryId
          );
          return {
            ...course,
            categoryName: category ? category.name : null,
          };
        });

        setCourses(coursesWithCategory);
        setTotalCourses(response.data.data.totalCount || 50);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = () => {
    setCurrentPage(1);
    GetCourses(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategoryId(null);
    setSelectedInstructorId(null);
    setCurrentPage(1);
    GetCourses(1);
  };

  useEffect(() => {
    GetCourses(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, selectedCategoryId]);

  // Refetch courses when categories are loaded
  useEffect(() => {
    if (categories.length > 0) {
      GetCourses(currentPage);
    }
  }, [categories]);

  // Get the name of the selected category
  const selectedCategoryName = selectedCategoryId
    ? categories.find((cat) => cat.id === selectedCategoryId)?.name
    : null;

  return (
    <>
      <Helmet>
        <title>Explore Our Courses | Bright-Routes Learning Platform</title>
        <meta
          name="description"
          content="Discover a wide range of online courses to enhance your skills and advance your career."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {selectedCategoryName
                ? `${selectedCategoryName} Courses`
                : "Expand Your Knowledge"}
            </h1>
            <p className="text-lg opacity-90 mb-8">
              Learn from industry experts and transform your career with our
              wide range of professional courses
            </p>
            {/* <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
              <Input.Search
                placeholder="Search for courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={handleSearch}
                size="large"
                className="max-w-md"
                style={{ width: "100%" }}
              />
              <Select
                placeholder="Select Category"
                value={selectedCategoryId}
                onChange={(value) => {
                  setSelectedCategoryId(value);
                  setCurrentPage(1);
                  GetCourses(1);
                }}
                allowClear
                size="large"
                style={{ width: "100%", maxWidth: "200px" }}
              >
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
              <Select
                placeholder="Select Instructor"
                value={selectedInstructorId}
                onChange={(value) => {
                  setSelectedInstructorId(value);
                  setCurrentPage(1);
                  GetCourses(1);
                }}
                allowClear
                size="large"
                style={{ width: "100%", maxWidth: "200px" }}
              >
                {instructors.map((instructor) => (
                  <Select.Option key={instructor.id} value={instructor.id}>
                    {instructor.name}
                  </Select.Option>
                ))}
              </Select>
            </div> */}
            {(selectedCategoryId || selectedInstructorId || searchTerm) && (
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center">
              <i className="fa-solid fa-book text-primary-500 mr-2 text-xl"></i>
              <div>
                <div className="font-bold text-gray-800">{totalCourses}+</div>
                <div className="text-sm text-gray-500">Courses</div>
              </div>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-user-tie text-primary-500 mr-2 text-xl"></i>
              <div>
                <div className="font-bold text-gray-800">
                  {instructors.length || "50"}+
                </div>
                <div className="text-sm text-gray-500">Expert Instructors</div>
              </div>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-users text-primary-500 mr-2 text-xl"></i>
              <div>
                <div className="font-bold text-gray-800">10,000+</div>
                <div className="text-sm text-gray-500">Happy Students</div>
              </div>
            </div>
            <div className="flex items-center">
              <i className="fa-solid fa-certificate text-primary-500 mr-2 text-xl"></i>
              <div>
                <div className="font-bold text-gray-800">100%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="min-h-[300px] flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategoryName
                    ? `${selectedCategoryName} Courses`
                    : searchTerm
                    ? `Results for "${searchTerm}"`
                    : "All Courses"}
                </h2>
                <p className="text-gray-500">
                  Showing {courses.length} of {totalCourses} courses
                </p>
              </div>

              {courses.length === 0 ? (
                <div className="bg-white p-10 rounded-lg shadow-sm text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-search text-3xl text-gray-400"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any courses matching your criteria.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Show All Courses
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {courses.map((course) => (
                      <CourseItem CourseInfo={course} key={course.id} />
                    ))}
                  </div>

                  <div className="mt-10 flex justify-center">
                    <Pagination
                      current={currentPage}
                      onChange={setCurrentPage}
                      total={totalCourses}
                      pageSize={12}
                      showSizeChanger={false}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-300">
            Join thousands of students who are already advancing their careers
            with our courses. Get unlimited access to all courses with a
            subscription.
          </p>
        </div>
      </div>
    </>
  );
}
