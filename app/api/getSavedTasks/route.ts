import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request){
    const data = await req.json()
    const {id} = data

    const userTasks = await prisma.tarea.findMany({
        where : {userId: id}
    })

    if (userTasks.length === 0){
        return NextResponse.json({
            message: "No tasks"
        })
    }
    return NextResponse.json(userTasks)

}