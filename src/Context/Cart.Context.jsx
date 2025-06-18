import { createContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function CartProvider({ children }) {
  const { token } = useContext(UserContext);
  const [CourseInfo, SetCourseInfo] = useState(null);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  // Load cart items when the provider mounts if the user is authenticated
  useEffect(() => {
    if (token) {
      GetCartCourses();
    }
  }, [token]);

  ////Add Course To Cart
  async function addCourseToCart({ courseId, courseName }) {
    let ToastId = toast.loading("Adding Course....");
    try {
      const options = {
        url: "https://brightminds.runasp.net/api/Cart",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          courseId,
        },
      };
      let { data } = await axios.request(options);
      if (data.statusCode == 201) {
        // Display success message
        toast.success(
          courseName ? `"${courseName}" added to cart` : "Course added to cart"
        );

        // Update state with the returned data or reload it
        if (data.data) {
          SetCourseInfo(data);
        } else {
          // Only get updated cart if response doesn't include cart data
          await GetCartCourses();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "course already in cart");
    } finally {
      toast.dismiss(ToastId);
    }
  }
  /// getCourses
  async function GetCartCourses() {
    // Prevent multiple simultaneous requests
    if (isLoadingCart) return;

    setIsLoadingCart(true);
    try {
      const options = {
        url: "https://brightminds.runasp.net/api/Cart",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let { data } = await axios.request(options);

      SetCourseInfo(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCart(false);
    }
  }

  //remove
  async function RemoveCoursefromCart({ id, courseName }) {
    let ToastId = toast.loading("Removing course from cart...");
    try {
      const options = {
        url: `https://brightminds.runasp.net/api/Cart/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let data = await axios.request(options);
      console.log("From Cart Context", data);
      if (data.data.statusCode == 204) {
        // Show success message
        toast.success(
          courseName
            ? `"${courseName}" removed from cart`
            : "Course removed from cart"
        );

        // Update cart locally first to provide immediate feedback
        if (CourseInfo && CourseInfo.data && CourseInfo.data.items) {
          const updatedItems = CourseInfo.data.items.filter(
            (item) => item.id !== id
          );

          // Calculate the new total price
          const removedItem = CourseInfo.data.items.find(
            (item) => item.id === id
          );
          const removedPrice = removedItem ? removedItem.price : 0;
          const newTotalPrice = CourseInfo.data.totalPirce - removedPrice;

          const updatedCartInfo = {
            ...CourseInfo,
            data: {
              ...CourseInfo.data,
              items: updatedItems,
              totalPirce: newTotalPrice >= 0 ? newTotalPrice : 0,
            },
          };
          SetCourseInfo(updatedCartInfo);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove course. Please try again.");
    } finally {
      toast.dismiss(ToastId);
    }
  }
  // ClearCart
  async function ClearCart() {
    let ToastId = toast.loading("Clearing your cart...");
    try {
      const options = {
        url: `https://brightminds.runasp.net/api/Cart/clear`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let data = await axios.request(options);
      console.log("From Cart Context", data);
      if (data.data.statusCode == 204) {
        const courseCount = CourseInfo?.data?.items?.length || 0;

        // Update state immediately to reflect changes
        const updatedCartInfo = {
          ...CourseInfo,
          data: {
            ...CourseInfo.data,
            items: [],
            totalPirce: 0,
          },
        };
        SetCourseInfo(updatedCartInfo);

        // Show success message only once
        if (courseCount > 0) {
          toast.success(
            `All ${courseCount} course${
              courseCount !== 1 ? "s" : ""
            } removed from cart`
          );
        }
      } else if (CourseInfo?.data?.items?.length === 0) {
        // Cart is already empty
        toast.success("Cart is already empty", { id: ToastId });
        return;
      }
    } catch (error) {
      console.log(error);
      // Only show error toast if cart contains items - this reduces error messages
      if (CourseInfo?.data?.items?.length > 0) {
        toast.error("Failed to clear cart. Please try again.");
      } else {
        // Silently dismiss loading toast if cart is already empty
        toast.dismiss(ToastId);
      }
    } finally {
      toast.dismiss(ToastId);
    }
  }

  // Handle purchase completion
  async function handlePurchaseCompletion() {
    if (CourseInfo?.data?.id) {
      const courseCount = CourseInfo?.data?.items?.length || 0;

      // Only show purchase success message here
      if (courseCount > 0) {
        toast.success(
          `Successfully purchased ${courseCount} course${
            courseCount !== 1 ? "s" : ""
          }!`
        );
      }

      // Set cart to empty state immediately to prevent UI flashes
      const emptyCartInfo = {
        ...CourseInfo,
        data: {
          ...CourseInfo.data,
          items: [],
          totalPirce: 0,
        },
      };
      SetCourseInfo(emptyCartInfo);

      // Then clear the cart in the backend
      try {
        const options = {
          url: `https://brightminds.runasp.net/api/Cart/clear/${CourseInfo.data.id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.request(options);
      } catch (error) {
        console.log("Error clearing cart after purchase:", error);
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        addCourseToCart,
        GetCartCourses,
        CourseInfo,
        RemoveCoursefromCart,
        ClearCart,
        SetCourseInfo,
        handlePurchaseCompletion,
        isLoadingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
