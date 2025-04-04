import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '@/shared/routes'

export const ProtectedRoute = () => {
    const token = localStorage.getItem('authToken')

    if (!token) {
        return <Navigate to={ROUTES.LOGIN} replace />
    }

    return <Outlet />
}
