import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Pagination, Empty, Popconfirm } from "antd";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function FeedbackList({ courseId }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { token } = useContext(UserContext);
  const pageSize = 5;

  // Initial fetch on mount or when courseId changes
  useEffect(() => {
    fetchFeedback(1);
    setCurrentPage(1);
  }, [courseId]);

  // Handle page changes
  useEffect(() => {
    // Always fetch when page changes, regardless of page number
    fetchFeedback(currentPage);
  }, [currentPage]);

  const fetchFeedback = async (pageIndex) => {
    if (!courseId) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://brightminds.runasp.net/api/Feedback`,
        {
          params: {
            CourseId: courseId,
            PageIndex: pageIndex,
            PageSize: pageSize,
            // Sort by newest first
            OrderBy: "createdAt",
            IsDescending: true,
          },
        }
      );

      if (response.data.success) {
        setFeedbacks(response.data.data.items || []);
        setTotalCount(response.data.data.count || 0);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a feedback
  const handleDeleteFeedback = async (feedbackId) => {
    if (!token) {
      toast.error("Please login to delete feedback");
      return;
    }

    setIsDeleting(true);
    const toastId = toast.loading("Deleting feedback...");

    try {
      const response = await axios.delete(
        `https://brightminds.runasp.net/api/Feedback/${feedbackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.success) {
        toast.success("Feedback deleted successfully", { id: toastId });

        // Remove the deleted feedback from the current list
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.filter((feedback) => feedback.id !== feedbackId)
        );

        // Decrease the total count
        setTotalCount((prevCount) => Math.max(0, prevCount - 1));

        // Refresh the list if needed
        if (feedbacks.length <= 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else if (feedbacks.length <= 1) {
          fetchFeedback(1);
        }
      } else {
        toast.error(response.data?.message || "Failed to delete feedback", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete feedback. You can only delete your own feedback.",
        { id: toastId }
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // Format date to a readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Generate star rating display
  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`fa-${
              rating >= star ? "solid" : "regular"
            } fa-star text-sm`}
          ></i>
        ))}
      </div>
    );
  };

  // Check if the user is the author of a feedback
  const isUserFeedback = (feedback) => {
    if (!token) return false;

    try {
      // Simple way to decode JWT and extract user ID
      const tokenParts = token.split(".");
      if (tokenParts.length !== 3) return false;

      const payload = JSON.parse(atob(tokenParts[1]));

      // Check if the user is the author or admin
      return (
        feedback.userId === payload.nameid ||
        payload.role === "Admin" ||
        payload.role?.includes("Admin")
      );
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll back to the top of the feedback section for better UX
    document
      .getElementById("feedback-list-container")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      id="feedback-list-container"
      className="bg-white rounded-lg shadow p-6 mb-8"
    >
      <h2 className="text-xl font-bold mb-4">Student Feedback</h2>

      {isLoading ? (
        <div className="py-8 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
        </div>
      ) : totalCount === 0 ? (
        <Empty
          description="No feedback yet. Be the first to share your thoughts!"
          className="py-8"
        />
      ) : (
        <>
          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{feedback.userName}</h3>
                    <div className="flex items-center mt-1">
                      {renderStars(feedback.rating)}
                      <span className="ml-2 text-gray-500 text-sm">
                        {feedback.rating.toFixed(1)} / 5.0
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-gray-500 text-sm mr-3">
                      {formatDate(feedback.createdAt)}
                    </div>
                    {isUserFeedback(feedback) && (
                      <Popconfirm
                        title="Delete feedback"
                        description="Are you sure you want to delete this feedback?"
                        onConfirm={() => handleDeleteFeedback(feedback.id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                      >
                        <button
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          disabled={isDeleting}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </Popconfirm>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 mt-3">{feedback.content}</p>
              </div>
            ))}
          </div>

          {totalCount > pageSize && (
            <div className="mt-6 flex justify-center">
              <Pagination
                current={currentPage}
                onChange={handlePageChange}
                total={totalCount}
                pageSize={pageSize}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

FeedbackList.propTypes = {
  courseId: PropTypes.string.isRequired,
};
