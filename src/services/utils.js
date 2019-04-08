import moment from 'moment';
import _ from 'lodash';

const isEventOnEntity = (event, entityType) => {
  return getSelectedEntityType(event) === entityType;
};

const getSelectedEntityType = event => {
  return event.target.id.split('-')[0];
};

const getNextId = entityList => {
  let maxNumber = 0;

  entityList.forEach(entity => {
    if (entity.number > maxNumber) {
      maxNumber = entity.number;
    }
  });

  return maxNumber + 1;
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
  getSelectedEntityType,
  getNextId,
  createCommandObject,
  createMultiCommandObject
}
