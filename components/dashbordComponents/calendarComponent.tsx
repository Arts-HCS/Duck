"use client";

import { useState } from "react"

import BigCalendarComponent from "../bigDashbordComponents/bigCalendarComponent"

export default function CalendarComponent(){
    const weekDays = [
        "Dom",
        "Lun",
        "Mar",
        "Mié",
        "Jue",
        "Vie",
        "Sáb",
      ];
    
      const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
    
      const today = new Date();
    
      const [currentDate, setCurrentDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
      );
    
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
    
      const monthDays = new Date(year, month + 1, 0).getDate();
      const actualMonth = months[month];
      const startingDay = new Date(year, month, 1).getDay();
    
      const handleMonthChange = (direction: number) => {
        setCurrentDate(new Date(year, month + direction, 1));
      };
    
      const returnToNow = () => {
        setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
      };
    
      return (
        <section className="h-full overflow-scroll">
          <div className="w-full h-[full] rounded-[10px] relative ">
            <h3 className="text-2xl text-(--white-color) font-medium w-full">
              {actualMonth} {year}
            </h3>
            <div className="flex items-center justify-between mb-4">
              <div className="ml-auto flex items-center gap-5 absolute top-0.5 right-10">
                {(month !== today.getMonth() ||
                  year !== today.getFullYear()) && (
                  <button
                    onClick={returnToNow}
                    className="w-22 h-8 font-medium bg-[#b8bae0f3] text-(--black-color) rounded cursor-pointer hover:bg-[#7a7c95c7] hover:text-gray-200 transition-all"
                  >
                    Volver
                  </button>
                )}
    
                <button
                  className="cursor-pointer"
                  onClick={() => handleMonthChange(-1)}
                >
                  <i className="fa-solid fa-circle-arrow-left text-[35px] text-[#DCD9DE] transition-all hover:text-[#b8bae0c7] hover:scale-110"></i>
                </button>
    
                <button
                  className="cursor-pointer"
                  onClick={() => handleMonthChange(1)}
                >
                  <i className="fa-solid fa-circle-arrow-right text-[35px] text-[#DCD9DE] transition-all hover:text-[#b8bae0c7] hover:scale-110"></i>
                </button>
              </div>
            </div>
    
            <div className="grid grid-cols-7 mb-2">
              {weekDays.map((d) => (
                <div
                  key={d}
                  className=" text-center w-20 text-[16px] font-medium text-gray-400"
                >
                  {d}
                </div>
              ))}
            </div>
    
            <div className="grid grid-cols-7 gap-y-2.5 gap-x-3">
              {Array.from({ length: startingDay }).map((_, i) => (
                <div key={i}></div>
              ))}
    
              {Array.from({ length: monthDays }).map((_, i) => {
                const day = i + 1;
                const isToday =
                  day === today.getDate() &&
                  month === today.getMonth() &&
                  year === today.getFullYear();
    
                return (
                  <div
                    key={i}
                    className={`
                    rounded-lg border cursor-pointer transition h-20 w-20 relative px-2 pt-7 overflow-y-scroll shadow-2xl 
                    ${
                      isToday
                        ? "bg-[#DCD9DE] text-gray-800 border-gray-200 hover:bg-[#b0aeb1] hover:text-gray-800"
                        : "bg-[#232325c7] text-gray-200 border-[#454a826b] hover:bg-[#19191bc7]"
                    }
                  `}
                  >
                    <p className="text-[15px] absolute top-1 left-2">{day}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      );
}