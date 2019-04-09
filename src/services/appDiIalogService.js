import baseDialogService from './baseDialogService';
import AppInfoDialog from '../components/dialogs/AppInfoDialog/AppInfoDialog';
import AppEditEdgeDialog from '../components/dialogs/AppEditEdgeDialog/AppEditEdgeDialog';

const openInfoDialog = ({data, options = {}}) => {
  return baseDialogService.open({
    dialogComponent: AppInfoDialog,
    data,
    options
  });
};

const openEditEdgeDialog = ({data, options = {}}) => {
  const defaultOptions = {
    caption: 'EditEdge',
    width: 200,
    height: 300,
    isBlackoutDisabled: true
  };

  return baseDialogService.open({
    dialogComponent: AppEditEdgeDialog,
    options: {
      ...defaultOptions,
      ...options
    },
    data
  });
};

export {
  openInfoDialog,
  openEditEdgeDialog
};
