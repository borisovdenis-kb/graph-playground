import moment from 'moment';

export default class Command {
  constructor({receiver = null, payload = null} = {}) {
    this.name = 'COMMAND';
    this.receiver = receiver;
    this.payload = payload;
    this.date = moment().format("YYYY.MM.DD:HH:mm");
  }

  execute() {
    throw new Error("Method has no implementation");
  }

  cancel() {
    throw new Error("Method has no implementation");
  }

  setReceiver(receiver) {
    this.receiver = receiver;
  }

  setPayload(payload) {
    this.payload = payload;
  }
}
