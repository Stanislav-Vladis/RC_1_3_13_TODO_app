import React from 'react';
import './timer.css';
import PropTypes from 'prop-types';
import Utils from '../../utils/utils';

class Timer extends React.Component {
  static propTypes = {
    id: PropTypes.string
  };

  constructor(props) {
    super(props);
    const { id } = props;

    this.state = {
      [id]: localStorage.getItem(id.toString()) ? JSON.parse(localStorage.getItem(id.toString())) : {}
    };
  }

  componentDidMount() {
    const { id } = this.props;
    const value = localStorage.getItem(id.toString());

    if (value) {
      const timerData = JSON.parse(value);

      if (timerData) timerData.timerId = null;

      this.setState({
        [id]: timerData
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { id } = this.props;
    const timerData = this.state[id];

    if (timerData) {
      if (timerData.startDate && !timerData.pauseDate && !timerData.timerId) {
        this.startTimer(id);
      }
    }
  }

  componentWillUnmount() {
    const { id } = this.props;
    const timerData = JSON.parse(localStorage.getItem(id.toString()));

    //Останавливаем таймеры
    if (timerData) {
      if (timerData.timerId) {
        clearTimeout(timerData.timerId);
        timerData.timerId = null;
      }
      localStorage.setItem(id.toString(), JSON.stringify(timerData));
    }
  }

  updateTimer = (id) => {
    const timerData = JSON.parse(localStorage.getItem(id.toString()));

    if (timerData.pauseDate) {
      timerData.lostTime += Utils.getDifferenceFromCurrentDate(timerData.pauseDate).allSeconds;
    }
    timerData.calculatedTime = Utils.getDifferenceFromCurrentDate(timerData.startDate, timerData.lostTime);
    timerData.timerId = JSON.stringify(setTimeout(() => this.updateTimer(id), 1000));
    timerData.pauseDate = null;

    this.setState({
      [id]: timerData
    });
    localStorage.setItem(id.toString(), JSON.stringify(timerData));
  };

  startTimer = (id) => {
    const timerData = this.state[id];
    if (!timerData) return;

    if (timerData && timerData.startDate && !timerData.pauseDate && timerData.timerId) return;
    if (
      (timerData && timerData.startDate && timerData.pauseDate && !timerData.timerId) ||
      (timerData && timerData.startDate && !timerData.pauseDate && !timerData.timerId)
    ) {
      this.updateTimer(id);
      return;
    }

    const newTimerData = {
      startDate: new Date(),
      pauseDate: null,
      lostTime: 0,
      calculatedTime: {},
      timerId: null
    };

    this.setState({
      [id]: newTimerData
    });
    localStorage.setItem(id.toString(), JSON.stringify(newTimerData));

    this.updateTimer(id);
  };

  pauseTimer = (id) => {
    const timerData = this.state[id];

    if (timerData && timerData.startDate && !timerData.pauseDate) {
      clearTimeout(timerData.timerId);
      timerData.pauseDate = new Date();
      timerData.timerId = null;

      this.setState({
        [id]: timerData
      });
      localStorage.setItem(id.toString(), JSON.stringify(timerData));
    }
  };

  render() {
    const { id } = this.props;
    const timerData = this.state[id];

    let preparedTime = '00:00';
    if (timerData && timerData.calculatedTime) {
      preparedTime = `${timerData.calculatedTime.seconds}:${timerData.calculatedTime.minutes}`;
    }

    return (
      <span className="description">
        <button
          id={id}
          className="icon icon-play"
          onClick={(event) => this.startTimer(event.currentTarget.id)}
        ></button>
        <button
          id={id}
          className="icon icon-pause"
          onClick={(event) => this.pauseTimer(event.currentTarget.id)}
        ></button>
        {preparedTime}
      </span>
    );
  }
}

export default Timer;
