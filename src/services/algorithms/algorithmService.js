import _ from 'lodash';

const getShortestRouteDijkstra = (edgeList, sourceVertexId) => {
  const graph = buildGraph(edgeList, sourceVertexId);
  const visitedVertexes = [];

  dfs(graph[sourceVertexId]);

  function dfs(vertex) {
    if (_.find(visitedVertexes, vertex)) {
      return;
    }

    visitedVertexes.push(vertex);

    _.forEach(vertex.edgeList, edge => {
      const adjVertex = graph[edge.adjVertexId];

      if (adjVertex.distance > vertex.distance + edge.weight) {
        adjVertex.distance = vertex.distance + edge.weight;
        adjVertex.path = [...vertex.path, edge.edgeId];
      }
    });

    _.forEach(vertex.edgeList, edge => dfs(graph[edge.adjVertexId]));
  }

  return graph;
};

const buildGraph = (edgeList, sourceVertexId) => {
  const graph = {};

  _.forEach(edgeList, edge => {
    const vertexOne = graph[edge.vertexOneId];
    const vertexTwo = graph[edge.vertexTwoId];

    if (!vertexOne) {
      graph[edge.vertexOneId] = {
        vertexId: edge.vertexOneId,
        distance: sourceVertexId === edge.vertexOneId ? 0 : Number.POSITIVE_INFINITY,
        edgeList: [],
        path: []
      };
    }

    if (!vertexTwo) {
      graph[edge.vertexTwoId] = {
        vertexId: edge.vertexTwoId,
        distance: sourceVertexId === edge.vertexTwoId ? 0 : Number.POSITIVE_INFINITY,
        edgeList: [],
        path: []
      };
    }

    graph[edge.vertexOneId].edgeList.push({
      edgeId: edge.edgeId,
      adjVertexId: edge.vertexTwoId,
      weight: Number(edge.weight)
    });
    graph[edge.vertexTwoId].edgeList.push({
      edgeId: edge.edgeId,
      adjVertexId: edge.vertexOneId,
      weight: Number(edge.weight)
    });
  });

  return graph;
};

export {
  getShortestRouteDijkstra
}
