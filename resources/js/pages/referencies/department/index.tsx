import { Head, router } from '@inertiajs/react';
import { Plus, Search, ChevronRight, ChevronDown, Building2, Users } from 'lucide-react';
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
import { useDepartmentStore } from '@/stores/useDepartmentStore';
import type { DepartmentData, DepartmentOption } from '@/types/department';
import DepartmentFormModal from './form';

interface PaginationProps {
    data: DepartmentData[];
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
    from: number;
    to: number;
}

interface DepartmentNodeProps {
    department: DepartmentData;
    level: number;
    expanded: Set<number>;
    onToggle: (id: number) => void;
    confirm: any;
    openEdit: (data: DepartmentData) => void;
    openDetail: (data: DepartmentData) => void;
    can: (permission: string) => boolean;
}

function DepartmentNode({
    department,
    level,
    expanded,
    onToggle,
    confirm,
    openEdit,
    openDetail,
    can,
}: DepartmentNodeProps) {
    const hasChildren = department.children && department.children.length > 0;
    const isExpanded = expanded.has(department.id);
    const paddingLeft = level * 24;

    return (
        <>
            <TableRow className="hover:bg-muted/50">
                <TableCell>
                    <div
                        className="flex items-center gap-2"
                        style={{ paddingLeft: `${paddingLeft}px` }}
                    >
                        {hasChildren ? (
                            <button
                                onClick={() => onToggle(department.id)}
                                className="flex h-5 w-5 items-center justify-center rounded hover:bg-muted"
                            >
                                {isExpanded ? (
                                    <ChevronDown className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                            </button>
                        ) : (
                            <span className="w-5" />
                        )}
                        {level === 0 ? (
                            <Building2 className="h-4 w-4 text-blue-500" />
                        ) : (
                            <span className="h-4 w-4" />
                        )}
                        <span className="font-medium">{department.name}</span>
                    </div>
                </TableCell>
                <TableCell>{department.code}</TableCell>
                <TableCell>
                    {department.head ? (
                        <div className="flex items-center gap-2">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span>{department.head.full_name}</span>
                            <span className="text-xs text-muted-foreground">
                                ({department.head.nip})
                            </span>
                        </div>
                    ) : (
                        '-'
                    )}
                </TableCell>
                <TableCell>
                    <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                            department.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}
                    >
                        {department.is_active ? 'Active' : 'Inactive'}
                    </span>
                </TableCell>
                <TableCell className="text-right">
                    <TableAction
                        onEdit={(isEdit) =>
                            isEdit ? openEdit(department) : openDetail(department)
                        }
                        onDelete={() => confirm.open(department)}
                    />
                </TableCell>
            </TableRow>
            {isExpanded &&
                department.children?.map((child) => (
                    <DepartmentNode
                        key={child.id}
                        department={child}
                        level={level + 1}
                        expanded={expanded}
                        onToggle={onToggle}
                        confirm={confirm}
                        openEdit={openEdit}
                        openDetail={openDetail}
                        can={can}
                    />
                ))}
        </>
    );
}

export default function DepartmentIndex({
    departments,
    filters,
    departmentsTree,
    allDepartments,
}: {
    departments: PaginationProps;
    filters: any;
    departmentsTree: DepartmentData[];
    allDepartments: DepartmentOption[];
}) {
    const confirm = useConfirm<DepartmentData>();
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [perPage, setPerPage] = useState(filters.per_page || '10');
    const [isDeleting, setIsDeleting] = useState(false);
    const [expanded, setExpanded] = useState<Set<number>>(new Set());
    const { can } = usePermission();

    const { openAdd, openEdit, openDetail } = useDepartmentStore();

    useEffect(() => {
        const isSearchChanged = searchTerm !== (filters.search || '');
        const isPerPageChanged = perPage !== (filters.per_page || '10');

        if (!isSearchChanged && !isPerPageChanged) {
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route('referencies.departments.index'),
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
            route('referencies.departments.destroy', confirm.data?.id),
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

    const toggleExpand = (id: number) => {
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <>
            <Head title="Department Management" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Department Management
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Kelola struktur organisasi dan departemen.
                        </p>
                    </div>
                    {can('create referencies/departments') && (
                        <Button onClick={openAdd}>
                            <Plus className="mr-2 h-4 w-4" /> Add Department
                        </Button>
                    )}
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex w-full max-w-sm items-center gap-3 max-sm:flex-col">
                        <div className="relative w-full flex-1">
                            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search department..."
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

                {/* Tree View for Hierarchical Structure */}
                <div className="overflow-hidden rounded-md border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Department Name</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Head/Manager</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {departmentsTree.length > 0 ? (
                                departmentsTree.map((department) => (
                                    <DepartmentNode
                                        key={department.id}
                                        department={department}
                                        level={0}
                                        expanded={expanded}
                                        onToggle={toggleExpand}
                                        confirm={confirm}
                                        openEdit={openEdit}
                                        openDetail={openDetail}
                                        can={can}
                                    />
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-24 text-center"
                                    >
                                        No departments found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Flat List Pagination */}
                {departments.data.length > 0 && (
                    <>
                        <div className="mt-4 overflow-hidden rounded-md border bg-card">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">#</TableHead>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Department Name</TableHead>
                                        <TableHead>Parent</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {departments.data.map((department, idx) => (
                                        <TableRow key={department.id}>
                                            <TableCell>{departments.from + idx}</TableCell>
                                            <TableCell className="font-medium">
                                                {department.code}
                                            </TableCell>
                                            <TableCell>{department.name}</TableCell>
                                            <TableCell>
                                                {department.parent ? (
                                                    <span className="text-muted-foreground">
                                                        {department.parent.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground italic">
                                                        Root Department
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                        department.is_active
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {department.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <TableAction
                                                    onEdit={(isEdit) =>
                                                        isEdit
                                                            ? openEdit(department)
                                                            : openDetail(department)
                                                    }
                                                    onDelete={() => confirm.open(department)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        <div className="mt-4 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    {departments.links.map((link, i) => (
                                        <PaginationItem key={i}>
                                            <Button
                                                variant={link.active ? 'outline' : 'ghost'}
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
                    </>
                )}
            </div>

            <DepartmentFormModal allDepartments={allDepartments} />

            <ConfirmModal
                isOpen={confirm.isOpen}
                onClose={confirm.close}
                onConfirm={handleConfirmDelete}
                loading={isDeleting}
                title="Hapus Department"
            />
        </>
    );
}
