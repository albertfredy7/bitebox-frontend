import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import addProduct from "../../services/menu/addProduct"; // Import the service
import updateProduct from "../../services/menu/updateProduct"; // Import the update service

const ProductModal = ({ isOpen, setIsOpen, refetchMenuItems, product }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setAvailable(product.available);
      setImage(null); // Reset image for editing
      setImageURL(product.imageUrl); // Fetch image URL
    } else {
      setName("");
      setPrice("");
      setAvailable(true);
      setImage(null);
      setImageURL(""); // Clear image URL for new products
    }
  }, [product]);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageURL(URL.createObjectURL(e.target.files[0])); // Update imageURL state
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !price) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    // Create FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", parseFloat(price)); // Convert price to number
    formData.append("available", available ? 'true' : 'false');
    if (image) {
      formData.append("imageURL", image); // Only append image if it exists
    }
  
    console.log("FormData:", Object.fromEntries(formData));
  
    try {
      setUploading(true);
      let result;
  
      if (product) {
        console.log("Updating existing product");
        result = await updateProduct(product._id, formData);
        console.log("Backend response:", result);
      } else {
        console.log("Adding new product");
        result = await addProduct(formData);
        console.log("Backend response:", result);
      }
  
      if (result.status === 201 || result.status === 200) {
        console.log("Success:", result.data);
        
        toast.success(product ? "Product updated successfully!" : "Product added successfully!");
        setIsOpen(false);
        refetchMenuItems(); // Refetch the menu items
      } else {
        console.error("Failed to save product:", result);
        toast.error("Failed to save product. Please try again.");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-1/2">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">{product ? "Edit food item" : "Add new food item"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              <div className="w-1/2 bg-gray-100 rounded-lg flex flex-col items-center justify-center p-4">
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt={`Preview of ${name}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5  0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
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
                {imageURL ? '' : (
                  <label htmlFor="image" className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                    Choose file
                  </label>
                )}
              </div>
              <div className="w-1/2 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-indigo-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
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
                  <label htmlFor="available" className="ml-2 block text-sm text-gray-900">Available</label>
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
                {uploading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;