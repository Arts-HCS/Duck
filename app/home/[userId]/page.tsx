"use client";

import next from "next";
import Link from "next/link"
import { title } from "process";
import { useEffect, useState } from "react";
import { useRef } from "react";

interface Task {
    id: number,
    content: string,
    status: number
    answer?: string
}

export default function Home(){

    const [status, setStatus] = useState(0)

    const inputRefs = useRef<HTMLInputElement[]>([])

    const [tasks, setTasks] = useState<Task[]>([{
        id: Date.now(),
        content: "",
        status: 0
    }]);

    const handleChange = (id: number, text:string, index: number) =>{
        setTasks((prev)=>{
            let updated = prev.map(task=>
                task.id === id ? {...task, content: text} : task
            )
            if (text.trim() === "" && index !== tasks.length -1){
                updated = updated.filter(task => task.id !== id)
            }
            const last = updated[updated.length -1]
            if (last && last.content.length > 3) {
                updated.push({
                  id: Date.now(),
                  content: "",
                  status: 0
                });
            }
            return updated
        } )
    } 

    const handleKeyDown = async (e:any, id: number) =>{
        if (e.key === "Enter"){
            e.preventDefault()
            e.currentTarget.blur()

            const nextInput = inputRefs.current[inputRefs.current.length-1]
            nextInput.focus()

            const task = tasks.find(task => task.id === id)
            if (!task) return

            const {content, status} = task
            if (content.startsWith('8')) return

            setTasks((prev)=>{
                return prev.map(task => task.id === id ? {...task, status: 1}: task)
            })
            const data = await fetch('http://localhost:3000/api/createTask',{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    content
                })
            })
            const resp = await data.json()
            const answer = resp.answer;
            console.log(answer)
            if (answer === "Error"){
                setTasks((prev)=>{
                    return prev.map(task => task.id === id ? {...task, answer, status: 2}: task)
                })
                return
            } else {
                setTasks((prev)=>{
                    return prev.map(task => task.id === id ? {...task, status: 3}: task)
                })
            }

            setTasks((prev)=>{
                return prev.map((task) => task.id === id ? {...task, answer}: task)
            })

        }

        const hasAnswer = tasks.find(task => task.id === id)?.answer 

        if (e.key === "Backspace" && hasAnswer){
            setTasks((prev)=>{
                return prev.map(task => task.id === id ? {...task, status: 4}: task)
            })
            
        }

        if (e.key === "Backspace" && e.currentTarget.value === "" && tasks.length > 1){
            e.currentTarget.blur()
            setTasks((prev)=>{
                prev = prev.filter(task => task.id !== id)
                return prev
            })
            const nextInput = inputRefs.current[inputRefs.current.length-2]
            nextInput.focus()
        }

    }
    useEffect(()=>{
        const firstInput = inputRefs.current[0]
        firstInput.focus()
    }, [])

    return(
        <main className="bg-[#202225] flex items-start justify-start w-full max-h-screen h-screen">
            <div className="h-full w-full flex flex-col items-start justify-start">
                <header className="w-full p-4 flex items-center justify-start h-15 border-b border-[#dcd9de11]">
                    <button className="flex items-center gap-2 cursor-pointer p-2 hover:bg-[#2F3136] rounded-md transition-all text-[17px]" 
                        onClick={()=>{}}>
                            Nombre 
                            <i className="fa-solid fa-chevron-down text-[14px] text-[#6b6e91]"></i>
                    </button>

                    <div className="ml-auto flex items-center gap-2">
                        <Link 
                            className="w-8 h-8 roundef-full text-[18px] flex items-center justify-center p-6  hover:bg-[#2F3136] hover:shadow-[0_0_10px_#2F3136] rounded-2xl transition-all" href={"/profile"}>
                                <i className="fa-solid fa-user"></i>
                        </Link>
                        <Link 
                            className="w-8 h-8 roundef-full text-[18px] flex items-center justify-center p-6 hover:bg-[#2F3136] hover:shadow-[0_0_10px_#2F3136] rounded-2xl transition-all" href={"/settings"}>
                                <i className="fa-solid fa-gear"></i>
                        </Link>
                    </div>
                </header>

                <section className="flex items-end justify-center h-full w-full ">
                        <div className="w-[35%] flex items-center justify-start flex-col h-[73%] overflow-scroll ">
                            <h3 className="mb-11 text-3xl font-normal text-[#dcd9deda]">El mundo es tuyo</h3>
                            {tasks.map(({id, content, status}, index) =>{
                                return (
                                    <div key={index} 
                                        className={`flex items-center justify-start relative mb-5 ${(content.trim() === ""  && index !== 0) ? "w-[80%]" : "w-full"}`}>
                                        <p className={`text-[16px] font-normal ${(content.trim() === ""  && index !== 0) ? " text-[#dcd9de6a]" : "text-[#DCD9DE]"}`}>{index+1}</p>
                                        <input 
                                            className={`border-b p-2 ml-3 text-[#dcd9dee3] outline-none w-full pr-7 text-[17.5px] ${(content.trim() === ""  && index !== 0) ? " border-[#9797975e]" : " border-[#979797]"}`}
                                            placeholder={`${index === 0 ? "¿Qué hay por hacer?" : ""}`}
                                            value={content}
                                            onChange={(e)=> handleChange(id, e.target.value, index)}
                                            onKeyDown={(e)=> handleKeyDown(e, id)}
                                            ref = {(inp) =>{ if (inp) inputRefs.current.push(inp) }}
                                        />
                                        <button 
                                            className={`task-circle ${status === 0 && "task-status-zero"} ${status === 1 && "task-status-one"} ${status === 2 && "task-status-two"} ${status === 3 && "task-status-three"} ${status === 4 && "task-status-four"}
                                            
                                            ${(content.trim() === ""  && index !== 0) ? " opacity-10" : " opacity-100 cursor-pointer"}
                                            
                                            `}
                                        >      

                                        {status === 0 && <i className="fa-solid fa-paperclip"></i>}
                                        {status === 1 && <i className="fa-solid fa-hourglass-start text-[#665d3c]"></i>}
                                        {status === 2 && <i className="fa-solid fa-exclamation"></i>}
                                        {status === 3 && <i className="fa-solid fa-arrow-up-long"></i>}
                                        {status === 4 && <i className="fa-solid fa-repeat"></i>}

                                        </button>
                                    </div>
                                )
                            })  }
                        </div>
                </section>
            </div>
            <div className="h-full w-20 border-l border-[#dcd9de11] flex flex-col gap-4 p-4 items-center justify-center">
                <button className="side-button"><i className="fa-solid fa-file-pen"></i></button>
                <button className="side-button"><i className="fa-solid fa-list-check"></i></button>
                <button className="side-button"><i className="fa-solid fa-book-bookmark"></i></button>
                <button className="side-button"><i className="fa-solid fa-dna"></i></button>
            </div>
            

        </main>
    )
}