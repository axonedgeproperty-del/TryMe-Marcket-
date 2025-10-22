import React, { useState } from 'react';
import { Product, SellerStatus, ProductCategory } from '../types';

interface ProductCardProps {
    product: Product;
    onAddToOutfit: (product: Product, color: string) => void;
    onTryOn: (product: Product) => void;
}

const WhatsAppIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);


const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToOutfit, onTryOn }) => {
    const isTryable = product.category !== ProductCategory.TECH;
    const isAvailable = product.seller.status === SellerStatus.ONLINE && (product.quantity ?? 1) > 0;
    const [selectedColor, setSelectedColor] = useState<string | undefined>(
        product.colors && product.colors.length > 0 ? product.colors[0] : undefined
    );

    const handleWhatsAppOrder = () => {
        const message = encodeURIComponent(`Bonjour, je suis intéressé par ${product.name} (${selectedColor}) sur TryMe Market.`);
        window.open(`https://wa.me/${product.seller.socials.whatsapp}?text=${message}`, '_blank');
    };

    const handleAddToOutfit = () => {
        if (selectedColor) {
            onAddToOutfit(product, selectedColor);
        }
    }
    
    const displayedImageUrl = selectedColor ? product.imageUrls[selectedColor] : Object.values(product.imageUrls)[0];

    return (
        <div className="group relative bg-stone-900/50 border border-stone-800 rounded-lg overflow-hidden flex flex-col h-full backdrop-blur-sm transition-all duration-300 hover:border-violet-500/50">
            <div className="relative overflow-hidden aspect-[4/5]">
                <img src={displayedImageUrl} alt={`${product.name} - ${selectedColor}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                 {!isAvailable && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <span className="text-white text-lg font-semibold uppercase tracking-widest border-2 border-white px-4 py-2">{product.quantity === 0 ? 'Épuisé' : 'Indisponible'}</span>
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h3 className="text-lg font-medium text-stone-100">{product.name}</h3>
                    <p className="text-sm text-stone-400 mt-1 truncate">{product.description}</p>
                    
                    <div className="text-xs text-stone-500 mt-2 space-x-4 flex items-center flex-wrap">
                         {product.size && <span>Taille: <strong className="text-stone-400">{product.size}</strong></span>}
                    </div>

                    {product.colors && product.colors.length > 1 && (
                        <div className="mt-3">
                            <span className="text-xs text-stone-500 mr-2">Couleur:</span>
                            <div className="inline-flex items-center space-x-2">
                                {product.colors.map(color => (
                                    <button 
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-5 h-5 rounded-full border-2 transition-transform transform hover:scale-110 ${selectedColor === color ? 'border-violet-400 scale-110' : 'border-stone-600'}`}
                                        style={{ backgroundColor: color.split('/')[0].toLowerCase() }}
                                        aria-label={`Select ${color}`}
                                        title={color}
                                    />
                                ))}
                            </div>
                             <span className="text-sm text-stone-400 ml-3">{selectedColor}</span>
                        </div>
                    )}

                    <p className="text-xl font-bold text-violet-400 mt-2">${product.price}</p>

                    {isAvailable && product.quantity !== undefined && product.quantity <= 5 && (
                        <p className="text-sm text-yellow-400 mt-2 font-bold animate-pulse">
                            Plus que {product.quantity} en stock !
                        </p>
                    )}

                    <div className="mt-2 text-xs text-stone-500">
                        <span>Vendu par <strong>{product.seller.name}</strong></span>
                        <span className={`ml-2 px-2 py-0.5 rounded-full ${product.seller.status === SellerStatus.ONLINE ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                            {product.seller.status}
                        </span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-800 space-y-2">
                     {isAvailable ? (
                        <button onClick={handleWhatsAppOrder} className="w-full flex items-center justify-center bg-green-600/20 text-green-300 hover:bg-green-600/40 px-4 py-2 rounded-md text-sm font-semibold transition-colors">
                           <WhatsAppIcon /> Commander via WhatsApp
                        </button>
                    ) : (
                         <button disabled className="w-full bg-stone-700 text-stone-500 px-4 py-2 rounded-md text-sm font-semibold cursor-not-allowed">
                           Indisponible
                        </button>
                    )}
                   
                    <div className="flex space-x-2">
                        {isTryable && isAvailable && (
                             <button onClick={() => onTryOn(product)} className="w-1/2 bg-violet-600/20 text-violet-300 hover:bg-violet-600/40 px-4 py-2 rounded-md text-sm font-semibold transition-colors">
                                Essayer
                            </button>
                        )}
                        {isAvailable && (
                            <button 
                                onClick={handleAddToOutfit} 
                                disabled={product.colors && product.colors.length > 0 && !selectedColor}
                                className={`w-full ${!isTryable ? 'w-full' : 'w-1/2'} bg-stone-700 text-stone-300 hover:bg-stone-600 px-4 py-2 rounded-md text-sm font-semibold transition-colors disabled:bg-stone-800 disabled:text-stone-500 disabled:cursor-not-allowed`}>
                                Ajouter à l'outfit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
