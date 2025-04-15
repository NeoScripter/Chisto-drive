import Logo from '@/components/atoms/logo';
import { useUserContext } from '@/lib/hooks/context/use-user-context';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserSvg from '@/assets/svgs/user.svg';
import PrimaryBtn from '@/components/atoms/primary-btn';
import AccountNavLink from '@/components/atoms/account-nav-link';
import { useLogout } from '@/lib/hooks/auth/use-logout';

export default function AccountLayout() {
    const { isLoading, isLoggedIn, user } = useUserContext();
    const navigate = useNavigate();
    const { mutate: logout, isPending } = useLogout();

    useEffect(() => {
        if (!isLoggedIn && isLoading === false) {
            navigate('/');
        }
    }, [isLoading]);

    return (
        <div className="primary-px primary-py">
            <header className="flex items-center justify-center mb-6 sm:mb-10 xl:mb-12">
                <Logo className="w-33.5 sm:w-80 xl:w-123.5" />
            </header>
            <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-4 gap-4 sm:mb-6">
                        <div className="w-10 sm:w-12">
                            <img
                                src={UserSvg}
                                alt="Иконка пользователя"
                                className="w-full object-center object-cover"
                            />
                        </div>

                        <PrimaryBtn
                            onClick={() => logout()}
                            disabled={isPending}
                            className="py-2 text-sm sm:py-2.5 ml-auto sm:text-base"
                        >
                            Выйти
                        </PrimaryBtn>

                        <PrimaryBtn className="py-2 text-sm sm:py-2.5 sm:text-base">
                            Удалить аккаунт
                        </PrimaryBtn>
                    </div>

                    <div className="space-y-2 mb-7 sm:mb-8">
                        <p>
                            <span className="text-text-muted">Имя: </span>
                            {user?.name}
                        </p>
                        <p>
                            <span className="text-text-muted">Телефон: </span>
                            {user?.telephone}
                        </p>
                    </div>

                    <nav className="flex items-center">
                        <AccountNavLink path="/account">Записи</AccountNavLink>
                        <AccountNavLink path="/account/cars">
                            Мои авто
                        </AccountNavLink>
                        <AccountNavLink path="/account/favorite">
                            Избранное
                        </AccountNavLink>
                    </nav>
                </div>
                <Outlet />
            </section>
        </div>
    );
}
