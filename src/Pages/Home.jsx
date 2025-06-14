import React from 'react';
import Banner from '../Components/Banner';
import VoluntierNeedNow from '../Components/VoluntierNeedNow/VoluntierNeedNow';

const Home = () => {
    return (
        <div className="min-h-[calc(100vh-290px)]">
            <Banner></Banner>
            <VoluntierNeedNow></VoluntierNeedNow>

        </div>
    );
};

export default Home;