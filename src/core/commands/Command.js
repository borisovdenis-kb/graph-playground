
import moment from 'moment';

export default class Command {
  constructor({receiver = null, payload = null}) {
    this.receiver = receiver;
    this.payload = payload;
    this.name = 'UNKNOWN_COMMAND';
    this.date = moment().format('YYYY.MM.DD:HH:mm:ss');
  }

  /**
   * Method for implementing of particular action/command
   */
  execute() {
    throw new Error('Method [execute] is not implemented');
  }

  /**
   * Method for implementing of cancellation of action/command
   */
  cancel() {
    throw new Error('Method [cancel] is not implemented');
  }

  /**
   * Method returns name of action/command
   * @returns {string}
   */
  getName () {
    return this.name;
  }
}
