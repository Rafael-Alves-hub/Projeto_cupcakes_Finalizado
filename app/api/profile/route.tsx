import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@/app/util/db";
import { verifySession } from "@/app/lib/Session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const cookieStore = await cookies();

    const token = cookieStore.get("session")?.value;

    if (!token) {
        redirect("/");
    }

    const session = verifySession(token);
    if (!session) {
        redirect("/");
    }

    const [user] = await sql`
            SELECT id, name, email
            FROM public."user"
            WHERE id = ${session.id}
            LIMIT 1
        `;

    return NextResponse.json(user);
}