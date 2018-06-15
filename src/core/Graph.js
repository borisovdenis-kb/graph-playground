import Vertex from './Vertex';

export default class Graph {
  constructor(svgContainer) {
    this.head = null;
    this.vertexMap = {};
    this.svgContainer = svgContainer;
  }

  addRelationsToVertex(targetVertexId, vertexesIdsForLink) {
    const targetVertex = this.getVertexById(targetVertexId);

    vertexesIdsForLink.forEach(vertexId => {
      const linkedVertex = this.getVertexById(vertexId);
      targetVertex.addRelation(linkedVertex);
      linkedVertex.addRelation(targetVertex);
    });
  }

  addVertex(id, value) {
    const newVertex = new Vertex(id, value, null, this.svgContainer);
    this.vertexMap[id] = newVertex;

    if (!this.head) {
      this.head = newVertex;
    }
  }

  find(value) {
    let [visited, queue] = [[], [this.head]];

    while (queue.length) {
      let currentVertex = queue[0];

      if (currentVertex.value === value) {
        return currentVertex;
      }

      visited.push(currentVertex);
      queue = [
        ...currentVertex.linkedVertexes.filter(v => visited.indexOf(v) === -1),
        ...queue
      ];
    }

    return null;
  }

  forEach(applier) {
    let [visited, queue] = [[], [this.head]];

    while (queue.length) {
      let currentVertex = queue.pop();

      applier(currentVertex);

      visited.push(currentVertex);
      queue = [
        ...currentVertex.linkedVertexes.filter(v => visited.indexOf(v) === -1 && queue.indexOf(v) === -1),
        ...queue
      ];
    }
  }

  getVertexById(id) {
    const vertex = this.vertexMap[id];

    if (!vertex) {
      throw new Error(`Vertex with index=${id} does not exist`);
    }

    return vertex;
  }
}
