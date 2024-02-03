import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import bcrypt from "bcrypt"

import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest){

    const { name, email, password, image, role } = await request.json()

    if(!name || !email || !password){
        return NextResponse.json("Invalid date", { status: 400})
    }

    const isUserExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(isUserExists){
        return NextResponse.json({ error: "Email already exists."}, { status: 400})
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


    return NextResponse.json(user, { status: 201})
}

export async function GET(){
    const session = await getServerSession(authOptions)

    if(session?.user?.role !== "admin"){
        return NextResponse.json({ error: "Não autorizado."}, { status: 401})
    }
    const users = await prisma.user.findMany()
    return NextResponse.json(users, { status: 200})
}