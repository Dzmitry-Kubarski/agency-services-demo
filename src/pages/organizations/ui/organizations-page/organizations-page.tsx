import { Link } from 'react-router-dom'

import { MOCK_DATA } from './MOCK_DATA'
import classes from './organizations-page.module.css'

import ChevronLeft from '@/shared/assests/icons/chevron-left.svg?react'
import { ROUTES } from '@/shared/routes'

export const OrganizationsPage = () => {
    return (
        <section className={classes.section}>
            {MOCK_DATA.map((card) => (
                <Link to={`${ROUTES.COMPANIES_ORGANIZATIONS}/${card.id}`} key={card.id} className={classes.card}>
                    <p>{card.name}</p>

                    <ChevronLeft className={classes.icon} />
                </Link>
            ))}
        </section>
    )
}
