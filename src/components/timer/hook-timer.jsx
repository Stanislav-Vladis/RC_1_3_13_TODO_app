import React, { useEffect, useRef, useState } from 'react';
import './hook-timer.css';
import PropTypes from 'prop-types';
import Utils from '../../utils/utils';

function HookTimer(props) {
  const { id, timerControl } = props;

  useEffect(() => {
    if (timerControl?.secondsTimer) {
      sessionStorage.setItem(id, JSON.stringify(timerControl.secondsTimer));
    }
  }, [timerControl?.secondsTimer?.seconds]);

  useEffect(() => {
    if (timerControl?.secondsTimer?.pauseDate) {
      sessionStorage.setItem(id, JSON.stringify(timerControl.secondsTimer));
    }
  }, [timerControl?.secondsTimer?.pauseDate]);

  useEffect(() => {
    if (timerControl && timerControl.secondsTimer) {
      if (
        timerControl.secondsTimer.startDate &&
        !timerControl.secondsTimer.pauseDate &&
        !timerControl.secondsTimer.timerId
      ) {
        timerControl.startTimer(id);
      }
    }
  }, [timerControl?.secondsTimer?.pauseDate, timerControl?.secondsTimer?.timerId]);

  let preparedTime = '00:00';
  if (timerControl?.secondsTimer?.seconds) {
    const currentTimerTime = Utils.getCurrentTimerTime(timerControl.secondsTimer.seconds);
    preparedTime = `${currentTimerTime.minutes}:${currentTimerTime.seconds}`;
  }

  return (
    <span className="description">
      <button id={id} className="icon icon-play" onClick={() => timerControl.startTimer(id)}></button>
      <button id={id} className="icon icon-pause" onClick={() => timerControl.pauseTimer(id)}></button>
      {preparedTime}
    </span>
  );
}

HookTimer.propTypes = {
  id: PropTypes.string,
  timerControl: PropTypes.object
};

export default HookTimer;
