import './footer.css';
import React from 'react';
import PropTypes from 'prop-types';
import TaskFilter from '../tasks-filter/task-filter.jsx';

export default class Footer extends React.Component {
  static defaultProps = {
    taskFilter: 'All'
  };

  static propTypes = {
    tasksData: PropTypes.object,
    taskFilter: PropTypes.string,
    onShowAllTask: PropTypes.func,
    onShowActiveTask: PropTypes.func,
    onShowCompletedTask: PropTypes.func,
    onClearCompleted: PropTypes.func
  };

  static countUnfinishedTasks = (tasksData) => Object.values(tasksData).filter((task) => !task.completed).length;

  render() {
    const { tasksData, taskFilter, onShowAllTask, onShowActiveTask, onShowCompletedTask, onClearCompleted } =
      this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{Footer.countUnfinishedTasks(tasksData)} items left</span>
        <TaskFilter
          taskFilter={taskFilter}
          onShowAllTask={onShowAllTask}
          onShowActiveTask={onShowActiveTask}
          onShowCompletedTask={onShowCompletedTask}
        />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
