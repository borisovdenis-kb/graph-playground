import Command from "./Command";
import {DRAG_VERTEX} from "./commandNames";

export default class DragVertexCommand extends Command {
  constructor({receiver, payload} = {}) {
    super({receiver, payload});
    this.name = DRAG_VERTEX;
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
