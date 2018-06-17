const CIRCLE_RADIUS_PX = 30;
const CIRCLE_COLOR = '#d2d2d2';
const CIRCLE_HOVER_COLOR = '#aeaeae';

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
};

const createCircle = ({svgContainer, radius, x, y}) => {
  const circle = svgContainer.circle(radius);

  circle.attr({cx: x, cy: y, fill: CIRCLE_COLOR});

  circle.mouseover(() => {
    circle.animate({ease: '<', duration: 300}).attr({fill: CIRCLE_HOVER_COLOR});
  });

  circle.mouseout(() => {
    circle.animate({ease: '<', duration: 300}).attr({fill: CIRCLE_COLOR});
  });

  return circle;
};

export default class Vertex {
  constructor(id, value = null, linkedVertexes, svgContainer, x, y) {
    this.id = id;
    this.value = value;
    this.linkedVertexes = linkedVertexes || [];
    this.svgShape = createCircle({
      svgContainer: svgContainer,
      radius: CIRCLE_RADIUS_PX,
      x: x,
      y: y
    });
  }

  addRelation(vertex) {
    if (this.linkedVertexes.indexOf(vertex) === -1) {
      this.linkedVertexes.push(vertex);
    }
  }

  getX() {
    return this.svgShape.cx();
  }

  getY() {
    return this.svgShape.cy();
  }
}
