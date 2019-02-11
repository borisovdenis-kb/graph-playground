import Command from "./Command";
import $store from '../../store/store';
import actions from '../actions';

export default class AddVertexCommand extends Command {
  constructor({receiver = null, payload = null}) {
    super({receiver, payload});
    this.name = actions.ADD_VERTEX;
    this.createdVertex = null;
  }

  execute() {
    this.createdVertex = $store.state.svgGraph.svgGraph.addVertex({
      cx: this.payload.offsetX,
      cy: this.payload.offsetY
    });
  }

  cancel() {
    $store.state.svgGraph.svgGraph.removeVertex(this.createdVertex.id);
    this.createdVertex = null;
  }
}
