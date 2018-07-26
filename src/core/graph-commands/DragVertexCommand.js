import Command from "./Command";

export default class DragVertexCommand extends Command {
  constructor({name, receiver, payload} = {}) {
    super({name, receiver, payload});
    this.startCoordinate = null;
    this.endCoordinate = null;
  }

  execute() {
    this.receiver.setAttrs(this.endCoordinate);
    this.receiver.vertex.notify()
  }

  cancel() {
    this.receiver.setAttrs(this.startCoordinate);
    this.receiver.vertex.notify()
  }

  saveStartCoordinate({cx, cy}) {
    this.startCoordinate = {cx, cy};
  }

  saveEndCoordinate({cx, cy}) {
    this.endCoordinate = {cx, cy};
  }

}
