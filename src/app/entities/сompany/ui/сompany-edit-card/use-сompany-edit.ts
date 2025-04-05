import { useRef, useState } from 'react'

import { toast } from 'react-toastify'

import { ICompany, ICompanyDTO, IContract, IContractDTO } from '@/shared/api/companies'
import { companiesApi } from '@/shared/api/companies/companies.api'

export const BUSINESS_ENTITY = ['Sole Proprietorship', 'Partnership', 'Limited Liability Company']

export const COMPANY_TYPE_SELECT = [
    { value: 'funeral_home', label: 'Funeral Home' },
    { value: 'logistics_services', label: 'Logistics services' },
    { value: 'burial_care_contractor', label: 'Burial care Contractor' }
]

interface Iprops {
    company: ICompany
    toggleIsEdit: () => void
}

export const useCompanyEdit = ({ company, toggleIsEdit }: Iprops) => {
    const [form, setForm] = useState({
        contract: { no: company.contract.no, issue_date: company.contract.issue_date.split('T')[0] },
        businessEntity: company.businessEntity,
        type: company.type
    })

    const inputRef = useRef<HTMLInputElement>(null)

    const onShowPicker = () => {
        if (inputRef.current) {
            inputRef.current.showPicker()
        }
    }

    const onFormChange = (field: keyof ICompanyDTO | `contract.${keyof IContractDTO}`, value: unknown) => {
        setForm((prev) => {
            if (typeof field === 'string' && field.startsWith('contract.')) {
                const contractField = field.split('.')[1] as keyof IContractDTO

                return {
                    ...prev,
                    contract: {
                        ...(prev.contract || {}),
                        [contractField]: value
                    } as IContract
                }
            }

            return {
                ...prev,
                [field]: value
            }
        })
    }

    const { mutateAsync, isPending: isPendingUpdate } = companiesApi.update.useMutation()

    const handlerUpdate = async () => {
        await mutateAsync({
            id: company.id,
            data: {
                ...form,
                contract: { ...form.contract, issue_date: new Date(form.contract?.issue_date || new Date()) }
            }
        })

        toast.success('Editing is successful')
        toggleIsEdit()
    }

    return { form, inputRef, onShowPicker, onFormChange, handlerUpdate, isPendingUpdate }
}
