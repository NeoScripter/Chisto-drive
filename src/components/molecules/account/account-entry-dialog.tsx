import PrimaryBtn from '@/components/atoms/primary-btn';
import { Appointment } from '@/lib/types/user';
import { formatDateToDayMonthLabel, formatTimeToHHMM } from '@/lib/utils/format-date';
import { MapPinIcon } from '@heroicons/react/16/solid';

type AccountEntryDialogProps = {
    entry: Appointment | null;
    onClick: () => void;
    selectedEntryType: "actual" | "archive"
};

export default function AccountEntryDialog({ entry, onClick, selectedEntryType }: AccountEntryDialogProps) {

    if (entry == null) return null;

    return (
        <div className="flex flex-col gap-2 items-center text-white">
            <p className="font-medium text-2xl">{entry.car_wash_name}</p>
            <p className="flex items-center gap-1 my-4 text-sm text-white/70">
                <MapPinIcon className="size-6 shrink-0 text-btn-bg" />
                {entry.location}
            </p>
            <p className='text-center text-balance'>{entry.service_name}</p>
            <p>
                {formatDateToDayMonthLabel(entry.date)} {formatTimeToHHMM(entry.time)}
            </p>
            <p>Цена {entry.price} ₽</p>
            <p className="mb-6">{entry.reg_num}</p>

            {selectedEntryType === "actual" && <PrimaryBtn onClick={onClick} type="button" className="w-full">
                Отменить запись
            </PrimaryBtn>}
        </div>
    );
}
