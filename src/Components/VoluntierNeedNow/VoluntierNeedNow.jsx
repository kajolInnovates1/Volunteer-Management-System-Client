import React, { useEffect, useState } from 'react';
import VoluntierSingle from './VoluntierSingle';

const VoluntierNeedNow = () => {
    const [vdatas, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/voluntierneednow')
            .then(res => res.json())
            .then(data => {
                const remainingData = data.slice(0, 6);
                setData(remainingData);
            });

    }, []);

    return (
        <div>
            <h1>This is Voluntier need Now section</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    vdatas.map(singledata => <VoluntierSingle key={singledata._id} singledata={singledata}></VoluntierSingle>)
                }
            </div>

        </div>
    );
};

export default VoluntierNeedNow;