import React from 'react';
import './timer.css';
import PropTypes from 'prop-types';
import Utils from '../../utils/utils';

export default class Timer extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    onStartTimer: PropTypes.func,
    onStopTimer: PropTypes.func
  };

  render() {
    const { id, minutes, seconds, onStartTimer, onStopTimer } = this.props;

    return (
      <span className="description">
        <button id={id} className="icon icon-play" onClick={onStartTimer}></button>
        <button id={id} className="icon icon-pause" onClick={onStopTimer}></button>
        {Utils.prepareTimer(minutes, seconds)}
      </span>
    );
  }
}
