import { Link, useLocation } from 'react-router-dom'

import classes from './main-navbar.module.css'

import { Logout } from '@/features/auth'
import Briefcase from '@/shared/assests/icons/briefcase.svg?react'
import Search from '@/shared/assests/icons/search.svg?react'
import Settings from '@/shared/assests/icons/settings.svg?react'

import Logo from '@/shared/assests/logo.svg?react'

import { ROUTES } from '@/shared/routes'

const mainRoutes = [
    { path: ROUTES.COMPANIES, label: 'Agencies', icon: <Briefcase /> },
    { path: ROUTES.SEARCH, label: 'Search', icon: <Search /> }
]

export const MainNavbar = () => {
    const location = useLocation()

    return (
        <nav className={classes.mainNavbar}>
            <Logo width={36} height={36} className={classes.logo} />

            <div className={classes.links}>
                {mainRoutes.map((route) => (
                    <Link
                        className={classes.link}
                        key={route.path}
                        to={route.path}
                        data-active={location.pathname.startsWith(route.path) ? 'Y' : ''}
                    >
                        {route.icon}
                    </Link>
                ))}
            </div>

            <div className={classes.divider} />

            <div className={classes.footer}>
                <Link className={classes.link} to={ROUTES.SETTINGS} data-active={location.pathname.startsWith(ROUTES.SETTINGS) ? 'Y' : ''}>
                    <Settings />
                </Link>

                <Logout />
            </div>
        </nav>
    )
}
