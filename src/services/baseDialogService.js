import Vue from 'vue';
import {EventBus} from '../bus/eventBus';

class BaseDialogService {
  constructor() {
    this.appElement = document.getElementById('app');
  }

  open(dialogComponent, data, options) {
    const ComponentClass = Vue.extend(dialogComponent);
    const dialogInstance = new ComponentClass();

    dialogInstance.$mount();
    this.appElement.appendChild(dialogInstance.$el);

    EventBus.$emit('componentAppended');
  }
}

export default new BaseDialogService();
