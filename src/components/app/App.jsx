import './App.css';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
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
    tasksData: [
      Utils.createTask('0', 'Completed task', new Date('2024-01-28T19:00:00Z')),
      Utils.createTask('1', 'Editing task', new Date('2024-01-28T19:05:00Z')),
      Utils.createTask('2', 'Active task', new Date('2024-01-28T19:10:00Z'))
    ]
  };

  deleteTaskById = (id) => {
    this.setState(({ tasksData }) => ({
      tasksData: tasksData.filter((task) => task.id !== id)
    }));
  };

  deleteAllCompletedTask = () => {
    this.setState(({ tasksData }) => ({
      tasksData: tasksData.filter((task) => !task.completed)
    }));
  };

  addTask = (text) => {
    if (text.trim().length > 0) {
      this.setState(({ tasksData }) => {
        const cloneTaskData = structuredClone(tasksData);
        cloneTaskData.push(Utils.createTask(Object.keys(tasksData).length.toString(), text));

        return {
          tasksData: cloneTaskData
        };
      });
    }
  };

  editingTask = (id) => {
    this.setState(({ tasksData }) => ({
      tasksData: tasksData.map((task) => {
        if (task.id === id) {
          return App.setPropertyInTask(task, 'editing', !task.editing);
        }
        return task;
      })
    }));
  };

  submitNewTaskDescription = (id, event, newDescription) => {
    event.preventDefault();
    this.setState(({ tasksData }) => ({
      tasksData: tasksData.map((task) => {
        if (task.id === id) {
          let editingTask = App.setPropertyInTask(task, 'description', newDescription);
          editingTask = App.setPropertyInTask(editingTask, 'editing', !task.editing);
          editingTask = App.setPropertyInTask(
            editingTask,
            'timeOfCreated',
            `changed ${formatDistanceToNow(new Date(), { addSuffix: true })}`
          );
          return editingTask;
        }
        return task;
      }),
      newDescription: ''
    }));
  };

  completedTask = (id) => {
    this.setState(({ tasksData }) => ({
      tasksData: tasksData.map((task) => {
        if (task.id === id) {
          return App.setPropertyInTask(task, 'completed', !task.completed);
        }
        return task;
      })
    }));
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

  render() {
    const { tasksData } = this.state;
    const { taskFilter } = this.state;

    return (
      <section className="todoapp">
        <NewTaskForm addTask={(text) => this.addTask(text)} />
        <section className="main">
          <TaskList
            tasksData={tasksData}
            taskFilter={taskFilter}
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
