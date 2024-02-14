import React from 'react';
import PropTypes from 'prop-types';
import '../timer/timer.css'
import Utils from "../../utils/utils";

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
          <span className="description">
            <button id={id} className="icon icon-play" onClick={onStartTimer}></button>
            <button id={id} className="icon icon-pause" onClick={onStopTimer}></button>
            {Utils.prepareTimer(minutes, seconds)}
          </span>
          <span className="created">{timeOfCreated}</span>
        </label>
        <button className="icon icon-edit" onClick={onEditing}></button>
        <button className="icon icon-destroy" onClick={onDestroy}></button>
      </div>
    );
  }
}
