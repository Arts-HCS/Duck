import { Task } from "../../app/home/page"

import { useEffect } from "react";

export default function BigWritingComponent(
    {
        tasks,
        handleChange,
        handleKeyDown,
        inputRefs,
        active,
        setActive
    }: {
        tasks: Task[],
        handleChange: (id: number, text:string, index: number) => void,
        handleKeyDown: (e:any, id: number) => void,
        inputRefs: React.MutableRefObject<HTMLInputElement[]>,
        active?: any,
        setActive?: any
    }
)
{

    return(
        <section className={`flex flex-col items-center justify-end h-full w-full overflow-scroll ${active ? "flex-2 pb-10": ""}`}>
                        <h3 className={`mb-11 text-3xl font-normal text-[#dcd9deda] ${(tasks.length > 2 && active )? "hidden" : ""}`}>El mundo es tuyo</h3>
                        <div className={`w-full px-[30%] flex items-center justify-start flex-col overflow-scroll ${active ? "h-full": "h-[65%]"}`}>
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
                                            onClick={() => setActive([2])}
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
    )
}