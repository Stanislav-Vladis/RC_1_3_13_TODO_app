import './new-task-form.css';
import React from 'react';
import PropTypes from 'prop-types';
import { logDOM } from "@testing-library/react";

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
    minutes: '',
    seconds: ''
  };

  static propTypes = {
    addTask: PropTypes.func
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value
    });
  };

  onTimerChange = (event, key) => {
    const { value } = event.target;
    if (Number.isNaN(Number(value)) || value > 60 || value < 0) return

    this.setState({
      [key]: value,
    })
  }

  onLabelSubmit = (event) => {
    const { label, minutes, seconds } = this.state

    event.preventDefault();
    if (event.code === 'Enter' && minutes && seconds) {
      this.props.addTask(label, Number(minutes), Number(seconds));
      this.setState({
        label: '',
        minutes: '',
        seconds: ''
      });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <form className="new-todo-form" onKeyUp={this.onLabelSubmit}>
          <input className="new-todo"
                 placeholder="What needs to be done?"
                 onChange={this.onLabelChange}
                 value={this.state.label}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={(event) => this.onTimerChange(event, 'minutes')}
            value={this.state.minutes}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={(event) => this.onTimerChange(event, 'seconds')}
            value={this.state.seconds}
          />
        </form>
      </header>
    );
  }
}
