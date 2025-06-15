import React, { useEffect, useState } from 'react';

const MyVolunteerNeedPost = () => {
    const [needDatas, setNeedData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/needvoluntier?email=kajol@example.com')
            .then(res => res.json())
            .then(datas => setNeedData(datas));


    }, [])
    return (
        <div className='min-h-[calc(100vh-290px)]'>
            {
                needDatas.length
            }
        </div>
    );
};

export default MyVolunteerNeedPost;