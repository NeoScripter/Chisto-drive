import { fetchCarwashes } from '@/services/api/carwashes-api';
import { useQuery } from '@tanstack/react-query';


export const useCarwashes = (city: string) => {
    return useQuery({
        queryKey: ['carwashes', city],
        queryFn: () => fetchCarwashes(city),
        staleTime: 1000 * 60 * 5, 
        refetchOnWindowFocus: false,
    });
};
