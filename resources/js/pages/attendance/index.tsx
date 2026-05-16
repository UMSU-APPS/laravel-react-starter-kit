import { Head, router } from '@inertiajs/react';
import { Calendar, ClipboardList, Eye, Search, X, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface AttendanceDay {
    date: string;
    status: string;
    isLate: boolean;
    workingHours: string;
    details: {
        checkIn: { id: number; time: string; location: string } | null;
        checkOut: { id: number; time: string; location: string } | null;
    };
}

interface UserSummaryData {
    user: {
        id: number;
        name: string;
        email: string;
        location: string;
    };
    summary: {
        totalPresent: number;
        totalLate: number;
        totalAbsent: number;
        totalWorkingHours: string;
    };
    attendance: AttendanceDay[];
}

interface AttendancesProp {
    data: UserSummaryData[];
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
    from: number;
    to: number;
    current_page: number;
}

interface AttendanceIndexProps {
    attendances: AttendancesProp;
    filters: any;
}

export default function AttendanceIndex({
    attendances,
    filters,
}: AttendanceIndexProps) {
    const getLocalTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [perPage, setPerPage] = useState(filters.per_page || '10');
    
    // Support date range
    const [startDate, setStartDate] = useState(filters.start_date || getLocalTodayDate());
    const [endDate, setEndDate] = useState(filters.end_date || getLocalTodayDate());

    const [selectedUser, setSelectedUser] = useState<UserSummaryData | null>(null);

    useEffect(() => {
        const isSearchChanged = searchTerm !== (filters.search || '');
        const isPerPageChanged = perPage !== (filters.per_page || '10');
        const isStartChanged = startDate !== (filters.start_date || getLocalTodayDate());
        const isEndChanged = endDate !== (filters.end_date || getLocalTodayDate());

        if (!isSearchChanged && !isPerPageChanged && !isStartChanged && !isEndChanged) {
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            router.get(
                route('attendances.index'),
                {
                    search: searchTerm,
                    per_page: perPage,
                    start_date: startDate,
                    end_date: endDate,
                    page: 1,
                },
                { preserveState: true, replace: true, preserveScroll: true },
            );
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [
        searchTerm,
        perPage,
        startDate,
        endDate,
        filters.search,
        filters.per_page,
        filters.start_date,
        filters.end_date,
    ]);

    const formatTime = (isoString?: string) => {
        if (!isoString) return '-';
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('id-ID', {
            timeStyle: 'short',
        }).format(date);
    };

    return (
        <>
            <Head title="Attendances" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Rekapitulasi Absensi
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Laporan ringkasan data absensi karyawan
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Karyawan
                            </CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {attendances.total}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Menampilkan
                            </CardTitle>
                            <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {attendances.from} - {attendances.to}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                dari {attendances.total} data
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Periode
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm font-bold mt-1">
                                {startDate} s/d {endDate}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 max-sm:flex-col">
                    <div className="relative w-full max-w-sm flex-1">
                        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Cari nama atau email..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Input
                            type="date"
                            className="w-auto"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span className="text-sm text-muted-foreground">-</span>
                        <Input
                            type="date"
                            className="w-auto"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
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

                {/* Attendances Table */}
                <div className="overflow-hidden rounded-md border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>Karyawan</TableHead>
                                <TableHead>Lokasi</TableHead>
                                <TableHead className="text-center">Hadir</TableHead>
                                <TableHead className="text-center">Terlambat</TableHead>
                                <TableHead className="text-center">Alpa</TableHead>
                                <TableHead className="text-center">Total Jam</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attendances.data.length > 0 ? (
                                attendances.data.map((item, idx) => (
                                    <TableRow key={item.user.id}>
                                        <TableCell>
                                            {attendances.from + idx}
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium text-sm">
                                                {item.user.name}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {item.user.email}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {item.user.location}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="inline-flex items-center justify-center rounded-full bg-green-100 px-2.5 py-0.5 text-green-800 font-medium">
                                                {item.summary.totalPresent}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="inline-flex items-center justify-center rounded-full bg-orange-100 px-2.5 py-0.5 text-orange-800 font-medium">
                                                {item.summary.totalLate}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-800 font-medium">
                                                {item.summary.totalAbsent}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center font-medium">
                                            {item.summary.totalWorkingHours}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setSelectedUser(item)}
                                            >
                                                <Eye className="w-4 h-4 mr-2" />
                                                Detail
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="h-24 text-center"
                                    >
                                        Tidak ada data yang ditemukan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {attendances.links.length > 3 && (
                    <div className="mt-4 flex justify-center">
                        <Pagination>
                            <PaginationContent>
                                {attendances.links.map((link, i) => (
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
                )}
            </div>

            {/* Modal Detail */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <Card className="w-full max-w-3xl max-h-[90vh] flex flex-col shadow-lg">
                        <CardHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
                            <div>
                                <CardTitle className="text-lg">Detail Absensi: {selectedUser.user.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Periode {startDate} s/d {endDate}
                                </p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedUser(null)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </CardHeader>
                        <CardContent className="overflow-auto p-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Masuk</TableHead>
                                        <TableHead>Keluar</TableHead>
                                        <TableHead>Jam Kerja</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {selectedUser.attendance.length > 0 ? (
                                        selectedUser.attendance.map((att, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium">{att.date}</TableCell>
                                                <TableCell>
                                                    {att.details.checkIn ? formatTime(att.details.checkIn.time) : '-'}
                                                    {att.details.checkIn && (
                                                        <div className="text-[10px] text-muted-foreground mt-0.5 truncate max-w-[120px]" title={att.details.checkIn.location}>
                                                            {att.details.checkIn.location}
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {att.details.checkOut ? formatTime(att.details.checkOut.time) : '-'}
                                                    {att.details.checkOut && (
                                                        <div className="text-[10px] text-muted-foreground mt-0.5 truncate max-w-[120px]" title={att.details.checkOut.location}>
                                                            {att.details.checkOut.location}
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell>{att.workingHours}</TableCell>
                                                <TableCell>
                                                    {att.isLate ? (
                                                        <span className="inline-flex rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-800">Terlambat</span>
                                                    ) : (
                                                        <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">Tepat Waktu</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center h-24">Tidak ada record.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}
