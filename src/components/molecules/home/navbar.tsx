import { Button } from '@headlessui/react';
import CitySelector from '@/components/molecules/shared/city-selector';
import { useAuthContext } from '@/lib/hooks/context/use-auth-context';
import LoginBtn from '@/components/atoms/login-btn';
import Logo from '@/components/atoms/logo';

export default function Navbar() {
    const { toggleLoginDialog, toggleSignupDialog } = useAuthContext();

    return (
        <>
            <nav
                aria-label="Основная навигация"
                className="flex relative items-center py-2 pr-2.5 pl-4.5 sm:py-2.5 sm:pr-5 sm:pl-9 justify-between rounded-full bg-background text-xs sm:text-sm gap-1"
            >
                <Logo className="shrink-0 w-22 sm:w-32.25 hidden sm:block" />

                <CitySelector className='sm:mr-auto sm:ml-5 xs:min-w-55 sm:min-w-70 z-10' />

                <div className="flex items-center gap-2 md:gap-4">
                    <Button
                        onClick={() => toggleSignupDialog(true)}
                        className="hidden md:block hover:underline underline-offset-4 cursor-pointer"
                    >
                        Регистрация
                    </Button>
                    <LoginBtn onClick={() => toggleLoginDialog(true)}/>
                </div>
            </nav>
        </>
    );
}
