const CIRCLE_RADIUS_PX = 30;

const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
};

const createCircle = ({svgContainer, radius}) => {
  const circle = svgContainer.circle(radius);
  circle.attr({
    cx: getRandomNumber(10, 1700),
    cy: getRandomNumber(10, 800)
  });

  return circle;
};

export default class Vertex {
  constructor(id, value = null, linkedVertexes, svgContainer) {
    this.id = id;
    this.value = value;
    this.linkedVertexes = linkedVertexes || [];
    this.svgShape = createCircle({
      svgContainer: svgContainer,
      radius: CIRCLE_RADIUS_PX
    });
  }

  addRelation(vertex) {
    if (this.linkedVertexes.indexOf(vertex) === -1) {
      this.linkedVertexes.push(vertex);
    }
  }
}
