import api from "../api";

export const fetchComplaints = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.get('/complaints', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log(response);

        // Sort complaints by creation date in descending order
        const sortedComplaints = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Return only the sorted data array
        return sortedComplaints;
    } catch (err) {
        console.error('Error fetching complaints:', err.message);
        return []; // Return an empty array if there's an error
    }
};