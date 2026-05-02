import { Link, usePage } from '@inertiajs/react';
import * as LucideIcons from 'lucide-react';
import { BookOpen, FolderGit2, LayoutGrid } from 'lucide-react';
// Top-level type-only imports
import type { LucideIcon } from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem, SharedData } from '@/types';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    // Hooks harus berada di tingkat atas di dalam fungsi komponen
    const { auth } = usePage<SharedData>().props;
    const sidebarData = auth.sidebar || [];

    // Kelompokkan menu
    const groupedNavItems = sidebarData.reduce(
        (acc: Record<string, NavItem[]>, menu: any) => {
            // Jika category null atau string kosong, gunakan kunci khusus (misal: 'no_category')
            const category = menu.category || 'no_category';

            const item: NavItem = {
                title: menu.name,
                href: menu.url,
                icon:
                    (LucideIcons[
                        menu.icon as keyof typeof LucideIcons
                    ] as LucideIcon) || LayoutGrid,
                items: menu.sub_menus?.map((sub: any) => ({
                    title: sub.name,
                    href: sub.url,
                })),
            };

            if (!acc[category]) {
                acc[category] = [];
            }

            acc[category].push(item);

            return acc;
        },
        {},
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {Object.entries(groupedNavItems).map(([category, items]) => (
                    <SidebarGroup key={category}>
                        {/* Hanya cetak label jika category bukan 'no_category' */}
                        {category !== 'no_category' && (
                            <SidebarGroupLabel className="text-xs font-semibold tracking-wider uppercase">
                                {category}
                            </SidebarGroupLabel>
                        )}

                        <SidebarGroupContent>
                            <NavMain items={items} />
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
