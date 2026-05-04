import React from 'react';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface TableActionProps {
    onEdit?: () => void;
    onDelete?: () => void;
    deleteMessage?: string; // Pesan konfirmasi kustom
    children?: React.ReactNode; // Slot untuk tombol tambahan (Detail, Reset Password, dll)
    className?: string;
}

export default function TableAction({
    onEdit,
    onDelete,
    children,
    className = ""
}: TableActionProps) {
    return (
        <div className={`flex items-center justify-end gap-1 ${className}`}>
            <TooltipProvider delayDuration={100}>
                {/* Slot untuk tombol kustom di depan */}
                {children}

                {onEdit && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={onEdit}
                            >
                                <Edit className="size-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                    </Tooltip>
                )}

                {onDelete && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                onClick={onDelete}
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                )}
            </TooltipProvider>
        </div>
    );
}
