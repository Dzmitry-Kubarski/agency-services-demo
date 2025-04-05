import classes from './contacts-card.module.css'

import { IContact } from '@/shared/api/contacts'

import Pencel from '@/shared/assests/icons/pencil.svg?react'
import { Button } from '@/shared/ui/button'

interface Iprops {
    data: IContact
    toggleIsEdit: () => void
}

export const СontactsCard = ({ data, toggleIsEdit }: Iprops) => {
    return (
        <div className={classes.card}>
            <div className={classes.header}>
                <p className={classes.title}>Contacts</p>

                <Button variant={'outline'} className={classes.btn} onClick={toggleIsEdit}>
                    <Pencel className={classes.btnIcon} />
                    Edit
                </Button>
            </div>

            <div className={classes.body}>
                <div className={classes.row}>
                    <span>Responsible person::</span>

                    <p>
                        {data.firstname} {data.lastname}
                    </p>
                </div>

                <div className={classes.row}>
                    <span>Phone number:</span>
                    <a href={`tel:+${data.phone}`}>+{data.phone}</a>
                </div>

                <div className={classes.row}>
                    <span>E-mail:</span>
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                </div>
            </div>
        </div>
    )
}
