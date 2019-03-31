import moment from 'moment';
import _ from 'lodash';

const isEventOnEntity = (event, entityType) => {
  return event.target.id.split('-')[0] === entityType;
};

const createCommandObject = (commandDefinition, data) => ({
  ...commandDefinition,
  data,
  date: moment().format('YYYY.MM.DD:HH:mm:ss')
});

const createMultiCommandObject = (commandDefinition, subCommands) => ({
  ...commandDefinition,
  execute: _.cloneDeep(subCommands),
  cancel: _.cloneDeep(subCommands.reverse()),
  date: moment().format('YYYY.MM.DD:HH:mm:ss')
});

export {
  isEventOnEntity,
  createCommandObject,
  createMultiCommandObject
}
