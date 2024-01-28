import './footer.css';
import TaskFilter from "../tasks-filter/task-filter";
import React from "react";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <span className="todo-count">1 items left</span>
                <TaskFilter />
                <button className="clear-completed">Clear completed</button>
            </footer>
        );
    }
}
