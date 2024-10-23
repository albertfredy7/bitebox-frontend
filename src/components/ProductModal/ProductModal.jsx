import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import addProduct from "../../services/menu/addProduct";
import updateProduct from "../../services/menu/updateProduct";
import axios from "axios";

const ProductModal = ({ isOpen, setIsOpen, refetchMenuItems, product }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setAvailable(product.available);
      setImageURL(product.imageUrl || "");
    } else {
      setName("");
      setPrice("");
      setAvailable(true);
      setImageURL("");
    }
  }, [product]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ryqwyuez");

      try {
        const toastId = toast.loading("Uploading image...");
        setUploading(true);

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dw4xgovq5/image/upload",
          formData
        );

        setImageURL(response.data.secure_url);
        toast.success("Image uploaded successfully", { id: toastId });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !price || !imageURL) {
      toast.error("Please fill in all fields and upload an image.");
      return;
    }
  
    // Create a regular object instead of FormData
    const productData = {
      name,
      price: parseFloat(price),
      available,
      imageUrl: imageURL // Make sure this matches your backend field name
    };
  
    try {
      setUploading(true);
      let result;
  
      if (product && product._id) {
        result = await updateProduct(product._id, productData);
      } else {
        result = await addProduct(productData);
      }
  
      if (result.success || result.status === 200 || result.status === 201) {
        toast.success(product ? "Product updated successfully!" : "Product added successfully!");
        setIsOpen(false);
        refetchMenuItems();
        
        // Clear all states
        setName("");
        setPrice("");
        setAvailable(true);
        setImageURL("");
      } else {
        toast.error(result.message || "Failed to save product. Please try again.");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(error.response?.data?.msg || "Failed to save product. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-1/2">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {product ? "Edit food item" : "Add new food item"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              <div className="w-1/2 bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4">
                {imageURL ? (
                  <div className="relative w-full">
                    <img
                      src={imageURL}
                      alt={`Preview of ${name}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setImageURL("")}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">Upload Image</p>
                  </div>
                )}
                <input
                  id="image"
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                {!imageURL && (
                  <label
                    htmlFor="image"
                    className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Choose file
                  </label>
                )}
              </div>
              <div className="w-1/2 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    id="available"
                    type="checkbox"
                    checked={available}
                    onChange={() => setAvailable(!available)}
                    className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="available" className="ml-2 block text-sm text-gray-900">
                    Available
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                disabled={uploading}
              >
                {uploading ? "Saving..." : product ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;