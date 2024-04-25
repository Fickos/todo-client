import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { TaskDispatchContext } from "../context/TaskContext";
import ToDoBucket from "../components/ToDoBucket";
import { getOrCreateToDoList } from "../service";
import { ACTION_TYPES } from "../context/Actions";


export default function ToDoPage() {
    const { id } = useParams();
    
    const taskDispatch = useContext(TaskDispatchContext);

    useEffect(() => {
      if (!sessionStorage.getItem('td-location')) {
        navigator.geolocation.getCurrentPosition((position) => {
          sessionStorage.setItem('td-location', JSON.stringify({ lat: position.coords.latitude, lng: position.coords.longitude}));
        });
      }
    }, []);

    useEffect(() => {
      const fetchList = async () => {
        const list = await getOrCreateToDoList(id);
        taskDispatch({
          type: ACTION_TYPES.SET_TASKS,
          payload: list?.Tasks ?? [],
        });
      }
      fetchList();
    }, [id, taskDispatch]);

    return (
      <div className="todo-page">
        <ToDoBucket name={id} />
      </div>
    )
}