function formatearFecha(fechaTexto?: string) {
  if (!fechaTexto) return "";

  const [year, month, day] = fechaTexto.split("-").map(Number);
  const fecha = new Date(year, month - 1, day);

  if (isNaN(fecha.getTime())) return "";

  let texto = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(fecha);

  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export default function TasksComponent({ tasks, setTasks }: any) {
  return (
    <div className="h-full w-full flex flex-col items-start justify-start">
      <h3 className="text-2xl text-(--white-color) font-medium mb-5">
        Tus actividades
      </h3>
      <div className="flex flex-col items-start justify-start w-full h-full gap-10">
        {tasks.map((task: any, index: number) => {
          if (!task.title) return;
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
    </div>
  );
}
