import './new-task-form.css';
import React from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ addTask }) => {
  const [label, setLabel] = React.useState('');
  const [minutes, setMinutes] = React.useState('');
  const [seconds, setSeconds] = React.useState('');

  function onLabelChange(event) {
    setLabel(event.target.value);
  }

  function onTimerChange(event, key) {
    const { value } = event.target;
    if (Number.isNaN(Number(value)) || value > 60 || value < 0) return

    switch (key) {
      case 'minutes':
        setMinutes(value);
        break;
      case 'seconds':
        setSeconds(value);
        break;
      default:
        break;
    }
  }

  function onLabelSubmit(event) {
    event.preventDefault();
    if (event.code === 'Enter' && minutes && seconds) {
      addTask(label, Number(minutes), Number(seconds));
      setLabel('');
      setMinutes('');
      setSeconds('');
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <form className="new-todo-form" onKeyUp={onLabelSubmit}>
        <input className="new-todo"
               placeholder="What needs to be done?"
               onChange={onLabelChange}
               value={label}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={(event) => onTimerChange(event, 'minutes')}
          value={minutes}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={(event) => onTimerChange(event, 'seconds')}
          value={seconds}
        />
      </form>
    </header>
  );
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func
}

export default NewTaskForm;