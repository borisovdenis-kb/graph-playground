import baseDialogService from './baseDialogService';
import AppInfoDialog from '../components/dialogs/AppInfoDialog/AppInfoDialog';

const openInfoDialog = ({data, options}) => {
  return baseDialogService.open({
    dialogComponent: AppInfoDialog,
    data,
    options
  });
};

export {
  openInfoDialog
};
