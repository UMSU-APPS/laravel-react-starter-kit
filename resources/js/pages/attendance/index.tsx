import { Head } from '@inertiajs/react';
import { Package, Star, ShoppingBag } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useProductStore } from '@/stores/useProductStore';
import type { ProductData } from '@/types/product';

interface ProductIndexProps {
    products: ProductData[];
}

export default function ProductIndex({ products }: ProductIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const { openDetail } = useProductStore();

    // Get unique categories
    const categories = ['all', ...new Set(products.map((p) => p.category))];

    // Filter products
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === 'all' || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <>
            <Head title="Products" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Products
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Browse products from FakeStore API.
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Products
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {products.length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Categories
                            </CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {categories.length - 1}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Filtered Results
                            </CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {filteredProducts.length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="relative max-w-sm flex-1">
                        <Input
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                    >
                        <SelectTrigger className="w-50">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories
                                .filter((c) => c !== 'all')
                                .map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category.charAt(0).toUpperCase() +
                                            category.slice(1)}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Products Table */}
                <div className="overflow-hidden rounded-md border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">Image</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-12 w-12 rounded object-cover"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">
                                                {product.title}
                                            </div>
                                            <div className="line-clamp-1 max-w-md text-sm text-muted-foreground">
                                                {product.description}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 capitalize">
                                                {product.category}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {formatPrice(product.price)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span>
                                                    {product.rating?.rate || 0}
                                                </span>
                                                <span className="text-muted-foreground">
                                                    (
                                                    {product.rating?.count || 0}{' '}
                                                    reviews)
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    openDetail(product)
                                                }
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-24 text-center"
                                    >
                                        No products found.
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
