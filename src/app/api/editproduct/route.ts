import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import prisma from "@/lib/db";

export async function POST(request: NextRequest){

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authorized." }, { status: 401 })
    }

    const { name, price, description, category, image, color, id, star, status } = await request.json()

    
    try{
        const product = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                name,
                price: parseFloat(price),
                status,
                star,
                description,
                categoryId: category,
                image,
                color: color || ''
            }
        })
        return NextResponse.json(product, { status: 201})
    } catch{
        return NextResponse.json({ error: "Product not found." }, { status: 400 })
    }

}