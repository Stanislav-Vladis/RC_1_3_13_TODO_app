import './task-list.css';
import { MD5 } from 'crypto-js';
import Task from "../task/task";

function TaskList({tasksData}) {

    const liElements = tasksData.completed.map((task) => {
        return (
            <li key={`completed-${MD5(task.created).toString()}`} className="completed">
                <Task description = {task.description} created = {task.created}/>
            </li>
        )
    }).concat(
        tasksData.active.map((task) => {
            if (task.editing) {
                return (
                    <li key={`editing-${MD5(task.created).toString()}`} className="editing">
                        <Task description = {task.description} created = {task.created}/>
                        <input type="text" className="edit" defaultValue="Editing task" />
                    </li>
                )
            }
            return (
                <li key={`active-${MD5(task.created).toString()}`}>
                    <Task description = {task.description} created = {task.created}/>
                </li>
            )
        })
    );

  return (
      <ul className="todo-list">
          {liElements}
      </ul>
  );
}

export default TaskList;
