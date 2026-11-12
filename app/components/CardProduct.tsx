
'use client';

import { useState } from 'react';
import { useApp } from '@/app/lib/AppContext'
import { Product } from '../types/Product';

interface CardProductProps {
    product: Product;
    notify?: (message: string) => void;
}

export default function CardProduct({ product, notify, }: CardProductProps) {
    const { addToCart, openProductModal } = useApp()
    const [isFavorite, setIsFavorite] = useState(false);

    const money = (price: number) =>
        new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);

    function handleAddToCart() {
        addToCart?.(product);
        notify?.(`${product.title} adicionado ao carrinho!`);
    }

    function toggleFavorite() {
        const nextFavorite = !isFavorite; setIsFavorite(nextFavorite); notify?.(nextFavorite ? 'Adicionado aos favoritos!' : 'Removido dos favoritos.');
    }

    return (
        <>
            <article className="product-card">
                <button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} aria-label={isFavorite? 'Remover dos favoritos': 'Adicionar aos favoritos'} aria-pressed={isFavorite} onClick={toggleFavorite}>{isFavorite ? '♥' : '♡'}</button>
                <button className="product-image-button detail-trigger" aria-label={`Ver detalhes de ${product.title}`} onClick={() => openProductModal(product)}><img src={product.image} alt={product.title}/></button>
                <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <div className="product-bottom"><strong>{money(product.price)}</strong>
                        <button className="add-button" onClick={handleAddToCart}>Adicionar <span>+</span></button>
                    </div>
                </div>
            </article>

        </>
    );
}
