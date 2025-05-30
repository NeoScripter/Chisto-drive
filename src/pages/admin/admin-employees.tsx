import AccountAddBtn from '@/components/atoms/account-add-btn';
import AdminSkeleton from '@/components/atoms/admin-skeleton';
import DialogLayout from '@/components/layouts/dialog-layout';
import AddWorkerDialog from '@/components/molecules/admin/add-worker-dialog';
import DeleteWorkerDialog from '@/components/molecules/admin/delete-worker-dialog';
import TableHead from '@/components/molecules/admin/table-head';
import UpdateWorkerDialog from '@/components/molecules/admin/update-worker-dialog';
import WorkerRow from '@/components/molecules/admin/worker-row';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { useCarWashWorkers } from '@/lib/hooks/workers/use-carwash-workers';
import { Worker } from '@/lib/types/workers';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AdminEmployees() {
    const { id } = useParams();
    const parsedId = Number(id);
    const { data: workers, isLoading } = useCarWashWorkers(parsedId);

    const [showAddWorkerDialog, toggleAddWorkerDialog] = useToggle(false);
    const [showUpdateWorkerDialog, toggleUpdateWorkerDialog] = useToggle(false);
    const [showDeleteWorkerDialog, toggleDeleteWorkerDialog] = useToggle(false);
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

    return (
        <div className="overflow-auto scrollbar-hidden text-xs sm:text-base">
            <TableHead gridClass="grid-cols-[60px_1fr_1fr_1fr_60px]">
                <div>Ф.И.О.</div>
                <div>Должность</div>
                <div>Номер телефона</div>
                <div></div>
            </TableHead>

            {isLoading ? (
                <AdminSkeleton />
            ) : (
                workers &&
                workers.data.map((worker, idx) => (
                    <div key={`worker-${idx}`}>
                        <WorkerRow
                            worker={worker}
                            index={idx + 1}
                            id={worker.id}
                            onDelete={() => {
                                toggleDeleteWorkerDialog(true);
                                setSelectedWorker(worker);
                            }}
                            onEdit={() => {
                                toggleUpdateWorkerDialog(true);
                                setSelectedWorker(worker);
                            }}
                        />
                    </div>
                ))
            )}

            <div className="py-3 mt-1 w-188 sm:w-290">
                <AccountAddBtn
                    onClick={() => {
                        toggleAddWorkerDialog(true);
                    }}
                    className="sticky left-40 sm:left-52 mx-0 z-20"
                />
            </div>

            <DialogLayout
                title="Добавление нового сотрудника"
                description="Заполните данные, чтобы добавить нового сотрудника"
                isOpen={showAddWorkerDialog}
                closeDialog={() => toggleAddWorkerDialog(false)}
            >
                <AddWorkerDialog
                    closeDialog={() => toggleAddWorkerDialog(false)}
                    carWashId={parsedId}
                />
            </DialogLayout>

            {selectedWorker != null && (
                <DialogLayout
                    title="Обновление данных сотрудника"
                    description="Заполните данные, чтобы обновить данные сотрудника"
                    isOpen={showUpdateWorkerDialog}
                    closeDialog={() => toggleUpdateWorkerDialog(false)}
                >
                    <UpdateWorkerDialog
                        selectedWorker={selectedWorker}
                        closeDialog={() => toggleUpdateWorkerDialog(false)}
                        carWashId={parsedId}
                    />
                </DialogLayout>
            )}

            <DialogLayout
                title="Вы уверены что хотите удалить данного сотрудника?"
                isOpen={showDeleteWorkerDialog}
                closeDialog={() => toggleDeleteWorkerDialog(false)}
            >
                <DeleteWorkerDialog
                    selectedWorker={selectedWorker}
                    closeDialog={() => toggleDeleteWorkerDialog(false)}
                />
            </DialogLayout>
        </div>
    );
}
