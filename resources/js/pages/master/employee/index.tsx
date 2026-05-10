import { Head, router } from '@inertiajs/react';
import {
    Building2,
    Calendar,
    ChevronDown,
    ChevronRight,
    CreditCard,
    Mail,
    MapPin,
    Phone,
    Plus,
    Search,
    User,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import ConfirmModal from '@/components/ui/confirm-modal';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import TableAction from '@/components/ui/table-action';
import { useConfirm } from '@/hooks/use-confirm';
import { usePermission } from '@/hooks/use-permission';
import { useEmployeeStore } from '@/stores/useEmployeeStore';
import type { EmployeeData, PositionOption } from '@/types/employee';
import EmployeeFormModal from './form';

interface PaginationProps {
    data: EmployeeData[];
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
    from: number;
    to: number;
}

interface EmployeeIndexProps {
    employees: PaginationProps;
    filters: any;
    positions: PositionOption[];
}

// Quick View Component - Expanded Row Content
function EmployeeQuickView({ employee }: { employee: EmployeeData }) {
    return (
        <TableRow className="bg-muted/50">
            <TableCell colSpan={7} className="p-0">
                <div className="grid gap-4 p-4 md:grid-cols-3">
                    {/* Personal Information */}
                    <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                            <User className="h-4 w-4" />
                            Personal Information
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">NIK:</span>
                                <span className="font-medium">{employee.nik}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    NPWP:
                                </span>
                                <span className="font-medium">
                                    {employee.npwp || '-'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Gender:
                                </span>
                                <span className="font-medium">
                                    {employee.gender === 'L' ? 'Male' : 'Female'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Blood Type:
                                </span>
                                <span className="font-medium">
                                    {employee.blood_type || '-'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Birth:
                                </span>
                                <span className="font-medium">
                                    {employee.place_of_birth
                                        ? `${employee.place_of_birth}, ${employee.date_of_birth ? new Date(employee.date_of_birth).toLocaleDateString('id-ID') : ''}`
                                        : '-'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            Contact & Address
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                                <Mail className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
                                <span>{employee.email}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Phone className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
                                <span>{employee.phone_number || '-'}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" />
                                <span className="line-clamp-3">
                                    {employee.address || '-'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Employment & Financial */}
                    <div className="space-y-3">
                        <h4 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                            <Building2 className="h-4 w-4" />
                            Employment & Finance
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Employment:
                                </span>
                                <span className="font-medium capitalize">
                                    {employee.employment_status}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Work Unit:
                                </span>
                                <span className="font-medium capitalize">
                                    {employee.work_unit}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Join Date:
                                </span>
                                <span className="font-medium">
                                    {new Date(employee.join_date).toLocaleDateString('id-ID')}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                    Bank:
                                </span>
                                <span className="font-medium">
                                    {employee.bank_name
                                        ? `${employee.bank_name} - ${employee.bank_account_number}`
                                        : '-'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                    Basic Salary:
                                </span>
                                <span className="font-medium">
                                    {employee.basic_salary
                                        ? `Rp ${Number(employee.basic_salary).toLocaleString('id-ID')}`
                                        : '-'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </TableCell>
        </TableRow>
    );
}

export default function EmployeeIndex({
    employees,
    filters,
    positions,
}: EmployeeIndexProps) {
    const confirm = useConfirm<EmployeeData>();
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [perPage, setPerPage] = useState(filters.per_page || '10');
    const [isDeleting, setIsDeleting] = useState(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const { can } = usePermission();

    const { openAdd, openEdit, openDetail } = useEmployeeStore();

    useEffect(() => {
        const isSearchChanged = searchTerm !== (filters.search || '');
        const isPerPageChanged = perPage !== (filters.per_page || '10');

        if (!isSearchChanged && !isPerPageChanged) {
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route('master.employees.index'),
                { search: searchTerm, per_page: perPage, page: 1 },
                { preserveState: true, replace: true, preserveScroll: true },
            );
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, perPage, filters.search, filters.per_page]);

    const handleConfirmDelete = () => {
        if (!confirm.data?.id) {
            return;
        }

        setIsDeleting(true);
        router.delete(
            route('master.employees.destroy', confirm.data?.id),
            {
                preserveScroll: true,
                onSuccess: () => {
                    confirm.close();
                    setIsDeleting(false);
                },
                onError: () => setIsDeleting(false),
            },
        );
    };

    const toggleExpandRow = (employeeId: number) => {
        setExpandedRow(expandedRow === employeeId ? null : employeeId);
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            permanent: 'bg-green-100 text-green-800',
            contract: 'bg-blue-100 text-blue-800',
            probation: 'bg-yellow-100 text-yellow-800',
            internship: 'bg-purple-100 text-purple-800',
        };
        return (
            <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[status] || 'bg-gray-100 text-gray-800'}`}
            >
                {status}
            </span>
        );
    };

    return (
        <>
            <Head title="Employee Management" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Employee Management
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Kelola data pegawai dan informasi kepegawaian.
                        </p>
                    </div>
                    {can('create master/employees') && (
                        <Button onClick={openAdd}>
                            <Plus className="mr-2 h-4 w-4" /> Add Employee
                        </Button>
                    )}
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex w-full max-w-sm items-center gap-3 max-sm:flex-col">
                        <div className="relative w-full flex-1">
                            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, NIP, or email..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            value={perPage}
                            onChange={(e) => setPerPage(e.target.value)}
                            className="h-9 w-20 rounded-md border border-input bg-background text-xs outline-none"
                        >
                            {['10', '20', '50', '100'].map((v) => (
                                <option key={v} value={v}>
                                    {v}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="overflow-hidden rounded-md border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>NIP</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Active</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.data.length > 0 ? (
                                employees.data.map((employee, idx) => (
                                    <React.Fragment key={employee.id}>
                                        <TableRow
                                            className={
                                                expandedRow === employee.id
                                                    ? 'bg-muted/30'
                                                    : ''
                                            }
                                        >
                                            <TableCell>
                                                {employees.from + idx}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {employee.nip}
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() =>
                                                        toggleExpandRow(
                                                            employee.id,
                                                        )
                                                    }
                                                    className="group flex items-center gap-2 font-medium text-primary hover:underline"
                                                >
                                                    {expandedRow ===
                                                    employee.id ? (
                                                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                                    ) : (
                                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                    <span>
                                                        {employee.full_name}
                                                    </span>
                                                    {employee.nickname && (
                                                        <span className="text-xs text-muted-foreground">
                                                            ({employee.nickname})
                                                        </span>
                                                    )}
                                                </button>
                                            </TableCell>
                                            <TableCell>
                                                {employee.position ? (
                                                    <span>
                                                        {employee.position.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        -
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(
                                                    employee.employment_status,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        employee.is_active
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {employee.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <TableAction
                                                    onEdit={(isEdit) =>
                                                        isEdit
                                                            ? openEdit(employee)
                                                            : openDetail(employee)
                                                    }
                                                    onDelete={() =>
                                                        confirm.open(employee)
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                        {/* Quick View - Expanded Row */}
                                        {expandedRow === employee.id && (
                                            <EmployeeQuickView
                                                employee={employee}
                                            />
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-24 text-center"
                                    >
                                        No employees found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-center">
                    <Pagination>
                        <PaginationContent>
                            {employees.links.map((link, i) => (
                                <PaginationItem key={i}>
                                    <Button
                                        variant={
                                            link.active ? 'outline' : 'ghost'
                                        }
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url && router.visit(link.url)
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>

            <EmployeeFormModal positions={positions} />

            <ConfirmModal
                isOpen={confirm.isOpen}
                onClose={confirm.close}
                onConfirm={handleConfirmDelete}
                loading={isDeleting}
                title="Hapus Employee"
            />
        </>
    );
}
