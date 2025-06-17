import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosInstance = axios.create({
    baseURL: 'https://my-awesomeapp-2025.vercel.app',
    // withCredentials: true

})



const useAxiosSecure = () => {
    const { user, logout } = useAuth();

    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        return config;
    })
    axiosInstance.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.status === 401 || error.status === 403) {
            logout()
                .then(() => {
                    alert('401 or 403 status code')

                })
                .catch(err => {
                    alert(err);
                })
            alert('403 ');

        }
    }
    )
    return axiosInstance;
};

export default useAxiosSecure;