import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

export default function FeedbackForm({ courseId, onFeedbackSubmitted }) {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please login to submit feedback");
      return;
    }

    if (content.trim() === "") {
      toast.error("Please enter feedback content");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Submitting feedback...");

    try {
      const response = await axios.post(
        "https://brightminds.runasp.net/api/Feedback",
        {
          courseId: courseId,
          content: content,
          rating: rating,
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
        setContent("");
        setRating(5);

        // Call the callback function if provided
        if (onFeedbackSubmitted) {
          onFeedbackSubmitted();
        }
      } else {
        toast.error(response.data.message || "Failed to submit feedback", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit feedback",
        { id: toastId }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Submit Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
              >
                <i
                  className={`fa-${
                    rating >= star ? "solid" : "regular"
                  } fa-star ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                ></i>
              </button>
            ))}
            <span className="ml-2 text-gray-600">{rating} out of 5</span>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-gray-700 mb-2">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Share your experience with this course..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isSubmitting}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !token}
          className={`px-4 py-2 rounded-md text-white ${
            !token ? "bg-gray-400" : "bg-primary-600 hover:bg-primary-700"
          } transition-colors duration-300 flex items-center`}
        >
          {isSubmitting ? (
            <>
              <i className="fa-solid fa-spinner fa-spin mr-2"></i> Submitting...
            </>
          ) : (
            "Submit Feedback"
          )}
        </button>
        {!token && (
          <p className="mt-2 text-sm text-red-500">
            Please login to submit feedback
          </p>
        )}
      </form>
    </div>
  );
}

FeedbackForm.propTypes = {
  courseId: PropTypes.string.isRequired,
  onFeedbackSubmitted: PropTypes.func,
};
