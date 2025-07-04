import SearchHeader from '@/components/molecules/search/search-header';
import AddressMap from '@/components/molecules/search/address-map';
import PrimaryFilters from '@/components/organisms/search/primary-filters';
import { SearchServiceProvider } from '@/lib/providers/search-service-provider';
import TopFilters from '@/components/organisms/search/top-filters';
import SearchResult from '@/components/organisms/search/search-results';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/organisms/shared/error-boundary';
import { useSearchServicesContext } from '@/lib/hooks/context/use-search-services-context';
import { convertToAddresses } from '@/lib/utils/get-filter-options';

export default function Search() {
    return (
        <SearchServiceProvider>
            <div className="primary-px primary-py">
                <SearchHeader />

                <section className="px-4 sm:px-8 sm:pb-9 xl:pb-8 xl:px-9 xl:pt-7 pt-5 pb-7 border border-border rounded-xl">
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <TopFilters />
                    </ErrorBoundary>

                    <div className="rounded-3xl overflow-clip z-0">
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <MapWrapper />
                        </ErrorBoundary>
                    </div>

                    <div className="mt-3.5 mb-6 sm:mt-5 xl:mt-7 xl:mb-9.5">
                        <h2 className="mb-3.5 sm:mb-5 xl:mb-7 md:text-lg">
                            Фильтры
                        </h2>

                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <FilterWrapper />
                        </ErrorBoundary>
                    </div>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <SearchResult />
                    </ErrorBoundary>
                </section>
            </div>
        </SearchServiceProvider>
    );
}

function MapWrapper() {
    const { servicesData, areServicesLoading, areFiltersLoading } =
        useSearchServicesContext();
    const addresses = convertToAddresses(servicesData?.data);

    return <AddressMap key="search-page-map" addresses={addresses} isLoading={areServicesLoading || areFiltersLoading} />
}

function FilterWrapper() {
    const {
        areFiltersLoading,
        filters,
        date,
        setDate,
        startTime,
        endTime,
        setStartTime,
        setEndTime,
        startPrice,
        endPrice,
        setStartPrice,
        setEndPrice,
        serviceCategoryId,
        setServiceCategoryId,
        serviceTypeId,
        setServiceTypeId,
        vehicleTypeId,
        setVehicleTypeId,
    } = useSearchServicesContext();

    return <PrimaryFilters areFiltersLoading={areFiltersLoading} filters={filters} date={date} setDate={setDate} startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndPrice={setEndPrice} setEndTime={setEndTime} endPrice={endPrice} startPrice={startPrice} serviceCategoryId={serviceCategoryId} setServiceCategoryId={setServiceCategoryId} serviceTypeId={serviceTypeId} setServiceTypeId={setServiceTypeId} vehicleTypeId={vehicleTypeId} setVehicleTypeId={setVehicleTypeId} setStartPrice={setStartPrice} />;
}
