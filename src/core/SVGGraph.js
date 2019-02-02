import SVGVertex from './SVGVertex';

export default class SVGGraph {
  constructor() {
    this.vertexMap = {};
    this.edgeMap = {};
    this.vertexIdCounter = 1;
    this.edgeIdCounter = 1;
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
}
