import Vertex from './Vertex';
import Edge from './Edge';


export default class Graph {
  constructor(svgContainer) {
    this.head = null;
    this.vertexMap = {};
    this.edgeList = [];
    this.svgContainer = svgContainer;
  }

  addRelation(id1, id2) {
    const targetVertex = this.getVertexById(id1);
    const linkedVertex = this.getVertexById(id2);

    targetVertex.addRelation(linkedVertex);
    linkedVertex.addRelation(targetVertex);

    this.edgeList.push(new Edge(targetVertex, linkedVertex, this.svgContainer));
  }

  addVertex(id, value, x, y) {
    const newVertex = new Vertex(id, value, null, this.svgContainer, x, y);
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
