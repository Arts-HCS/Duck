import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request){
    const data = await req.json()
    const {tasks} = data
    tasks.forEach(async (task:any)=>{
        const {id, date, time, desc,title, userID} = task
        console.log(userID)
        const stringed = `${userID}`
        const separatedDate = date.split("-")
        const year = parseInt(separatedDate[0])
        const month = parseInt(separatedDate[1])
        const day = parseInt(separatedDate[2])
        await prisma.tarea.create({
            data: {
                userId: stringed,
                title,
                hour: time,
                day,
                month,
                year
            }
        })
    })

    return NextResponse.json({
        message: "exito"
    })

}