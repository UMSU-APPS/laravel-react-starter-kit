import type { ProductData } from '@/types/product';
import { createFormStore } from './createFormStore';

export const useProductStore = createFormStore<ProductData>();
