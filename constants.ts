import { Product, ProductCategory, SellerStatus } from './types';

export const INITIAL_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Loyalty Hoodie',
        description: 'A comfortable black hoodie with a subtle glass cross design on the back. Perfect for late-night thoughts.',
        price: 75,
        imageUrls: {
            'Black': 'https://picsum.photos/seed/loyalty-black/500/700',
            'Grey': 'https://picsum.photos/seed/loyalty-grey/500/700',
            'White': 'https://picsum.photos/seed/loyalty-white/500/700',
        },
        category: ProductCategory.CLOTHING,
        seller: {
            name: 'Studio Tears',
            status: SellerStatus.ONLINE,
            socials: { whatsapp: '1234567890' }
        },
        size: 'L',
        colors: ['Black', 'Grey', 'White'],
        quantity: 10,
    },
    {
        id: '2',
        name: 'Beach Dream Sunglasses',
        description: 'Retro-futuristic sunglasses that make you feel the sun, even in a dimmed room.',
        price: 120,
        imageUrls: {
            'Gold/Blue': 'https://picsum.photos/seed/beachdream-gold/500/500',
            'Silver/Black': 'https://picsum.photos/seed/beachdream-silver/500/500',
        },
        category: ProductCategory.ACCESSORIES,
        seller: {
            name: 'Sunset Vision',
            status: SellerStatus.ONLINE,
            socials: { whatsapp: '1234567890', instagram: 'sunsetvision' }
        },
        colors: ['Gold/Blue', 'Silver/Black'],
        quantity: 5,
    },
    {
        id: '3',
        name: 'Ghost Runner Sneakers',
        description: 'Lightweight sneakers with a translucent sole. For moving silently through the city.',
        price: 180,
        imageUrls: {
            'White': 'https://picsum.photos/seed/ghostrunner-white/500/500',
            'Black': 'https://picsum.photos/seed/ghostrunner-black/500/500',
            'Red': 'https://picsum.photos/seed/ghostrunner-red/500/500',
        },
        category: ProductCategory.SHOES,
        seller: {
            name: 'NightWalk',
            status: SellerStatus.UNAVAILABLE,
            socials: { whatsapp: '1234567890' }
        },
        size: '42',
        colors: ['White', 'Black', 'Red'],
        quantity: 0,
    },
    {
        id: '4',
        name: 'Echo Phone v1',
        description: 'A minimalist phone with a focus on core communication. No distractions.',
        price: 450,
        imageUrls: {
            'Matte Black': 'https://picsum.photos/seed/echo/500/600',
        },
        category: ProductCategory.TECH,
        seller: {
            name: 'Barely Tech',
            status: SellerStatus.ONLINE,
            socials: { whatsapp: '1234567890', tiktok: 'barelytech' }
        },
        colors: ['Matte Black'],
        quantity: 25,
    },
     {
        id: '5',
        name: 'Tears Jacket',
        description: 'A waterproof jacket that looks like it\'s perpetually wet with rain. Reflective and poetic.',
        price: 250,
        imageUrls: {
            'Reflective Gray': 'https://picsum.photos/seed/tears/500/700',
        },
        category: ProductCategory.CLOTHING,
        seller: {
            name: 'Studio Tears',
            status: SellerStatus.ONLINE,
            socials: { whatsapp: '1234567890', facebook: 'studiotears' }
        },
        size: 'M',
        colors: ['Reflective Gray'],
        quantity: 3,
    },
    {
        id: '6',
        name: 'Memory Locket',
        description: 'A digital locket that displays a single, cherished memory. An accessory with a soul.',
        price: 95,
        imageUrls: {
            'Silver': 'https://picsum.photos/seed/memory-silver/500/500',
            'Gold': 'https://picsum.photos/seed/memory-gold/500/500',
        },
        category: ProductCategory.ACCESSORIES,
        seller: {
            name: 'Eternal Moments',
            status: SellerStatus.ONLINE,
            socials: { whatsapp: '1234567890' }
        },
        colors: ['Silver', 'Gold'],
        quantity: 15,
    }
];
