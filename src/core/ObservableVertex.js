
export default class ObservableVertex {
  constructor(vertex) {
    this.vertex = vertex;
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
      o.handleVertexChanges(this.vertex);
    })
  }

  changeCoordinate(x, y) {
    this.vertex
  }
}
