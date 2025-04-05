import { useState } from 'react'

import { ContactsEditCard, СontactsCard } from '@/entities/contacts'

import { IContact } from '@/shared/api/contacts'

interface Iprops {
    data: IContact
}

export const CompanyContacts = ({ data }: Iprops) => {
    const [isEdit, setIsEdit] = useState(false)

    const toggleIsEdit = () => {
        setIsEdit((prev) => !prev)
    }

    if (!data) return null

    return (
        <>
            {!isEdit ? (
                <СontactsCard data={data} toggleIsEdit={toggleIsEdit} />
            ) : (
                <ContactsEditCard data={data} toggleIsEdit={toggleIsEdit} />
            )}
        </>
    )
}
