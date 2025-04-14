import ServiceCard from '@/components/molecules/search/service-card';
import { useSearchServicesContext } from '@/lib/hooks/useSearchServicesContext';

export default function SearchResult() {
    const { servicesData, areServicesLoading, isServicesError } =
        useSearchServicesContext();

    if (isServicesError)
        return (
            <p className="text-white">
                Произошла ошибка при загрузке результатов запроса, попробуйте
                позже
            </p>
        );

    if (areServicesLoading)
        return (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-3 md:gap-3.5">
                {Array.from({ length: 8 }, (_, index) => (
                    <ServiceCardSkeleton key={`skeleton-card-${index}`} />
                ))}
            </div>
        );

    if (servicesData == null) return null;
    const services = servicesData.data;

    if (services.length === 0)
        return (
            <p className="text-white">
                По вашему запросу не найдено ни одного результата
            </p>
        );

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-3 md:gap-3.5">
            {services.map((service, index) => (
                <ServiceCard
                    key={`service-${service.car_wash_id}-${index}`}
                    imgPath={service.img}
                    rating={4}
                    name={service.car_wash_name}
                    address={service.address}
                    description={service.description}
                    price={service.price}
                    url={service.url}
                />
            ))}
        </div>
    );
}

function ServiceCardSkeleton() {
    return (
        <div className="rounded-lg text-transparent animate-pulse">
            <div className="overflow-clip relative aspect-[1.55/1] rounded-lg bg-gray-100/50"></div>
            <div className="p-2 pb-3.5 sm:p-3 sm:pb-4.5">
                <p className="flex items-start gap-1 mb-2.5 text-xs sm:text-sm text-transparent bg-gray-100/50 rounded-sm">
                    loading
                </p>
                <div className="flex items-center mb-3 bg-gray-100/50 rounded-sm">
                    loading
                </div>
                <p className="mb-2.5 text-lg sm:text-xl bg-gray-100/50 rounded-sm">
                    loading
                </p>
                <p className="mb-2.5 text-xs sm:text-sm min-h-26 sm:min-h-30 bg-gray-100/50 rounded-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque deserunt eius modi optio facere reiciendis
                    consequatur rerum veritatis commodi vel?
                </p>
                <p className="mb-2.5 text-sm sm:text-base">loading</p>
                <p className="text-xs sm:text-sm bg-gray-100/50 rounded-sm">
                    Узнать подробнее
                </p>
            </div>
        </div>
    );
}
