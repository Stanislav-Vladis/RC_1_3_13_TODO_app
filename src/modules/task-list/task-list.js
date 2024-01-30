import './task-list.css';
import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/task';

export default class TaskList extends React.Component {
  state = {
    newDescription: ''
  };

  static propTypes = {
    tasksData: PropTypes.array,
    taskFilter: PropTypes.string,
    onEditing: PropTypes.func,
    onSubmitNewTaskDescription: PropTypes.func,
    onCompleted: PropTypes.func,
    onDestroy: PropTypes.func
  };

  onChangeTaskDescription = (event) => {
    this.setState({
      newDescription: event.target.value
    });
  };

  render() {
    const { tasksData, taskFilter, onEditing, onSubmitNewTaskDescription, onCompleted, onDestroy } = this.props;

    const liElements = tasksData
      .filter((task) => task.displayTask)
      .map((task) => {
        if (taskFilter === 'Active' && task.completed) return null;
        if (taskFilter === 'Completed' && !task.completed) return null;

        const { id } = task;
        const classList = [];
        if (task.editing) classList.push('editing');
        if (task.completed) classList.push('completed');

        return (
          <li key={id} className={classList.length > 0 ? classList.join(' ') : undefined}>
            <Task
              description={task.description}
              timeOfCreated={task.timeOfCreated}
              isChecked={task.completed}
              onEditing={() => onEditing(id)}
              onCompleted={() => onCompleted(id)}
              onDestroy={() => onDestroy(id)}
            />
            {task.editing && (
              <form onSubmit={(event) => onSubmitNewTaskDescription(id, event, this.state.newDescription)}>
                <input
                  type="text"
                  className="edit"
                  defaultValue={task.description}
                  onChange={this.onChangeTaskDescription}
                />
              </form>
            )}
          </li>
        );
      });

    return <ul className="todo-list">{liElements}</ul>;
  }
}
