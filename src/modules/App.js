import './App.css';
import TaskList from "./task-list/task-list";
import NewTaskForm from "./new-task-form/new-task-form";
import Footer from "./footer/footer";
import { formatDistanceToNow } from 'date-fns';
import React from "react";
import {MD5} from "crypto-js";

export default class App extends React.Component {
  createTask = (description, currentDate = new Date()) => {
    return {
      id: MD5(currentDate.toString()).toString(),
      description: description,
      timeOfCreated: `created ${formatDistanceToNow(currentDate, { addSuffix: true })}`,
      completed: false,
      displayTask: true
    }
  }

  setPropertyInTask = (task, propertyName, value) => {
    const cloneTask = structuredClone(task);
    cloneTask[propertyName] = value;
    return cloneTask;
  }

  state = {
    tasksData: [
      this.createTask('Completed task', new Date('2024-01-28T19:00:00Z')),
      this.createTask('Editing task', new Date('2024-01-28T19:05:00Z')),
      this.createTask('Active task', new Date('2024-01-28T19:10:00Z'))
    ],
    taskFilter: 'All'
  }

  deleteTaskById = (id) => {
    this.setState(({tasksData}) => {
      return {
        tasksData: tasksData.filter(task => task.id !== id)
      }
    })
  }

  deleteAllCompletedTask = () => {
    this.setState(({tasksData}) => {
      return {
        tasksData: tasksData.filter(task => !task.completed)
      }
    })
  }

  addTask = (text) => {
    this.setState(({tasksData}) => {
      const cloneTaskData = structuredClone(tasksData);
      cloneTaskData.push(this.createTask(text));

      return {
        tasksData: cloneTaskData
      };
    });
  }

  completedTask = (id) => {
    this.setState(({tasksData}) => {
      return {
        tasksData: tasksData.map((task) => {
          if (task.id === id) {
            return this.setPropertyInTask(task, 'completed', !task.completed);
          }
          return task;
        })
      }
    });
  }

  showAllTask = () => {
    this.setState(({tasksData}) => {
      return {
        tasksData: tasksData.map((task) => {
          return this.setPropertyInTask(task, 'displayTask', true);
        }),
        taskFilter: 'All'
      }
    });
  }

  showActiveTask = () => {
    this.setState(({tasksData}) => {
      return {
        tasksData: tasksData.map((task) => {
          if (!task.completed) {
            return this.setPropertyInTask(task, 'displayTask', true);
          }
          return this.setPropertyInTask(task, 'displayTask', false);
        }),
        taskFilter: 'Active'
      }
    });
  }

  showCompletedTask = () => {
    this.setState(({tasksData}) => {
      return {
        tasksData: tasksData.map((task) => {
          if (task.completed) {
            return this.setPropertyInTask(task, 'displayTask', true);
          }
          return this.setPropertyInTask(task, 'displayTask', false);
        }),
        taskFilter: 'Completed'
      }
    });
  }

  render() {
    const tasksData = this.state.tasksData;
    const taskFilter = this.state.taskFilter;

    return (
        <section className="todoapp">
          <NewTaskForm
              addTask={(text) => this.addTask(text)}
          />
          <section className="main">
            <TaskList
                tasksData={tasksData}
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
