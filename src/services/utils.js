import moment from 'moment';
import _ from 'lodash';

const isEventOnEntity = (event, entityType) => {
  return event.target.id.split('-')[0] === entityType;
};

const createCommandObject = ({commandDefinition, data, text}) => ({
  ...commandDefinition,
  data,
  text,
  date: moment().format('YYYY.MM.DD:HH:mm:ss')
});

const createMultiCommandObject = ({commandDefinition, subCommands, text}) => ({
  ...commandDefinition,
  text,
  execute: _.cloneDeep(subCommands),
  cancel: _.cloneDeep(subCommands.reverse()),
  date: moment().format('YYYY.MM.DD:HH:mm:ss')
});

export {
  isEventOnEntity,
  createCommandObject,
  createMultiCommandObject
}
