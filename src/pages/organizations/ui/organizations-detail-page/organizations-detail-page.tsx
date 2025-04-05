import { Link, useParams } from 'react-router-dom'

import classes from './organizations-detail-page.module.css'

import { ChangeNameOrganozation, DeleteOrganozation } from '@/features'
import { companiesApi } from '@/shared/api/companies/companies.api'
import { contactsApi } from '@/shared/api/contacts'

import ChevronLeft from '@/shared/assests/icons/chevron-left.svg?react'
import { ROUTES } from '@/shared/routes'
import { CompanyContacts } from '@/widgets/company-contacts'
import { CompanyDetails } from '@/widgets/company-details'
import { CompanyImages } from '@/widgets/сompany-images'

export const OrganizationsDetailPage = () => {
    const params = useParams()

    const { data, isPending } = companiesApi.byId.useQuery({ variables: { id: params?.id || '' } })

    const { data: dataContacts, isPending: isPendingContacts } = contactsApi.byId.useQuery({
        variables: { id: data?.contactId || '' },
        enabled: !!data?.contactId
    })

    if (isPending || isPendingContacts) {
        return (
            <div className={classes.section}>
                <div className={classes.loader}>Loading...</div>
            </div>
        )
    }

    if (!data) return <div>Не удалось получить данные...</div>

    return (
        <section className={classes.section}>
            <div className={classes.header}>
                <Link to={ROUTES.COMPANIES_ORGANIZATIONS} className={classes.back}>
                    <ChevronLeft />
                </Link>

                <h2 className={classes.title}>{data.name}</h2>

                <div className={classes.control}>
                    <ChangeNameOrganozation organizationId={params?.id || ''} currentName={data.name} />
                    <DeleteOrganozation organizationId={params?.id || ''} />
                </div>
            </div>

            <div className={classes.content}>
                <CompanyDetails company={data} />
                {dataContacts && <CompanyContacts data={dataContacts} />}
                <CompanyImages company={data} />
            </div>
        </section>
    )
}
