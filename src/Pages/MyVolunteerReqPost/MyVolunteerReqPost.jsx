import React, { useEffect, useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const MyVolunteerReqPost = () => {
    const [reqDatas, setReqData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:3000/volunteerRequests?email=${user.email}`)
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
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-700">My Volunteer Requests</h2>

            {reqDatas.length === 0 ? (
                <div className="text-center mt-10 p-6 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-semibold">No Requests Found</h3>
                    <p className="text-sm mt-2">You haven’t submitted any volunteer requests yet. Join a cause today!</p>
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
