import { useContext } from "react";
import { CartContext } from "../../Context/Cart.Context";
import axios from "axios";

export default function CheckOut() {
  const { CourseInfo } = useContext(CartContext);

  async function handleOnlinePayment() {
    try {
      const options = {
        url: `https://brightminds.runasp.net/api/Payment/checkout`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          basketId: CourseInfo.data.basketId,
          paymentSucessUrl: "https://yourwebsite.com/payment-success",
          paymentFailureUrl: "https://yourwebsite.com/payment-failure",
        },
      };

      const response = await axios.request(options);

      // Assuming the API returns a payment URL to redirect the user
      if (response.data && response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl; // Redirect to the payment page
      } else {
        alert("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("An error occurred while processing the payment.");
    }
  }

  return (
    <div className="checkout-container">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <button
        onClick={handleOnlinePayment}
        className="btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Proceed to Payment
      </button>
    </div>
  );
}
