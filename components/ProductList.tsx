

import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: Product[];
    // FIX: Updated the type of onAddToOutfit to include the color parameter.
    onAddToOutfit: (product: Product, color: string) => void;
    onTryOn: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToOutfit, onTryOn }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 sm:p-6 lg:p-8">
            {products.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToOutfit={onAddToOutfit}
                    onTryOn={onTryOn}
                />
            ))}
        </div>
    );
};

export default ProductList;