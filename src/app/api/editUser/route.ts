import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request){


    const session = await getServerSession(authOptions)



    const { name, image, role, email, id } = await request.json()

    const userOld = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    try {
        if (role === 'admin' && session?.user?.role !== 'admin') {
            return NextResponse.json({message: "Você não tem permissão para alterar o papel do usuário"})
        }
        const user = await prisma.user.update({
            where: { id: id },
            data: {
                name: name || userOld?.name,
                image: image || userOld?.image,
                role: role || userOld?.role,
                email: email || userOld?.email
            }
        })
    
        return NextResponse.json(user)
    } catch{
        return NextResponse.json({message: "Erro ao cadastrar usuário"})
    }



}