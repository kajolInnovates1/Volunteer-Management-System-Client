import React, { useEffect, useState } from 'react';
import VoluntierSingle from '../../Components/VoluntierNeedNow/VoluntierSingle';

const AllVoluntierNeedPosts = () => {
    const [vdatas, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [query, setQuery] = useState(''); // search query


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const url = query
                    ? `http://localhost:3000/allvoluntier?search=${encodeURIComponent(query)}`
                    : 'http://localhost:3000/allvoluntier';

                const res = await fetch(url);
                const data = await res.json();
                setData(data);
            } catch (err) {
                console.error('Error fetching:', err);
                setData([]);
            }
            setLoading(false);
        };

        fetchData();
    }, [query]);

    const handleSearch = () => {
        setQuery(searchInput);
    };

    return (
        <div className="min-h-[calc(100vh-290px)] px-8 py-10">
            {/* Search Input and Button */}
            <div className="mb-8 max-w-xl mx-auto flex gap-2">
                <input
                    type="text"
                    placeholder="Search by post title..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
                >
                    Search
                </button>
            </div>

            {/* Data section */}
            {loading ? (
                <p className="text-center mt-10 text-lg text-gray-600">Loading...</p>
            ) : vdatas.length === 0 ? (
                <p className="text-center mt-10 text-lg text-red-500 font-semibold">No posts found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {vdatas.map(singledata => (
                        <VoluntierSingle key={singledata._id} singledata={singledata} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllVoluntierNeedPosts;
