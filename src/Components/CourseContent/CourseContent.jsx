import { useState } from "react";


const CourseContent = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the state for the clicked item
    }));
  };

  const courseContent = [
    "HTML",
    "HTML and CSS Basics",
    "Responsive Design Techniques",
    "JavaScript Fundamentals",
    "Project: Build a Portfolio Website",
  ];

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-semibold text-gray-800">Course Content:</h2>
      <ul className="list-inside text-gray-700 mt-2">
        {courseContent.map((item, index) => (
          <li key={index} className="mb-2">
            {/* Arrow and Item Name */}
            <div className="flex items-center cursor-pointer" onClick={() => toggleItem(index)}>
              <span className="mr-2">
                {openItems[index] ? (
                  <i className="fa-solid fa-arrow-up-long"></i> // Arrow up when open
                ) : (
                  <i className="fa-solid fa-arrow-down-long"></i> // Arrow down when closed
                )}
              </span>
              <span>{item}</span>
            </div>

            {/* Hidden List (Shows "Hello" when open) */}
            {openItems[index] && (
              <div className="pl-6 mt-2">
                <p>Hello</p> {/* Replace "Hello" with any content you want */}
              </div>
            )}
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default CourseContent;