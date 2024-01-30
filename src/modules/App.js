import './App.css';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { MD5 } from 'crypto-js';
import TaskList from './task-list/task-list';
import NewTaskForm from './new-task-form/new-task-form';
import Footer from './footer/footer';

export default class App extends React.Component {
  static createTask = (description, currentDate = new Date()) => ({
    id: MD5(currentDate.toString()).toString(),
    description,
    timeOfCreated: `created ${formatDistanceToNow(currentDate, { addSuffix: true })}`,
    editing: false,
    completed: false,
    displayTask: true
  });

  static setPropertyInTask = (task, propertyName, value) => {
    const cloneTask = structuredClone(task);
    cloneTask[propertyName] = value;
    return cloneTask;
  };

  state = {
    tasksData: [
      App.createTask('Completed task', new Date('2024-01-28T19:00:00Z')),
      App.createTask('Editing task', new Date('2024-01-28T19:05:00Z')),
      App.createTask('Active task', new Date('2024-01-28T19:10:00Z'))
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
    this.setState(({ tasksData }) => {
      const cloneTaskData = structuredClone(tasksData);
      cloneTaskData.push(App.createTask(text));

      return {
        tasksData: cloneTaskData
      };
    });
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
          const editingTask = App.setPropertyInTask(task, 'description', newDescription);
          return App.setPropertyInTask(editingTask, 'editing', !task.editing);
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
    this.setState(({ tasksData }) => ({
      tasksData: tasksData.map((task) => App.setPropertyInTask(task, 'displayTask', true)),
      taskFilter: 'All'
    }));
  };

  showActiveTask = () => {
    this.setState(({ tasksData }) => ({
      tasksData: tasksData.map((task) => {
        if (!task.completed) {
          return App.setPropertyInTask(task, 'displayTask', true);
        }
        return App.setPropertyInTask(task, 'displayTask', false);
      }),
      taskFilter: 'Active'
    }));
  };

  showCompletedTask = () => {
    this.setState(({ tasksData }) => ({
      tasksData: tasksData.map((task) => {
        if (task.completed) {
          return App.setPropertyInTask(task, 'displayTask', true);
        }
        return App.setPropertyInTask(task, 'displayTask', false);
      }),
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
