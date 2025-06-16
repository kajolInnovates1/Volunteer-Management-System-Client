import React from 'react';
import Banner from '../Components/Banner';
import VoluntierNeedNow from '../Components/VoluntierNeedNow/VoluntierNeedNow';
import ExtraSection from '../Components/ExtraSection/ExtraSection';

const Home = () => {
    return (
        <div className="min-h-[calc(100vh-290px)] px-8 dark:bg-gray-900">
            <Banner></Banner>
            <VoluntierNeedNow></VoluntierNeedNow>
            <ExtraSection></ExtraSection>




        </div>
    );
};

export default Home;