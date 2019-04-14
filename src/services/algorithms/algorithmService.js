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
      const adjVertex = edge.vertexOneId === vertex.vertexId ? graph[edge.vertexTwoId] : graph[edge.vertexOneId];

      if (adjVertex.distance > vertex.distance + Number(edge.weight)) {
        adjVertex.distance = vertex.distance + Number(edge.weight);
      }
    });

    _.forEach(vertex.edgeList, edge => {
      const adjVertex = edge.vertexOneId === vertex.vertexId ? graph[edge.vertexTwoId] : graph[edge.vertexOneId];

      dfs(adjVertex);
    });
  }

  console.log(graph);

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
        edgeList: []
      };
    }

    if (!vertexTwo) {
      graph[edge.vertexTwoId] = {
        vertexId: edge.vertexTwoId,
        distance: sourceVertexId === edge.vertexTwoId ? 0 : Number.POSITIVE_INFINITY,
        edgeList: []
      };
    }

    graph[edge.vertexOneId].edgeList.push(edge);
    graph[edge.vertexTwoId].edgeList.push(edge);
  });

  return graph;
};

export {
  getShortestRouteDijkstra
}
