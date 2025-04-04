import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '@/shared/routes'

export const PublicRoute = () => {
    const token = localStorage.getItem('authToken')

    if (token) {
        return <Navigate to={ROUTES.HOME} replace />
    }

    return <Outlet />
}
