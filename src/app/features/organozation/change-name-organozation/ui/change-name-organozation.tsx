import { useState } from 'react'
import { toast } from 'react-toastify'

import classes from './change-name-organozation.module.css'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'

import { companiesApi } from '@/shared/api/companies/companies.api'
import Pencil from '@/shared/assests/icons/pencil.svg?react'

interface IProps {
    organizationId: string
    currentName: string
}

export const ChangeNameOrganozation = ({ organizationId, currentName }: IProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const { mutateAsync, isPending } = companiesApi.update.useMutation()

    const [name, setName] = useState(currentName)

    const handlerUpdate = async () => {
        setIsOpen(false)

        await mutateAsync({ id: organizationId, data: { name } })

        toast.success('Editing is successful')
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
                <DialogTrigger asChild>
                    <button className={classes.btn}>
                        <Pencil />
                    </button>
                </DialogTrigger>

                <DialogContent className={classes.dialogContent}>
                    <DialogHeader className={classes.dialogHeader}>
                        <DialogTitle>Specify the Organization's name</DialogTitle>
                    </DialogHeader>

                    <div>
                        <Input value={name} onChange={(e) => setName(e.currentTarget.value)} />
                    </div>

                    <DialogFooter className={classes.dialogFooter}>
                        <DialogClose asChild>
                            <Button variant={'outline'}>Cancel</Button>
                        </DialogClose>

                        <Button variant={'default'} onClick={handlerUpdate}>
                            {!isPending ? 'Save changes' : 'Loading...'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
