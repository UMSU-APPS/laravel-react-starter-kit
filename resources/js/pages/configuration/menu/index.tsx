import { Head, useForm } from '@inertiajs/react';
import { Plus, Edit, Trash2, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import React, { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import AppLayout from '@/layouts/app-layout';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface MenuData {
    id: number;
    name: string;
    url: string;
    category: string;
    icon: string;
    main_menu_id?: number | null;
    sub_menus?: MenuData[];
}

export default function MenuIndex({ menus }: { menus: MenuData[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            id: null as number | null,
            name: '',
            url: '',
            category: 'MANAGEMENT',
            icon: '',
            main_menu_id: null as number | null,
        });

    const openCreateModal = () => {
        reset();
        clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (menu: MenuData) => {
        clearErrors();
        setData({
            id: menu.id,
            name: menu.name,
            url: menu.url,
            category: menu.category,
            icon: menu.icon,
            main_menu_id: menu.main_menu_id ?? null,
        });
        setIsModalOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (data.id) {
            put(route('configuration.menu.update', data.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('configuration.menu.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    return (
        <>
            <Head title="Menu Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Menu Management
                        </h2>
                        <p className="text-muted-foreground">
                            Konfigurasi sidebar dan akses navigasi sistem.
                        </p>
                    </div>
                    <Button onClick={openCreateModal}>
                        <Plus className="mr-2 h-4 w-4" /> Add Menu
                    </Button>
                </div>

                <div className="rounded-md border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Icon</TableHead>
                                <TableHead>Menu Name</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {menus.map((menu) => (
                                <React.Fragment key={menu.id}>
                                    {/* Parent Menu */}
                                    <TableRow className="bg-muted/50 font-medium">
                                        <TableCell>
                                            <IconRenderer
                                                iconName={menu.icon}
                                            />
                                        </TableCell>
                                        <TableCell>{menu.name}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            /{menu.url}
                                        </TableCell>
                                        <TableCell>
                                            <span className="rounded bg-secondary px-2 py-1 text-[10px] font-bold">
                                                {menu.category}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    openEditModal(menu)
                                                }
                                            >
                                                <Edit className="size-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                    {/* Sub Menus */}
                                    {menu.sub_menus?.map((sub) => (
                                        <TableRow key={sub.id}>
                                            <TableCell className="text-center">
                                                {/* Menampilkan icon kecil untuk sub-menu jika ada */}
                                                <div className="flex justify-center opacity-50">
                                                    <IconRenderer
                                                        iconName={sub.icon}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell className="pl-8 text-muted-foreground">
                                                {sub.name}
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground">
                                                /{sub.url}
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground">
                                                {sub.category}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() =>
                                                        openEditModal(sub)
                                                    }
                                                >
                                                    <Edit className="size-3" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive"
                                                >
                                                    <Trash2 className="size-3" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {data.id ? 'Edit Menu' : 'Add New Menu'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="url">URL Path</Label>
                            <Input
                                id="url"
                                value={data.url}
                                onChange={(e) => setData('url', e.target.value)}
                                placeholder="example/path"
                            />
                            <InputError message={errors.url} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    value={data.category}
                                    onChange={(e) =>
                                        setData('category', e.target.value)
                                    }
                                />
                                <InputError message={errors.category} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="icon">Lucide Icon Name</Label>
                                <Input
                                    id="icon"
                                    value={data.icon}
                                    onChange={(e) =>
                                        setData('icon', e.target.value)
                                    }
                                    placeholder="Settings, Users, etc"
                                />
                                <InputError message={errors.icon} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {data.id ? 'Update Menu' : 'Save Menu'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

function IconRenderer({ iconName }: { iconName: string }) {
    const icons = LucideIcons as unknown as Record<string, React.ElementType>;
    const Icon = icons[iconName];

    return Icon ? (
        <Icon className="size-4" />
    ) : (
        <HelpCircle className="size-4 text-muted-foreground/50" />
    );
}
