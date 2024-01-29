import React from "react";

export default class Task extends React.Component {
    render() {
        const {description, timeOfCreated, isChecked, onCompleted, onDestroy} = this.props;

        return (
            <div className="view">
                <input className="toggle" type="checkbox" checked={isChecked} onChange={onCompleted}/>
                <label>
                    <span className="description">{description}</span>
                    <span className="created">{timeOfCreated}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy" onClick={onDestroy}></button>
            </div>
        );
    }
}
