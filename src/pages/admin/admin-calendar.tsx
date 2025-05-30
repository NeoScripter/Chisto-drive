import PrimaryBtn from '@/components/atoms/primary-btn';
import AppliedScriptVersion from '@/components/molecules/admin/applied-script-version';
import { InitialScriptVersions } from '@/components/molecules/admin/initial-script-versions';
import { DatePicker } from '@/components/organisms/admin/date-picker';
import { useCalendarData } from '@/lib/hooks/calendar/use-calendar-data';
import { useClearAllDay } from '@/lib/hooks/calendar/use-clear-all-day';
import { formatDateToString } from '@/lib/utils/format-date';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AdminCalendar() {
    const { id } = useParams();
    const [date, setDate] = useState(new Date());
    const { data: calendarData, isLoading } = useCalendarData(
        Number(id),
        formatDateToString(date)
    );
    const { mutate: clearDay, isPending: pendingClearAllDay } = useClearAllDay(
        () => {}
    );

    function selectDate(newDate: Date | null) {
        if (newDate == null) return;

        setDate(newDate);
    }

    const isApplied = calendarData?.is_applied;

    return (
        <div>
            <div className="relative">
                <DatePicker value={date} onChange={selectDate} />

                <div className="flex flex-col gap-4 items-end justify-end ml-auto lg:absolute lg:right-0 lg:bottom-0">
                    <PrimaryBtn
                        disabled={pendingClearAllDay}
                        onClick={() => clearDay({
                            date_field: formatDateToString(date),
                            car_wash_id: Number(id),
                        })}
                        className="w-50 text-sm lg:text-base"
                    >
                        Очистить все
                    </PrimaryBtn>

                    <PrimaryBtn className="w-50 text-sm lg:text-base">
                        Деактивировать
                    </PrimaryBtn>

                    <PrimaryBtn className="w-50 text-sm lg:text-base">
                        Активировать
                    </PrimaryBtn>
                </div>
            </div>
            {isApplied ? (
                <AppliedScriptVersion data={calendarData?.slots} />
            ) : (
                <InitialScriptVersions
                    versions={calendarData?.versions}
                    isLoading={isLoading}
                    date={formatDateToString(date)}
                />
            )}
        </div>
    );
}
