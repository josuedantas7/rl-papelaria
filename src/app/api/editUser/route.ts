import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: Request){



    const { name, image, role, email, id } = await request.json()

    const userOld = await prisma.user.findUnique({
        where: {
            id: id
        }
    })


    try {
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