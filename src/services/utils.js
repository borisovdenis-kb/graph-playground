const isEventOnEntity = (event, entityType) => {
  return event.target.id.split('-')[0] === entityType;
};

export {
  isEventOnEntity
}
