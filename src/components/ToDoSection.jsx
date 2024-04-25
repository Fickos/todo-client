/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import ToDoCard from "./ToDoCard";
import CreateEditModal from "./CreateEditModal";
import { TASK_STATES } from "../util/constants";


export default function ToDoSection ({ filter }) {

    const items = useContext(TaskContext);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleAdd = () => {
      setSelectedTask(null);
      setDialogOpen(true);
    }

    const handleEdit = (task) => {
      setSelectedTask(task);
      setDialogOpen(true)
    }

    return (
      <div className="vertical-flex">
        {
          filter === TASK_STATES.TO_DO &&
          <div className="add-row" onClick={handleAdd}>
            <img src="add.png" alt="plus" />
            Add new item
          </div>
        }
        {
          items.filter(i => i.State === filter).map((task) => (
            <ToDoCard 
              key={task.TaskID} 
              task={task} 
              onEdit={() => handleEdit(task)}
            />
          ))
        }
        <CreateEditModal 
          open={dialogOpen}
          handleClose={() => setDialogOpen(false)}
          initTask={selectedTask}
        />
      </div>
    )
}