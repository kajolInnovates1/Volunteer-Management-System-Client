import React, { useEffect, useState } from 'react';
import { FaHandsHelping, FaTimesCircle, FaTable, FaTh } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyVolunteerReqPost = () => {
    const [reqDatas, setReqData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [layout, setLayout] = useState('card');
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        if (!user?.email) return;

        const fetchVolunteerRequests = async () => {
            try {
                const res = await axiosSecure.get(`/volunteerRequests`, {
                    params: { email: user.email }
                });
                setReqData(res.data);
            } catch (error) {
                console.error('Failed to fetch volunteer requests:', error);
                setReqData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVolunteerRequests();
    }, [user?.email]);


    const handleCancel = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to cancel this volunteer request?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!',
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/volunteerRequests/${id}`);

                if (res.data.deletedCount > 0) {
                    Swal.fire('Cancelled!', 'Your request has been cancelled.', 'success');
                    setReqData(prev => prev.filter(item => item._id !== id));
                }
            } catch (error) {
                console.error('Cancel request failed:', error);
                Swal.fire('Error!', 'Something went wrong while cancelling.', 'error');
            }
        }
    };


    if (loading) return <p className="text-center mt-10 text-lg text-gray-600">Loading your requests...</p>;

    const renderEmpty = () => (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
            <FaHandsHelping className="text-6xl text-green-500 mb-5 animate-bounce" />
            <h2 className="text-3xl font-bold text-gray-700 mb-3">No Volunteer Requests Yet</h2>
            <p className="text-gray-500 mb-6 text-lg max-w-md">
                You haven't requested to be a volunteer for any campaign. Start making a difference by joining a cause you care about.
            </p>
            <button
                onClick={() => window.location.href = '/'}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-xl"
            >
                Explore Volunteer Posts
            </button>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-[calc(100vh-290px)]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-green-700">My Volunteer Requests</h2>
                <button
                    onClick={() => setLayout(layout === 'card' ? 'table' : 'card')}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
                >
                    {layout === 'card' ? <FaTable /> : <FaTh />}
                    {layout === 'card' ? 'Switch to Table View' : 'Switch to Card View'}
                </button>
            </div>

            {reqDatas.length === 0 ? (
                renderEmpty()
            ) : layout === 'card' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reqDatas.map(data => (
                        <div key={data._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                            <img src={data.thumbnail} alt={data.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-green-700">{data.title}</h2>
                                <p className="text-gray-600 mt-1">{data.category}</p>
                                <div className="mt-2 text-sm text-gray-500 space-y-1">
                                    <p>📍 {data.location}</p>
                                    <p className="text-red-500">⏳ Deadline: {data.deadline}</p>
                                    <p>Status: <span className="text-green-700 font-medium">{data.status}</span></p>
                                </div>
                                <button
                                    onClick={() => handleCancel(data._id)}
                                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-all"
                                >
                                    Cancel Request
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-xl border border-gray-200">
                    <table className="table-auto w-full text-sm text-left text-gray-700">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="px-4 py-3">Thumbnail</th>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Location</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Deadline</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reqDatas.map((data) => (
                                <tr key={data._id} className="hover:bg-green-50 transition-all text-center">
                                    <td className="px-4 py-2">
                                        <img src={data.thumbnail} alt="thumb" className="w-16 h-16 object-cover rounded-md border mx-auto" />
                                    </td>
                                    <td className="px-4 py-2">{data.title}</td>
                                    <td className="px-4 py-2">{data.location}</td>
                                    <td className="px-4 py-2">{data.category}</td>
                                    <td className="px-4 py-2">{data.deadline}</td>
                                    <td className="px-4 py-2">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">{data.status}</span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleCancel(data._id)}
                                            className="text-red-600 hover:text-red-800 transition-all"
                                        >
                                            <FaTimesCircle size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyVolunteerReqPost;
