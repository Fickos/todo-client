import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { TaskProvider } from "../context/TaskContext";
import ToDoBucket from "../components/ToDoBucket";


export default function ToDoPage() {
    const { id } = useParams();

    useEffect(() => {
        console.log(`Fetch the data for ${id}`);
    }, [id]);

    return (
      <div className="todo-page">
        Your Todo List
        <TaskProvider>
          <ToDoBucket />
        </TaskProvider>
      </div>
    )
}