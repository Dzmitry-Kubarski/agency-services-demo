import { Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from './layout/layout'

import { ClientsPage } from '@/pages/clients'
import { ContractorsPage } from '@/pages/contractors'
import { ServerErrorPage } from '@/pages/error'
import { LoginPage } from '@/pages/login'
import { OrganizationsDetailPage, OrganizationsPage } from '@/pages/organizations'
import { SearchPage } from '@/pages/search'
import { SettingsPage } from '@/pages/settings'
import { ProtectedRoute, PublicRoute, ROUTES } from '@/shared/routes'

const App = () => {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route index element={<Navigate to={ROUTES.COMPANIES} replace />} />

                    <Route path={ROUTES.COMPANIES}>
                        <Route index element={<Navigate to={ROUTES.COMPANIES_ORGANIZATIONS} replace />} />

                        <Route path='organizations'>
                            <Route index element={<OrganizationsPage />} />
                            <Route path=':id' element={<OrganizationsDetailPage />} />
                        </Route>

                        <Route path='contractors' element={<ContractorsPage />} />
                        <Route path='clients' element={<ClientsPage />} />
                    </Route>

                    <Route path={ROUTES.SEARCH} element={<SearchPage />} />
                    <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
                </Route>
            </Route>

            <Route path={ROUTES.SERVER_ERROR} element={<ServerErrorPage />} />
        </Routes>
    )
}

export default App
