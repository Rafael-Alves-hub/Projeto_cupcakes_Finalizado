'use client';

import { useApp } from '@/app/lib/AppContext'
import { Product } from '../types/Product';

interface Detail{
    product: Product;
}


export default function ProductDetail({ product }: Detail){
    const { addToCart, closeModal } = useApp()

    const money = (price: number) =>
        new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);

    function handleAddToCart() {
        addToCart?.(product);
    }

    return (
        <div className="product-dialog" id="product-dialog">
            <button className="close-button dialog-close" id="dialog-close" aria-label="Fechar detalhes" onClick={closeModal}>×</button>
            <img id="dialog-image" src={product.image} alt={product.title} />
            <div className="dialog-content">
                <span className="eyebrow">UM SABOR ESPECIAL</span>
                <h2 id="dialog-name">{product.title}</h2>
                    <p id="dialog-description">{product.description}</p>
                    <div className="rating">★★★★★ <span>5,0 · Avaliação ilustrativa</span>
                    </div>
                    <strong className="dialog-price" id="dialog-price">{money(product.price)}</strong>
                <button className="primary-button" id="dialog-add" onClick={handleAddToCart}>Adicionar ao carrinho <span>+</span>
                </button>
            </div>
        </div>
    )
}

