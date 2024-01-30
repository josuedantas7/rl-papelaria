import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import bcrypt from "bcrypt"

import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){

    const { name, email, password, image, role } = await request.json()

    if(!name || !email || !password){
        return NextResponse.json("Dados inválidos.", { status: 400})
    }

    const isUserExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(isUserExists){
        return NextResponse.json({ error: "E-mail já existente."}, { status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
            image,
            role: role || "user"
        }
    })


    return NextResponse.json(user)
}

export async function GET(request: NextRequest){
    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({ error: "Não autorizado."}, { status: 401})
    }

    const { searchParams } = new URL(request.nextUrl)
    
    const email = searchParams.get("email")

    if(email){
        
        try{
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            return NextResponse.json(user)
        } catch{
            return NextResponse.json({ error: "Usuário não encontrado."}, { status: 404})
        }
    } else {
        NextResponse.json({ error: "E-mail não informado."}, { status: 400})
    }
}