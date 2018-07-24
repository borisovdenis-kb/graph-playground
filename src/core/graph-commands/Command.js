
export default class Command {
  constructor(name, receiver) {
    this.name = name;
    this.date = Date.now();
    this.receiver = receiver;
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
}
