const GRAPH_ADD_VERTEX = 'GRAPH_ADD_VERTEX';
const GRAPH_DELETE_VERTEX = 'GRAPH_DELETE_VERTEX';
const GRAPH_MOVE_VERTEX = 'GRAPH_MOVE_VERTEX';
const GRAPH_ADD_EDGE = 'GRAPH_ADD_EDGE';
const GRAPH_DELETE_EDGE = 'GRAPH_DELETE_EDGE';

const GRAPH_COMMANDS_MAP = {
  [GRAPH_ADD_VERTEX]: {
    execute: GRAPH_ADD_VERTEX,
    cancel: GRAPH_DELETE_VERTEX,
    module: 'graph',
    data: null,
    date: null,
    text: ''
  },
  [GRAPH_ADD_EDGE]: {
    execute: GRAPH_ADD_EDGE,
    cancel: GRAPH_DELETE_EDGE,
    module: 'graph',
    data: null,
    date: null,
    text: ''
  },
  [GRAPH_DELETE_EDGE]: {
    execute: GRAPH_DELETE_EDGE,
    cancel: GRAPH_ADD_EDGE,
    module: 'graph',
    data: null,
    date: null,
    text: ''
  },
  GRAPH_DELETE_VERTEX_PRIVATE: {
    execute: GRAPH_DELETE_VERTEX,
    cancel: GRAPH_ADD_VERTEX,
    module: 'graph',
    data: null,
    date: null,
    text: ''
  },
  GRAPH_DELETE_VERTEX: {
    isMulti: true,
    execute: [],
    cancel: [],
    module:'graph',
    data: null,
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
  GRAPH_COMMANDS_MAP
}
