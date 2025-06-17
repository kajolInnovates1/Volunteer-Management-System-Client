import React from 'react';
import Banner from '../Components/Banner';
import VoluntierNeedNow from '../Components/VoluntierNeedNow/VoluntierNeedNow';
import ExtraSection from '../Components/ExtraSection/ExtraSection';
import { useTheme } from '../AuthProvider/ThemeProvider';

const Home = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className={`min-h-[calc(100vh-290px)] px-8 ${theme === 'light' ? 'bg-gray-500 text-white' : ''}`}>
            <Banner></Banner>
            <VoluntierNeedNow></VoluntierNeedNow>
            <ExtraSection></ExtraSection>




        </div>
    );
};

export default Home;