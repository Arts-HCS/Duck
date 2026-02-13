import { useEffect } from "react";

export default function WritigComponent({
  tasks,
  setTasks,
  inputRefs,
  handleKeyDown
}: any) {

    const handleChange = (id: number, text: string, index:number) => {
        setTasks((prev:any)=>{
            let updated = prev.map((task:any)=>
                task.id === id ? {...task, content: text} : task
            )
            if (text.trim() === "" && index !== tasks.length -1){
                updated = updated.filter((task:any) => task.id !== id)
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
      };   

  return (
    <div className="h-full w-full flex flex-col items-start justify-start">
      <h3 className="text-2xl text-(--white-color) font-medium mb-5">
        Recordatorios
      </h3>
      <div className="w-full flex items-start justify-start h-full">
        <div className={`flex  flex-col items-center justify-start relative mb-5 w-full`}>
          {tasks.map(({ id, content, status }:any, index:number) => {
            return (
              <div
                key={id}
                className={`flex items-center justify-start relative mb-5 ${
                  content.trim() === "" && index !== 0 ? "w-[80%]" : "w-full"
                }`}
              >
                <p
                  className={`text-[16px] font-normal ${
                    content.trim() === "" && index !== 0
                      ? " text-[#dcd9de6a]"
                      : "text-[#DCD9DE]"
                  }`}
                >
                  {index + 1}
                </p>
                <input
                  className={`border-b p-2 ml-3 text-[#dcd9dee3] outline-none w-full pr-7 text-[17.5px] ${
                    content.trim() === "" && index !== 0
                      ? " border-[#9797975e]"
                      : " border-[#979797]"
                  }`}
                  placeholder={`${index === 0 ? "¿Qué hay por hacer?" : ""}`}
                  onChange={(e) => handleChange(id, e.target.value, index)}
                  onKeyDown={(e)=> handleKeyDown(e, id)}
                  value={content}
                  ref = {(inp) =>{ if (inp) inputRefs.current.push(inp) }}

                />
                <button
                  className={`task-circle ${
                    status === 0 && "task-status-zero"
                  } ${status === 1 && "task-status-one"} ${
                    status === 2 && "task-status-two"
                  } ${status === 3 && "task-status-three"} ${
                    status === 4 && "task-status-four"
                  }
                                            
                                            ${
                                              content.trim() === "" &&
                                              index !== 0
                                                ? " opacity-10"
                                                : " opacity-100 cursor-pointer"
                                            }
                                            
                                            `}
                >
                  {status === 0 && <i className="fa-solid fa-paperclip"></i>}
                  {status === 1 && (
                    <i className="fa-solid fa-hourglass-start text-[#665d3c]"></i>
                  )}
                  {status === 2 && <i className="fa-solid fa-exclamation"></i>}
                  {status === 3 && (
                    <i className="fa-solid fa-arrow-up-long"></i>
                  )}
                  {status === 4 && <i className="fa-solid fa-repeat"></i>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
