import { Head } from '@inertiajs/react';
import { ClipboardList, MapPin, Search } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useAttendanceStore } from '@/stores/useAttendanceStore';
import type { AttendanceData } from '@/types/attendance';

interface AttendanceApiIndexProps {
    attendance: AttendanceData[];
}

export default function AttendanceApiIndex({
    attendance = [],
}: AttendanceApiIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const { openDetail } = useAttendanceStore();

    // Filter attendances
    const filteredAttendances = attendance.filter((item) => {
        const matchesSearch =
            item.attendanceEmail
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            item.attendanceLocation
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    const formatDate = (dateString: Date | string) => {
        if (!dateString) {
            return '-';
        }

        const date = new Date(dateString);

        return new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short',
            timeZone: 'UTC',
        }).format(date);
    };

    return (
        <>
            <Head title="Attendances" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Attendances
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Manage and view attendance records.
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Attendances
                            </CardTitle>
                            <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {attendance.length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Filtered Results
                            </CardTitle>
                            <Search className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {filteredAttendances.length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative max-w-sm flex-1">
                        <Input
                            placeholder="Search by email or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Attendances Table */}
                <div className="overflow-hidden rounded-md border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAttendances.length > 0 ? (
                                filteredAttendances.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="font-medium">
                                                {item.attendanceEmail}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span>
                                                    {item.attendanceLocation}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${item.attendanceDescription === 'checkin' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}
                                            >
                                                {item.attendanceDescription}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {formatDate(
                                                item.attendanceCreatedAt,
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openDetail(item)}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-24 text-center"
                                    >
                                        No attendances found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
