import React from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal from '@/components/ui/modal';
import { useCrudForm } from '@/hooks/use-crud-form';
import { useDepartmentStore } from '@/stores/useDepartmentStore';
import { ModalMode } from '@/types/enums';
import type { DepartmentData, DepartmentOption } from '@/types/department';

interface DepartmentFormModalProps {
    allDepartments: DepartmentOption[];
}

export default function DepartmentFormModal({ allDepartments }: DepartmentFormModalProps) {
    const { mode, editData, closeModal } = useDepartmentStore();

    // Inisialisasi form menggunakan custom hook
    const { data, setData, post, put, processing, errors, isOpen, isReadOnly } =
        useCrudForm<DepartmentData>({
            mode,
            editData,
            initialValues: {
                code: '',
                name: '',
                parent_id: undefined,
                head_id: undefined,
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
            put(route('referencies.departments.update', editData.id), options);
        } else {
            post(route('referencies.departments.store'), options);
        }
    };

    // Filter departments untuk menghindari memilih department itu sendiri sebagai parent
    const availableParents = allDepartments.filter(
        (dept) => dept.id !== editData?.id
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            title={
                mode === ModalMode.CREATE
                    ? 'Add New Department'
                    : mode === ModalMode.EDIT
                      ? 'Edit Department'
                      : 'Detail Department'
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
                            form="department-form"
                            disabled={processing}
                        >
                            {mode === ModalMode.CREATE ? 'Save' : 'Update'}
                        </Button>
                    )}
                </>
            }
        >
            <form onSubmit={submit} id="department-form" className="space-y-4">
                <fieldset disabled={isReadOnly} className="space-y-4">
                    {/* Input Code */}
                    <div className="grid gap-2">
                        <Label htmlFor="code">Code</Label>
                        <Input
                            id="code"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            placeholder="e.g. FT, Biro-01"
                        />
                        <InputError message={errors.code} />
                    </div>

                    {/* Input Department Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Department Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. Fakultas Teknik, Biro Administrasi"
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Select Parent Department */}
                    <div className="grid gap-2">
                        <Label htmlFor="parent_id">Parent Department</Label>
                        <select
                            id="parent_id"
                            value={data.parent_id || ''}
                            onChange={(e) =>
                                setData(
                                    'parent_id',
                                    e.target.value ? Number(e.target.value) : undefined
                                )
                            }
                            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none"
                        >
                            <option value="">-- No Parent (Root Department) --</option>
                            {availableParents.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.code} - {dept.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.parent_id} />
                    </div>

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
