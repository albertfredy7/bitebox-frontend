import toast from "react-hot-toast";
import api from "../api";
import { logoutUser } from "../auth/auth";

export const placeOrder = async (cartItems) => {
  const token = localStorage.getItem("token");

  // Redirect or notify user if token is missing
  if (!token) {
    toast.error("You need to be logged in to place an order.");
    return;
  }

  try {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    // Prepare order data with more specific item details
    const orderData = {
      items: cartItems.map(item => ({
        menuItemId: item.id, // Ensure backend identifies each item uniquely
        name: item.name,
        quantity: item.quantity,
      })),
    };

    const response = await api.post("/orders", orderData, config);

    // Success message and optional log
    toast.success("Order placed successfully!");
    console.log("Order response:", response.data);

    // Clear the cart and local storage if order was successful
    localStorage.removeItem("cart");

    return response.data;
  } catch (error) {
    // Unauthorized case (401) prompts user logout
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized error occurred");
      logoutUser();
    } else {
      console.error("An error occurred while placing the order:", error);
      toast.error("Failed to place the order. Please try again."); // Clearer error feedback
    }
    throw error; // Re-throw for external handling
  }
};
