import './task-list.css';
import Task from "../task/task";
import React from "react";

export default class TaskList extends React.Component {

    render() {
        const {tasksData, onCompleted, onDestroy} = this.props;

        const liElements = tasksData
            .filter(task => task.displayTask)
            .map(task => {
                const id = task.id;
                const classList = [];
                if (task.completed) classList.push('completed');

                return (
                    <li key={id} className={classList.length > 0 ? classList.join(' ') : undefined}>
                        <Task
                            description={task.description}
                            timeOfCreated={task.timeOfCreated}
                            isChecked={task.completed}
                            onCompleted={() => onCompleted(id)}
                            onDestroy={() => onDestroy(id)}/>
                    </li>
                )
        });

        return (
            <ul className="todo-list">
                {liElements}
            </ul>
        );
    }
    /*render() {
        const tasksData = this.props.tasksData;

        const liElements = tasksData.completed.map((task) => {
            return (
                <li key={`completed-${task.id}`} className="completed">
                    <Task description = {task.description} created = {task.created} destroy = {()=>console.log('deleted')}/>
                </li>
            )
        }).concat(
            tasksData.active.map((task) => {
                if (task.editing) {
                    return (
                        <li key={`editing-${task.id}`} className="editing">
                            <Task description = {task.description} created = {task.created}/>
                            <input type="text" className="edit" defaultValue="Editing task" />
                        </li>
                    )
                }
                return (
                    <li key={`active-${task.id}`}>
                        <Task description = {task.description} created = {task.created} destroy = {()=>console.log('deleted')}/>
                    </li>
                )
            })
        );

        return (
            <ul className="todo-list">
                {liElements}
            </ul>
        );
    }*/
}