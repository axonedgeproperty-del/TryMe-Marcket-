export enum ProductCategory {
  CLOTHING = 'Vêtements',
  SHOES = 'Chaussures',
  ACCESSORIES = 'Accessoires',
  TECH = 'Tech',
}

export enum SellerStatus {
    ONLINE = 'Connecté',
    UNAVAILABLE = 'Indisponible'
}

export interface SocialLinks {
    whatsapp: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrls: { [color: string]: string; }; // Changed from imageUrl
    category: ProductCategory;
    seller: {
        name: string;
        status: SellerStatus;
        socials: SocialLinks;
    };
    size?: string;
    colors?: string[];
    quantity?: number;
}

export interface OutfitItem {
    uniqueId: string;
    product: Product;
    selectedColor: string;
}
