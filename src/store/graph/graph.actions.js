const GRAPH_ADD_VERTEX = 'GRAPH_ADD_VERTEX';
const GRAPH_DELETE_VERTEX = 'GRAPH_DELETE_VERTEX';
const GRAPH_MOVE_VERTEX = 'GRAPH_MOVE_VERTEX';
const GRAPH_ADD_EDGE = 'GRAPH_ADD_EDGE';
const GRAPH_DELETE_EDGE = 'GRAPH_DELETE_EDGE';

const GRAPH_COMMANDS_MAP = {
  [GRAPH_ADD_VERTEX]: {
    name: 'Add Vertex',
    execute: GRAPH_ADD_VERTEX,
    cancel: GRAPH_DELETE_VERTEX,
    module: 'graph',
    data: null,
    date: null
  },
  [GRAPH_ADD_EDGE]: {
    name: 'Add Edge',
    execute: GRAPH_ADD_EDGE,
    cancel: GRAPH_DELETE_EDGE,
    module: 'graph',
    data: null,
    date: null
  },
  [GRAPH_DELETE_EDGE]: {
    name: 'Delete Edge',
    execute: GRAPH_DELETE_EDGE,
    cancel: GRAPH_ADD_EDGE,
    module: 'graph',
    data: null,
    date: null
  },
  GRAPH_DELETE_VERTEX_PRIVATE: {
    name: 'Delete Vertex',
    execute: GRAPH_DELETE_VERTEX,
    cancel: GRAPH_ADD_VERTEX,
    module: 'graph',
    data: null,
    date: null
  },
  GRAPH_DELETE_VERTEX: {
    name: 'Delete Vertex',
    isMulti: true,
    execute: [],
    cancel: [],
    module:'graph',
    data: null,
    date: null
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
