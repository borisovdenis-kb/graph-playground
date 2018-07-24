export default class EdgeObserver {
  constructor(vertexOne, vertexTwo, svgContainer) {
    this.vertexOne = vertexOne;
    this.vertexTwo = vertexTwo;
    this.svgShape = svgContainer.line(
      this.vertexOne.getX(),
      this.vertexOne.getY(),
      this.vertexTwo.getX(),
      this.vertexTwo.getY()
    ).stroke({ color: '#d2d2d2', width: 5 }); // TODO: Надо придумать что-то с фабрикой!!
  }

  isAdjacentTo(vertexId) {
    return this.vertexOne.id === vertexId || this.vertexTwo.id === vertexId;
  }

  handleVertexChanges() {
    this.svgShape.plot(
      this.vertexOne.getX(),
      this.vertexOne.getY(),
      this.vertexTwo.getX(),
      this.vertexTwo.getY()
    );
  }
}
