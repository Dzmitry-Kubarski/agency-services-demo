import { useState } from 'react'

import { CompanyDdetailsCard, CompanyEditCard } from '@/entities/сompany'
import { ICompany } from '@/shared/api/companies'

interface Iprops {
    company: ICompany
}

export const CompanyDetails = ({ company }: Iprops) => {
    const [isEdit, setIsEdit] = useState(false)

    const toggleIsEdit = () => {
        setIsEdit((prev) => !prev)
    }

    return (
        <>
            {!isEdit ? (
                <CompanyDdetailsCard company={company} toggleIsEdit={toggleIsEdit} />
            ) : (
                <CompanyEditCard company={company} toggleIsEdit={toggleIsEdit} />
            )}
        </>
    )
}
