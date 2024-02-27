import './task-list.css';
import React, { useState } from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Task from '../task/task.jsx';

const TaskList = ({
                    tasksData,
                    taskFilter,
                    onStartTimer,
                    onStopTimer,
                    onEditing,
                    onSubmitNewTaskDescription,
                    onCompleted,
                    onDestroy
                  }) => {
  const [newDescription, setNewDescription] = useState('');

  function onChangeTaskDescription(event) {
    setNewDescription(event.target.value);
  }

  const liElements = Object.keys(tasksData).map(key => {
    const task = tasksData[key];
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
          minutes={task.minutes}
          seconds={task.seconds}
          timeOfCreated={task.timeOfCreated}
          isChecked={task.completed}
          onStartTimer={() => onStartTimer(id)}
          onStopTimer={() => onStopTimer(id)}
          onEditing={() => onEditing(id)}
          onCompleted={() => onCompleted(id)}
          onDestroy={() => onDestroy(id)}
        />
        {task.editing && (
          <form onSubmit={(event) => onSubmitNewTaskDescription(id, event, newDescription)}>
            <input
              type="text"
              className="edit"
              defaultValue={task.description}
              onChange={onChangeTaskDescription}
            />
          </form>
        )}
      </li>
    );
  });

  return <ul className="todo-list">{liElements}</ul>;
}

TaskList.propTypes = {
  tasksData: PropTypes.object,
  taskFilter: PropTypes.string,
  onStartTimer: PropTypes.func,
  onStopTimer: PropTypes.func,
  onEditing: PropTypes.func,
  onSubmitNewTaskDescription: PropTypes.func,
  onCompleted: PropTypes.func,
  onDestroy: PropTypes.func
}

export default TaskList;