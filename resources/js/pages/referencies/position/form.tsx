import React from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal from '@/components/ui/modal';
import { useCrudForm } from '@/hooks/use-crud-form';
import { usePositionStore } from '@/stores/usePositionStore';
import { ModalMode } from '@/types/enums';
import type { PositionData } from '@/types/position';

export default function PositionFormModal() {
    const { mode, editData, closeModal } = usePositionStore();

    // Inisialisasi form menggunakan custom hook
    const { data, setData, post, put, processing, errors, isOpen, isReadOnly } =
        useCrudForm<PositionData>({
            mode,
            editData,
            initialValues: {
                code: '',
                name: '',
                positional_allowance: 0,
                is_academic: false,
                is_active: true,
            },
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isReadOnly) {
            return;
        }

        const options = {
            onSuccess: () => closeModal(),
        };

        if (mode === ModalMode.EDIT && editData?.id) {
            put(route('referencies.positions.update', editData.id), options);
        } else {
            post(route('referencies.positions.store'), options);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            title={
                mode === ModalMode.CREATE
                    ? 'Add New Position'
                    : mode === ModalMode.EDIT
                      ? 'Edit Position'
                      : 'Detail Position'
            }
            maxWidth="md"
            footer={
                <>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={closeModal}
                    >
                        {isReadOnly ? 'Close' : 'Cancel'}
                    </Button>
                    {!isReadOnly && (
                        <Button
                            type="submit"
                            form="position-form"
                            disabled={processing}
                        >
                            {mode === ModalMode.CREATE ? 'Save' : 'Update'}
                        </Button>
                    )}
                </>
            }
        >
            <form onSubmit={submit} id="position-form" className="space-y-4">
                <fieldset disabled={isReadOnly} className="space-y-4">
                    {/* Input Code */}
                    <div className="grid gap-2">
                        <Label htmlFor="code">Code</Label>
                        <Input
                            id="code"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            placeholder="e.g. DIR, MGR, STF"
                        />
                        <InputError message={errors.code} />
                    </div>

                    {/* Input Position Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Position Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. Director, Manager, Staff"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Input Positional Allowance */}
                    <div className="grid gap-2">
                        <Label htmlFor="positional_allowance">
                            Positional Allowance
                        </Label>
                        <Input
                            id="positional_allowance"
                            type="number"
                            value={data.positional_allowance}
                            onChange={(e) =>
                                setData(
                                    'positional_allowance',
                                    Number(e.target.value),
                                )
                            }
                            placeholder="0"
                        />
                        <InputError message={errors.positional_allowance} />
                    </div>

                    {/* Checkbox Is Academic */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_academic"
                            checked={data.is_academic}
                            onChange={(e) =>
                                setData('is_academic', e.target.checked)
                            }
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label
                            htmlFor="is_academic"
                            className="text-sm font-normal"
                        >
                            Academic Position
                        </Label>
                    </div>
                    <InputError message={errors.is_academic} />

                    {/* Checkbox Is Active */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData('is_active', e.target.checked)
                            }
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label
                            htmlFor="is_active"
                            className="text-sm font-normal"
                        >
                            Active
                        </Label>
                    </div>
                    <InputError message={errors.is_active} />
                </fieldset>
            </form>
        </Modal>
    );
}
