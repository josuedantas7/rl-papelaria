import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import prisma from "@/lib/db";

export async function POST(request: NextRequest){

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authorized." }, { status: 401 })
    }

    const { name, id, image } = await request.json()

    
    try{
        const category = await prisma.category.update({
            where: {
                id: id
            },
            data: {
                name,
                image,
            }
        })
        return NextResponse.json(category, { status: 201})
    } catch{
        return NextResponse.json({ error: "Category not found." }, { status: 400 })
    }

}