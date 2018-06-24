import ObserverEdge from './ObserverEdge';
import ObservableVertex from "./ObservableVertex";
import {alignVertexes} from "./svg/SvgAlignment";
import _ from 'lodash';


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
    let edge;

    targetVertex.addRelation(linkedVertex);
    linkedVertex.addRelation(targetVertex);

    edge = new ObserverEdge(targetVertex, linkedVertex, this.svgContainer);

    this.edgeList.push(edge);

    targetVertex.addObserver(edge);
    linkedVertex.addObserver(edge);
  }

  addVertex(id, value, coordinate) {
    const newVertex = new ObservableVertex(id, value, this.svgContainer, coordinate);
    this.vertexMap[id] = newVertex;

    if (!this.head) {
      this.head = newVertex;
    }
  }

  deleteVertex(id) {
    const edgesForDelition = this.vertexMap[id].observers;

    edgesForDelition.forEach(e => {
      _.remove(this.edgeList, edge => edge === e);
    });

    this.vertexMap[id].clearObserverList();
    this.vertexMap[id].svgShape.remove();

    delete this.vertexMap[id];
  }

  align() {
    this.edgeList.forEach(edge => {
      alignVertexes(edge.vertexOne, edge.vertexTwo);
    });
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
