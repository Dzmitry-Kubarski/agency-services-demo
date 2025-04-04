export { ProtectedRoute } from './protected-route'
export { PublicRoute } from './public-route'

export const ROUTES = {
    ROOT: '/',
    HOME: '/home',
    LOGIN: '/login',
    TASKS: '/tasks',

    COMPANIES: '/companies',
    SEARCH: '/search',
    SETTINGS: '/settings',

    COMPANIES_ORGANIZATIONS: '/companies/organizations',
    COMPANIES_CONTRACTORS: '/companies/contractors',
    COMPANIES_CLIENTS: '/companies/clients',
    SERVER_ERROR: '/server-error'
} as const
