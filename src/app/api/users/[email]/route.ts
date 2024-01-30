import { NextResponse } from 'next/server';
import prisma from '@/lib/db'

export async function GET(request: Request, context: { email:string}){
    const { email } = context
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    return NextResponse.json(user)
}