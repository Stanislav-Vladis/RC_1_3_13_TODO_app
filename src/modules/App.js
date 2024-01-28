import './App.css';
import TaskList from "./task-list/task-list";
import NewTaskForm from "./new-task-form/new-task-form";
import Footer from "./footer/footer";
import { formatDistanceToNow } from 'date-fns';

function App() {
  const createDate = (date) => {
    return`created ${formatDistanceToNow(date, { addSuffix: true })}`;
  }
  const tasksData = {
    completed: [
      { description: 'Completed task', created: createDate(new Date('2024-01-28T19:00:00Z')) }
    ],
    active: [
      { description: 'Editing task', created: createDate(new Date('2024-01-28T19:05:00Z')), editing: true },
      { description: 'Active task', created: createDate(new Date('2024-01-28T19:10:00Z')), editing: false }
    ]
  };

  return (
  <section className="todoapp">
    <NewTaskForm />
    <section className="main">
      <TaskList tasksData={tasksData} />
      <Footer />
    </section>
  </section>
  );
}

export default App;
