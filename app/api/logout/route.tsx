import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')

  if (sessionCookie) {

    cookieStore.delete('session')
  }

  return NextResponse.json({logout:true});
}