import * as commandTypes from '../../constants/commandTypes';

const GRAPH_ADD_VERTEX = 'GRAPH_ADD_VERTEX';
const GRAPH_DELETE_VERTEX = 'GRAPH_DELETE_VERTEX';
const GRAPH_MOVE_VERTEX = 'GRAPH_MOVE_VERTEX';
const GRAPH_ADD_EDGE = 'GRAPH_ADD_EDGE';
const GRAPH_UPDATE_EDGE_WEIGHT = 'GRAPH_UPDATE_EDGE_WEIGHT';
const GRAPH_DELETE_EDGE = 'GRAPH_DELETE_EDGE';

const GRAPH_COMMANDS_MAP = {
  [GRAPH_ADD_VERTEX]: {
    type: commandTypes.SIMPLE,
    execute: GRAPH_ADD_VERTEX,
    cancel: GRAPH_DELETE_VERTEX,
    module: 'graph',
    data: null,
    date: null,
    text: ''
  },
  [GRAPH_ADD_EDGE]: {
    type: commandTypes.SIMPLE,
    execute: GRAPH_ADD_EDGE,
    cancel: GRAPH_DELETE_EDGE,
    module: 'graph',
    data: null,
    date: null,
    text: ''
  },
  [GRAPH_DELETE_EDGE]: {
    type: commandTypes.SIMPLE,
    execute: GRAPH_DELETE_EDGE,
    cancel: GRAPH_ADD_EDGE,
    module: 'graph',
    data: null,
    date: null,
    text: ''
  },
  GRAPH_DELETE_VERTEX_PRIVATE: {
    type: commandTypes.SIMPLE,
    execute: GRAPH_DELETE_VERTEX,
    cancel: GRAPH_ADD_VERTEX,
    module: 'graph',
    data: null,
    date: null,
    text: ''
  },
  GRAPH_DELETE_VERTEX: {
    type: commandTypes.MULTI,
    isMulti: true,
    execute: [],
    cancel: [],
    module:'graph',
    data: null,
    date: null,
    text: ''
  },
  [GRAPH_UPDATE_EDGE_WEIGHT]: {
    type: commandTypes.DIFF,
    execute: GRAPH_UPDATE_EDGE_WEIGHT,
    cancel: GRAPH_UPDATE_EDGE_WEIGHT,
    module: 'graph',
    executeData: null,
    cancelData: null,
    date: null,
    text: ''
  }
};

export {
  GRAPH_ADD_VERTEX,
  GRAPH_DELETE_VERTEX,
  GRAPH_ADD_EDGE,
  GRAPH_MOVE_VERTEX,
  GRAPH_DELETE_EDGE,
  GRAPH_UPDATE_EDGE_WEIGHT,
  GRAPH_COMMANDS_MAP
}
