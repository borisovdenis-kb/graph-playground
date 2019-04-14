import Vue from 'vue';
import AppBaseDialog from '../components/dialogs/AppBaseDialog/AppBaseDialog';

class BaseDialogService {
  constructor() {
    this.dialogStack = [];
  }

  open({dialogComponent = AppBaseDialog, data = {}, options = {}}) {
    const lastDialog = this.getLastDialog();

    if (lastDialog && !lastDialog.isOverDialogAllowed) {
      return Promise.reject();
    }

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

      this.dialogStack.push({
        isOverDialogAllowed: Boolean(options.isOverDialogAllowed),
        dialogInstance
      });
    }).then(data => {
      this.close();

      return data;
    }).catch(data => {
      this.close();

      return Promise.reject(data);
    });
  }

  close() {
    const dialog = this.dialogStack.pop();

    if (!dialog) {
      return;
    }

    const appElement = document.getElementById('app');

    dialog.dialogInstance.$destroy();
    appElement.removeChild(dialog.dialogInstance.$el);
  }

  getLastDialog() {
    return this.dialogStack[this.dialogStack.length - 1]
  }
}

export default new BaseDialogService();
