import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "https://brightminds.runasp.net/api";

/**
 * Submit feedback for a course
 * @param {string} courseId - ID of the course to leave feedback for
 * @param {string} content - Feedback content
 * @param {number} rating - Rating from 1-5
 * @param {string} token - Auth token
 * @returns {Promise<boolean>} - Success state
 */
export async function submitFeedback(courseId, content, rating, token) {
  if (!token) {
    toast.error("Please login to submit feedback");
    return false;
  }

  const toastId = toast.loading("Submitting feedback...");

  try {
    const response = await axios.post(
      `${API_BASE_URL}/Feedback`,
      {
        courseId,
        content,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      toast.success("Feedback submitted successfully", { id: toastId });
      return true;
    } else {
      toast.error(response.data.message || "Failed to submit feedback", {
        id: toastId,
      });
      return false;
    }
  } catch (error) {
    console.error("Error submitting feedback:", error);
    toast.error(error.response?.data?.message || "Failed to submit feedback", {
      id: toastId,
    });
    return false;
  }
}

/**
 * Get all feedback for a course
 * @param {string} courseId - ID of the course to get feedback for
 * @param {number} pageIndex - Page number (1-based)
 * @param {number} pageSize - Number of items per page
 * @returns {Promise<Object>} - Feedback data with pagination
 */
export async function getCourseFeedback(courseId, pageIndex = 1, pageSize = 5) {
  try {
    const response = await axios.get(`${API_BASE_URL}/Feedback`, {
      params: {
        CourseId: courseId,
        PageIndex: pageIndex,
        PageSize: pageSize,
      },
    });

    if (response.data.success) {
      return {
        items: response.data.data.items || [],
        totalCount: response.data.data.count || 0,
        success: true,
      };
    } else {
      return {
        items: [],
        totalCount: 0,
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return {
      items: [],
      totalCount: 0,
      success: false,
      message: error.response?.data?.message || "Failed to fetch feedback",
    };
  }
}

/**
 * Delete feedback (for admin or owner)
 * @param {string} feedbackId - ID of the feedback to delete
 * @param {string} token - Auth token
 * @returns {Promise<boolean>} - Success state
 */
export async function deleteFeedback(feedbackId, token) {
  if (!token) {
    toast.error("Please login to delete feedback");
    return false;
  }

  const toastId = toast.loading("Deleting feedback...");

  try {
    const response = await axios.delete(
      `${API_BASE_URL}/Feedback/${feedbackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success("Feedback deleted successfully", { id: toastId });
      return true;
    } else {
      toast.error(response.data.message || "Failed to delete feedback", {
        id: toastId,
      });
      return false;
    }
  } catch (error) {
    console.error("Error deleting feedback:", error);
    toast.error(error.response?.data?.message || "Failed to delete feedback", {
      id: toastId,
    });
    return false;
  }
}
