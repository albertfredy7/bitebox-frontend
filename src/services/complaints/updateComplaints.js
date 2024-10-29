import toast from "react-hot-toast";
import api from "../api";
import { logoutUser } from "../auth/auth";

export const updateComplaintStatus = async (orderId, newStatus, fieldToUpdate) => {
  const token = localStorage.getItem("token");

  // Redirect or notify user if token is missing
  if (!token) {
    toast.error("You need to be logged in to update order status.");
    return;
  }

  try {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const response = await api.put(`/complaints/${orderId}/${fieldToUpdate}`, { status: newStatus }, config);


    console.log(response.data)

    // Handle success cases
    if (response.status === 200) {
      toast.success(`Complaint ${fieldToUpdate} updated to "${newStatus}" successfully!`);
      
      return response.data;
    } else if (response.status === 400) {
      toast.error(response.data.msg || "Invalid status");
    } else if (response.status === 404) {
      toast.error("Order not found");
    } else {
      toast.error("An unexpected error occurred while updating the order status");
    }
  } catch (error) {
    // Handle network errors
    if (error.code === 'ECONNABORTED') {
      toast.error("Request timed out. Please try again.");
    } else if (error.response && error.response.status === 401) {
      console.log("Unauthorized error occurred");
      logoutUser();
    } else {
      console.error("An error occurred while updating the order status:", error);
      toast.error("Failed to update order status. Please try again.");
    }
    throw error; // Re-throw for external handling
  }
};