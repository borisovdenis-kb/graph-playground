const rectangularClassifier = (coordinateA, coordinateB) => {
  const width = Math.abs(coordinateA.x - coordinateB.x);
  const height = Math.abs(coordinateA.y - coordinateB.y);

  if (width > height) {
    return 'horizontal';
  } else if (width < height) {
    return 'vertical';
  } else {
    return 'square';
  }
};

export const alignVertexes = (vA, vB) => {
  const rectangularType = rectangularClassifier({
    x: vA.getX(),
    y: vA.getY()
  }, {
    x: vB.getX(),
    y: vB.getY()
  });

  if (rectangularType === 'horizontal') {
    vA.setY(vB.getY());
  } else if (rectangularType === 'vertical') {
    vA.setX(vB.getX());
  }

  vA.notify();
};
