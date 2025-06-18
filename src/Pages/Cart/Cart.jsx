import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/Cart.Context";
import Loading from "../../Components/Loading/loading";
import CartItem from "../../Components/Cartitem/CartItem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import toast from "react-hot-toast";

export default function ShoppingCart() {
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  let { GetCartCourses, CourseInfo, ClearCart, isLoadingCart } =
    useContext(CartContext);

  // Only call GetCartCourses once when component mounts and cart is null
  useEffect(() => {
    if (!CourseInfo && !isLoadingCart) {
      GetCartCourses();
    }
  }, [CourseInfo, GetCartCourses, isLoadingCart]);

  async function handleOnlinePayment() {
    if (CourseInfo?.data?.items?.length === 0) {
      toast.error("Your cart is empty. Add courses before checkout.");
      return;
    }

    setIsCheckingOut(true);
    try {
      const options = {
        url: `https://brightminds.runasp.net/api/Payment/checkout`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          basketId: CourseInfo.data.id,
          paymentSucessUrl: `${baseUrl}/payment-success`,
          paymentFailedUrl: `${baseUrl}/payment-failure`,
        },
      };

      const response = await axios.request(options);

      // Assuming the API returns a payment URL to redirect the user
      if (response?.data && response?.data?.url) {
        window.location.href = response.data.url; // Redirect to the payment page
      } else {
        toast.error("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("An error occurred while processing the payment.");
    } finally {
      setIsCheckingOut(false);
    }
  }

  async function handleClearCart() {
    if (CourseInfo?.data?.items?.length === 0) {
      toast.error("Your cart is already empty.");
      return;
    }

    setIsClearing(true);
    try {
      await ClearCart();
    } finally {
      setIsClearing(false);
    }
  }

  const hasItems = CourseInfo?.data?.items?.length > 0;

  // Show loading state if cart data is being fetched
  if (isLoadingCart || CourseInfo === null) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Your Cart | Bright-Routes</title>
        <meta
          name="description"
          content="View and manage your course selections before checkout. Bright-Routes offers a wide range of educational courses to advance your career."
        />
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Your Shopping Cart
            </h1>
            <div className="flex items-center text-gray-500">
              <Link to="/" className="hover:text-primary-500 transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link
                to="/courses"
                className="hover:text-primary-500 transition-colors"
              >
                Courses
              </Link>
              <span className="mx-2">/</span>
              <span className="text-primary-500">Cart</span>
              {hasItems && (
                <span className="ml-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                  {CourseInfo.data.items.length}{" "}
                  {CourseInfo.data.items.length === 1 ? "Item" : "Items"}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="lg:w-2/3">
              {!hasItems ? (
                <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fa-solid fa-cart-shopping text-4xl text-gray-400"></i>
                  </div>
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Looks like you have not added any courses to your cart yet.
                    Explore our course catalog to find courses that match your
                    interests.
                  </p>
                  <Link
                    to="/courses"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors duration-300"
                  >
                    <i className="fa-solid fa-book-open mr-2"></i>
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                      <h2 className="font-semibold text-lg text-gray-800">
                        Course Items
                      </h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {CourseInfo.data.items.map((course) => (
                        <div key={course.id} className="p-6">
                          <CartItem courseinfo={course} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link
                      to="/courses"
                      className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
                    >
                      <i className="fa-solid fa-arrow-left mr-2"></i>
                      Continue Shopping
                    </Link>

                    <button
                      onClick={handleClearCart}
                      disabled={isClearing}
                      className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
                        isClearing
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      {isClearing ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                          Clearing...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-trash mr-2"></i>
                          Clear Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Section */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-20">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h2 className="font-semibold text-lg text-gray-800">
                    Order Summary
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span className="font-medium text-gray-800">
                        ${CourseInfo.data.totalPirce}
                      </span>
                    </div>

                    {/* You could add more line items here like tax, discount, etc. */}

                    <div className="border-t border-b py-4 flex justify-between text-lg font-semibold text-gray-800">
                      <span>Total:</span>
                      <span>${CourseInfo.data.totalPirce}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleOnlinePayment}
                      disabled={isCheckingOut || !hasItems}
                      className={`w-full py-3 px-4 rounded-lg text-white font-medium inline-flex items-center justify-center ${
                        isCheckingOut || !hasItems
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-primary-500 hover:bg-primary-600 transition-colors"
                      }`}
                    >
                      {isCheckingOut ? (
                        <>
                          <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-credit-card mr-2"></i>
                          Proceed to Checkout
                        </>
                      )}
                    </button>

                    {hasItems && (
                      <p className="text-xs text-gray-500 text-center">
                        By completing your purchase, you agree to our{" "}
                        <Link
                          to="/terms"
                          className="text-primary-500 hover:underline"
                        >
                          Terms
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-primary-500 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
