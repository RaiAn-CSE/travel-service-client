import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import LocationDetails from "../../Pages/Home/Services/LocationDetails/LocationDetails";
import Review from "../../Pages/Home/Services/Review/Review";
import ServiceDetails from "../../Pages/Home/Services/ServiceDetails/ServiceDetails";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/servicedetails",
                element: <ServiceDetails></ServiceDetails>
            },
            {
                path: "/locationdetails/:id",
                element: <LocationDetails></LocationDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
            },
            {
                path: "/review",
                element: <Review></Review>
            },
            // {
            //     path: "/checkout/:id",
            //     element: <Checkout></Checkout>,
            //     loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
            // },
            // {
            //     path: "/orders",
            //     element: <Orders></Orders>
            // },
        ]
    }
]);

export default router;