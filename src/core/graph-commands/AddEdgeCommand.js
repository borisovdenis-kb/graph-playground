import Command from "./Command";
import $store from "../../store/store";
import * as mutations from "../../store/mutations";

export default class AddEdgeCommand extends Command {
  constructor(name, receiver) {
    super(name, receiver);
  }

  execute() {
    $store.commit(mutations.ADD_RELATION, {
      vertexOneId: this.receiver.vertexOne.id,
      vertexTwoId: this.receiver.vertexTwo.id,
    });
  }

  cancel() {
    $store.commit(mutations.DELETE_RELATION, {
      vertexOneId: this.receiver.vertexOne.id,
      vertexTwoId: this.receiver.vertexTwo.id,
    });
  }
}
