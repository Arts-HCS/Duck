"use client";

import Link from "next/link"
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

import BigWritingComponent from "@/components/bigDashbordComponents/bigWritingComponent";
import BigTasksComponent from "@/components/bigDashbordComponents/bigTasksComponent";
import BigCalendarComponent from "@/components/bigDashbordComponents/bigCalendarComponent";
import UserBox from "@/components/ui/userBox";

export interface Task {
    id: number,
    content: string,
    status: number
    answer?: string,
    date?: string,
    time?: string,
    desc?: string,
    title?: string,
    userID?: string
}

export default function Home(){

    const route = useRouter();

    const inputRefs = useRef<HTMLInputElement[]>([]);

    const userBoxRef = useRef(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const [userBoxActive, setUserBoxActive] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([{
        id: Date.now(),
        content: "",
        status: 0
    }]);

    useEffect(()=>{
        const readyTasks = tasks.filter(task => task.title).map(task => ({...task, userID: activeUser.id}) )

        const uploadTasks = async () =>{
            const resp = await fetch("/api/saveNewTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tasks: readyTasks
                })
            })
        }
        if (readyTasks.length > 0) uploadTasks()
    }, [tasks])


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
            const answer = resp.answer.split(",");
            const date = answer[0]
            const time = answer[1]
            const desc = answer[2]
            const title = answer[3]
            if (date === "Error"){
                setTasks((prev)=>{
                    return prev.map(task => task.id === id ? {...task, status: 2}: task)
                })
                return
            } else {
                setTasks((prev)=>{
                    return prev.map(task => task.id === id ? {...task, status: 3}: task)
                })
            }

            setTasks((prev)=>{
                return prev.map((task) => task.id === id ? {...task, date, time, desc, title}: task)
            })

        }

        const hasAnswer = tasks.find(task => task.id === id)?.date 

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
    // USE STATES PARA LOS BOTONES DEL LADO DERECHO
    const icons = [
        "fa-file-pen",
        "fa-calendar",
        "fa-list-check",
        "fa-book-bookmark",
        "fa-dna"
    ];


    const [active, setActive] = useState<number[]>([0,1]);

    function toggleButton(index:number) {
      setActive(prev => {
        if (prev.includes(index)) return prev.filter(i => i !== index);

        if (prev.length >= 3) {
          return prev;
        }

        return [...prev, index];
      });
    }

    const [activeUser, setActiveUser] = useState<any>(null);

    async function userWelcome(){
        const stored = localStorage.getItem('userWelcome');
        
        if (!stored) {
            route.replace('/login?unauthorized=1')
            return
        }
        const data = JSON.parse(stored).userId;
        const resp = await fetch('/api/userWelcome', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                userId: data
            })
        })
        const user = await resp.json();
        setActiveUser(user);
    }

    useEffect(() => {
        userWelcome();
        const firstInput = inputRefs.current[0];
        firstInput?.focus();
    }, []);


    useEffect(() => {
        if (!activeUser) return;
    }, [activeUser]);

    useEffect(()=>{

        function detectClick(e:MouseEvent){
            if (userBoxActive && 
                userBoxRef.current &&
                !userBoxRef.current.contains(e.target as Node) &&
                !buttonRef.current?.contains(e.target as Node)
            ){
                setUserBoxActive(false)
            }
        }
        document.addEventListener('mousedown', detectClick)        

        return ()=>{
            document.removeEventListener('mousedown', detectClick)
        }

    }, [userBoxActive])

    return(
        <main className="bg-[#202225] flex items-start justify-start w-full max-h-screen h-screen overflow-hidden">
            <div className="h-full w-full flex flex-col items-start justify-start">
                <header className="w-full p-4 flex items-center justify-start h-15">
                    <button className="flex items-center gap-2 cursor-pointer p-2 hover:bg-[#2F3136] rounded-md transition-all text-[17px]" 
                        onClick={()=>{}}>
                            {activeUser ? activeUser.name : "Cargando..."} 
                            <i className="fa-solid fa-chevron-down text-[14px] text-[#6b6e91]"></i>
                    </button>

                </header>

                <div className="flex h-full w-full items-start justify-start overflow-scroll">
                    <UserBox activeUser={activeUser} setActiveUser={setActiveUser} userBoxActive={userBoxActive} ref={userBoxRef}></UserBox>
                    <div className="h-full w-20 border-r border-[#dcd9de7f] flex flex-col gap-4 p-4 items-center justify-center relative">
                        <div className="black-shadow"></div>
                            {icons.map((icon, i) => (
                              <button
                                key={i}
                                onClick={() => toggleButton(i)}
                                className={`side-button ${active.includes(i) ? "button-active" : ""}`}
                              >
                                <i className={`fa-solid ${icon}`}></i>
                              </button>
                            ))}
                        <div className="absolute bottom-4 right-4 flex flex-col items-center">
                            <button 
                                className="w-8 h-8 roundef-full text-[18px] flex items-center   justify-center p-6  hover:bg-[#2F3136] hover:shadow-  [0_0_10px_#2F3136] rounded-2xl transition-all cursor-pointer"
                                onClick={()=> setUserBoxActive(!userBoxActive)}
                                ref = {buttonRef}
                                >
                                    <i className="fa-solid fa-user text-[#979797]"></i>
                            </button>
                            <button 
                                className="w-8 h-8 roundef-full text-[18px] flex items-center   justify-center p-6 hover:bg-[#2F3136] hover:shadow-   [0_0_10px_#2F3136] rounded-2xl transition-all">
                                    <i className="fa-solid fa-gear text-[#979797]"></i>
                            </button>
                    </div>
                    </div>

                    {active.length === 1 && active.includes(0) && <BigWritingComponent tasks={tasks} handleChange={handleChange} handleKeyDown={handleKeyDown} inputRefs={inputRefs} setActive={setActive} />}
                    {active.length === 1 && active.includes(1) && <BigCalendarComponent tasks={tasks} />}
                    {active.length === 1 && active.includes(2) && <BigTasksComponent tasks={tasks} setActive={setActive} activeUser={activeUser} />}
                    {active.length === 2 && active.includes(0) && active.includes(1) && (
                        <div className="flex flex-col items-start justify-start h-full w-full ">
                            <BigWritingComponent
                              tasks={tasks}
                              handleChange={handleChange}
                              handleKeyDown={handleKeyDown}
                              inputRefs={inputRefs}
                              active={active}
                              setActive={setActive}
                            />
                            <BigCalendarComponent active={active} setActive={setActive} tasks={tasks} />
                            
                        </div>

                    )}
                    
                </div>

            </div>         

        </main>
    )
}
