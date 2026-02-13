import { useEffect } from "react";

type Props = {
  tasks: any;
  setTasks?: any;
  setActive?: any;
  activeUser?:any;
};

function formatearFecha(fechaTexto?: string) {
    if (!fechaTexto) return "";
  
    const [year, month, day] = fechaTexto.split("-").map(Number);
    const fecha = new Date(year, month - 1, day);
  
    if (isNaN(fecha.getTime())) return "";
  
    let texto = new Intl.DateTimeFormat("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }).format(fecha);
  
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}
  
export default function WritingComponent({ tasks, setTasks, setActive, activeUser }: Props) {

  async function getSavedTasks(){
    const tasks = await fetch("/api/getSavedTasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: activeUser.id
      })
    })
    const resp = await tasks.json()
    console.log(resp)
  }

  useEffect(()=>{
    getSavedTasks()
  }, [])

  const savedTasks = []

  return (
    <section className="h-full w-full p-8 bg-[#191a1c7d] overflow-scroll">
      <div className="flex gap-6">
        <h3 className="text-3xl text-(--white-color) font-medium mb-9">
          Tus actividades
        </h3>
        <button 
          className="text-xl w-10 h-10 text-(--white-color) bg-[#3b3b3c] flex items-center justify-center rounded cursor-pointer"
          onClick={()=>setActive([0,1])}
          >
              <i className="fa-solid fa-angle-up"></i></button>
      </div>
      
      <div className="w-full grid grid-cols-3 gap-y-10 gap-x-5">
        {tasks.map((task: any, index:number) => {

            if (!task.title) return

          return (
            <div key={index} className="task-box">
              <span>{task.time}</span>
              <button>
                <i className="fa-solid fa-pen"></i>
              </button>
              <div>
                <h5>{formatearFecha(task.date)}</h5>
              </div>
              <h4>{task.title}</h4>
              <p>
                {task.desc}
              </p>
            </div>
          );
        })}
        
      </div>
    </section>
  );
}
