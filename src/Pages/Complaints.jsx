import React, { useEffect, useState } from 'react'
import { fetchComplaints } from '../services/complaints/fetchComplaints';
import { toast } from "react-hot-toast";
import { updateComplaintStatus } from "../services/complaints/updateComplaints";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [statusOptions, setStatusOptions] = useState(['pending', 'resolved']);
  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    fetchComplaints().then(data => {
      setComplaints(data);
    });
  }, []);

  const handleStatusChange = async (complaintId, newStatus) => {
    if (!['pending', 'resolved'].includes(newStatus)) {
      toast.error('Invalid status. Please choose pending or resolved.');
      return;
    }

    try {
      await updateComplaintStatus(complaintId, newStatus, 'status');

      toast.success('Complaint status updated successfully');
      fetchComplaints().then(data => setComplaints(data));
    } catch (error) {
      toast.error('Failed to update complaint status');
    }
  };

  const renderStatusDropdown = (complaint) => (
    <select
      className='bg-transparent'
      value={complaint.status}
      onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
    >
      {statusOptions.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );

  // Render the component
  return (
    <div className="container mx-auto px-4">
      <div>
        <h1 className='text-4xl font-bold my-8'>Complaints</h1>
      </div>

      {complaints.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No complaints filed yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                      {complaint.userId.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{complaint.subject}</h3>
                      <p className="text-sm text-gray-500">Filed by {complaint.userId.name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(complaint.createdAt).toLocaleDateString()} at{" "}
                    {new Date(complaint.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${complaint.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
                  }`}>
                  {renderStatusDropdown(complaint)}
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

export default Complaints;