import { Link, useLocation } from 'react-router-dom'

import classes from './inner-navbar.module.css'

import Briefcase from '@/shared/assests/icons/briefcase.svg?react'

import { ROUTES } from '@/shared/routes'

const subRoutes = [
    { path: ROUTES.COMPANIES_ORGANIZATIONS, label: 'Organizations', icon: <Briefcase /> },
    { path: ROUTES.COMPANIES_CONTRACTORS, label: 'Contractors', icon: <Briefcase /> },
    { path: ROUTES.COMPANIES_CLIENTS, label: 'Clients', icon: <Briefcase /> }
]

export const InnerNavbar = () => {
    const location = useLocation()

    return (
        <nav className={classes.innerNavbar}>
            <div className={classes.header}>
                <p className={classes.title}>Oak Tree Cemetery</p>
                <p className={classes.text}>Process Manager</p>
            </div>

            <div className={classes.divider} />

            {location.pathname.startsWith(ROUTES.COMPANIES) && (
                <div className={classes.links}>
                    {subRoutes.map((route) => (
                        <Link key={route.path} to={route.path} data-active={location.pathname.includes(route.path) ? 'Y' : ''}>
                            {route.icon} {route.label}
                        </Link>
                    ))}
                </div>
            )}

            <div className={classes.footer}>All Funeral Services © 2015-2025</div>
        </nav>
    )
}
