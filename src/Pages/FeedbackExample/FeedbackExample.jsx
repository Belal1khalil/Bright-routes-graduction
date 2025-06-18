import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { FeedbackForm, FeedbackList } from "../../Components/Feedback";
import {
  submitFeedback,
  getCourseFeedback,
  deleteFeedback,
} from "../../utils/FeedbackService";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

export default function FeedbackExample() {
  const { token } = useContext(UserContext);
  const [courseId, setCourseId] = useState("1"); // Default example course
  const [feedbackData, setFeedbackData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Example direct API usage
  const handleManualSubmit = async () => {
    if (!token) {
      toast.error("Please login to submit feedback");
      return;
    }

    const content =
      "This is a test feedback submitted directly via the API service";
    const rating = 5;

    const success = await submitFeedback(courseId, content, rating, token);
    if (success) {
      // Refresh the feedback list
      fetchFeedbackExample();
    }
  };

  // Example of fetching feedback
  const fetchFeedbackExample = async () => {
    setIsLoading(true);
    const result = await getCourseFeedback(courseId, 1, 5);
    setFeedbackData(result);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Feedback API Integration Example</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8">
        Feedback API Integration Example
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Using Components</h2>
          <p className="mb-4 text-gray-700">
            This approach uses React components that handle all API interactions
            internally:
          </p>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <FeedbackForm
              courseId={courseId}
              onFeedbackSubmitted={() =>
                toast.success("Feedback submitted via component")
              }
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Using API Service Directly</h2>
          <p className="mb-4 text-gray-700">
            This approach uses the FeedbackService.js utility directly:
          </p>

          <div className="mb-4">
            <label
              htmlFor="courseId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Course ID
            </label>
            <input
              type="text"
              id="courseId"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleManualSubmit}
              disabled={!token}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-300 disabled:bg-gray-400"
            >
              Submit Test Feedback
            </button>

            <button
              onClick={fetchFeedbackExample}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-300"
            >
              Fetch Feedback Example
            </button>
          </div>

          {isLoading && (
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          )}

          {feedbackData && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">API Response:</h3>
              <p>Total Feedback: {feedbackData.totalCount}</p>
              <p>Success: {feedbackData.success ? "Yes" : "No"}</p>
              {feedbackData.message && <p>Message: {feedbackData.message}</p>}

              {feedbackData.items.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">First Feedback Item:</h4>
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                    {JSON.stringify(feedbackData.items[0], null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Feedback List Component</h2>
        <FeedbackList courseId={courseId} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Code Examples</h2>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Submitting Feedback:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {`// Using the FeedbackService utility
import { submitFeedback } from '../utils/FeedbackService';

// Inside your component:
const handleSubmit = async () => {
  const courseId = '1';
  const content = 'Great course!';
  const rating = 5;
  const success = await submitFeedback(courseId, content, rating, token);
  
  if (success) {
    // Handle successful submission
  }
};`}
          </pre>
        </div>

        <div>
          <h3 className="font-medium mb-2">Fetching Feedback:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {`// Using the FeedbackService utility
import { getCourseFeedback } from '../utils/FeedbackService';

// Inside your component:
const fetchFeedback = async () => {
  const courseId = '1';
  const pageIndex = 1;
  const pageSize = 5;
  
  const result = await getCourseFeedback(courseId, pageIndex, pageSize);
  
  if (result.success) {
    // Access result.items and result.totalCount
    console.log(result.items);
  }
};`}
          </pre>
        </div>
      </div>
    </div>
  );
}
