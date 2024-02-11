import { formatDistanceToNow } from 'date-fns';
import shortid from 'shortid';
import { instanceOf, object } from 'prop-types';

class Utils {
  static createTask(id, description, currentDate = new Date()) {
    return {
      id: id,
      description,
      seconds: 0,
      isActive: false,
      timer: null,
      timeOfCreated: `created ${formatDistanceToNow(currentDate, { addSuffix: true })}`,
      editing: false,
      completed: false
    };
  }

  static getDifferenceFromCurrentDate(startDate, lostTime = 0) {
    if (!startDate) return 0;

    let allSeconds = Math.floor((new Date() - Date.parse(startDate)) / 1000);
    if (lostTime) allSeconds -= lostTime;
    const minutes = Math.floor(allSeconds / 60);
    const seconds = allSeconds % 60;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return { allSeconds, seconds: formattedSeconds, minutes: formattedMinutes };
  }
}

export default Utils;
