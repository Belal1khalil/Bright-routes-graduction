import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../Context/Cart.Context";
import Loading from "../../Components/Loading/loading";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// import { CartContext } from './../../Context/Cart.Context';

export default function PaymentSuccess() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [cartCleared, setCartCleared] = useState(false);
  const [processingOrder] = useState(false);
  
  

  const queryParams = new URLSearchParams(location.search);
  const session_id = queryParams.get("session_id");
 
  // Function to forcefully clear cart if needed
  // const forceCartClear = async () => {

  //   try {
  //     await ClearCart();
  //     return true;
  //   } catch (error) {
  //     console.error("Error force clearing cart:", error);
  //     return false;
  //   }
  // };

  // Function to update course status in backend
  // const updateCourseStatus = async (orderId) => {
  //   if (!orderId) return false;

  //   try {
  //     const updateOptions = {
  //       url: `https://brightminds.runasp.net/api/Order/${orderId}/complete`,
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };

  //     const response = await axios.request(updateOptions);

  //     if (response.data && response.data.statusCode === 200) {
  //       return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.error("Error updating course status:", error);
  //     return false;
  //   }
  // };

  useEffect(() => {
    async function getOrderDetails() {
      try {
        const { data } = await axios.get(
          `https://brightminds.runasp.net/api/Order/session?sessionId=${session_id}`
        );
        setOrder(data.data);

        // Process the order (clear cart and update backend)
        // if (!cartCleared && data.data) {
        //   setProcessingOrder(true);

        //   // Show a loading toast for the entire process
        //   const processToastId = toast.loading("Processing your purchase...");

        //   try {
        //     // Step 1: Clear the cart
        //     await handlePurchaseCompletion();

        //     // Extra step to ensure cart is fully cleared
        //     await forceCartClear();

        //     // Step 2: Update course status in backend
        //     if (data.data.id) {
        //       const updateSuccessful = await updateCourseStatus(data.data.id);

        //       if (updateSuccessful) {
        //         // Update toast with success message
        //         toast.success(
        //           `Purchase of ${data.data.items.length} course${
        //             data.data.items.length !== 1 ? "s" : ""
        //           } completed!`,
        //           {
        //             id: processToastId,
        //             duration: 3000,
        //           }
        //         );
        //       } else {
        //         // Update toast with partial success
        //         toast.success(
        //           "Purchase completed, but had trouble updating course status. Your order is still valid.",
        //           {
        //             id: processToastId,
        //             duration: 4000,
        //           }
        //         );
        //       }
        //     } else {
        //       // Update toast with cart clear success only
        //       toast.success("Purchase completed and cart cleared!", {
        //         id: processToastId,
        //         duration: 3000,
        //       });
        //     }

        //     setCartCleared(true);
        //   } catch (error) {
        //     console.error("Error processing order:", error);
        //     // Show error toast but keep the "cart cleared" state true to prevent retries
        //     toast.error("There was an issue processing your order", {
        //       id: processToastId,
        //       duration: 3000,
        //     });
        //     setCartCleared(true);
        //   } finally {
        //     setProcessingOrder(false);
        //   }
        // }

      } catch (err) {
        setError("Failed to load order details.");
        toast.error("Could not load order details");
      } finally {
        setLoading(false);
      }
    }

    getOrderDetails();
  }, [ ]);

  if (loading || processingOrder) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loading />
        <p className="mt-4 text-gray-600">
          {processingOrder
            ? "Processing your purchase..."
            : "Loading your order details..."}
        </p>
      </div>
    );
  }

  if (error)
    return (
      <div className="p-10 text-center">
        <div className="text-red-600 text-xl mb-4">{error}</div>
        <Link
          to="/courses"
          className="btn bg-primary-600 text-white px-4 py-2 rounded"
        >
          Back to Courses
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-green-100 border border-green-300 rounded-2xl p-6 shadow-md mb-8 text-center">
        <h1 className="text-3xl font-bold text-green-700">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-700 mt-2">
          Thank you, <span className="font-semibold">{order.userName}</span>!
        </p>
        <p className="text-sm text-gray-600">Order ID: #{order.id}</p>
        {/* {cartCleared && (
          <div className="mt-3 bg-blue-100 p-2 rounded-md text-blue-700">
            Your cart has been cleared and your courses are ready to watch.
          </div>
        )} */}
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-semibold">Date:</p>
            <p>{new Date(order.creationDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <p className="text-green-600">{order.status}</p>
          </div>
          <div>
            <p className="font-semibold">Courses:</p>
            <p>{order.items.length}</p>
          </div>
          <div>
            <p className="font-semibold">Total Paid:</p>
            <p className="text-blue-600">${order.totalCost.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Courses Purchased
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl shadow p-4 bg-white hover:shadow-md transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.courseName}
                className="w-full h-40 object-cover rounded-lg mb-3"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/640x360?text=Course+Image";
                }}
              />
              <h3 className="font-semibold text-lg">{item.courseName}</h3>
              <p className="text-sm text-gray-500">Price: ${item.price}</p>

              <div className="mt-4 flex justify-between">
                <Link
                  to={`/course/${item.courseId}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  <i className="fa-solid fa-book-open mr-1"></i> Details
                </Link>
                <Link
                  to={`/video?courseId=${item.courseId}`}
                  className="bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700"
                >
                  <i className="fa-solid fa-play mr-1"></i> Start
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/courses"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg inline-block hover:bg-primary-700 transition-colors"
        >
          <i className="fa-solid fa-book mr-2"></i>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
