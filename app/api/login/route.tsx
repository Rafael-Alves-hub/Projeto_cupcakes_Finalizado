
import { sql } from "../../util/db";
import { compare } from "bcryptjs";
import { NextResponse, type NextRequest } from "next/server";
import { createHmac } from "node:crypto";

export async function POST(request: NextRequest) {
    try {
        const body: unknown = await request.json().catch(() => null);

        if (
            !body ||
            typeof body !== "object" ||
            !("email" in body) ||
            !("password" in body) ||
            typeof body.email !== "string" ||
            typeof body.password !== "string" ||
            !body.email.trim() ||
            !body.password
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Informe um e-mail e uma senha válidos."
                },
                { status: 400 }
            );
        }

        const email = body.email.trim().toLowerCase();
        const password = body.password;

        const [user] = await sql`
            SELECT id, name, email, password
            FROM public."user"
            WHERE email = ${email}
            LIMIT 1
        `;

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "E-mail ou senha incorretos."
                },
                { status: 401 }
            );
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json(
                {
                    success: false,
                    message: "E-mail ou senha incorretos."
                },
                { status: 401 }
            );
        }

        const secret = process.env.SESSION_SECRET;

        if (!secret) {
            throw new Error("SESSION_SECRET não configurado.");
        }

        const sessionData = {
            id: user.id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        };

        const payload = Buffer
            .from(JSON.stringify(sessionData))
            .toString("base64url");

        const signature = createHmac("sha256", secret)
            .update(payload)
            .digest("base64url");

        const token = `${payload}.${signature}`;

        const response = NextResponse.json({
            success: true,
            message: "Login realizado com sucesso!",
            customer: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

        response.cookies.set("session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;

    } catch (error) {
        console.error("Erro ao realizar login:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Erro interno do servidor."
            },
            { status: 500 }
        );
    }
}
