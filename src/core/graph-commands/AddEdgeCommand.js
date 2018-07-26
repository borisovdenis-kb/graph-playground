import Command from "./Command";
import $store from "../../store/store";
import * as mutations from "../../store/mutations";
import {ADD_EDGE} from "./commandNames";

export default class AddEdgeCommand extends Command {
  constructor({receiver, payload} = {}) {
    super({receiver, payload});
    this.name = ADD_EDGE;
  }

  execute() {
    $store.commit(mutations.ADD_RELATION, {
      vertexOneId: this.payload.vertexOne.id,
      vertexTwoId: this.payload.vertexTwo.id,
    });
  }

  cancel() {
    $store.commit(mutations.DELETE_RELATION, {
      vertexOneId: this.payload.vertexOne.id,
      vertexTwoId: this.payload.vertexTwo.id,
    });
  }
}
