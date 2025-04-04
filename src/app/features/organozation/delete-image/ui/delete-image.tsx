import { toast } from 'react-toastify'

import classes from './delete-image.module.css'

import { Button } from '@/components/ui/button'

import { companiesApi } from '@/shared/api/companies/companies.api'
import Trash from '@/shared/assests/icons/trash.svg?react'

interface IProps {
    companyId: string
    imageName: string
}

export const DeleteImage = ({ imageName, companyId }: IProps) => {
    const { mutateAsync } = companiesApi.deleteImage.useMutation()

    const handlerDelete = async () => {
        await mutateAsync({ id: companyId, imageName })
        toast.success('Deletion is successful')
    }

    return (
        <>
            <Button className={classes.btn} onClick={handlerDelete}>
                <Trash />
            </Button>
        </>
    )
}
