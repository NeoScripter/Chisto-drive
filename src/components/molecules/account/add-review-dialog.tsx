import Rating from '@mui/material/Rating';
import Camera from '@/assets/svgs/camera.svg';
import PrimaryBtn from '@/components/atoms/primary-btn';
import { usePostReview } from '@/lib/hooks/reviews/use-post-review';
import { Appointment } from '@/lib/types/user';
import { formatDateForScripts, formatTimeToHHMM } from '@/lib/utils/format-date';
import { Textarea } from '@headlessui/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const MAX_FILE_SIZE_MB = 1024 * 1024 * 48;

type AddReviewDialogProps = {
    closeDialog: () => void;
    entry: Appointment;
};
export default function AddReviewDialog({
    closeDialog,
    entry
}: AddReviewDialogProps) {
    const { mutate, isPending } = usePostReview(closeDialog);
    const [files, setFiles] = useState<File[]>([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState<number | null>(0);
    const [ratingError, setRatingError] = useState("");
    const [commentError, setCommentError] = useState("");
    const [fileError, setFileError] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files;
        if (!selected) return;
        setFileError('');

        if (files.length + selected.length > 5) {
            setFileError("Выберите максимум 5 фото");
            return;
        }

        setFiles((prev) => [...prev, ...Array.from(selected)]);
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFileError("");
        setCommentError("");
        setRatingError("");

        if (comment.length > 480) {
            setCommentError("Пожалуйста, оставьте более короткий комментарий");
            return;
        }

        if (comment.length === 0) {
            setCommentError("Пожалуйста, оставьте комментарий");
            return;
        }
        if (rating == null || rating == 0) {
            setRatingError("Пожалуйста, дайте оценку автомойке для оставления комментария");
            return;
        }

        for (const file of files) {
            if (file.size > MAX_FILE_SIZE_MB) {
                setFileError("Размер файла не должен превышать 50 МБ");
                return;
            }
            if (!file.type.startsWith('image/')) {
                setFileError("Пожалуйста, загрузите фото форматов webp, png, или jpeg");
                return;
            }
        }
        const formData = new FormData();
        formData.append('appointment_id', String(entry.appointment_id));
        formData.append('rating', rating.toString());
        formData.append('comment', comment);

        files.forEach((file) => {
            formData.append('files', file);
        });

        mutate(formData);
    };

    return (
        <form className="my-10 space-y-2" onSubmit={(e) => { handleSubmit(e) }} encType='multipart/form-data'>
            <div className="space-y-2 my-8">
                <TitleLine title='Автомойка' description={entry.car_wash_name} />
                <TitleLine title='Время и дата визита' description={`${formatDateForScripts(entry.date)} ${formatTimeToHHMM(entry.time)}`} />
                <TitleLine title='Услуга' description={entry.service_name} />
            </div>

            <div className="space-y-2 my-8">
                <div className={cn('rounded-lg bg-white/10 w-full px-4 py-2 flex items-center justify-between gap-2', ratingError.length > 0 && 'border border-red-500')}>
                    <div className='text-sm'>Оцените это место</div>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(_, newValue) => {
                            setRating(newValue);
                        }}
                    />
                </div>

                {ratingError.length > 0 && <p className='text-sm text-red-500'>{ratingError}</p>}

                <Textarea onChange={(e) => setComment(e.target.value)} value={comment} placeholder='Напишите комментарий' className={cn("rounded-lg bg-white/10 w-full px-4 py-2 min-h-30", commentError.length > 0 && "border border-red-400")} maxLength={480} />

                {commentError.length > 0 && <p className='text-sm text-red-500'>{commentError}</p>}

                <div className={cn('rounded-lg bg-white/10 w-full p-2', fileError.length > 0 && 'border border-red-500')}>

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="review-files" className="flex flex-col items-center justify-center w-full h-30 border-2 border-btn-bg border-dotted rounded-lg cursor-pointer">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <img src={Camera} alt="Добавить фото" className='shrink-0 size-5' />
                                    <p className="font-medium text-white">Добавить фото или видео</p>
                                </div>
                                <p className="text-xs text-white">Можно перетащить его в эту рамку</p>
                            </div>
                            <input id="review-files" type="file" className="hidden"
                                multiple
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    {files.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {files.map((file, index) => (
                                <div key={index} className="bg-white rounded-md relative overflow-clip">
                                    <img src={URL.createObjectURL(file)} alt="" className='object-center object-cover size-full' />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="cursor-pointer text-white hover:bg-black/80 bg-black size-7 rounded-full flex items-center justify-center text-3xl absolute right-0.5 top-0.5"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
                {fileError.length > 0 && <p className='text-sm text-red-500'>{fileError}</p>}
            </div>

            <PrimaryBtn type="submit" disabled={isPending} className="w-full">
                Оставить отзыв
            </PrimaryBtn>

            <PrimaryBtn
                type="button"
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </form>
    );
}
type TitleLineProps = {
    title: string;
    description: string;
}

function TitleLine({ title, description }: TitleLineProps) {
    return (<div className="text-sm">{title}: <span className="text-white">{description}</span></div>)
}

