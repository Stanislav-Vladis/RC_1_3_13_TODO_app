import './task-filter.css';
import React from "react";

export default class TaskFilter extends React.Component {
    render() {
        const {taskFilter, onShowAllTask, onShowActiveTask, onShowCompletedTask} = this.props;

        return (
            <ul className="filters">
                <li>
                    <button className={taskFilter === 'All' ? 'selected' : undefined} onClick={onShowAllTask}>All</button>
                </li>
                <li>
                    <button className={taskFilter === 'Active' ? 'selected' : undefined} onClick={onShowActiveTask}>Active</button>
                </li>
                <li>
                    <button className={taskFilter === 'Completed' ? 'selected' : undefined} onClick={onShowCompletedTask}>Completed</button>
                </li>
            </ul>
        );
    }
}
