import { ChangeEvent, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import classes from './add-image.module.css'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { companiesApi } from '@/shared/api/companies/companies.api'
import AddPhoto from '@/shared/assests/icons/addPhoto.svg?react'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024

interface IProps {
    companyId: string
}

export const AddCompanyImage = ({ companyId }: IProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const { mutateAsync, isPending } = companiesApi.addImage.useMutation()

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        const file = e.target.files[0]

        if (!ALLOWED_TYPES.includes(file.type)) {
            toast.warn('Invalid file format. Only allowed: JPG, JPEG, PNG или WEBP.')
            return
        }

        if (file.size > MAX_FILE_SIZE) {
            toast.warn('The file is too big. Maximum size- 10MB.')
            return
        }

        setSelectedFile(file)

        const reader = new FileReader()

        reader.onload = () => {
            setPreviewUrl(reader.result as string)
        }

        reader.readAsDataURL(file)
    }

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.warn('Please select the file')
            return
        }

        const formData = new FormData()
        formData.append('file', selectedFile)

        await mutateAsync({ id: companyId, file: formData })

        toast.success('File added is successful')

        setSelectedFile(null)
        setPreviewUrl(null)
        setIsOpen(false)
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
                <DialogTrigger asChild>
                    <Button variant={'outline'} className={classes.btn}>
                        <AddPhoto />
                        Add
                    </Button>
                </DialogTrigger>

                <DialogContent className={classes.dialogContent}>
                    <DialogHeader className={classes.dialogHeader}>
                        <DialogTitle>Select photo by Organization's</DialogTitle>
                    </DialogHeader>

                    <div className={classes.preview}>{previewUrl && <img src={previewUrl} alt='Preview' />}</div>

                    <div>
                        <Input
                            type='file'
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept='.jpg,.jpeg,.png,.webp'
                            placeholder='select'
                        />
                    </div>

                    <DialogFooter className={classes.dialogFooter}>
                        <DialogClose asChild>
                            <Button variant={'outline'}>Cancel</Button>
                        </DialogClose>

                        <Button variant={'default'} onClick={handleUpload}>
                            {!isPending ? 'Save photo' : 'Loading...'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
