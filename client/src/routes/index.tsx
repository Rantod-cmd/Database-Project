// FormData Page
import { createBrowserRouter } from 'react-router-dom';
import { PublicHealthForm } from '../features/form/page/FormData';
import { MainLayout } from '../layouts/MainLayout';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/HealthForm",
                element: <PublicHealthForm />
            }
        ]
    }
])