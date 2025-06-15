import React, { useEffect, useState } from 'react';
import { FaHandsHelping, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const MyVolunteerReqPost = () => {
    const [reqDatas, setReqData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:3000/volunteerRequests?email=${user?.email}`)
            .then(res => res.json())
            .then(datas => {
                setReqData(datas);
                setLoading(false);
            })
            .catch(() => {
                setReqData([]);
                setLoading(false);
            });
    }, []);

    const handleCancel = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to cancel this volunteer request?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/volunteerRequests/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire('Cancelled!', 'Your request has been cancelled.', 'success');
                            setReqData(prev => prev.filter(item => item._id !== id));
                        }
                    });
            }
        });
    };

    if (loading) return <p className="text-center mt-10 text-lg text-gray-600">Loading your requests...</p>;

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-[calc(100vh-290px)]">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-700">My Volunteer Requests</h2>

            {reqDatas.length === 0 ? (
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
                                <tr key={data._id} className="hover:bg-green-50 transition-all">
                                    <td className="px-4 py-2">
                                        <img src={data.thumbnail} alt="thumb" className="w-16 h-16 object-cover rounded-md border" />
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
