import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import LandingPage from '../features/landing/page/landingpage';
import ProvincialData from '../features/dash_txt/page/ProvincialData';
import AffiliatedHospitals from '../features/hospitals/page/AffiliatedHospitals';
import ContactUs from '../features/contact_us/page/ContactUs';
import PatientReporting from '../features/PatientReporting';
import MapDash from '../features/map/page/MapDash';
import Login from '../features/login/page/Login';
import Register from '../features/register/page/register';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: "map",
                element: <MapDash />
            },
            {
                path: "provinces",
                element: <ProvincialData />
            },
            {
                path: "hospitals",
                element: <ProtectedRoute><AffiliatedHospitals /></ProtectedRoute>
            },
            {
                path: "reporting",
                element: <ProtectedRoute><PatientReporting /></ProtectedRoute>
            },
            {
                path: "contact",
                element: <ContactUs />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]);