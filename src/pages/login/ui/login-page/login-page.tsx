import classes from './login-page.module.css'

import { Login } from '@/app/features/auth'

export const LoginPage = () => {
    return (
        <section className={classes.section}>
            <Login />
        </section>
    )
}
