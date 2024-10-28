import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Forum = () => {
  const [complaints, setComplaints] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch JWT token from local storage
  const token = localStorage.getItem('token');

  // Handle complaint form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/complaints',
        { subject, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        }
      );

      const newComplaint = response.data;
      setComplaints([newComplaint, ...complaints]);
      setSubject("");
      setDescription("");
      setIsModalOpen(false);

      toast.success("Your complaint has been successfully submitted.");
    } catch (error) {
      console.error("Error posting complaint:", error);
      toast.error("Failed to submit the complaint. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Complaints Forum</h1>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
        >
          Raise a Complaint
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Raise a Complaint</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter the subject of your complaint"
                  required
                  className="w-full mt-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your complaint in detail"
                  required
                  className="w-full mt-2 p-2 border rounded min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Complaints List */}
      {complaints.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No complaints filed yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{complaint.subject}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(complaint.createdAt).toLocaleDateString()} at{" "}
                    {new Date(complaint.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  complaint.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {complaint.status}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{complaint.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forum;
