import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { isCurrentUserAdmin } from '@/services/api/auth';
import { useQuery } from '@tanstack/react-query';

export const useIsCurrentUserAdmin = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.CURRENT_USER, QUERY_KEYS.IS_ADMIN],
        queryFn: isCurrentUserAdmin,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};
