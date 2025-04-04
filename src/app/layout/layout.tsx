import { Outlet } from 'react-router-dom'

import classes from './layout.module.css'

import { InnerNavbar, MainNavbar } from '@/widgets/navbar'

export const Layout = () => {
    return (
        <div className={classes.layout}>
            <MainNavbar />

            <div className={classes.inner}>
                <InnerNavbar />

                <main className={classes.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
