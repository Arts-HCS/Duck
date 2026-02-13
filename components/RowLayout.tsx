"use client";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";
import WritigComponent from "./dashbordComponents/writingComponent";
import TasksComponent from "./dashbordComponents/tasksComponent";
import CalendarComponent from "./dashbordComponents/calendarComponent";

export default function RowLayout({firstComponent, secondComponent, thirdComponent, tasks, setTasks, inputRefs, handleKeyDown}: any) {
  const [mounted, setMounted] = useState(false);

  const [items, setItems] = useState(() => {
    const base = [{ id: "slot1", type: firstComponent }, { id: "slot2", type: secondComponent }];
    if (thirdComponent !== undefined) base.push({ id: "slot3", type: thirdComponent });
    return base;
  });

  useEffect(() => { setMounted(true); }, []);

  const renderDynamicComponent = (type: number) => {
    if (type === 0) return <WritigComponent tasks={tasks} setTasks={setTasks} inputRefs={inputRefs} handleKeyDown={handleKeyDown}  />;
    if (type === 1) return <CalendarComponent />;
    if (type === 2) return <TasksComponent tasks={tasks} setTasks={setTasks} />;

    return null;
  };

  if (!mounted) return null;

  function handleDragEnd(e: any) {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i.id)} strategy={horizontalListSortingStrategy}>
        <div className={`${thirdComponent ? "grid-cols-3" : "grid-cols-2"} row`}>
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              {renderDynamicComponent(item.type)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({ id, children }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className="item">
      <div className="drag-handle" {...attributes} {...listeners}>
        <i className="fa-solid fa-ellipsis text-xl"></i>
      </div>
      <div className="h-full w-full flex flex-col p-5">
        {children}
      </div>
    </div>
  );
}