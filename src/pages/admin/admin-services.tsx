import AccountAddBtn from "@/components/atoms/account-add-btn";
import DialogLayout from "@/components/layouts/dialog-layout";
import AddServiceDialog from "@/components/molecules/admin/add-service-dialog";
import DeleteServiceDialog from "@/components/molecules/admin/delete-service-dialog";
import ServicesSkeleton from "@/components/molecules/admin/services-skeleton";
import TableHead from "@/components/molecules/admin/table-head";
import UpdateServiceDialog from "@/components/molecules/admin/update-service-dialog";
import { useCarwashServices } from "@/lib/hooks/services/use-carwash-services";
import useToggle from "@/lib/hooks/utils/use-toggle";
import { Service } from "@/lib/types/services";
import { formatDateForScripts } from "@/lib/utils/format-date";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AdminServices() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useCarwashServices(Number(id));
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedServiceType, setSeletedServiceType] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<Service | null>(null);
    const [showCreateServiceDialog, toggleShowCreateServiceDialog] = useToggle(false);


    if (isLoading) return <ServicesSkeleton />;

    if (data == null) return null;

    const selectedServiceList = data.service_categories.find(cat => cat.service_category_id === selectedServiceType)?.service_types_list;

    return (

        <div>
            {data.data.length > 0 &&
                data.data.map(
                    (service, idx) => {
                        return (
                            <div key={`service-${idx}`} className="scrollbar-hidden overflow-x-auto">
                                <div className="my-6 md:text-lg">
                                    {service.service_category_ru_name}
                                </div>
                                <TableHead gridClass="grid-cols-[60px_1fr_1fr_2fr_1fr_60px]">
                                    <div>Тип услуги</div>
                                    <div>Название</div>
                                    <div>Описание</div>
                                    <div>Дата добавления</div>
                                    <div></div>
                                </TableHead>

                                {service.service_list.map(
                                    (item, itemIdx) => (
                                        <div
                                            key={`service-${itemIdx}`}
                                        >

                                            <div
                                                className="w-180 sm:w-282 grid grid-cols-[60px_1fr_1fr_2fr_1fr_60px] divide-x-1 mx-4 divide-white/20 border-y border-white/20 text-sm sm:text-base"
                                            >
                                                <button onClick={() => { setSelectedItem(item); setSeletedServiceType(service.service_category_id) }} className="py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg">
                                                    <PencilSquareIcon className="size-4" />
                                                    {itemIdx + 1}
                                                </button>
                                                <div className="p-3 flex text-center text-balance items-center justify-center">
                                                    {item.service_type}
                                                </div>
                                                <div className="p-3 flex text-center text-balance items-center justify-center">
                                                    {item.service_name}
                                                </div>
                                                <div className="p-3 flex items-center justify-center">
                                                    {item.description}
                                                </div>
                                                <div className="p-3 flex items-center justify-center">
                                                    {formatDateForScripts(item.created_at)}
                                                </div>
                                                <div className="p-3 flex items-center justify-center border-l border-white/20">
                                                    {' '}
                                                    <button onClick={() => setSelectedService(item)} className="cursor-pointer">
                                                        <TrashIcon className="text-btn-bg size-4 mx-auto" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                                <div className="py-3 mt-1 w-188 sm:w-290">
                                    <AccountAddBtn
                                        onClick={() => { setSeletedServiceType(service.service_category_id); toggleShowCreateServiceDialog(true) }
                                        }
                                        className="sticky left-40 sm:left-52 mx-0 z-20 ml-40"
                                    />
                                </div>
                            </div>
                        );
                    }
                )}
            <DialogLayout
                title="Вы уверены что хотите удалить данную услугу?"
                isOpen={selectedService != null}
                closeDialog={() => setSelectedService(null)}
            >
                <DeleteServiceDialog
                    selectedService={selectedService}
                    closeDialog={() => setSelectedService(null)}
                />
            </DialogLayout>

            <DialogLayout
                title="Добавление новой услуги"
                description="Заполните данные, чтобы добавить новую услугу"
                isOpen={showCreateServiceDialog}
                closeDialog={() => toggleShowCreateServiceDialog(false)}
            >
                <AddServiceDialog
                    closeDialog={() => toggleShowCreateServiceDialog(false)}
                    selectedServiceList={selectedServiceList || []}
                />
            </DialogLayout>

            <DialogLayout
                title="Обновление услуги"
                description="Заполните данные, чтобы обновить услугу"
                isOpen={selectedItem != null}
                closeDialog={() => setSelectedItem(null)}
            >
                <UpdateServiceDialog
                    closeDialog={() => setSelectedItem(null)}
                    selectedServiceList={selectedServiceList || []}
                    selectedItem={selectedItem}
                />
            </DialogLayout>
        </div>
    )
}


