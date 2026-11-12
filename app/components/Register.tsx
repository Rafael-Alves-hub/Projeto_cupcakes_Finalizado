'use client';
import { useState } from "react";
import { useApp } from "../lib/AppContext";
import api from "../service/api";

type RegisterFormData = {
    name: string;
    email: string;
    address: string;
    password: string;
}

export default function Register(){
    const [msg, setMsg] = useState('');
    const [isSend, setIsSend] = useState(false);

    const {closeModal, isModalOpen} = useApp();
    const [formData, setFormData] = useState<RegisterFormData>({
        name: "",
        email: "",
        address: "",
        password: "",
    });


    const updateField = (field: keyof RegisterFormData, value: string) =>{
        setFormData((prev) => ({...prev, [field]:value}));
    }

    const handlerSubmit = async(e: React.FormEvent) => {
        setIsSend(true);

        e.preventDefault();
        try{
            const call = await api.post("api/register", formData);
            setMsg('Usuário cadastrado com sucesso!');
        }catch(e){
             setMsg('Usuário não cadastrado, erro!');
            console.log(e);
        }finally{
             setIsSend(false);
            setTimeout(() => {
                setMsg('');
            },3000)
           
        }
    }

    return (
        <>
        {isModalOpen && (
        <div className="register-dialog">
            <button className="close-button dialog-close" id="register-close" aria-label="Fechar Cadastro" onClick={closeModal}>×</button>
            <div className="register-content">
                <span className="eyebrow">Seja bem vindo (a)!</span>
                <h2>Crie sua conta</h2>
                {msg && (<div className="bg bg-red p-3">{msg}</div>)}
                <form id="register-form" onSubmit={handlerSubmit}>
                    <div className="form-group">
                        <label htmlFor="reg-name">Nome Completo</label>
                        <input type="text" id="reg-email" required placeholder="Digite o seu nome completo" onChange={(e) => updateField('name', e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-name">E-mail</label>
                        <input type="email" id="reg-email" required placeholder="seu@email.com" onChange={(e) => updateField('email', e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-name">Endereço</label>
                        <input type="text" id="reg-address" required placeholder="Rua, número, completo e bairro" onChange={(e) => updateField('address', e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reg-name">Senha (mínimo de 8 dígitos)</label>
                        <input type="password" id="reg-password" minLength={8} required placeholder="••••••••" onChange={(e) => updateField('password', e.target.value)}/>
                    </div>
                    <button type="submit" className="primary-button register-submit">{isSend ? 'Cadastrando...' : 'Finalizar cadastro'}</button>
                </form>
            </div>
            </div>
            )}
        </>
    );
}