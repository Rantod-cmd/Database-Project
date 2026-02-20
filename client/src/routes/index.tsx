// FormData Page
import { createBrowserRouter } from 'react-router-dom';
import { PublicHealthForm } from '../features/form/page/FormData';
import { MainLayout } from '../layouts/MainLayout';
import MapDash from '../features/map/page/mapDash'

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
                path: "/map",
                element: <MapDash />
            }
        ]
    }
])