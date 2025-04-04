import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import classes from './сompany-edit-card.module.css'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import MultiSelect from '@/components/ui/multi-select'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { ICompany, ICompanyDTO, IContract, IContractDTO } from '@/shared/api/companies'
import { companiesApi } from '@/shared/api/companies/companies.api'
import Check from '@/shared/assests/icons/check.svg?react'
import Cancel from '@/shared/assests/icons/close.svg?react'

const BUSINESS_ENTITY = ['Sole Proprietorship', 'Partnership', 'Limited Liability Company']

const COMPANY_TYPE_SELECT = [
    { value: 'funeral_home', label: 'Funeral Home' },
    { value: 'logistics_services', label: 'Logistics services' },
    { value: 'burial_care_contractor', label: 'Burial care Contractor' }
]

interface Iprops {
    company: ICompany
    toggleIsEdit: () => void
}

export const CompanyEditCard = ({ company, toggleIsEdit }: Iprops) => {
    const [form, setForm] = useState({
        contract: { no: company.contract.no, issue_date: company.contract.issue_date.split('T')[0] },
        businessEntity: company.businessEntity,
        type: company.type
    })

    const inputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.showPicker()
        }
    }

    const handleChange = (field: keyof ICompanyDTO | `contract.${keyof IContractDTO}`, value: unknown) => {
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

    const { mutateAsync, isPending } = companiesApi.update.useMutation()

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

    return (
        <div className={classes.card}>
            <div className={classes.header}>
                <p className={classes.title}>Company Details</p>

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
                    <span className={classes.rowLabel}>Agreement number:</span>

                    <div className={classes.fields}>
                        <Input value={form.contract?.no} onChange={(e) => handleChange('contract.no', e.currentTarget.value)} />

                        <div className={classes.date}>
                            <span>Date:</span>

                            <Input
                                ref={inputRef}
                                type='date'
                                onClick={handleClick}
                                value={form.contract?.issue_date}
                                onChange={(e) => handleChange('contract.issue_date', e.currentTarget.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className={classes.row}>
                    <span className={classes.rowLabel}>Business entity:</span>

                    <Select value={form.businessEntity} onValueChange={(value) => handleChange('businessEntity', value)}>
                        <SelectTrigger className={classes.selectTrigger}>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                {BUSINESS_ENTITY.map((elem) => (
                                    <SelectItem key={elem} value={elem} className={classes.selectItem}>
                                        {elem}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className={classes.row}>
                    <span className={classes.rowLabel}>Company type:</span>

                    <div className={classes.miltiSelectWrap}>
                        <MultiSelect
                            options={COMPANY_TYPE_SELECT}
                            selectedValues={form.type || []}
                            setSelectedValues={(value) => handleChange('type', value)}
                            placeholder='Select company type...'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
