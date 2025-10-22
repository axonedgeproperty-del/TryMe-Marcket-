import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, SellerStatus } from '../types';

interface SellerDashboardProps {
    onAddProduct: (product: Product) => void;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState<ProductCategory>(ProductCategory.CLOTHING);
    const [sellerName, setSellerName] = useState('My Store');
    const [whatsapp, setWhatsapp] = useState('');
    const [size, setSize] = useState('');
    const [colorsInput, setColorsInput] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imageFiles, setImageFiles] = useState<Record<string, File | null>>({});
    const [imagePreviews, setImagePreviews] = useState<Record<string, string | null>>({});

    const parsedColors = useMemo(() => {
        return colorsInput.split(',').map(c => c.trim()).filter(Boolean);
    }, [colorsInput]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, color: string) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFiles(prev => ({ ...prev, [color]: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => ({ ...prev, [color]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate that all colors have an image
        for (const color of parsedColors) {
            if (!imagePreviews[color]) {
                alert(`Veuillez importer une image pour la couleur : ${color}`);
                return;
            }
        }

        const newProduct: Product = {
            id: new Date().toISOString(),
            name,
            description,
            price: parseFloat(price),
            imageUrls: imagePreviews as { [color: string]: string },
            category,
            seller: {
                name: sellerName,
                status: SellerStatus.ONLINE,
                socials: { whatsapp },
            },
            size: size || undefined,
            colors: parsedColors,
            quantity: parseInt(quantity, 10) || 0,
        };
        onAddProduct(newProduct);
        // Reset form
        setName('');
        setDescription('');
        setPrice('');
        setWhatsapp('');
        setSize('');
        setColorsInput('');
        setQuantity('');
        setImageFiles({});
        setImagePreviews({});
    };
    
    const inputClasses = "w-full bg-stone-800 border border-stone-700 text-stone-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors";
    const labelClasses = "block text-sm font-medium text-stone-400 mb-1";

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-stone-950/70 border-t border-b border-stone-800 backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-stone-200 mb-4">Espace Vendeur</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Column 1: Product info */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className={labelClasses}>Nom du produit</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="description" className={labelClasses}>Description</label>
                            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required className={inputClasses} rows={4}></textarea>
                        </div>
                        <div>
                            <label htmlFor="category" className={labelClasses}>Catégorie</label>
                            <select id="category" value={category} onChange={e => setCategory(e.target.value as ProductCategory)} className={inputClasses}>
                                {Object.values(ProductCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Column 2: Details */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="price" className={labelClasses}>Prix ($)</label>
                            <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="quantity" className={labelClasses}>Quantité en stock</label>
                            <input type="number" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="size" className={labelClasses}>Taille (optionnel)</label>
                            <input type="text" id="size" value={size} onChange={e => setSize(e.target.value)} className={inputClasses} placeholder="ex: M, 42, Unique"/>
                        </div>
                        <div>
                            <label htmlFor="colors" className={labelClasses}>Couleurs (séparées par des virgules)</label>
                            <input type="text" id="colors" value={colorsInput} onChange={e => setColorsInput(e.target.value)} className={inputClasses} placeholder="ex: Noir, Rouge, Blanc" required/>
                        </div>
                    </div>

                     {/* Column 3: Seller info */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="sellerName" className={labelClasses}>Nom du Vendeur</label>
                            <input type="text" id="sellerName" value={sellerName} onChange={e => setSellerName(e.target.value)} required className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="whatsapp" className={labelClasses}>Numéro WhatsApp</label>
                            <input type="tel" id="whatsapp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required className={inputClasses} placeholder="1234567890"/>
                        </div>
                    </div>
                </div>

                 {/* Image Uploads Section */}
                {parsedColors.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {parsedColors.map(color => (
                            <div key={color}>
                                <label className={`${labelClasses} text-center`}>Photo pour "{color}"</label>
                                 <div 
                                    onClick={() => document.getElementById(`file-${color}`)?.click()}
                                    className="mt-1 flex justify-center p-2 border-2 border-stone-700 border-dashed rounded-md cursor-pointer hover:border-violet-500 transition-colors aspect-w-1 aspect-h-1"
                                >
                                    <div className="space-y-1 text-center flex flex-col justify-center items-center">
                                        {imagePreviews[color] ? (
                                            <img src={imagePreviews[color] as string} alt={`Aperçu ${color}`} className="mx-auto h-20 w-20 object-cover rounded-md"/>
                                        ) : (
                                            <svg className="mx-auto h-12 w-12 text-stone-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                        )}
                                        <p className="text-xs text-stone-500">{imageFiles[color] ? "Changer" : "Importer"}</p>
                                    </div>
                                </div>
                                <input type="file" id={`file-${color}`} onChange={(e) => handleImageChange(e, color)} accept="image/*" className="hidden" />
                            </div>
                        ))}
                    </div>
                )}
                
                <div>
                    <button type="submit" className="w-full bg-violet-600 text-white font-bold py-3 px-4 rounded-md hover:bg-violet-700 transition-colors">
                        Ajouter le Produit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SellerDashboard;
