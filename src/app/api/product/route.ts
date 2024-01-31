import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import prisma from "@/lib/db";

export async function GET(){
    return NextResponse.json({ message: "Hello World" });
}

export async function POST(request: Request){
    const { name, price, description, category, image, color } = await request.json()

    if (!name || !price || !description || !category || !image) {
        return NextResponse.json("Todos os dados são obrigatórios para cadastro dos produtos", { status: 400 })
    }

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Não autorizado." }, { status: 401 })
    }

    const product = await prisma.product.create({
        data: {
            name,
            price: parseFloat(price),
            description,
            category,
            image,
            color: color || ''
        }
    })

    return NextResponse.json(product)
}