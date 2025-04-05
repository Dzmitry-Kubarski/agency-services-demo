import classes from './login-page.module.css'

import { Login } from '@/features/auth'

export const LoginPage = () => {
    return (
        <section className={classes.section}>
            <Login />
        </section>
    )
}
