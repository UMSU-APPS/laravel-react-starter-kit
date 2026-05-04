import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: React.ReactNode;
    children: React.ReactNode;
    maxWidth?: "sm" | "md" | "lg" | "xl" | "100";
}

const maxWidthClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "100": "max-w-[400px]", // Sesuai kebutuhan ConfirmModal sebelumnya
};

export default function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    maxWidth = "md",
}: ModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={cn("overflow-hidden", maxWidthClass[maxWidth])}>
                {(title || description) && (
                    <DialogHeader>
                        {title && <DialogTitle className={cn(!description && "text-center")}>{title}</DialogTitle>}
                        {description && <DialogDescription className="text-center">{description}</DialogDescription>}
                    </DialogHeader>
                )}
                {children}
            </DialogContent>
        </Dialog>
    );
}
