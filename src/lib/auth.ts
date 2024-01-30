import type { Adapter } from 'next-auth/adapters';
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialProvider from "next-auth/providers/credentials"


import prisma from "@/lib/db"

import bcrypt from "bcrypt"


export const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(prisma as any) as Adapter,
    providers:[
        CredentialProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "text", placeholder: "John Smith" },
            },
            async authorize(credentials, req) : Promise<any>{


                console.log("Authorize method", credentials)


                if(!credentials?.email || !credentials?.password) throw new Error("Dados de Login necessarios")

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials?.email
                    }
                })

                console.log("USER", user)

                if(!user || !user.hashedPassword) {
                    throw new Error("Usuários não registrado através de credenciais")
                }

                const matchPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
                if(!matchPassword) throw new Error("Senha incorreta")

                return user

            },
        })
    ],
    callbacks: {
        async session({ session }) {
            const user = await prisma.user.findUnique({
                where: {
                    email: session?.user?.email ?? ''
                }
            })
            if (user){
                const newSession = {
                    user: {
                        ...session.user,
                        id: user.id,
                        role: user.role
                    },
                    expires: session.expires // Add the expires property
                }
                return newSession
            } else {
                return session
            }
        }
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.SECRET,
    debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: "/login"
    }
}