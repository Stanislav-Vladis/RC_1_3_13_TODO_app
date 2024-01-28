import './App.css';
import TaskList from "./task-list/task-list";
import NewTaskForm from "./new-task-form/new-task-form";
import Footer from "./footer/footer";
import { formatDistanceToNow } from 'date-fns';
import React from "react";
import {MD5} from "crypto-js";

export default class App extends React.Component {
  createDate(date) {
    return`created ${formatDistanceToNow(date, { addSuffix: true })}`;
  }
  state = {
    tasksData: [
      {
        id: MD5(new Date('2024-01-28T19:00:00Z').toString()).toString(),
        description: 'Completed task',
        timeOfCreated: this.createDate(new Date('2024-01-28T19:00:00Z')),
        completed: false
      },
      {
        id: MD5(new Date('2024-01-28T19:05:00Z').toString()).toString(),
        description: 'Editing task',
        timeOfCreated: this.createDate(new Date('2024-01-28T19:05:00Z')),
        completed: false
      },
      {
        id: MD5(new Date('2024-01-28T19:10:00Z').toString()).toString(),
        description: 'Active task',
        timeOfCreated: this.createDate(new Date('2024-01-28T19:10:00Z')),
        completed: false
      }
    ]
  }

  deleteTask = (id) => {
    this.setState(({tasksData}) => {
      return {
        tasksData: tasksData.filter(task => task.id !== id)
      }
    })
  }

  completedTask = (id) => {
    this.setState(({tasksData}) => {
      return {
        tasksData: tasksData.map((task) => {
          if (task.id === id) {
            const cloneTask = structuredClone(task);
            cloneTask.completed = !cloneTask.completed;
            return cloneTask;
          }
          return task;
        })
      }
    })
  }

  render() {
    const tasksData = this.state.tasksData;

    return (
        <section className="todoapp">
          <NewTaskForm />
          <section className="main">
            <TaskList
                tasksData={tasksData}
                onCompleted={(id) => this.completedTask(id)}
                onDestroy={(id) => this.deleteTask(id)} />
            <Footer />
          </section>
        </section>
    );
  }
}
