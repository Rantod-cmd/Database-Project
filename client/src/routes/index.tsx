import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import LandingPage from '../features/landing/page/landingpage';
import ProvincialData from '../features/dash_txt/page/ProvincialData';
import AffiliatedHospitals from '../features/hospitals/page/AffiliatedHospitals';
import ContactUs from '../features/contact_us/page/ContactUs';
import PatientReporting from '../features/PatientReporting';
import MapDash from '../features/map/page/MapDash';

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
                element: <AffiliatedHospitals />
            },
            {
                path: "reporting",
                element: <PatientReporting />
            },
            {
                path: "contact",
                element: <ContactUs />
            }
        ]
    }
]);