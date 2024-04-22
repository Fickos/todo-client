

export default function ToDoCard({ task }) {

    return (
      <div className="todo-card">
        { JSON.stringify(task) }
      </div>
    )
}