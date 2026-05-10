import { Head, router } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
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
import { usePositionStore } from '@/stores/usePositionStore';
import type { PositionData } from '@/types/position';
import PositionFormModal from './form';

interface PaginationProps {
    data: PositionData[];
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
    from: number;
    to: number;
}

export default function PositionIndex({
    positions,
    filters,
}: {
    positions: PaginationProps;
    filters: any;
}) {
    const confirm = useConfirm<PositionData>();
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [perPage, setPerPage] = useState(filters.per_page || '10');
    const [isDeleting, setIsDeleting] = useState(false);
    const { can } = usePermission();

    const { openAdd, openEdit, openDetail } = usePositionStore();

    useEffect(() => {
        const isSearchChanged = searchTerm !== (filters.search || '');
        const isPerPageChanged = perPage !== (filters.per_page || '10');

        if (!isSearchChanged && !isPerPageChanged) {
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route('referencies.positions.index'),
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
            route('referencies.positions.destroy', confirm.data?.id),
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

    return (
        <>
            <Head title="Position Management" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Position Management
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Kelola jabatan/jenjang pegawai.
                        </p>
                    </div>
                    {can('create referencies/positions') && (
                        <Button onClick={openAdd}>
                            <Plus className="mr-2 h-4 w-4" /> Add Position
                        </Button>
                    )}
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex w-full max-w-sm items-center gap-3 max-sm:flex-col">
                        <div className="relative w-full flex-1">
                            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search position..."
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
                                <TableHead>Code</TableHead>
                                <TableHead>Position Name</TableHead>
                                <TableHead>Allowance</TableHead>
                                <TableHead>Academic</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {positions.data.length > 0 ? (
                                positions.data.map((position, idx) => (
                                    <TableRow key={position.id}>
                                        <TableCell>
                                            {positions.from + idx}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {position.code}
                                        </TableCell>
                                        <TableCell>{position.name}</TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {position.positional_allowance
                                                ? `Rp ${Number(position.positional_allowance).toLocaleString('id-ID')}`
                                                : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                    position.is_academic
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {position.is_academic
                                                    ? 'Yes'
                                                    : 'No'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                                    position.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {position.is_active
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <TableAction
                                                onEdit={(isEdit) =>
                                                    isEdit
                                                        ? openEdit(position)
                                                        : openDetail(position)
                                                }
                                                onDelete={() =>
                                                    confirm.open(position)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-24 text-center"
                                    >
                                        No positions found.
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
                            {positions.links.map((link, i) => (
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

            <PositionFormModal />

            <ConfirmModal
                isOpen={confirm.isOpen}
                onClose={confirm.close}
                onConfirm={handleConfirmDelete}
                loading={isDeleting}
                title="Hapus Position"
            />
        </>
    );
}
