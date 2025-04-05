import classes from './сompany-details-card.module.css'

import { ICompany } from '@/shared/api/companies'
import Pencel from '@/shared/assests/icons/pencil.svg?react'

import { formatDate } from '@/shared/lib/format-date'
import { Button } from '@/shared/ui/button'

interface Iprops {
    company: ICompany
    toggleIsEdit: () => void
}

export const CompanyDdetailsCard = ({ company, toggleIsEdit }: Iprops) => {
    return (
        <div className={classes.card}>
            <div className={classes.header}>
                <p className={classes.title}>Company Details</p>

                <Button variant={'outline'} className={classes.btn} onClick={toggleIsEdit}>
                    <Pencel className={classes.btnIcon} />
                    Edit
                </Button>
            </div>

            <div className={classes.body}>
                <div className={classes.row}>
                    <span>Agreement:</span>

                    <p>
                        {company.contract.no} <span className={classes.separator}>/</span> {formatDate(company.contract.issue_date)}
                    </p>
                </div>

                <div className={classes.row}>
                    <span>Business entity:</span>
                    <p>{company.businessEntity}</p>
                </div>

                <div className={classes.row}>
                    <span>Company type:</span>
                    <p>{company.type.join(', ')}</p>
                </div>
            </div>
        </div>
    )
}
