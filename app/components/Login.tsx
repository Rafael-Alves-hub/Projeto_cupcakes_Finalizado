"use client"

import { useState, type FormEvent } from "react";
import { isAxiosError } from "axios";
import { useApp } from "../lib/AppContext";
import api from "../service/api";
import { redirect, useRouter } from 'next/navigation';

type LoginResponse = {
    success: boolean;
    message: string;
    customer?: {
        name: string;
        email: string;
    };
};

export default function Login() {

    const { closeModal, IsLoginOpen, openModalLogin } = useApp();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    async function handlerLogin(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post<LoginResponse>("/api/login", {
                email: email.trim().toLowerCase(),
                password,
            });

            if (response.data.success) {

                console.log("Login realizado com sucesso!");
                closeModal();
                window.location.reload();

            } else {
                setError(
                    response.data.message || "Não foi possível entrar."
                );
            }

        } catch (err: unknown) {

            if (isAxiosError<{ message?: string }>(err)) {
                setError(
                    err.response?.data?.message ||
                    "E-mail ou senha incorretos. Tente novamente."
                );

            } else {
                setError("Ocorreu um erro inesperado.");
            }
        } finally {

            setLoading(false);
        }
    }

    return (
        <>
            {IsLoginOpen && (
                <div className="login-dialog">
                    <button className="close-button dialog-close" id="login-close" onClick={closeModal} aria-label="Fechar login">×</button>
                    <div className="login-content" >
                        <span className="eyebrow">Já tenho uma conta criada</span>
                        <h2>Acesse</h2>
                        <form id="login-form" onSubmit={handlerLogin}>
                            <div className="form-group">
                                <label htmlFor="login-email">E-mail</label>
                                <input type="email" id="login-email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="seu@email.com" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="login-password">Senha (mínimo de 8 dígitos)</label>
                                <input type="password" id="login-password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} required placeholder="••••••••" />
                            </div>
                            <button type="submit" className="primary-button login-submit">Acessar</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}