import { formatDistanceToNow } from 'date-fns';
import shortid from 'shortid';

class Utils {
  static createTask(id, description, currentDate = new Date()) {
    return {
      id: id,
      description,
      timeOfCreated: `created ${formatDistanceToNow(currentDate, { addSuffix: true })}`,
      editing: false,
      completed: false
    };
  }

  static createEmptySecondsTimer() {
    return {
      startDate: null,
      pauseDate: null,
      seconds: 0,
      lostSeconds: 0,
      timerId: null
    };
  }

  static getElapsedMilliseconds(startDate) {
    if (!startDate) return 0;
    return Math.ceil(new Date() - Date.parse(startDate));
  }

  static getElapsedSeconds(startDate) {
    return Math.ceil(Utils.getElapsedMilliseconds(startDate) / 1000);
  }

  static getCurrentTimerTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsInMinute = seconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = secondsInMinute < 10 ? `0${secondsInMinute}` : secondsInMinute;

    return { seconds: formattedSeconds, minutes: formattedMinutes };
  }
}

export default Utils;
