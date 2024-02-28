import './App.css';
import { formatDistanceToNow } from 'date-fns';
import React, { useState } from "react";
import shortid from 'shortid';
import TaskList from '../task-list/task-list.jsx';
import NewTaskForm from '../new-task-form/new-task-form.jsx';
import Footer from '../footer/footer.jsx';
import Utils from '../../utils/utils';

const App = () => {
  function setPropertyInTask(task, propertyName, value) {
    const cloneTask = structuredClone(task);
    cloneTask[propertyName] = value;
    return cloneTask;
  };

  const [tasksData, setTasksData] = useState({
    key0: Utils.createTask('key0', 'Completed task', 0, 10, new Date('2024-01-28T19:00:00Z')),
    key1: Utils.createTask('key1', 'Editing task', 1, 20, new Date('2024-01-28T19:05:00Z')),
    key2: Utils.createTask('key2', 'Active task', 3, 30, new Date('2024-01-28T19:10:00Z'))
  })
  const [taskFilter, setTaskFilter] = useState('All');

  function deleteTaskById(id) {
    setTasksData(prevTasksData => {

      if (prevTasksData[id]?.intervalId) clearInterval(prevTasksData[id].intervalId);
      const updatedTasksData = {};
      Object.keys(prevTasksData)
        .filter((key) => prevTasksData[key].id !== id)
        .forEach((key) => {
          updatedTasksData[key] = prevTasksData[key];
        });

      return updatedTasksData;
    });
  }

  function deleteAllCompletedTask() {
    setTasksData(prevTasksData => {

      const cloneTaskData = structuredClone(prevTasksData);
      Object.keys(prevTasksData)
        .map((key) => {
          const task = prevTasksData[key];
          if (task.completed) {
            if (task.intervalId) clearInterval(task.intervalId);
            delete cloneTaskData[key];
          }
          return task;
        })
        .filter((task) => !task.completed);

      return cloneTaskData;
    });
  }

  function addTask(text, minutes, seconds) {
    if (text.trim().length > 0) {
      setTasksData(prevTasksData => {

        const cloneTaskData = structuredClone(prevTasksData);
        const id = shortid.generate();
        cloneTaskData[id] = Utils.createTask(id, text, minutes, seconds);

        return cloneTaskData;
      });
    }
  }

  function editingTask(id) {
    setTasksData(prevTasksData => {

      const updatedTasksData = {};
      Object.keys(prevTasksData).forEach((key) => {
        const task = prevTasksData[key];
        if (task.id === id) {
          updatedTasksData[key] = setPropertyInTask(task, 'editing', !task.editing);
        } else {
          updatedTasksData[key] = task;
        }
      });

      return updatedTasksData;
    });
  }

  function submitNewTaskDescription(id, event, description) {
    event.preventDefault();

    setTasksData(prevTasksData => {

      const updatedTasksData = Object.keys(prevTasksData).reduce((value, key) => {
        const task = prevTasksData[key];
        if (task.id === id) {
          value[key] = {
            ...task,
            description: description,
            editing: !task.editing,
            timeOfCreated: `changed ${formatDistanceToNow(new Date(), { addSuffix: true })}`
          };
        } else {
          value[key] = task;
        }
        return value;
      }, {});

      return updatedTasksData;
    });
  }

  function completedTask(id) {
    setTasksData(prevTasksData => {

      const updatedTasksData = {};
      Object.keys(prevTasksData).forEach((key) => {
        const task = prevTasksData[key];
        if (task.id === id) {
          updatedTasksData[key] = setPropertyInTask(task, 'completed', !task.completed);
        } else {
          updatedTasksData[key] = task;
        }
      });

      return updatedTasksData;
    });
  }

  function showAllTask() {
    setTaskFilter('All');
  }

  function showActiveTask() {
    setTaskFilter('Active');
  }

  function showCompletedTask() {
    setTaskFilter('Completed');
  }

  function updateTimer(task) {
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
  }

  function startTimer(id) {
    if (tasksData[id]?.isRunning === false) {
      tasksData[id].isRunning = true;
      setTasksData(tasksData);

      const intervalId = setInterval(() => {
        // eslint-disable-next-line no-shadow
        setTasksData(prevTasksData => {
          const cloneTaskData = structuredClone(prevTasksData);
          cloneTaskData[id].timeOfCreated = `created ${formatDistanceToNow(cloneTaskData[id].currentDate, { addSuffix: true })}`;
          cloneTaskData[id] = updateTimer(cloneTaskData[id]);
          return cloneTaskData;
        });
      }, 1000);

      setTasksData(prevTasksData => {
        const newTasksData = { ...prevTasksData };
        newTasksData[id].intervalId = intervalId;
        return newTasksData;
      });
    }
  }

  function stopTimer(id) {
    const cloneTaskData = structuredClone(tasksData);

    if (cloneTaskData[id]?.isRunning === true) {
      clearInterval(cloneTaskData[id].intervalId);
      cloneTaskData[id].intervalId = null;
      cloneTaskData[id].isRunning = false;

      setTasksData(cloneTaskData);
    }
  }

  return (
    <section className="todoapp">
      <NewTaskForm addTask={(text, minutes, seconds) => addTask(text, minutes, seconds)} />
      <section className="main">
        <TaskList
          tasksData={tasksData}
          taskFilter={taskFilter}
          onStartTimer={(id) => startTimer(id)}
          onStopTimer={(id) => stopTimer(id)}
          onEditing={(id) => editingTask(id)}
          onSubmitNewTaskDescription={(id, event, description) =>
            submitNewTaskDescription(id, event, description)
          }
          onCompleted={(id) => completedTask(id)}
          onDestroy={(id) => deleteTaskById(id)}
        />
        <Footer
          tasksData={tasksData}
          taskFilter={taskFilter}
          onShowAllTask={() => showAllTask()}
          onShowActiveTask={() => showActiveTask()}
          onShowCompletedTask={() => showCompletedTask()}
          onClearCompleted={() => deleteAllCompletedTask()}
        />
      </section>
    </section>
  );
}

export default App;