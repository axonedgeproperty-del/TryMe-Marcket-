import React from 'react';
import { OutfitItem, Product } from '../types';

interface OutfitBuilderProps {
    outfitItems: OutfitItem[];
    onRemoveFromOutfit: (uniqueId: string) => void;
    onTryOnOutfit: () => void;
}

const OutfitBuilder: React.FC<OutfitBuilderProps> = ({ outfitItems, onRemoveFromOutfit, onTryOnOutfit }) => {
    const handleWhatsAppContact = (product: Product, selectedColor: string) => {
        const message = encodeURIComponent(`Bonjour, je suis intéressé par ${product.name} (${selectedColor}) vu dans un outfit sur TryMe Market.`);
        window.open(`https://wa.me/${product.seller.socials.whatsapp}?text=${message}`, '_blank');
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-stone-950/80 backdrop-blur-lg border-t border-stone-800 z-50 p-4 transform transition-transform duration-300">
            <div className="container mx-auto">
                <h3 className="text-xl font-semibold text-stone-200 mb-3 text-center">Mon Outfit</h3>
                {outfitItems.length === 0 ? (
                    <p className="text-stone-500 text-center">Ajoutez des articles pour créer votre outfit.</p>
                ) : (
                    <div className="flex items-center justify-center space-x-4">
                        <div className="flex items-center space-x-4 overflow-x-auto pb-2 flex-grow">
                            {outfitItems.map(item => (
                                <div key={item.uniqueId} className="relative group flex-shrink-0">
                                    <img
                                        src={item.product.imageUrls[item.selectedColor]}
                                        alt={item.product.name}
                                        className="w-24 h-24 object-cover rounded-lg border-2 border-stone-700"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col items-center justify-center p-2 text-center">
                                         <p className="text-white text-xs font-bold truncate max-w-full">{item.product.name}</p>
                                         <p className="text-stone-300 text-xs">{item.selectedColor}</p>
                                         <button onClick={() => handleWhatsAppContact(item.product, item.selectedColor)} className="text-green-400 mt-1 text-xs">Contacter</button>
                                    </div>
                                    <button
                                        onClick={() => onRemoveFromOutfit(item.uniqueId)}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={onTryOnOutfit}
                            className="flex-shrink-0 bg-violet-600 text-white font-bold py-2 px-5 rounded-md hover:bg-violet-700 transition-colors whitespace-nowrap h-24"
                        >
                            Essayer<br/>l'Outfit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OutfitBuilder;
