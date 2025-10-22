import React, { useState, useRef, useEffect } from 'react';
import { OutfitItem } from '../types';
import { generateVirtualTryOnImage } from '../services/geminiService';

interface VirtualTryOnModalProps {
    itemsToTryOn: OutfitItem[] | null;
    onClose: () => void;
}

const LoadingSpinner = () => (
    <div className="border-4 border-stone-600 border-t-violet-400 rounded-full w-12 h-12 animate-spin"></div>
);

const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({ itemsToTryOn, onClose }) => {
    const [userImageFile, setUserImageFile] = useState<File | null>(null);
    const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [currentOutfit, setCurrentOutfit] = useState<OutfitItem[] | null>(itemsToTryOn);

    useEffect(() => {
        setCurrentOutfit(itemsToTryOn);
    }, [itemsToTryOn]);

    if (!currentOutfit || currentOutfit.length === 0) return null;

    const isOutfitTryOn = currentOutfit.length > 1;
    const title = isOutfitTryOn ? "Mon Outfit" : currentOutfit[0].product.name;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setUserImageFile(file);
            setUserImageUrl(URL.createObjectURL(file));
            setGeneratedImageUrl(null);
            setError(null);
        }
    };
    
    const handleGenerate = async () => {
        if (!userImageFile || !currentOutfit) {
            setError("Veuillez importer une photo de vous.");
            return;
        }
        setIsLoading(true);
        setError(null);
        
        try {
            const result = await generateVirtualTryOnImage(userImageFile, currentOutfit);
            setGeneratedImageUrl(result);
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de la génération.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleColorChange = (uniqueId: string, newColor: string) => {
        setCurrentOutfit(prevOutfit => 
            prevOutfit!.map(item => 
                item.uniqueId === uniqueId ? { ...item, selectedColor: newColor } : item
            )
        );
    }

    const handleClose = () => {
        setUserImageFile(null);
        setUserImageUrl(null);
        setGeneratedImageUrl(null);
        setError(null);
        setIsLoading(false);
        onClose();
    }

    const hasColorOptions = currentOutfit.some(item => item.product.colors && item.product.colors.length > 1);
    const isRegenerateButtonDisabled = isLoading || JSON.stringify(itemsToTryOn) === JSON.stringify(currentOutfit);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
            <div className="bg-stone-900 border border-stone-800 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col relative">
                <div className="p-4 border-b border-stone-800 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-stone-200">Essayage Virtuel: <span className="text-violet-400">{title}</span></h2>
                    <button onClick={handleClose} className="text-stone-400 hover:text-white text-2xl">&times;</button>
                </div>

                <div className="p-6 overflow-y-auto flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Panel: Controls and User Image */}
                    <div className="flex flex-col space-y-4">
                        <div className="aspect-w-4 aspect-h-5 bg-stone-800 rounded-lg flex items-center justify-center border-2 border-dashed border-stone-600">
                             {userImageUrl ? (
                                <img src={userImageUrl} alt="Your upload" className="object-contain max-h-full max-w-full rounded-md" />
                            ) : (
                                <div className="text-center text-stone-500">
                                    <p>Importez votre photo ici</p>
                                    <p className="text-xs mt-1">(portrait ou plein pied)</p>
                                </div>
                            )}
                        </div>
                        <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                        <button onClick={() => fileInputRef.current?.click()} className="w-full bg-stone-700 text-stone-300 hover:bg-stone-600 font-semibold py-2 px-4 rounded-md transition-colors">
                            {userImageFile ? "Changer de photo" : "Importer une photo"}
                        </button>
                        <button onClick={handleGenerate} disabled={!userImageFile || isLoading || (generatedImageUrl && isRegenerateButtonDisabled)} className="w-full bg-violet-600 text-white font-bold py-3 px-4 rounded-md hover:bg-violet-700 disabled:bg-violet-900 disabled:text-violet-400 disabled:cursor-not-allowed transition-colors">
                            {isLoading ? 'Génération en cours...' : (generatedImageUrl ? "Mettre à jour l'essayage" : 'Générer l\'essayage')}
                        </button>
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    </div>

                    {/* Right Panel: Product and Result */}
                    <div className="flex flex-col space-y-4">
                        <div className="aspect-w-4 aspect-h-5 bg-stone-800 rounded-lg flex items-center justify-center border border-stone-700 relative overflow-hidden">
                             {isLoading && (
                                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10">
                                    <LoadingSpinner />
                                    <p className="text-stone-300 mt-4">L'IA prépare votre essayage...</p>
                                </div>
                            )}
                             {generatedImageUrl ? (
                                <img src={generatedImageUrl} alt="Generated try-on" className="object-contain max-h-full max-w-full rounded-md" />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full p-2">
                                    {isOutfitTryOn ? (
                                        <div className="grid grid-cols-2 gap-2 max-h-full">
                                            {currentOutfit.map(item => (
                                                <img key={item.uniqueId} src={item.product.imageUrls[item.selectedColor]} alt={`${item.product.name} - ${item.selectedColor}`} className="object-cover w-full h-full rounded-md" />
                                            ))}
                                        </div>
                                    ) : (
                                        <img src={currentOutfit[0].product.imageUrls[currentOutfit[0].selectedColor]} alt={currentOutfit[0].product.name} className="object-contain max-h-full max-w-full rounded-md" />
                                    )}
                                </div>
                            )}
                        </div>
                        {generatedImageUrl && hasColorOptions && (
                            <div className="bg-stone-800/50 p-3 rounded-lg border border-stone-700">
                                <h4 className="text-sm font-semibold text-stone-300 mb-2">Modifier les couleurs</h4>
                                <div className="space-y-2">
                                {currentOutfit.map(item => 
                                    (item.product.colors && item.product.colors.length > 1) ? (
                                    <div key={item.uniqueId} className="flex items-center justify-between text-sm">
                                        <label htmlFor={`color-${item.uniqueId}`} className="text-stone-400">{item.product.name}</label>
                                        <select 
                                            id={`color-${item.uniqueId}`}
                                            value={item.selectedColor}
                                            onChange={(e) => handleColorChange(item.uniqueId, e.target.value)}
                                            className="bg-stone-700 text-stone-200 border border-stone-600 rounded-md p-1 text-xs focus:ring-violet-500 focus:border-violet-500"
                                        >
                                            {item.product.colors.map(color => (
                                                <option key={color} value={color}>{color}</option>
                                            ))}
                                        </select>
                                    </div>
                                ) : null
                                )}
                                </div>
                            </div>
                        )}
                         <p className="text-stone-400 text-center text-sm">{generatedImageUrl ? "Résultat de l'essayage" : (isOutfitTryOn ? "Outfit à essayer" : "Produit à essayer")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VirtualTryOnModal;
