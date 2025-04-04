'use client'

import { Check, X } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Command, CommandList, CommandItem, CommandEmpty } from '@/components/ui/command'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

import ChevronDown from '@/shared/assests/icons/chevron-down.svg?react'

interface Option {
    value: string
    label: string
}

interface MultiSelectProps {
    options: Option[]
    selectedValues: string[]
    setSelectedValues: (values: string[]) => void
    placeholder?: string
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedValues, setSelectedValues, placeholder }) => {
    const [open, setOpen] = useState(false)

    const toggleSelection = (value: string) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((item) => item !== value))
        } else {
            setSelectedValues([...selectedValues, value])
        }
    }

    const removeSelected = (value: string) => {
        setSelectedValues(selectedValues.filter((item) => item !== value))
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className='min-h-[40px] flex justify-between px-2 pb-2 items-center h-full min-w-[200px]' variant='outline'>
                    <div className='flex gap-1 flex-wrap'>
                        {selectedValues.length > 0 ? (
                            selectedValues.map((val) => (
                                <Badge
                                    key={val}
                                    className='flex items-center gap-1 px-2 py-1 bg-transparent text-black  dark:text-white rounded-md'
                                >
                                    {options.find((opt) => opt.value === val)?.label}
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeSelected(val)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.stopPropagation()
                                                removeSelected(val)
                                            }
                                        }}
                                        className='ml-1 text-red-500 hover:text-red-700 cursor-pointer'
                                    >
                                        <X className='h-3 w-3' />
                                    </div>
                                </Badge>
                            ))
                        ) : (
                            <span className='text-gray-500'>{placeholder || 'Select options...'}</span>
                        )}
                    </div>
                    <ChevronDown className='ml-2 shrink-0 opacity-50 !w-[12px] !h-[12px]' />
                </Button>
            </PopoverTrigger>

            <PopoverContent className='p-0' align='start'>
                <Command>
                    <CommandList>
                        {options.length === 0 ? (
                            <CommandEmpty>No options found.</CommandEmpty>
                        ) : (
                            options.map((option) => {
                                const isSelected = selectedValues.includes(option.value)

                                return (
                                    <CommandItem key={option.value} onSelect={() => toggleSelection(option.value)} className='min-h-[40px]'>
                                        <div className='flex items-center'>
                                            <div className='w-5 h-5 !flex !items-center !justify-center !border !border-solid !border-[rgba(0,0,0,0.3)] rounded-[4px] !mx-[12px]'>
                                                <Check className={`h-4 w-4 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                                            </div>

                                            {option.label}
                                        </div>
                                    </CommandItem>
                                )
                            })
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default MultiSelect
