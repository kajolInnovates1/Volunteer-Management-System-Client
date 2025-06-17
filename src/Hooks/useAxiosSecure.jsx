import axios, { formToJSON } from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { getAccesToken } from '../AuthProvider/AuthProvider';

const axiosInstance = axios.create({
    baseURL: 'https://my-awesomeapp-2025.vercel.app',
    // withCredentials: true

})



const useAxiosSecure = () => {
    const { user, logout } = useAuth();
    const token = getAccesToken();


    useEffect(() => {
        const axiosInstanceRequest = axiosInstance.interceptors.request.use(config => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config;
        })
        const axiosInstanceResponse = axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.status === 401 || error.status === 403) {
                // logout()
                //     .then(() => {
                //         alert('401 or 403 status code')

                //     })
                //     .catch(err => {
                //         alert(err);
                //     })


            }
        }
        )

        return () => {
            axiosInstance.interceptors.request.eject(axiosInstanceRequest);
            axiosInstance.interceptors.response.eject(axiosInstanceResponse);

        };

    }, [token])
    return axiosInstance;
};

export default useAxiosSecure;