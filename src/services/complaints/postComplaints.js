import toast from "react-hot-toast";
import api from "../api";

export const postComplaint = async (subject, description) => {
  const token = localStorage.getItem('token');
  if (!token) {
    toast.error("You need to be logged in to submit a complaint.");
    return;
  }

  try {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await api.post(
      'complaints',
      { subject, description },
      config
    );

    toast.success("Your complaint has been successfully submitted.");
    return response.data; // Return the new complaint
  } catch (error) {
    console.error("Error posting complaint:", error);
    toast.error("Failed to submit the complaint. Please try again.");
    throw error;
  }
};
