import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import ToDoCard from "./ToDoCard";


export default function ToDoSection ({ filter }) {

    const items = useContext(TaskContext);

    return (
      <>
        {
          items.filter(i => i.state === filter).map((task) => (
            <ToDoCard key={task.id} task={task} />
          ))
        }
      </>
    )
}