import React, { useEffect, useState } from 'react';
import VoluntierSingle from './VoluntierSingle';
import { FaExclamationCircle } from 'react-icons/fa';


const VoluntierNeedNow = () => {
    const [vdatas, setData] = useState([]);

    useEffect(() => {
        fetch('https://my-awesomeapp-2025.vercel.app/voluntierneednow',)
            .then(res => res.json())
            .then(data => {
                const remainingData = data.slice(0, 6);
                setData(remainingData);
            });

    }, []);
    const renderEmpty = () => (
        <div className="flex flex-col items-center justify-center h-60 text-center px-6">
            <FaExclamationCircle className="text-7xl text-red-500 mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold text-gray-700 mb-2">No Needs Right Now</h2>
            <p className="text-gray-500 max-w-md">
                Currently, there are no urgent volunteer needs. Please check back later or explore other sections.
            </p>
        </div>
    );

    return (
        <div className='my-24'>
            <h1 className='text-2xl md:text-4xl lg:text-5xl text-green-600 text-center mb-12'>Volunteer Needs Now</h1>
            {(!vdatas || vdatas.length === 0) ? (
                renderEmpty()
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        vdatas.map(singledata => <VoluntierSingle key={singledata._id} singledata={singledata}></VoluntierSingle>)
                    }
                </div>

            )}



        </div>
    );
};

export default VoluntierNeedNow;