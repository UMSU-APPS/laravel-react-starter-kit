import React from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Modal from '@/components/ui/modal';
import { useCrudForm } from '@/hooks/use-crud-form';
import { useEmployeeStore } from '@/stores/useEmployeeStore';
import type { EmployeeData, PositionOption } from '@/types/employee';
import { ModalMode } from '@/types/enums';

interface EmployeeFormModalProps {
    positions: PositionOption[];
}

export default function EmployeeFormModal({
    positions,
}: EmployeeFormModalProps) {
    const { mode, editData, closeModal } = useEmployeeStore();

    // Inisialisasi form menggunakan custom hook
    const { data, setData, post, put, processing, errors, isOpen, isReadOnly } =
        useCrudForm<EmployeeData>({
            mode,
            editData,
            initialValues: {
                nip: '',
                nik: '',
                npwp: '',
                full_name: '',
                nickname: '',
                email: '',
                phone_number: '',
                gender: 'L',
                place_of_birth: '',
                date_of_birth: '',
                address: '',
                blood_type: '',
                position_id: undefined,
                employment_status: 'contract',
                work_unit: 'akademik',
                join_date: '',
                exit_date: '',
                is_active: true,
                basic_salary: 0,
                bank_name: '',
                bank_account_number: '',
                bank_account_holder: '',
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
            put(route('master.employees.update', editData.id), options);
        } else {
            post(route('master.employees.store'), options);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            title={
                mode === ModalMode.CREATE
                    ? 'Add New Employee'
                    : mode === ModalMode.EDIT
                      ? 'Edit Employee'
                      : 'Detail Employee'
            }
            maxWidth="2xl"
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
                            form="employee-form"
                            disabled={processing}
                        >
                            {mode === ModalMode.CREATE ? 'Save' : 'Update'}
                        </Button>
                    )}
                </>
            }
        >
            <form onSubmit={submit} id="employee-form" className="space-y-4">
                <fieldset disabled={isReadOnly} className="space-y-4">
                    {/* Section: Basic Information */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="nip">NIP *</Label>
                            <Input
                                id="nip"
                                value={data.nip}
                                onChange={(e) => setData('nip', e.target.value)}
                                placeholder="Employee ID Number"
                            />
                            <InputError message={errors.nip} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nik">NIK *</Label>
                            <Input
                                id="nik"
                                value={data.nik}
                                onChange={(e) => setData('nik', e.target.value)}
                                placeholder="National ID Number"
                            />
                            <InputError message={errors.nik} />
                        </div>
                    </div>

                    {/* Section: Personal Info */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name *</Label>
                            <Input
                                id="full_name"
                                value={data.full_name}
                                onChange={(e) =>
                                    setData('full_name', e.target.value)
                                }
                                placeholder="Full Name"
                            />
                            <InputError message={errors.full_name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nickname">Nickname</Label>
                            <Input
                                id="nickname"
                                value={data.nickname}
                                onChange={(e) =>
                                    setData('nickname', e.target.value)
                                }
                                placeholder="Nickname"
                            />
                            <InputError message={errors.nickname} />
                        </div>
                    </div>

                    {/* Section: Contact */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone_number">Phone Number</Label>
                            <Input
                                id="phone_number"
                                value={data.phone_number}
                                onChange={(e) =>
                                    setData('phone_number', e.target.value)
                                }
                                placeholder="Phone Number"
                            />
                            <InputError message={errors.phone_number} />
                        </div>
                    </div>

                    {/* Section: Identity */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="npwp">NPWP</Label>
                            <Input
                                id="npwp"
                                value={data.npwp}
                                onChange={(e) =>
                                    setData('npwp', e.target.value)
                                }
                                placeholder="Tax ID Number"
                            />
                            <InputError message={errors.npwp} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender *</Label>
                            <select
                                id="gender"
                                value={data.gender}
                                onChange={(e) =>
                                    setData(
                                        'gender',
                                        e.target.value as 'L' | 'P',
                                    )
                                }
                                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none"
                            >
                                <option value="L">Male</option>
                                <option value="P">Female</option>
                            </select>
                            <InputError message={errors.gender} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="blood_type">Blood Type</Label>
                            <Input
                                id="blood_type"
                                value={data.blood_type}
                                onChange={(e) =>
                                    setData('blood_type', e.target.value)
                                }
                                placeholder="A, B, AB, O"
                            />
                            <InputError message={errors.blood_type} />
                        </div>
                    </div>

                    {/* Section: Birth Info */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="place_of_birth">
                                Place of Birth
                            </Label>
                            <Input
                                id="place_of_birth"
                                value={data.place_of_birth}
                                onChange={(e) =>
                                    setData('place_of_birth', e.target.value)
                                }
                                placeholder="City of Birth"
                            />
                            <InputError message={errors.place_of_birth} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date_of_birth">Date of Birth</Label>
                            <Input
                                id="date_of_birth"
                                type="date"
                                value={data.date_of_birth}
                                onChange={(e) =>
                                    setData('date_of_birth', e.target.value)
                                }
                            />
                            <InputError message={errors.date_of_birth} />
                        </div>
                    </div>

                    {/* Section: Address */}
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <textarea
                            id="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Full Address"
                            rows={3}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
                        />
                        <InputError message={errors.address} />
                    </div>

                    {/* Section: Employment */}
                    <div className="border-t pt-4">
                        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                            Employment Information
                        </h4>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="position_id">Position</Label>
                                <select
                                    id="position_id"
                                    value={data.position_id || ''}
                                    onChange={(e) =>
                                        setData(
                                            'position_id',
                                            e.target.value
                                                ? Number(e.target.value)
                                                : undefined,
                                        )
                                    }
                                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none"
                                >
                                    <option value="">Select Position</option>
                                    {positions.map((position) => (
                                        <option
                                            key={position.id}
                                            value={position.id}
                                        >
                                            {position.name} ({position.code})
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.position_id} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="employment_status">
                                    Employment Status *
                                </Label>
                                <select
                                    id="employment_status"
                                    value={data.employment_status}
                                    onChange={(e) =>
                                        setData(
                                            'employment_status',
                                            e.target.value as any,
                                        )
                                    }
                                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none"
                                >
                                    <option value="permanent">Permanent</option>
                                    <option value="contract">Contract</option>
                                    <option value="probation">Probation</option>
                                    <option value="internship">
                                        Internship
                                    </option>
                                </select>
                                <InputError
                                    message={errors.employment_status}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="work_unit">Work Unit *</Label>
                                <select
                                    id="work_unit"
                                    value={data.work_unit}
                                    onChange={(e) =>
                                        setData(
                                            'work_unit',
                                            e.target.value as any,
                                        )
                                    }
                                    className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none"
                                >
                                    <option value="akademik">Academic</option>
                                    <option value="non-akademik">
                                        Non-Academic
                                    </option>
                                </select>
                                <InputError message={errors.work_unit} />
                            </div>
                        </div>
                    </div>

                    {/* Section: Dates */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="join_date">Join Date *</Label>
                            <Input
                                id="join_date"
                                type="date"
                                value={data.join_date}
                                onChange={(e) =>
                                    setData('join_date', e.target.value)
                                }
                            />
                            <InputError message={errors.join_date} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="exit_date">Exit Date</Label>
                            <Input
                                id="exit_date"
                                type="date"
                                value={data.exit_date}
                                onChange={(e) =>
                                    setData('exit_date', e.target.value)
                                }
                            />
                            <InputError message={errors.exit_date} />
                        </div>
                    </div>

                    {/* Section: Financial */}
                    <div className="border-t pt-4">
                        <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                            Financial Information
                        </h4>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="basic_salary">
                                    Basic Salary
                                </Label>
                                <Input
                                    id="basic_salary"
                                    type="number"
                                    value={data.basic_salary}
                                    onChange={(e) =>
                                        setData(
                                            'basic_salary',
                                            Number(e.target.value),
                                        )
                                    }
                                    placeholder="0"
                                />
                                <InputError message={errors.basic_salary} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bank_name">Bank Name</Label>
                                <Input
                                    id="bank_name"
                                    value={data.bank_name}
                                    onChange={(e) =>
                                        setData('bank_name', e.target.value)
                                    }
                                    placeholder="Bank Name"
                                />
                                <InputError message={errors.bank_name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bank_account_number">
                                    Account Number
                                </Label>
                                <Input
                                    id="bank_account_number"
                                    value={data.bank_account_number}
                                    onChange={(e) =>
                                        setData(
                                            'bank_account_number',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Bank Account Number"
                                />
                                <InputError
                                    message={errors.bank_account_number}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bank_account_holder">
                                    Account Holder
                                </Label>
                                <Input
                                    id="bank_account_holder"
                                    value={data.bank_account_holder}
                                    onChange={(e) =>
                                        setData(
                                            'bank_account_holder',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Account Holder Name"
                                />
                                <InputError
                                    message={errors.bank_account_holder}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Checkbox Is Active */}
                    <div className="flex items-center gap-2 border-t pt-4">
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
                            Active Employee
                        </Label>
                    </div>
                    <InputError message={errors.is_active} />
                </fieldset>
            </form>
        </Modal>
    );
}
