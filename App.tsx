import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import SellerDashboard from './components/SellerDashboard';
import OutfitBuilder from './components/OutfitBuilder';
import VirtualTryOnModal from './components/VirtualTryOnModal';
import { Product, OutfitItem } from './types';
import { INITIAL_PRODUCTS } from './constants';

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [outfitItems, setOutfitItems] = useState<OutfitItem[]>([]);
    const [isTryOnModalOpen, setIsTryOnModalOpen] = useState(false);
    const [tryOnItems, setTryOnItems] = useState<OutfitItem[] | null>(null);

    const handleAddProduct = (product: Product) => {
        setProducts(prevProducts => [product, ...prevProducts]);
    };
    
    const handleAddToOutfit = (product: Product, color: string) => {
        // Prevent adding the exact same product with the same color
        if (!outfitItems.find(item => item.product.id === product.id && item.selectedColor === color)) {
             const newOutfitItem: OutfitItem = {
                uniqueId: `${product.id}_${Date.now()}`,
                product,
                selectedColor: color,
            };
            setOutfitItems(prevItems => [...prevItems, newOutfitItem]);
        }
    };

    const handleRemoveFromOutfit = (uniqueId: string) => {
        setOutfitItems(prevItems => prevItems.filter(item => item.uniqueId !== uniqueId));
    };

    const handleTryOn = (product: Product) => {
        const itemToTry: OutfitItem = {
            uniqueId: `tryon_${product.id}`,
            product,
            selectedColor: product.colors?.[0] || 'default'
        };
        setTryOnItems([itemToTry]);
        setIsTryOnModalOpen(true);
    };

    const handleTryOnOutfit = () => {
        if (outfitItems.length > 0) {
            setTryOnItems([...outfitItems]);
            setIsTryOnModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsTryOnModalOpen(false);
        setTryOnItems(null);
    };

    return (
        <div className="min-h-screen bg-stone-950 text-stone-300 font-sans">
            <Header />
            <main className="pb-40">
                <SellerDashboard onAddProduct={handleAddProduct} />
                <ProductList 
                    products={products} 
                    onAddToOutfit={handleAddToOutfit}
                    onTryOn={handleTryOn}
                />
            </main>
            <OutfitBuilder 
                outfitItems={outfitItems} 
                onRemoveFromOutfit={handleRemoveFromOutfit}
                onTryOnOutfit={handleTryOnOutfit} 
            />
            {isTryOnModalOpen && (
                <VirtualTryOnModal itemsToTryOn={tryOnItems} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default App;
