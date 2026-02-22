import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import LandingPage from '../features/page/landingpage';
import EpidemicMap from '../features/page/EpidemicMap';
import ProvincialData from '../features/page/ProvincialData';
import AffiliatedHospitals from '../features/page/AffiliatedHospitals';
import ContactUs from '../features/page/ContactUs';
import PatientReporting from '../features/page/PatientReporting';

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
                element: <EpidemicMap />
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