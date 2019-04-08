import baseDialogService from './baseDialogService';
import AppInfoDialog from '../components/dialogs/AppInfoDialog/AppInfoDialog';
import AppEditEdgeDialog from '../components/dialogs/AppEditEdgeDialog/AppEditEdgeDialog';

const openInfoDialog = ({data, options}) => {
  return baseDialogService.open({
    dialogComponent: AppInfoDialog,
    data,
    options
  });
};

const openEditEdgeDialog = ({data}) => {
  return baseDialogService.open({
    dialogComponent: AppEditEdgeDialog,
    data
  });
};

export {
  openInfoDialog,
  openEditEdgeDialog
};
