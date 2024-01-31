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