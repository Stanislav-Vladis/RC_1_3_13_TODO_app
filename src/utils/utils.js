import { formatDistanceToNow } from 'date-fns';

class Utils {
  static createTask(id, description, minutes, seconds, currentDate = new Date()) {
    return {
      id: id,
      description: description,
      minutes: minutes,
      seconds: seconds,
      isRunning: false,
      intervalId: null,
      currentDate: currentDate,
      timeOfCreated: `created ${formatDistanceToNow(currentDate, { addSuffix: true })}`,
      editing: false,
      completed: false
    };
  }

  static prepareTimer(minutes, seconds) {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}

export default Utils;
