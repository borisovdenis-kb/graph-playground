import Command from './Command';
import $store from './../../store/store';
import * as mutations from './../../store/mutations';
import {ADD_VERTEX} from "./commandNames";

export default class AddVertexCommand extends Command {
  constructor({receiver, payload} = {}) {
    super({receiver, payload});
    this.name = ADD_VERTEX;
  }

  execute() {
    $store.commit(mutations.ADD_VERTEX, {
      id: this.payload.id,
      value: this.payload.value,
      coordinate: this.payload.coordinate
    });
  }

  cancel() {
    $store.commit(mutations.DELETE_VERTEX, {id: this.payload.id});
  }

}
