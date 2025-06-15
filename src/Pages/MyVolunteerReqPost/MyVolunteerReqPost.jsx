import React, { useEffect, useState } from 'react';

const MyVolunteerReqPost = () => {
    const [reqDatas, setReqData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/volunteerRequests?email=mdraselislamkajol201@gmail.com')
            .then(res => res.json())
            .then(datas => setReqData(datas));


    }, [])
    return (
        <div>
            {
                reqDatas.length
            }

        </div>
    );
};

export default MyVolunteerReqPost;