import './new-task-form.css';
import React from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  state = {
    label: ''
  };

  static propTypes = {
    addTask: PropTypes.func
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value
    });
  };

  onLabelSubmit = (event) => {
    event.preventDefault();
    this.props.addTask(this.state.label);
    this.setState({
      label: ''
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onLabelSubmit}>
          <input className="new-todo"
                 placeholder="What needs to be done?"
                 onChange={this.onLabelChange}
                 value={this.state.label}
          />
          <input className="new-todo-form__timer" placeholder="Min" />
          <input className="new-todo-form__timer" placeholder="Sec" />
        </form>
      </header>
    );
  }
}
