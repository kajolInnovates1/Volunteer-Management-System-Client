import React, { useEffect, useState } from 'react';
import { FaTable, FaTh, FaInbox } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UpdateModal from './UpdateModal';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const NeedVolunteerPage = () => {
    const [layout, setLayout] = useState('card');
    const [volunteerPosts, setVolunteerPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();



    const fetchPosts = async () => {
        try {
            const response = await axiosSecure.get(`/needvoluntier?email=${user?.email}`
            );
            setVolunteerPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };


    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This post will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/volunteerNeeds/${id}`);

                    if (res.status === 200 || res.data.deletedCount > 0) {
                        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
                        fetchPosts(); // Update the UI
                    } else {
                        Swal.fire('Not Deleted', 'No matching post found.', 'info');
                    }
                } catch (error) {
                    console.error('Delete failed:', error);
                    Swal.fire('Error!', error?.response?.data?.message || 'Something went wrong.', 'error');
                }
            }
        });
    };


    const renderEmpty = () => (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
            <FaInbox className="text-6xl text-green-400 mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Volunteer Posts Found</h2>
            <p className="text-gray-500 mb-4">Looks like there are no active volunteer needs right now.</p>
        </div>
    );

    return (
        <div className="p-6 min-h-[calc(100vh-290px)]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-700">All Volunteer Needs</h2>
                <button
                    onClick={() => setLayout(layout === 'card' ? 'table' : 'card')}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
                >
                    {layout === 'card' ? <FaTable /> : <FaTh />}
                    {layout === 'card' ? 'Switch to Table View' : 'Switch to Card View'}
                </button>
            </div>

            {volunteerPosts.length === 0 ? (
                renderEmpty()
            ) : layout === 'card' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(volunteerPosts) && volunteerPosts?.map(post => (
                        <div key={post._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                            <img src={post.thumbnail} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-green-700">{post.title}</h2>
                                <p className="text-gray-600 mt-1">{post.description?.slice(0, 80)}...</p>
                                <div className="mt-2 text-sm text-gray-500 space-y-1">
                                    <p>📍 {post.location}</p>
                                    <p>🏷️ {post.category}</p>
                                    <p>👥 Needed: {post.volunteersNeeded}</p>
                                    <p className="text-red-500">⏳ Deadline: {post.deadline}</p>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => setSelectedPost(post)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto shadow rounded-xl">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-green-100 text-green-900">
                            <tr>
                                <th className="p-3 border">Thumbnail</th>
                                <th className="p-3 border">Title</th>
                                <th className="p-3 border">Category</th>
                                <th className="p-3 border">Location</th>
                                <th className="p-3 border">Volunteers</th>
                                <th className="p-3 border">Deadline</th>
                                <th className="p-3 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volunteerPosts.map(post => (
                                <tr key={post._id} className="text-center hover:bg-gray-50">
                                    <td className="p-2 border">
                                        <img src={post.thumbnail} className="w-16 h-16 mx-auto rounded-md" />
                                    </td>
                                    <td className="p-2 border">{post.title}</td>
                                    <td className="p-2 border">{post.category}</td>
                                    <td className="p-2 border">{post.location}</td>
                                    <td className="p-2 border">{post.volunteersNeeded}</td>
                                    <td className="p-2 border">{post.deadline}</td>
                                    <td className="p-2 border space-x-2">
                                        <button
                                            onClick={() => setSelectedPost(post)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <UpdateModal
                        post={selectedPost}
                        onClose={() => setSelectedPost(null)}
                        onUpdated={fetchPosts}
                    />
                </div>
            )}
        </div>
    );
};

export default NeedVolunteerPage;
