import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import classes from './delete-organozation.module.css'

import { companiesApi } from '@/shared/api/companies/companies.api'
import Trash from '@/shared/assests/icons/trash.svg?react'

import { ROUTES } from '@/shared/routes'

import { Button } from '@/shared/ui/button'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/shared/ui/dialog'

interface IProps {
    organizationId: string
}

export const DeleteOrganozation = ({ organizationId }: IProps) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const { mutateAsync, isPending } = companiesApi.delete.useMutation()

    const handlerDelete = async () => {
        setIsOpen(false)

        await mutateAsync({ id: organizationId })

        toast.success('Deletion is successful')

        navigate(ROUTES.COMPANIES_ORGANIZATIONS)
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
                <DialogTrigger asChild>
                    <button className={classes.btn}>
                        <Trash />
                    </button>
                </DialogTrigger>

                <DialogContent className={classes.dialogContent}>
                    <DialogHeader className={classes.dialogHeader}>
                        <DialogTitle>Remove the Organization?</DialogTitle>
                        <DialogDescription>Are you sure you want to remove this Organozation?</DialogDescription>
                    </DialogHeader>

                    <DialogFooter className={classes.dialogFooter}>
                        <DialogClose asChild>
                            <Button variant={'outline'}>No</Button>
                        </DialogClose>

                        <Button variant={'default'} onClick={handlerDelete}>
                            {!isPending ? 'Yes, remove' : 'Loading...'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
