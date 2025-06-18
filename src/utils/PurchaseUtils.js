import axios from "axios";
import toast from "react-hot-toast";

/**
 * Direct purchase a course to add it to My Courses
 * @param {string} courseId - ID of the course to purchase
 * @param {string} courseName - Name of the course for display purposes
 * @param {string} token - Auth token
 * @returns {Promise<boolean>} - Success state of the purchase
 */
export async function purchaseCourse(courseId, courseName, token) {
  const toastId = toast.loading(
    `Adding "${courseName || "course"}" to My Courses...`
  );

  try {
    if (!token) {
      toast.error("Please login to purchase courses", { id: toastId });
      return false;
    }

    // Direct purchase API endpoint
    const purchaseOptions = {
      url: "https://brightminds.runasp.net/api/Payment/direct-purchase",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        courseId: courseId,
      },
    };

    console.log("Direct purchasing course with options:", purchaseOptions);
    const response = await axios.request(purchaseOptions);
    console.log("Direct purchase response:", response.data);

    if (response.data && response.data.statusCode === 200) {
      toast.success(
        courseName
          ? `"${courseName}" added to My Courses`
          : "Course added to My Courses",
        { id: toastId }
      );
      return true;
    } else {
      console.error("Failed to purchase course:", response.data);
      toast.error("Failed to add course to My Courses", { id: toastId });
      return false;
    }
  } catch (error) {
    console.error(
      "Error purchasing course:",
      error.response?.data || error.message
    );

    // Check for error type
    if (error.response?.data?.message === "Already purchased") {
      toast.success(`You already own "${courseName || "this course"}"`, {
        id: toastId,
      });
      return true;
    } else {
      toast.error(
        error.response?.data?.message || "Failed to add course to My Courses",
        { id: toastId }
      );
    }
    return false;
  }
}

/**
 * Add a course to My Courses via the Order API
 * @param {string} courseId - ID of the course to add
 * @param {string} courseName - Name of the course for display purposes
 * @param {string} token - Auth token
 * @returns {Promise<boolean>} - Success state
 */
export async function addToMyCourses(courseId, courseName, token) {
  console.log("Adding course to My Courses:", courseId, courseName);
  try {
    if (!token) {
      console.error("No token available for adding course to My Courses");
      return false;
    }

    // Create an order for the course
    const orderOptions = {
      url: "https://brightminds.runasp.net/api/Order",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        courseIds: [courseId],
      },
    };

    console.log("Creating order with options:", orderOptions);
    const orderResponse = await axios.request(orderOptions);
    console.log("Order creation response:", orderResponse.data);

    if (
      orderResponse.data &&
      orderResponse.data.statusCode === 201 &&
      orderResponse.data.data &&
      orderResponse.data.data.id
    ) {
      // Complete the order to mark it as purchased
      const orderId = orderResponse.data.data.id;
      console.log("Order created with ID:", orderId);

      const completeOptions = {
        url: `https://brightminds.runasp.net/api/Order/${orderId}/complete`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      console.log("Completing order with options:", completeOptions);
      const completeResponse = await axios.request(completeOptions);
      console.log("Order completion response:", completeResponse.data);

      if (completeResponse.data && completeResponse.data.statusCode === 200) {
        console.log("Order successfully completed");
        toast.success(
          courseName
            ? `"${courseName}" added to My Courses`
            : "Course added to My Courses"
        );
        return true;
      } else {
        console.error(
          "Failed to complete order, unexpected response:",
          completeResponse.data
        );
        return false;
      }
    } else {
      console.error(
        "Failed to create order, unexpected response:",
        orderResponse.data
      );
      return false;
    }
  } catch (error) {
    console.error(
      "Error adding course to My Courses:",
      error.response?.data || error.message
    );
    // Show an error toast only if this is a critical failure
    if (error.response?.status === 400 || error.response?.status === 500) {
      toast.error("Failed to add course to My Courses. Please try again.");
    }
    return false;
  }
}
