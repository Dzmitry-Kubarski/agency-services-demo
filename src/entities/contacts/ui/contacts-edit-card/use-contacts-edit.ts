import { useState } from 'react'
import { toast } from 'react-toastify'

import { contactsApi, IContact } from '@/shared/api/contacts'

interface Iprops {
    data: IContact
    toggleIsEdit: () => void
}

export const useContactsEdit = ({ data, toggleIsEdit }: Iprops) => {
    const [form, setForm] = useState({
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email
    })

    const formChange = (field: keyof IContact, value: string) => {
        setForm((prev) => {
            return {
                ...prev,
                [field]: value
            }
        })
    }

    const { mutateAsync, isPending: isPendingUpdate } = contactsApi.update.useMutation()

    const handlerUpdate = async () => {
        await mutateAsync({
            id: data.id,
            data: form
        })

        toast.success('Editing is successful')
        toggleIsEdit()
    }

    return { form, formChange, handlerUpdate, isPendingUpdate }
}
