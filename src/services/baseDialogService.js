import Vue from 'vue';
import {EventBus} from '../bus/eventBus';
import AppBaseDialog from '../components/dialogs/AppBaseDialog/AppBaseDialog';

class BaseDialogService {
  constructor() {}

  open({dialogComponent = AppBaseDialog, data, options}) {
    const appElement = document.getElementById('app');
    let dialogInstance;

    return new Promise((resolve, reject) => {
      const ComponentClass = Vue.extend(dialogComponent);

      const onResolveClose = data => resolve(data);
      const onRejectClose = data => reject(data);

      dialogInstance = new ComponentClass({
        propsData: {
          inData: data,
          options: {
            ...options,
            onResolveClose,
            onRejectClose
          }
        }
      });

      dialogInstance.$mount();
      appElement.appendChild(dialogInstance.$el);

      EventBus.$emit('componentAppended');
    }).then(data => {
      dialogInstance.$destroy();
      appElement.removeChild(dialogInstance.$el);

      return data;
    });
  }
}

export default new BaseDialogService();
