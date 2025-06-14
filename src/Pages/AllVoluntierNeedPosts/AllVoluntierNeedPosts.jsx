import React, { useEffect, useState } from 'react';
import VoluntierSingle from '../../Components/VoluntierNeedNow/VoluntierSingle';

const AllVoluntierNeedPosts = () => {
    const [vdatas, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/allvoluntier')
            .then(res => res.json())
            .then(data => {

                setData(data);
            });

    }, []);
    return (
        <div className='min-h-[calc(100vh-290px)]'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    vdatas.map(singledata => <VoluntierSingle key={singledata._id} singledata={singledata}></VoluntierSingle>)
                }
            </div>
        </div>
    );
};

export default AllVoluntierNeedPosts;