import { sql } from "@/app/util/db";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const {name, email, address, password} = await request.json();

    const result = await sql`select * from public.user where email=${email}`;

    if(result.length > 0){
        return NextResponse.json({
            error: 'User already exists!'
        },{
            status:500
        })
    }

    const passwordHash = await hash(password, 12);


    const register = await sql`
            INSERT INTO public.user (
                name,
                email,
                address,
                password
            )
            VALUES (
                ${name},
                ${email},
                ${address},
                ${passwordHash}
            )
        `;
    return NextResponse.json(result);
}