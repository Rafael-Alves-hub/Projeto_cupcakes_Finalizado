'use client';

import { useApp } from '../lib/AppContext';

export default function Cart() {
    const {
        isCartOpen,
        closeCart,
        cart,
        removeFromCart,
        updateQuantity,
        clearCart,
    } = useApp();

    if (!isCartOpen) return null;

    const money = (price: number) =>
        new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            {isCartOpen && (<div className="overlay visible"></div>)}
            
            <div className={`cart-drawer ${isCartOpen ? 'open': ''}`} onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    closeCart();
                }
            }}
            >
                <div className="cart-container" role="dialog" aria-modal="true" aria-labelledby="cart-title"> <div className="cart-header">
                    <div className="drawer-header">
                        <div>
                            <span className="eyebrow">SEU PEDIDO</span>
                            <h2>Meu carrinho</h2>
                        </div>
                        <button className="close-button" onClick={closeCart} id="cart-close" aria-label="Fechar carrinho">×</button>
                    </div>
                    
                    
        


                    </div>

                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <span>🧁<h3>Seu carrinho está vazio!</h3></span>
                            <p>Que tal escolher alguns cupcakes deliciosos?</p>
                            <button className="checkout-button" onClick={closeCart}>Continuar comprando</button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cart.map((item) => (
                                    <div className="cart-item" key={item.id}>
                                        <div className="cart-item-info">
                                            <div>
                                                <h3>{item.title}</h3>
                                                <small>&nbsp;{money(item.price)} cada</small>
                                            
                                                <div className="quantity-control">
                                                    <button  onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Diminuir quantidade de ${item.title}`}> -</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Aumentar quantidade de ${item.title}`}> +</button>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="remove-item" onClick={() => removeFromCart(item.id)} aria-label={`Remover ${item.title}`}>Remover</button>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <div>
                                    <span>Subtotal</span>
                                    <strong id="cart-total">&nbsp;{money(total)}</strong>
                                </div>
                                <small>Entrega calculada na próxima etapa.</small>
                                <div className="buttons">
                                    <button className="clear-cart-button checkout-button" onClick={clearCart}> Limpar carrinho</button>
                                    <button className="checkout-button">Finalizar pedido</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
