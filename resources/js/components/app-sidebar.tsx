import { Link, usePage } from '@inertiajs/react';
import * as LucideIcons from 'lucide-react';
import { LayoutGrid, LayoutDashboard } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import AppLogo from '@/components/app-logo';
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

const cleanTitle = (name: string): string => {
    const parts = name.split('/');
    const lastPart = parts[parts.length - 1];

    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
};

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const sidebarData = auth.sidebar || [];

    const groupedNavItems: Record<string, NavItem[]> = {
        no_category: [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutDashboard,
            },
        ],
    };

    sidebarData.forEach((menu: any) => {
        const categoryKey = menu.category || 'no_category';

        const item: NavItem = {
            title: cleanTitle(menu.name),
            href: `/${menu.url}`,
            icon:
                (LucideIcons[
                    menu.icon as keyof typeof LucideIcons
                ] as LucideIcon) || LayoutGrid,
            // Menggunakan sub_menus (snake_case) sesuai output standar Laravel
            items:
                menu.sub_menus?.length > 0
                    ? menu.sub_menus.map((sub: any) => ({
                          title: cleanTitle(sub.name),
                          href: `/${sub.url}`,
                      }))
                    : undefined,
        };

        if (!groupedNavItems[categoryKey]) {
            groupedNavItems[categoryKey] = [];
        }

        // Menambahkan baris kosong di sini untuk memenuhi aturan linter
        groupedNavItems[categoryKey].push(item);
    });

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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
