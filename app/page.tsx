

import type { Product } from "./types/Product";
import CardProduct from "./components/CardProduct";

export const products: Product[] = [
    {
        id: "1",
        category: "QUERIDINHO",
        title: "Bolo de Laranja",
        description: "Massa fofinha de laranja com chantilly e raspas de laranja.",
        image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=700&q=80",
        price: 14.00
    },
    {
        id: "2",
        category: "ESPECIAL",
        title: "Chocolate Belga",
        description: "Massa leve e delicada, recheada com Chocolate Belga intenso.",
        image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=700&q=80",
        price: 13.50
    },
    {
        id: "3",
        category: "ÚNICO",
        title: "Ferrero Rocher",
        description: "Massa saborosa e recheada com o incrível Ferrero Rocher.",
        image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=700&q=80",
        price: 17.50
    },
    {
        id: "4",
        category: "CLÁSSICO",
        title: "Baunilha",
        description: "Massa amanteigada com recheio de creme.",
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=700&q=80",
        price: 20.00
    }
];

export default function Home() {
    
    return (
        <>
            <section className="hero" id="inicio">
                <div className="hero-content">
                    <span className="eyebrow">Um doce momento de alegria</span>
                    <h1>Pequenos prazeres,<br /><em>grandes alegrias.</em></h1>
                    <p>
                        Cupcakes artesanais preparados com ingredientes
                        selecionados e uma pitada de amor e carinho.
                    </p>
                    <a className="primary-button" href="#catalogo">Descobrir Sabores <span>→</span></a>
                    <div className="hero-note"><span>✦</span> Produção artesanal - Ingredientes selecionados</div>
                </div>

                <div className="hero-image-wrap"><img className="hero-image" src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1000&q=85" alt="Cupcakes decorados com cobertura cremosa" />
                    <div className="floating-note">
                        <span>♡</span>
                        <div>
                            <strong>Feito com amor</strong>
                            <small>Do forno para você</small>
                        </div>
                    </div>
                </div>
            </section>

            <section className="catalog-section" id="catalogo">
                <div className="section-heading">
                    <div>
                        <span className="eyebrow">ESCOLHA SEU FAVORITO</span>
                        <h2>Nossos <em>cupcakes</em></h2>
                        <p>Sabores especiais para adoçar o seu dia.</p>
                    </div>
                    <span className="product-total">04 sabores selecionados</span>
                </div>

                <div className="product-grid" id="product-grid">
                    {products.map(item => (
                        <CardProduct
                            key={item.id}
                            product={item}
                        />
                    ))}
                </div>
            </section>

            <section className="about-strip" id="sobre">
                <span className="about-icon">♡</span>

                <div>
                    <span className="eyebrow">
                        Um remédio em forma de doce
                    </span>

                    <h2>Feito com amor. Entre com carinho</h2>

                    <p>
                        Cada cupcake é preparado para transformar
                        dias difíceis em lembranças positivas.
                    </p>
                </div>
            </section>
        </>
    );
}
