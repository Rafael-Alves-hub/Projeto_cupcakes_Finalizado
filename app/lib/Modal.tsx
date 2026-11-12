
'use client';

import { useApp } from './AppContext';
import Login from '../components/Login';
import Register from '../components/Register';
import ProductDetail from '../components/ProductDetail';

export default function Modal() {
    const { ModalType, closeModal, selectedProduct } = useApp();

    if (!ModalType) return null;

    const isProductDetail = ModalType === 'product-detail';
    if (isProductDetail && !selectedProduct) return null;

    const dialogLabel = isProductDetail
        ? `Detalhes de ${selectedProduct?.title ?? 'produto'}`
        : ModalType === 'login'
            ? 'Acesse sua conta'
            : 'Crie sua conta';

    return (
        <div
            className="modal-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    closeModal();
                }
            }}
        >
            <div
                className="modal-container"
                role="dialog"
                aria-modal="true"
                aria-label={dialogLabel}
            >
                {ModalType === 'login' ? (
                    <Login />
                ) : ModalType === 'register' ? (
                    <Register />
                ) : (
                    <ProductDetail product={selectedProduct!} />
                )}
            </div>
        </div>
    );
}
