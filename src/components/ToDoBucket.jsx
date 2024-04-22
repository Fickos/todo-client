import { useState } from "react";
import { TASK_STATES } from "../util/constants"
import ToDoSection from "./ToDoSection";


export default function ToDoBucket() {

    const [activeTab, setActiveTab] = useState(TASK_STATES.TO_DO);
    
    return (
      <>
        <h1>To Do Bucket</h1>
        <div className="states">
          {
            Object.keys(TASK_STATES).map((state) => (
              <div 
                key={state} 
                onClick={() => setActiveTab(TASK_STATES[state])}
                className="state-tab" 
              >{state}</div>
            ))
          }
        </div>
        <ToDoSection filter={activeTab} />
      </>

    )
}