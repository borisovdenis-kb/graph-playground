import _ from 'lodash';
import SVGVertex from './SVGVertex';
import SVGEdge from './SVGEdge';

export default class SVGGraph {
  constructor() {
    this.vertexMap = {};
    this.edgeMap = {};
    this.vertexIdCounter = 1;
    this.edgeIdCounter = 1;
    this.newEdgeBuffer = [];
  }

  size () {
    return Object.values(this.vertexMap).length;
  }

  addVertex (coordinate) {
    const vertex = new SVGVertex({
      id: this.vertexIdCounter++,
      coordinate: coordinate
    });

    this.vertexMap[vertex.id] = vertex;
  }

  removeVertex (vertexId) {
    const vertex = this.vertexMap[vertexId];

    if (vertex) {
      vertex.edgeObservers.forEach(e => {
        delete this.edgeMap[e.id];
        e.destroy();
      });

      delete this.vertexMap[vertexId];
      vertex.destroy();
    }
  }

  buildEdge (nextVertexId) {
    const vertex = this.vertexMap[nextVertexId];

    if (vertex && !_.find(this.newEdgeBuffer, vertex)) {
      this.newEdgeBuffer.push(vertex);

      if (this.newEdgeBuffer.length === 2) {
        const edge = new SVGEdge({
          id: this.edgeIdCounter++,
          vertexOne: this.newEdgeBuffer[0],
          vertexTwo: this.newEdgeBuffer[1]
        });

        this.edgeMap[edge.id] = edge;
        this.newEdgeBuffer = [];
      }
    }
  }
}
