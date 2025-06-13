import {
    createBrowserRouter,

} from "react-router";
import Layouts from "../MainLayouts/Layouts";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layouts,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'signup',
                Component: SignUp
            },
            {
                path: 'login',
                Component: LogIn
            }
        ]
    },
]);