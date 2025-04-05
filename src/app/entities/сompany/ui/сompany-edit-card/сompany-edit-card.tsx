import { BUSINESS_ENTITY, COMPANY_TYPE_SELECT, useCompanyEdit } from './use-сompany-edit'
import classes from './сompany-edit-card.module.css'

import { ICompany } from '@/shared/api/companies'
import Check from '@/shared/assests/icons/check.svg?react'
import Cancel from '@/shared/assests/icons/close.svg?react'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import MultiSelect from '@/shared/ui/multi-select'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

interface Iprops {
    company: ICompany
    toggleIsEdit: () => void
}

export const CompanyEditCard = ({ company, toggleIsEdit }: Iprops) => {
    const { form, inputRef, isPendingUpdate, onShowPicker, onFormChange, handlerUpdate } = useCompanyEdit({ company, toggleIsEdit })

    return (
        <div className={classes.card}>
            <div className={classes.header}>
                <p className={classes.title}>Company Details</p>

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
                    <span className={classes.rowLabel}>Agreement number:</span>

                    <div className={classes.fields}>
                        <Input value={form.contract?.no} onChange={(e) => onFormChange('contract.no', e.currentTarget.value)} />

                        <div className={classes.date}>
                            <span>Date:</span>

                            <Input
                                ref={inputRef}
                                type='date'
                                onClick={onShowPicker}
                                value={form.contract?.issue_date}
                                onChange={(e) => onFormChange('contract.issue_date', e.currentTarget.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className={classes.row}>
                    <span className={classes.rowLabel}>Business entity:</span>

                    <Select value={form.businessEntity} onValueChange={(value) => onFormChange('businessEntity', value)}>
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
                            setSelectedValues={(value) => onFormChange('type', value)}
                            placeholder='Select company type...'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
