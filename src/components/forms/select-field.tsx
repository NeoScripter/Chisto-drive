import { cn } from '@/lib/utils/cn';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

type SelectFieldProps = {
    value: {
        label: string;
        id: number;
    };
    values: {
        label: string;
        id: number;
    }[];
    onChange: (val: number) => void;
    className?: string;
    placeholder?: string;
    hasBorder?: boolean;
    hasMargin?: boolean;
};

export default function SelectField({
    value,
    onChange,
    values,
    className,
    hasBorder,
    hasMargin = true
}: SelectFieldProps) {
    return (
        <div className={className}>
            <Listbox value={value.id} onChange={onChange}>
                <ListboxButton
                    className={cn(
                        'relative pr-8 pl-3 text-text-muted text-sm md:text-base input-field px-4 py-3 md:py-3 md:px-6 rounded-full w-full flex items-center justify-between shadow-sm gap-2 bg-input-bg',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                        hasBorder && 'ring-1 ring-text-muted', hasMargin && 'mb-3'
                    )}
                   
                >
                    {value.label}
                    <ChevronDownIcon
                        className="group pointer-events-none absolute top-1/2 -translate-y-1/2 right-2.5 md:right-3.5 size-4 md:size-5 fill-white/60"
                        aria-hidden="true"
                    />
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom"
                    transition
                    className={cn(
                        'w-full rounded-xl z-10 border max-w-80 sm:w-80 border-white/5 bg-background p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                >
                    {values.map((value) => (
                        <ListboxOption
                            key={value.label}
                            value={value.id}
                            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                        >
                            <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                            <div className="text-sm/6 md:text-base text-white">
                                {value.label}
                            </div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    );
}
