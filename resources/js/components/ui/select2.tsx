// 1. Impor jQuery paling atas
import $ from 'jquery';
import select2 from 'select2';
import 'select2/dist/css/select2.css';

// 2. Impor React
import { useEffect, useRef } from 'react';

// Inisialisasi plugin
if (typeof $.fn.select2 === 'undefined') {
    (select2 as any)(window, $);
}

interface Select2Props {
    options: { id: number | string; text: string }[];
    value: any;
    onChange: (value: any) => void;
    placeholder?: string;
    disabled?: boolean;
    multiple?: boolean;
}

export default function Select2({
    options,
    value,
    onChange,
    placeholder,
    disabled,
    multiple = false
}: Select2Props) {
    const selectRef = useRef<HTMLSelectElement>(null);
    const isProgrammaticUpdate = useRef(false);

    useEffect(() => {
        const $el = $(selectRef.current!);

        // Inisialisasi ulang jika sudah ada instansi (sesuai code PHP Anda)
        const $parentModal = $el.closest('[role="dialog"]');

        ($el as any).select2({
            dropdownParent: $parentModal.length ? $parentModal : $(document.body),
            placeholder,
            width: 'resolve',
            multiple,
            allowClear: true,
            data: options,
            dropdownCssClass: 'select2-dropdown-high-z',
        });

        // Set nilai awal
        isProgrammaticUpdate.current = true;
        ($el as any).val(value).trigger('change.select2');
        isProgrammaticUpdate.current = false;

        // Handler perubahan
        ($el as any).on('change.select2', (e: any) => {
            if (isProgrammaticUpdate.current) return;
            const val = $(e.target).val();

            if (multiple) {
                onChange(Array.isArray(val) ? val.map(Number) : []);
            } else {
                onChange(val ? Number(val) : null);
            }
        });

        return () => {
            ($el as any).off('change.select2');
            if (typeof ($el as any).select2 === 'function') {
                ($el as any).select2('destroy');
            }
            $el.empty();
        };
    }, [options, multiple, placeholder]);

    // Sinkronisasi nilai dari parent
    useEffect(() => {
        const $el = $(selectRef.current!);
        const currentValue = ($el as any).val();

        // Normalize keduanya ke string untuk perbandingan (karena .val() selalu string)
        const normalize = (v: any) =>
            Array.isArray(v) ? v.map(String).sort() : String(v ?? '');

        if (JSON.stringify(normalize(currentValue)) !== JSON.stringify(normalize(value))) {
            isProgrammaticUpdate.current = true;
            ($el as any).val(value).trigger('change.select2');
            isProgrammaticUpdate.current = false;
        }
    }, [value]);

    return (
        <div className="select2-wrapper w-full relative">
            <select
                ref={selectRef}
                disabled={disabled}
                multiple={multiple}
                className="w-full"
            />
        </div>
    );
}
