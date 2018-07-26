import Command from "./Command";
import $store from "../../store/store";
import * as mutations from "../../store/mutations";
import {DELETE_VERTEX} from "./commandNames";
import _ from 'lodash';

export default class DeleteVertexCommand extends Command {
  constructor({receiver, payload} = {}) {
    super({receiver, payload});
    this.name = DELETE_VERTEX;
    this.vertexSnapshot = null;
  }

  execute() {
    this.vertexSnapshot = _.cloneDeep(this.receiver.vertex);
    $store.commit(mutations.DELETE_VERTEX, {id: this.receiver.vertex.id});
  }

  cancel() {
    $store.commit(mutations.ADD_VERTEX, {
      id: this.vertexSnapshot.id,
      value: this.vertexSnapshot.value,
      coordinate: {
        cx: this.vertexSnapshot.getX(),
        cy: this.vertexSnapshot.getY()
      }
    });

    this.vertexSnapshot.observers.forEach(edge => {
      try {
        $store.commit(mutations.ADD_RELATION, {
          vertexOneId: edge.vertexOne.id,
          vertexTwoId: edge.vertexTwo.id
        });
      } catch (vertexDoesNotExistException) {}
    });
  }

}
