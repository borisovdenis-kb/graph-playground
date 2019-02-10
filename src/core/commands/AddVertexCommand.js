import Command from "./Command";
import $store from '../../store/store';
import getters from '../../store/getters';
import actions from '../actions';

export default class AddVertexCommand extends Command {
  constructor({receiver = null, payload = null}) {
    super({receiver, payload});
    this.name = actions.ADD_VERTEX;
    this.createdVertex = null;
  }

  execute() {
    this.createdVertex = $store.getters[getters.GET_SVG_GRAPH].addVertex({
      cx: this.payload.offsetX,
      cy: this.payload.offsetY
    });
  }

  cancel() {
    $store.getters[getters.GET_SVG_GRAPH].removeVertex(this.createdVertex.id);
    this.createdVertex = null;
  }
}
