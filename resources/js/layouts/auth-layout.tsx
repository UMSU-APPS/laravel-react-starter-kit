import { usePreventBack } from '@/hooks/usePreventBack';
import AuthLayoutTemplate from '@/layouts/auth/auth-split-layout';

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
    }) {
    usePreventBack();

    return (
        <AuthLayoutTemplate title={title} description={description}>
            {children}
        </AuthLayoutTemplate>
    );
}
