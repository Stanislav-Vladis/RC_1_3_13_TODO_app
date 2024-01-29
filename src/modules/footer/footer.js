import './footer.css';
import TaskFilter from "../tasks-filter/task-filter";
import React from "react";

export default class Footer extends React.Component {
    countUnfinishedTasks = (tasksData) => {
        return tasksData.filter(task => !task.completed).length;
    }

    render() {
        const {
            tasksData,
            taskFilter,
            onShowAllTask,
            onShowActiveTask,
            onShowCompletedTask,
            onClearCompleted
        } = this.props;

        return (
            <footer className="footer">
                <span className="todo-count">{this.countUnfinishedTasks(tasksData)} items left</span>
                <TaskFilter
                    taskFilter={taskFilter}
                    onShowAllTask={onShowAllTask}
                    onShowActiveTask={onShowActiveTask}
                    onShowCompletedTask={onShowCompletedTask}
                />
                <button className="clear-completed" onClick={onClearCompleted}>Clear completed</button>
            </footer>
        );
    }
}
