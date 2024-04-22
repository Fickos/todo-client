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
        if (el.id === action.payload.id) {
          return action.payload
        } else {
          return el;
        }
      });
    }
    case ACTION_TYPES.REMOVE: {
      return tasks.filter((el) => el.id !== action.payload);
    }
    case ACTION_TYPES.COMPLETE: {
      const { id, state } = action.payload;
      return tasks.map((el) => {
          if (el.id === id) {
              return { ...el, state };
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

const initialTasks = [
  { id: 1, content: "Take out the trash", state: "TO_DO", location: "Wien, Austria", createdAt: new Date().toISOString() },
  { id: 2, content: "Make dinner", state: "TO_DO", location: "Wien, Austria", createdAt: new Date().toISOString() },
  { id: 3, content: "Water the grass", state: "COMPLETED", location: "Wien, Austria", createdAt: new Date().toISOString() },
  { id: 4, content: "Wash the dog", state: "COMPLETED", location: "Wien, Austria", createdAt: new Date().toISOString() },
];

