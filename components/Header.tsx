
import React from 'react';

const GlassCrossIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 opacity-80">
        <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const Header: React.FC = () => {
    return (
        <header className="py-6 px-4 sm:px-6 lg:px-8 text-center bg-stone-950/50 backdrop-blur-sm sticky top-0 z-40">
            <h1 className="text-3xl font-light text-stone-200 tracking-widest uppercase">
                <GlassCrossIcon />
                TryMe Market
            </h1>
            <p className="text-sm text-stone-400 mt-1">An Emotional Marketplace</p>
        </header>
    );
};

export default Header;
