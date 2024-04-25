import { createContext, useReducer } from "react";
import { ACTION_TYPES } from "./Actions";

export const TaskContext = createContext(null);
export const TaskDispatchContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function TaskProvider ({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  
  return (
      <TaskContext.Provider value={tasks}>
        <TaskDispatchContext.Provider value={dispatch}>
          { children }
        </TaskDispatchContext.Provider>
      </TaskContext.Provider>
  )
}

function taskReducer(tasks, action) {
  switch (action.type) {
    case ACTION_TYPES.ADD: {
      return [...tasks, action.payload];
    }
    case ACTION_TYPES.EDIT: {
      return tasks.map((el) => {
        if (el.TaskID === action.payload.TaskID) {
          return action.payload
        } else {
          return el;
        }
      });
    }
    case ACTION_TYPES.REMOVE: {
      return tasks.filter((el) => el.TaskID !== action.payload);
    }
    case ACTION_TYPES.COMPLETE: {
      const { TaskID, State } = action.payload;
      return tasks.map((el) => {
          if (el.TaskID === TaskID) {
              return { ...el, State };
          } else {
              return el;
          }
      });
    }
    case ACTION_TYPES.SET_TASKS: {
      return action.payload;
    }
    default:
      return tasks;
  }
}

const initialTasks = [];

