export default class Edge {
  constructor(vertexOne, vertexTwo, svgContainer) {
    this.vertexOne = vertexOne;
    this.vertexTwo = vertexTwo;
    this.svgShape = svgContainer.line(
      vertexOne.getX(),
      vertexOne.getY(),
      vertexTwo.getX(),
      vertexTwo.getY()
    ).stroke({ color: '#d2d2d2', width: 5 }); // TODO: Надо придумать что-то с фабрикой!!
  }
}
