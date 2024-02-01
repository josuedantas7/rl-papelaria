import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { NextResponse } from "next/server";

export async function POST(request: Request){


    const { searchParams } = new URL(request.url)

    const userId = searchParams.get('id')

    return NextResponse.json({ message: `UserID : ${userId}` });

}