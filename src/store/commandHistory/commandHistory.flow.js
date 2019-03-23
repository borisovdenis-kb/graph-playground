import $store from '../index';
import * as appDialogService from '../../services/appDiIalogService';

const commandHistoryFlow = Promise.resolve();

export default commandHistoryFlow
  .then(() => {
    if ($store.getters['commandHistory/isRedoEmpty']) {
      return appDialogService.openInfoDialog({
        data: {text: 'Отмененные действия будут утеряны!'},
        options: {caption: 'Внимание', width: 400, height: 200}
      }).then(() => {
        return Promise.resolve();
      }).catch(() => {
        return Promise.reject();
      });
    }

    return Promise.resolve();
  });
