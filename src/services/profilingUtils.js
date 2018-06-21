let sum = 0;
let count = 0;

export const avgExecutionTime = (f, context) => {
  const start = performance.now();
  f.call(context);
  const end = performance.now();

  sum += end - start;
  count++;
  return sum / count;
};
