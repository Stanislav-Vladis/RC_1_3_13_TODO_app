import { formatDistanceToNow } from 'date-fns';
import shortid from 'shortid';

class Utils {
  static createTask(description, currentDate = new Date()) {
    return {
      id: shortid.generate(),
      description,
      timeOfCreated: `created ${formatDistanceToNow(currentDate, { addSuffix: true })}`,
      editing: false,
      completed: false
    };
  }
}

export default Utils;
