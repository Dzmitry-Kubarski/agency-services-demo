import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import classes from './logout.module.css'

import SignOut from '@/shared/assests/icons/signOut.svg?react'
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

export const Logout = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const handlerLogout = () => {
        localStorage.removeItem('authToken')
        setIsOpen(false)
        navigate(ROUTES.LOGIN)
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
                <DialogTrigger asChild>
                    <button className={classes.btn}>
                        <SignOut />
                    </button>
                </DialogTrigger>

                <DialogContent className={classes.dialogContent}>
                    <DialogHeader>
                        <DialogTitle>Logout</DialogTitle>
                        <DialogDescription>Do you want to exit the app?</DialogDescription>
                    </DialogHeader>

                    <DialogFooter className={classes.dialogFooter}>
                        <DialogClose asChild>
                            <Button variant={'outline'}>Cancel</Button>
                        </DialogClose>

                        <Button variant={'default'} onClick={handlerLogout}>
                            Yes, get out
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
