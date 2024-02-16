import './App.css';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import shortid from 'shortid';
import TaskList from '../task-list/task-list.jsx';
import NewTaskForm from '../new-task-form/new-task-form.jsx';
import Footer from '../footer/footer.jsx';
import Utils from '../../utils/utils';

export default class App extends React.Component {
  static setPropertyInTask = (task, propertyName, value) => {
    const cloneTask = structuredClone(task);
    cloneTask[propertyName] = value;
    return cloneTask;
  };

  state = {
    tasksData: {
      key0: Utils.createTask('key0', 'Completed task', 0, 10, new Date('2024-01-28T19:00:00Z')),
      key1: Utils.createTask('key1', 'Editing task', 1, 20, new Date('2024-01-28T19:05:00Z')),
      key2: Utils.createTask('key2', 'Active task', 3, 30, new Date('2024-01-28T19:10:00Z'))
    }
  };

  deleteTaskById = (id) => {
    const { tasksData } = this.state;

    if (tasksData[id]?.intervalId) clearInterval(tasksData[id].intervalId);
    const updatedTasksData = {};
    Object.keys(tasksData)
      .filter((key) => tasksData[key].id !== id)
      .forEach((key) => {
        updatedTasksData[key] = tasksData[key];
      });

    this.setState({
      tasksData: updatedTasksData
    });
  };

  deleteAllCompletedTask = () => {
    this.setState(({ tasksData }) => ({
      tasksData: Object.keys(tasksData)
        .map((key) => {
          const task = tasksData[key];
          if (task.completed) {
            if (task.intervalId) clearInterval(task.intervalId);
          }
          return task;
        })
        .filter((task) => !task.completed)
    }));
  };

  addTask = (text, minutes, seconds) => {
    if (text.trim().length > 0) {
      this.setState(({ tasksData }) => {
        const cloneTaskData = structuredClone(tasksData);
        const id = shortid.generate();
        cloneTaskData[id] = Utils.createTask(id, text, minutes, seconds);

        return {
          tasksData: cloneTaskData
        };
      });
    }
  };

  editingTask = (id) => {
    const { tasksData } = this.state;

    const updatedTasksData = {};
    Object.keys(tasksData).forEach((key) => {
      const task = tasksData[key];
      if (task.id === id) {
        updatedTasksData[key] = App.setPropertyInTask(task, 'editing', !task.editing);
      } else {
        updatedTasksData[key] = task;
      }
    });

    this.setState({
      tasksData: updatedTasksData
    });
  };

  submitNewTaskDescription = (id, event, newDescription) => {
    const { tasksData } = this.state;
    event.preventDefault();

    const updatedTasksData = Object.keys(tasksData).reduce((value, key) => {
      const task = tasksData[key];

      if (task.id === id) {
        value[key] = {
          ...task,
          description: newDescription,
          editing: !task.editing,
          timeOfCreated: `changed ${formatDistanceToNow(new Date(), { addSuffix: true })}`
        };
      } else {
        value[key] = task;
      }

      return value;
    }, {});

    this.setState({
      tasksData: updatedTasksData,
      newDescription: ''
    });
  };

  completedTask = (id) => {
    const { tasksData } = this.state;

    const updatedTasksData = {};
    Object.keys(tasksData).forEach((key) => {
      const task = tasksData[key];
      if (task.id === id) {
        updatedTasksData[key] = App.setPropertyInTask(task, 'completed', !task.completed);
      } else {
        updatedTasksData[key] = task;
      }
    });

    this.setState({
      tasksData: updatedTasksData
    });
  };

  showAllTask = () => {
    this.setState(() => ({
      taskFilter: 'All'
    }));
  };

  showActiveTask = () => {
    this.setState(() => ({
      taskFilter: 'Active'
    }));
  };

  showCompletedTask = () => {
    this.setState(() => ({
      taskFilter: 'Completed'
    }));
  };

  updateTimer = (task) => {
    if (task.seconds > 0) {
      task.seconds -= 1;
    } else if (task.minutes > 0) {
      task.seconds = 59;
      task.minutes -= 1;
    } else {
      clearInterval(task.intervalId);
      task.isRunning = false;
      task.intervalId = null;
    }
    return task;
  };

  startTimer = (id) => {
    const { tasksData } = this.state;

    if (tasksData[id]?.isRunning === false) {
      tasksData[id].isRunning = true;
      tasksData[id].intervalId = setInterval(() => {
        const cloneTaskData = structuredClone(this.state.tasksData);
        cloneTaskData[id].timeOfCreated =
          `created ${formatDistanceToNow(cloneTaskData[id].currentDate, { addSuffix: true })}`;
        cloneTaskData[id] = this.updateTimer(cloneTaskData[id]);
        this.setState({
          tasksData: cloneTaskData
        });
      }, 1000);
    }
  };

  stopTimer = (id) => {
    const cloneTaskData = structuredClone(this.state.tasksData);

    if (cloneTaskData[id]?.isRunning === true) {
      clearInterval(cloneTaskData[id].intervalId);
      cloneTaskData[id].intervalId = null;
      cloneTaskData[id].isRunning = false;

      this.setState({
        tasksData: cloneTaskData
      });
    }
  };

  render() {
    const { tasksData } = this.state;
    const { taskFilter } = this.state;

    return (
      <section className="todoapp">
        <NewTaskForm addTask={(text, minutes, seconds) => this.addTask(text, minutes, seconds)} />
        <section className="main">
          <TaskList
            tasksData={tasksData}
            taskFilter={taskFilter}
            onStartTimer={(id) => this.startTimer(id)}
            onStopTimer={(id) => this.stopTimer(id)}
            onEditing={(id) => this.editingTask(id)}
            onSubmitNewTaskDescription={(id, event, newDescription) =>
              this.submitNewTaskDescription(id, event, newDescription)
            }
            onCompleted={(id) => this.completedTask(id)}
            onDestroy={(id) => this.deleteTaskById(id)}
          />
          <Footer
            tasksData={tasksData}
            taskFilter={taskFilter}
            onShowAllTask={() => this.showAllTask()}
            onShowActiveTask={() => this.showActiveTask()}
            onShowCompletedTask={() => this.showCompletedTask()}
            onClearCompleted={() => this.deleteAllCompletedTask()}
          />
        </section>
      </section>
    );
  }
}
