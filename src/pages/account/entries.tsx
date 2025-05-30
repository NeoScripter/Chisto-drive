import AccountAddBtn from '@/components/atoms/account-add-btn';
import { AccountEntry } from '@/components/atoms/account-entry';
import NoItemsMessage from '@/components/atoms/no-items-message';
import DialogLayout from '@/components/layouts/dialog-layout';
import AccountEntryDialog from '@/components/molecules/account/account-entry-dialog';
import CancelEntryDialog from '@/components/molecules/account/cancel-entry-dialog';
import RedirectDialog from '@/components/molecules/account/redirect-dialog';
import { useCurrentUser } from '@/lib/hooks/auth/use-current-user';
import { Appointment } from '@/lib/types/user';
import { useState } from 'react';

export default function AccountEntries() {
    const [selectedEntry, setSelectedEntry] = useState<Appointment | null>(
        null
    );
    const [showAccountEntryDialog, setShowAccountEntryDialog] = useState(false);
    const [showCancelEntryDialog, setShowCancelEntryDialog] = useState(false);
    const [showRedirectModal, setShowRedirectModal] = useState(false);

    const { data: user, isLoading } = useCurrentUser();

    if (user == null || isLoading) return null;

    return (
        <section className="flex flex-col gap-4 md:flex-row md:justify-between md:pt-3 md:gap-6">
            <div className="md:flex-1">
                <p className="mb-3.5 text-sm sm:text-base md:text-lg md:mb-4.5">
                    Актуальные
                </p>

                <div className="space-y-3 mb-3.5 md:space-y-5">
                    {user.appointments.actual.length > 0 ? user.appointments.actual.map((entry, idx) => (
                        <AccountEntry
                            key={`${entry.appointment_id}-${idx}`}
                            entry={entry}
                            onClick={() => {
                                setSelectedEntry(entry);
                                setShowAccountEntryDialog(true);
                            }}
                        />
                    )) : <NoItemsMessage />}
                </div>

                <AccountAddBtn onClick={() => setShowRedirectModal(true)} />
            </div>

            <div className="md:flex-1">
                <p className="mb-3.5 text-sm sm:text-base md:text-lg md:mb-4.5">
                    Архив
                </p>

                <div className="space-y-2 mb-3.5 md:space-y-5">
                    {user.appointments.archive.length > 0 ? user.appointments.archive.map((entry, idx) => (
                        <AccountEntry
                            key={`${entry.appointment_id}-${idx}`}
                            entry={entry}
                            onClick={() => {
                                setSelectedEntry(entry);
                                setShowAccountEntryDialog(true);
                            }}
                        />
                    )) : <NoItemsMessage />}
                </div>
            </div>

            <DialogLayout
                isOpen={showAccountEntryDialog}
                closeDialog={() => {
                    setShowAccountEntryDialog(false);
                }}
            >
                <AccountEntryDialog
                    entry={selectedEntry}
                    onClick={() => {
                        setShowAccountEntryDialog(false);
                        setShowCancelEntryDialog(true);
                    }}
                />
            </DialogLayout>

            <DialogLayout
                title="Вы уверены что хотите отменить запись?"
                isOpen={showCancelEntryDialog}
                closeDialog={() => setShowCancelEntryDialog(false)}
            >
                <CancelEntryDialog
                    closeDialog={() => setShowCancelEntryDialog(false)}
                    entry={selectedEntry}
                />
            </DialogLayout>

            <DialogLayout
                title="Перейти на страницу поиска?"
                isOpen={showRedirectModal}
                closeDialog={() => setShowRedirectModal(false)}
            >
                <RedirectDialog
                    closeDialog={() => setShowRedirectModal(false)}
                />
            </DialogLayout>
        </section>
    );
}
