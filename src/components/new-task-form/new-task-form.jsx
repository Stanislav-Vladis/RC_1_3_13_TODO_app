import './new-task-form.css';
import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../../utils/utils';

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
    const updatedTasksData = this.props.addTask(this.state.label);
    sessionStorage.setItem(updatedTasksData.length.toString(), JSON.stringify(Utils.createEmptySecondsTimer()));
    Utils.createEmptySecondsTimer();
    this.setState({
      label: ''
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onLabelSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </form>
      </header>
    );
  }
}
