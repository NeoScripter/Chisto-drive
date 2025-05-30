import AdminSkeleton from '@/components/atoms/admin-skeleton';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { useApplyCalendarSlot } from '@/lib/hooks/calendar/use-apply-calendar-slot';
import { ScheduleVersion } from '@/lib/types/schedule';
import { cn } from '@/lib/utils';
import { formatDateForScripts } from '@/lib/utils/format-date';

type InitialScriptVersionsProps = {
    isLoading: boolean;
    versions: ScheduleVersion[] | undefined;
    date: string;
};

export function InitialScriptVersions({
    versions,
    isLoading,
    date,
}: InitialScriptVersionsProps) {
    const { mutate: applyScriptVersion, isPending } = useApplyCalendarSlot();

    if (isLoading)
        return (
            <div className="mx-4 mt-8">
                <AdminSkeleton className="mx-auto !w-240 !sm:w-342" />
            </div>
        );

    if (versions == null)
        return <div>На эту дату слоты еще не сформированы</div>;

    return (
        <div className="overflow-auto scrollbar-hidden mt-8 text-xs sm:text-base">
            <TableHead>
                <div>Название</div>
                <div>Создан</div>
                <div></div>
            </TableHead>

            {versions.length > 0 && (
                versions.map((version, idx) => (
                    <div key={`version-${idx}`}>
                        <InitialScriptVersionRow
                            version={version}
                            index={idx + 1}
                            onClick={() => {
                                applyScriptVersion({
                                    date: date,
                                    script_version_id: version.id,
                                });
                            }}
                            isPending={isPending}
                        />
                    </div>
                ))
            )} 
        </div>
    );
}

type InitialScriptVersionRow = {
    version: ScheduleVersion;
    index: number;
    onClick: () => void;
    isPending: boolean;
};

function InitialScriptVersionRow({
    version,
    index,
    onClick,
    isPending,
}: InitialScriptVersionRow) {
    return (
        <div className="mx-auto w-max">
            <div className="w-150 sm:w-252 text-center grid grid-cols-[60px_1fr_1fr_160px] divide-x-1 mx-4 divide-white/20 border-y border-white/20">
                <div className="py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg">
                    {index}
                </div>
                <div className="py-3 flex items-center justify-center">
                    <span className="mx-auto">{version.name}</span>
                </div>
                <div className="py-3 flex items-center justify-center">
                    {formatDateForScripts(version.created_at)}
                </div>
                <div className="py-3 flex items-center justify-center">
                    {' '}
                    <PrimaryBtn
                        onClick={onClick}
                        disabled={isPending}
                        className="text-sm"
                    >
                        Применить
                    </PrimaryBtn>
                </div>
            </div>
        </div>
    );
}

type TableHeadProps = {
    children: React.ReactNode;
};

function TableHead({ children }: TableHeadProps) {
    return (
        <div
            className={cn(
                'w-158 sm:w-260 mx-auto grid-cols-[60px_1fr_1fr_160px] sticky top-0 z-20 text-center grid bg-light-bg p-4 rounded-full divide-x-1 divide-white/20 mb-4'
            )}
        >
            <div className="sticky left-0 z-20 bg-light-bg rounded-l-xl  text-btn-bg">
                №
                <span className="absolute left-0 top-0 bottom-0  w-10 bg-light-bg -z-10"></span>
            </div>
            {children}
        </div>
    );
}
