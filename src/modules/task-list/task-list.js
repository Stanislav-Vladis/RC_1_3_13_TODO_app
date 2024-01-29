import './task-list.css';
import Task from "../task/task";
import React from "react";
import PropTypes from "prop-types";

export default class TaskList extends React.Component {
    static propTypes = {
        tasksData: PropTypes.array,
        taskFilter: PropTypes.string,
        onCompleted: PropTypes.func,
        onDestroy: PropTypes.func
    }

    render() {
        const {tasksData, taskFilter, onCompleted, onDestroy} = this.props;

        const liElements = tasksData
            .filter(task => task.displayTask)
            .map(task => {
                if (taskFilter === 'Active' && task.completed) return null;
                if (taskFilter === 'Completed' && !task.completed) return null;

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
}