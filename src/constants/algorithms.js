import {getShortestRouteDijkstra} from "../services/algorithms/algorithmService";

const DIJKSTRA_ALGORITHM = 'DIJKSTRA_ALGORITHM';

const algorithmMap = {
  [DIJKSTRA_ALGORITHM]: getShortestRouteDijkstra
};

export {
  DIJKSTRA_ALGORITHM,
  algorithmMap
};
