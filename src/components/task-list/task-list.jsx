import './task-list.css';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Task from '../task/task.jsx';

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

    const liElements = tasksData.map((task) => {
      if (taskFilter === 'Active' && task.completed) return null;
      if (taskFilter === 'Completed' && !task.completed) return null;

      const { id } = task;
      const classList = classnames('container', {
        editing: task.editing,
        completed: task.completed
      });

      return (
        <li key={id} className={classList}>
          <Task
            id={id}
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
