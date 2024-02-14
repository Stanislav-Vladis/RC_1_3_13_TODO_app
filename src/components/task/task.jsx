import React from 'react';
import PropTypes from 'prop-types';
import Timer from "../timer/timer.jsx";

export default class Task extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    description: PropTypes.string,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    timeOfCreated: PropTypes.string,
    isChecked: PropTypes.bool,
    onStartTimer: PropTypes.func,
    onStopTimer: PropTypes.func,
    onEditing: PropTypes.func,
    onCompleted: PropTypes.func,
    onDestroy: PropTypes.func
  };

  render() {
    const {
      id,
      description,
      minutes,
      seconds,
      timeOfCreated,
      isChecked,
      onStartTimer,
      onStopTimer,
      onEditing,
      onCompleted,
      onDestroy
    } = this.props;

    return (
      <div className="view">
        <input id={id} className="toggle" type="checkbox" checked={isChecked} onChange={onCompleted} />
        <label htmlFor={id}>
          <span className="description">{description}</span>
          <Timer id={id}
                 minutes={minutes}
                 seconds={seconds}
                 onStartTimer={onStartTimer}
                 onStopTimer={onStopTimer}
          />
          <span className="created">{timeOfCreated}</span>
        </label>
        <button className="icon icon-edit" onClick={onEditing}></button>
        <button className="icon icon-destroy" onClick={onDestroy}></button>
      </div>
    );
  }
}
