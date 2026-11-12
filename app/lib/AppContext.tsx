
'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect, 
    type ReactNode,
} from 'react';

import type { Product } from '../types/Product';

export interface CartItem extends Product {
  quantity: number;
}

type ModalType = 'login' | 'register' | 'product-detail' | null;

interface AppContextType {
    ModalType: ModalType;
    isModalOpen: boolean;
    IsLoginOpen: boolean;

    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;

    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;

    openModal: () => void;
    openModalLogin: () => void;
    openProductModal: (product: Product) => void;
    selectedProduct: Product | null;

    closeModal: () => void;
    closeModalLogin: () => void;
}

const AppContext = createContext<AppContextType | undefined>(    undefined
);

export function AppProvider({ children }: { children: ReactNode }) {

    const [ModalType, setModalType] = useState<ModalType>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    
    const openModal = () => {
        setModalType('register');
    };

    const openModalLogin = () => {
        setModalType('login');
    };

    const openProductModal = (product: Product) => {
        setSelectedProduct(product);
        setModalType('product-detail');
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedProduct(null);
    };

    const closeModalLogin = closeModal;

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const isModalOpen = ModalType !== null;
    const IsLoginOpen = ModalType === 'login';

    useEffect(() => {
        if(!!cart && cart.length > 0){
            window.localStorage.setItem('cartItens', JSON.stringify(cart));
        }

    },[cart])

    useEffect(() => {
        const storedCart = window.localStorage.getItem('cartItens');
        if (storedCart) {
            const cartItens = JSON.parse(storedCart) as CartItem[];
            if (cartItens.length > 0) {
                setCart(cartItens);
            }
        }
    },[]);

    function addToCart(product: Product) {
        setCart((currentCart) => {
            const existingProduct = currentCart.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {
                return currentCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...currentCart, { ...product, quantity: 1 }];
        });
    }

    function removeFromCart(id: string) {
        setCart((currentCart) =>
            currentCart.filter((item) => item.id !== id)
        );
    }

    function updateQuantity(id: string, quantity: number) {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }

        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    }

    function clearCart() {
        setCart([]);
    }

    return (
        <AppContext.Provider
            value={{
                ModalType,
                isModalOpen,
                IsLoginOpen,
                isCartOpen,
                openModal,
                openModalLogin,
                openProductModal,
                selectedProduct,
                closeModal,
                closeModalLogin,
                openCart,
                closeCart,
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,

            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            'useApp must be used within AppProvider'
        );
    }

    return context;
}
