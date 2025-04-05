import classes from './contacts-edit-card.module.css'
import { useContactsEdit } from './use-contacts-edit'

import { IContact } from '@/shared/api/contacts'
import Check from '@/shared/assests/icons/check.svg?react'
import Cancel from '@/shared/assests/icons/close.svg?react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

interface Iprops {
    data: IContact
    toggleIsEdit: () => void
}

export const ContactsEditCard = ({ data, toggleIsEdit }: Iprops) => {
    const { form, formChange, handlerUpdate, isPendingUpdate } = useContactsEdit({ data, toggleIsEdit })

    return (
        <div className={classes.card}>
            <div className={classes.header}>
                <p className={classes.title}>Contacts</p>

                <div className={classes.buttons}>
                    <Button variant={'outline'} className={classes.btn} onClick={handlerUpdate}>
                        <Check className={classes.btnIcon} />
                        {!isPendingUpdate ? 'Save changes' : 'Loading...'}
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
                        <Input value={form.firstname} onChange={(e) => formChange('firstname', e.currentTarget.value)} />

                        <div className={classes.lastName}>
                            <Input value={form.lastname} onChange={(e) => formChange('lastname', e.currentTarget.value)} />
                        </div>
                    </div>
                </div>

                <div className={classes.row}>
                    <span className={classes.rowLabel}>Phone number:</span>
                    <Input value={form.phone} onChange={(e) => formChange('phone', e.currentTarget.value)} />
                </div>

                <div className={classes.row}>
                    <span className={classes.rowLabel}>E-mail:</span>
                    <Input value={form.email} onChange={(e) => formChange('email', e.currentTarget.value)} />
                </div>
            </div>
        </div>
    )
}
