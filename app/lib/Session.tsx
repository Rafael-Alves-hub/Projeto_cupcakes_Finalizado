import { createHmac, timingSafeEqual } from "node:crypto";

export function verifySession(token: string) {
    try {
        const secret = process.env.SESSION_SECRET;

        if (!secret) {
            throw new Error("SESSION_SECRET não configurado.");
        }

        const [payload, signature] = token.split(".");

        if (!payload || !signature) return null;

        const expectedSignature = createHmac("sha256", secret)
            .update(payload)
            .digest();

        const receivedSignature = Buffer.from(
            signature,
            "base64url"
        );

        if (
            receivedSignature.length !== expectedSignature.length ||
            !timingSafeEqual(receivedSignature, expectedSignature)
        ) {
            return null;
        }

        const session = JSON.parse(
            Buffer.from(payload, "base64url").toString("utf8")
        );

        if (
            !session.id ||
            typeof session.exp !== "number" ||
            session.exp < Math.floor(Date.now() / 1000)
        ) {
            return null;
        }

        return session;

    } catch {
        return null;
    }
}
