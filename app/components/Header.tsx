'use client';
import {useEffect, useState} from 'react';
import { useApp } from "../lib/AppContext"
import api from "../service/api";

export default function Header(){
    const {openModal, isModalOpen, openModalLogin, openCart, cart} = useApp();
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const [showButtons, setShowButtons] = useState(false);
    const [currentUser, setCurrentUser] = useState<{id:number, name: string, email: string}>()

    useEffect(() => {
        loadUser();
        
    },[])

    function loadUser(){
        api.get('/api/profile').then((resp) => {
            console.log('resp', resp.data);
            const {id, email, name} = resp.data;
            if(id){
                setShowButtons(false);
            }else{
                setShowButtons(true);
            }
        }).catch((error) => {
            setShowButtons(true);
        });
    }

    function logout(){
        api.get('/api/logout').then((resp) => {
            window.location.reload();
        })
    }


    return (
        <>
        {isModalOpen && (<div className="overlay"></div>)}
        
        <div className="announcement"> Feitos com amor e carinho a cada etapa do preparo</div>
        <header className="site-header">
            <a className="brand" href="#" aria-label="Doutor doce - página inicial">
                <span className="brand-mark">✿</span>
                <span>Doutor <strong>Doce</strong><small> - CUPCAKES ARTESANAIS</small></span>
            </a>

            <nav className="main-nav" aria-label="Navegação principal">
                <a className="active" href="#inicio">Inicio</a>
                <a href="#catalogo">Nossos Produtos</a>
                <a href="#sobre">Sobre nós</a>
            </nav>

            <div className="header-actions">
                {showButtons ? (<>
                    <button className="primary-button register-button" id="register-toggle" onClick={openModal}>Cadastre-se</button>
                    <button className="primary-button login-button" id="login-toggle" onClick={openModalLogin}>Acesse Agora</button>
                </>) : (
                    <button className="primary-button login-button" id="login-toggle" onClick={logout}>Sair</button>
                )}

                <button className="icon-button" id="cart-toggle" aria-label="Abrir carrinho" onClick={openCart}>
                    <span aria-hidden="true">♧</span>
                    <span className="cart-label">Carrinho</span>
                    <span className="cart-count" id="cart-count">{cartCount}</span>
                </button>
            </div>
        </header>
    </>
    )
}