import { useState } from 'react'
import { toast } from 'react-toastify'

import classes from './contacts-edit-card.module.css'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { contactsApi, IContact } from '@/shared/api/contacts'
import Check from '@/shared/assests/icons/check.svg?react'
import Cancel from '@/shared/assests/icons/close.svg?react'

interface Iprops {
    data: IContact
    toggleIsEdit: () => void
}

export const ContactsEditCard = ({ data, toggleIsEdit }: Iprops) => {
    const [form, setForm] = useState({
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email
    })

    const handleChange = (field: keyof IContact, value: string) => {
        setForm((prev) => {
            return {
                ...prev,
                [field]: value
            }
        })
    }

    const { mutateAsync, isPending } = contactsApi.update.useMutation()

    const handlerUpdate = async () => {
        await mutateAsync({
            id: data.id,
            data: form
        })

        toast.success('Editing is successful')
        toggleIsEdit()
    }

    return (
        <div className={classes.card}>
            <div className={classes.header}>
                <p className={classes.title}>Contacts</p>

                <div className={classes.buttons}>
                    <Button variant={'outline'} className={classes.btn} onClick={handlerUpdate}>
                        <Check className={classes.btnIcon} />
                        {!isPending ? 'Save changes' : 'Loading...'}
                    </Button>

                    <Button variant={'outline'} className={classes.btn} onClick={toggleIsEdit}>
                        <Cancel className={classes.btnIcon} />
                        Cancel
                    </Button>
                </div>
            </div>

            <div className={classes.body}>
                <div className={classes.row}>
                    <span className={classes.rowLabel}>Responsible person:</span>

                    <div className={classes.fields}>
                        <Input value={form.firstname} onChange={(e) => handleChange('firstname', e.currentTarget.value)} />

                        <div className={classes.lastName}>
                            <Input value={form.lastname} onChange={(e) => handleChange('lastname', e.currentTarget.value)} />
                        </div>
                    </div>
                </div>

                <div className={classes.row}>
                    <span className={classes.rowLabel}>Phone number:</span>
                    <Input value={form.phone} onChange={(e) => handleChange('phone', e.currentTarget.value)} />
                </div>

                <div className={classes.row}>
                    <span className={classes.rowLabel}>E-mail:</span>
                    <Input value={form.email} onChange={(e) => handleChange('email', e.currentTarget.value)} />
                </div>
            </div>
        </div>
    )
}
