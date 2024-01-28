import './new-task-form.css';
import React from "react";

export default class NewTaskForm extends React.Component {
    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" placeholder="What needs to be done?" autoFocus/>
            </header>
        );
    }
}
