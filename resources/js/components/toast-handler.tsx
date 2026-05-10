// components/toast-handler.tsx
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ToastHandler() {
    const { props } = usePage();
    const { flash, errors } = props as any;

    useEffect(() => {
        // 1. Menangani Validation Errors
        // Kita gunakan id unik agar pesan yang sama tidak menumpuk berkali-kali
        if (errors && Object.keys(errors).length > 0) {
            Object.keys(errors).forEach((key) => {
                const errorMessage = errors[key];
                toast.error(errorMessage, {
                    id: `validation-error-${key}-${errorMessage}`,
                });
            });
        }

        // 2. Menangani Flash Message Sukses
        if (flash?.success) {
            toast.success(flash.success, {
                id: 'flash-success',
            });
        }

        // 3. Menangani Flash Message Error
        if (flash?.error) {
            toast.error(flash.error, {
                id: 'flash-error',
            });
        }

        // 4. Menangani Flash Message Info/Warning (Opsional)
        if (flash?.info) {
            toast.info(flash.info);
        }
    }, [flash, errors]);

    return null;
}
