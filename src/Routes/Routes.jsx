import {
    createBrowserRouter,

} from "react-router";
import Layouts from "../MainLayouts/Layouts";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";
import AllVoluntierNeedPosts from "../Pages/AllVoluntierNeedPosts/AllVoluntierNeedPosts";
import DetailsPage from "../Pages/DetailsPage/DetailsPage";
import AddNeedVoluntieer from "../Pages/AddNeedVoluntieer/AddNeedVoluntieer";
import MyVolunteerNeedPost from "../Pages/MyVolunteerNeedPost/MyVolunteerNeedPost";
import MyVolunteerReqPost from "../Pages/MyVolunteerReqPost/MyVolunteerReqPost";
import UpdateModal from "../Pages/MyVolunteerNeedPost/UpdateModal";
import ErrorPage from "../Components/ErrorPage/ErrorPage";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layouts,
        errorElement: <ErrorPage></ErrorPage>,
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
            },
            {
                path: '/allneedpost',
                Component: AllVoluntierNeedPosts
            },
            {
                path: '/detailspage/:id',
                loader: ({ params }) => fetch(`https://my-awesomeapp-2025.vercel.app/allvoluntier/${params.id}`),
                Component: DetailsPage
            },
            {
                path: '/addvoluntieer',
                Component: AddNeedVoluntieer
            },
            {
                path: '/my-need-posts',
                Component: MyVolunteerNeedPost
            },
            {
                path: '/my-request-posts',
                Component: MyVolunteerReqPost
            },
            {
                path: '/updatemodal',
                Component: UpdateModal
            },
            {
                path: '/*',
                Component: ErrorPage
            }
        ]
    },
]);