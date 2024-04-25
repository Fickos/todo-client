/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { TASK_STATES } from "../util/constants";
import { TaskDispatchContext } from "../context/TaskContext";
import { ACTION_TYPES } from "../context/Actions";
import { deleteTask, updateTask } from "../service";
import { useParams } from "react-router-dom";
import moment from "moment";


export default function ToDoCard({ task, onEdit }) {
    const { id } = useParams();

    const { TaskID, Content: content, State: state, Location: location, CreatedAt: createdAt } = task;

    const [leaveClassName, setLeaveClassName] = useState('');

    const taskDispatch = useContext(TaskDispatchContext);

    const handleCompletedChange = async () => {
      if (state === TASK_STATES.COMPLETED) {
        setLeaveClassName('move-left');
        await updateTask({ TaskID, State: TASK_STATES.TO_DO }, id);
        setTimeout(() => {
          taskDispatch({
            type: ACTION_TYPES.COMPLETE,
            payload: { TaskID, State: TASK_STATES.TO_DO }
          });
        }, 1000); // animation duration
      }
      if (state === TASK_STATES.TO_DO) {
        setLeaveClassName('move-right');
        await updateTask({ TaskID, State: TASK_STATES.COMPLETED }, id);
        setTimeout(() => {
          taskDispatch({ 
            type: ACTION_TYPES.COMPLETE, 
            payload: { TaskID, State: TASK_STATES.COMPLETED }
          });
        }, 1000); // animation duration
      }
    }

    const handleDelete = async () => {
      setLeaveClassName('delete');
      await deleteTask(TaskID, id);
      setTimeout(() => {
        taskDispatch({
          type: ACTION_TYPES.REMOVE,
          payload: TaskID
        });
      }, 1000);
    }

    return (
      <div className={`todo-card ${leaveClassName}`}>
        <input 
          type="checkbox" 
          checked={
            leaveClassName === 'delete' ? false
            :
            state === TASK_STATES.COMPLETED ? 
              !leaveClassName : leaveClassName
          }
          onChange={handleCompletedChange}
        />
        <div className="todo-content">
          <h3>{ content }</h3>
          <div className="todo-info">
            {moment(createdAt).fromNow()} in {location}
          </div>
        </div>
        <div className="action-icons">
          <img src="edit2.png" alt="edit" onClick={onEdit} />
          <img src="trash.svg" alt="del" onClick={handleDelete} />
        </div>
      </div>
    )
}