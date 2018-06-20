import {createCircle} from "./SvgShapeFactory";

export default class ObservableVertex {
  constructor(id, value, svgContainer, coordinate) {
    this.id = id;
    this.value = value;
    this.linkedVertexes = [];
    this.svgShape = createCircle({
      svgContainer: svgContainer,
      vertex: this,
      coordinate: coordinate
    });
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  remove(observer) {
    this.observers = this.observers.filter(item => item !== observer);
  }

  notify() {
    this.observers.forEach(o => {
      o.handleVertexChanges();
    });
  }

  addRelation(vertex) {
    if (this.linkedVertexes.indexOf(vertex) === -1) {
      this.linkedVertexes.push(vertex);
    }
  }

  getX() {
    return this.svgShape.getCX();
  }

  getY() {
    return this.svgShape.getCY();
  }
}
