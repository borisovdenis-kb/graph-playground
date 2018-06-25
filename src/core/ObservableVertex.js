import {createCircle} from "./svg/SvgFactory";

export default class ObservableVertex {
  constructor(id, value, coordinate) {
    this.id = id;
    this.value = value;
    this.linkedVertexes = [];
    this.svgShape = createCircle({
      vertex: this,
      coordinate: coordinate
    });
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(item => item !== observer);
  }

  notify() {
    for (let i = 0, length = this.observers.length; i < length; i++) {
      this.observers[i].handleVertexChanges();
    }
  }

  clearObserverList() {
    this.observers.forEach((edge) => {
      edge.svgShape.remove();
    });

    this.observers = [];
  }

  addRelation(vertex) {
    if (this.linkedVertexes.indexOf(vertex) === -1) {
      this.linkedVertexes.push(vertex);
    }
  }

  upliftInSvgContainer() {
    const coordinate = {cx: this.getX(), cy: this.getY()};
    this.svgShape.remove();
    this.svgShape = createCircle({
      vertex: this,
      coordinate: coordinate
    });
  }

  getX() {
    return this.svgShape.getCX();
  }

  setX(x) {
    this.svgShape.setCX(x);
  }

  getY() {
    return this.svgShape.getCY();
  }

  setY(y) {
    this.svgShape.setCY(y);
  }

  getCoordinate() {
    return {
      x: this.getX(),
      y: this.getY()
    }
  }
}
