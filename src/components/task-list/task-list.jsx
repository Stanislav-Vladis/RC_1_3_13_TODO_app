import './task-list.css';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Task from '../task/task.jsx';
import Utils from '../../utils/utils';

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

  getSecondsTimerFromSession = (id) => {
    return sessionStorage.getItem(id) ? JSON.parse(sessionStorage.getItem(id)) : Utils.createEmptySecondsTimer();
  };

  updateTimer = (id, newSecondsTimer) => {
    let secondsTimer = this.state[id];

    if (newSecondsTimer) {
      secondsTimer = newSecondsTimer;
      secondsTimer.startDate = new Date();
    }
    secondsTimer.seconds = Utils.getElapsedSeconds(secondsTimer.startDate) - secondsTimer.lostSeconds;
    secondsTimer.timerId = setTimeout(() => this.updateTimer(id), 1000);

    this.setState({
      [id]: secondsTimer
    });
  };

  startTimer = (id) => {
    const secondsTimer = this.state[id];

    if (!secondsTimer && sessionStorage.getItem(id)) {
      this.updateTimer(id, JSON.parse(sessionStorage.getItem(id)));
      return;
    }

    if (secondsTimer && secondsTimer.startDate && !secondsTimer.pauseDate && !secondsTimer.timerId) {
      this.updateTimer(id);
      return;
    }

    if (secondsTimer && secondsTimer.startDate && secondsTimer.pauseDate && !secondsTimer.timerId) {
      secondsTimer.lostSeconds += Utils.getElapsedSeconds(secondsTimer.pauseDate);
      secondsTimer.pauseDate = null;
      this.setState({
        [id]: secondsTimer
      });
      this.updateTimer(id);
      return;
    }

    if (secondsTimer && !secondsTimer.startDate) {
      secondsTimer.startDate = new Date();
      this.setState({
        [id]: secondsTimer
      });
      this.updateTimer(id);
    }
  };

  pauseTimer = (id) => {
    const secondsTimer = this.state[id];

    if (secondsTimer && secondsTimer.startDate && !secondsTimer.pauseDate) {
      clearTimeout(secondsTimer.timerId);
      secondsTimer.pauseDate = new Date();
      secondsTimer.timerId = null;
      this.setState({
        [id]: secondsTimer
      });
    }
  };

  componentDidMount() {
    const { tasksData } = this.props;

    tasksData.forEach((task) => {
      const { id } = task;
      const secondsTimer = this.getSecondsTimerFromSession(id);
      if (secondsTimer.timerId) {
        secondsTimer.pauseDate = null;
        secondsTimer.timerId = null;
      }
      this.setState({
        [id]: secondsTimer
      });
    });
  }

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
            timerControl={{
              secondsTimer: this.state[id],
              updateTimer: this.updateTimer,
              startTimer: this.startTimer,
              pauseTimer: this.pauseTimer
            }}
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
