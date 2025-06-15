import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UpdateModal from './UpdateModal';
import useAuth from '../../Hooks/useAuth';

const MyVolunteerNeedPosts = () => {
    const { user } = useAuth();
    const [myPosts, setMyPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    const fetchPosts = () => {
        fetch(`http://localhost:3000/needvoluntier?email=${user.email}`)
            .then(res => res.json())
            .then(data => setMyPosts(data));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This post will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/volunteerNeeds/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
                        fetchPosts();
                    });
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center text-green-700">My Volunteer Need Posts</h2>

            {myPosts.length === 0 ? (
                <p className="text-center text-gray-500">You haven’t added any volunteer post yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border shadow-xl rounded-xl">
                        <thead className="bg-green-100 text-green-900">
                            <tr>
                                <th className="px-4 py-2">Thumbnail</th>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Category</th>
                                <th className="px-4 py-2">Location</th>
                                <th className="px-4 py-2">Volunteers</th>
                                <th className="px-4 py-2">Deadline</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myPosts.map(post => (
                                <tr key={post._id} className="border-b">
                                    <td className="px-4 py-2"><img src={post.thumbnail} className="w-16 h-16 rounded-md" /></td>
                                    <td className="px-4 py-2">{post.title}</td>
                                    <td className="px-4 py-2">{post.category}</td>
                                    <td className="px-4 py-2">{post.location}</td>
                                    <td className="px-4 py-2">{post.volunteersNeeded}</td>
                                    <td className="px-4 py-2">{post.deadline}</td>
                                    <td className="px-4 py-2 space-x-2">
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

export default MyVolunteerNeedPosts;
