import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'

})



const useAxiosSecure = () => {
    const { user, logout } = useAuth();
    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = ` Bearer ${user?.accessToken}`
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
        }
    }
    )
    return axiosInstance;
};

export default useAxiosSecure;