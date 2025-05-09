import Logo from '@/components/atoms/logo';
import {
    Navigate,
    Outlet,
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/organisms/shared/error-boundary';
import { useIsCurrentUserAdmin } from '@/lib/hooks/auth/use-is-current-user-admin';
import DarkBtn from '@/components/atoms/dark-btn';
import { ArrowBigLeft } from 'lucide-react';
import { STORAGE_KEYS } from '@/lib/constants/storageKeys';

export default function AdminLayout() {
    const { data: isAdmin, isLoading } = useIsCurrentUserAdmin();
    const navigate = useNavigate();
    const location = useLocation();
    const carwashId = useParams();

    if (isLoading) return null;

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    if (location.pathname.startsWith('/admin/carwash')) {
        if (carwashId.id != null) {
            localStorage.setItem(STORAGE_KEYS.ADMIN_CARWASH_ID, carwashId.id);
        }
    }

    const handleBackClick = () => {
        const path = location.pathname;

        switch (true) {
            case path === '/admin':
                navigate('/account');
                break;

            case path.startsWith('/admin'):
                navigate('/admin');
                break;

            default:
                navigate(-1);
                break;
        }
    };

    return (
        <div className="primary-px primary-py">
            <header className="flex items-center justify-between mb-6 sm:mb-10 xl:mb-12">
                <div className="w-15 md:w-50">
                    <DarkBtn onClick={handleBackClick} className="mr-auto">
                        <ArrowBigLeft className="size-4 text-white" />
                        <span className="hidden md:block text-sm ml-1 mr-2">
                            Вернуться назад
                        </span>
                    </DarkBtn>
                </div>

                <Logo className="w-33.5 sm:w-80 xl:w-123.5" isHeading={false} />

                <div className="w-15 md:w-50" aria-hidden={true}></div>
            </header>
            <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Outlet />
                </ErrorBoundary>
            </section>
        </div>
    );
}
