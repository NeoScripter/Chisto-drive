import { cn } from '@/lib/utils/cn';
import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';

type PrimaryBtnProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    route?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    disabled?: boolean;
};
export default function PrimaryBtn({
    children,
    className,
    onClick,
    route,
    type = 'button',
    disabled = false,
}: PrimaryBtnProps) {
    const baseClasses = cn(
        'flex items-center justify-center cursor-pointer gap-[0.25em] bg-btn-bg rounded-full text-white px-[1.5em] py-[0.75em] transition-colors duration-200 ease-in hover:bg-btn-hover',
        className
    );

    return route != null ? (
        <Link to={route} className={cn('w-max', baseClasses)}>
            {children}
        </Link>
    ) : (
        <Button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={baseClasses}
        >
            {children}
        </Button>
    );
}
