import Command from './Command';
import $store from './../../store/store';
import {ADD_VERTEX, DELETE_VERTEX} from './../../store/mutations';

export default class AddVertexCommand extends Command {
  constructor({name, receiver, payload} = {}) {
    super({name, receiver, payload});
  }

  execute() {
    $store.commit(ADD_VERTEX, {
      id: this.payload.id,
      value: this.payload.value,
      coordinate: this.payload.coordinate
    });
  }

  cancel() {
    $store.commit(DELETE_VERTEX, {id: this.payload.id});
  }

}
