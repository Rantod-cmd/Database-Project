// FormData Page
import { createBrowserRouter } from 'react-router-dom';
import { PublicHealthForm } from '../features/form/page/HealthForm';
import { MainLayout } from '../layouts/MainLayout';
import Information from '../features/form/page/provinces';
import Patient from '../features/form/page/Patient';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/HealthForm",
                element: <PublicHealthForm />
            },
            {
                path: "/provinces",
                element: <Information />
            },
            {
                path: "/statistics",
                element: <Patient />
            }
        ]
    }
])