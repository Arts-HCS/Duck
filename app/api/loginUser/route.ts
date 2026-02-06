import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request){

    const body = await req.json()
    const {email, password} = body

    const userExists = await prisma.usuario.findUnique({
        where: {email}
    })
    if (!userExists){
        return NextResponse.json({
            message: "notfound"
        })
    }

    if (userExists){
        if (userExists.password !== password){
            return NextResponse.json({
                message: "notpassword"
            })
        }
        const {password: _, ...safeUser} = userExists

        return NextResponse.json(
            {
                message: "exito",
                user: safeUser
            }
        )
    }

}