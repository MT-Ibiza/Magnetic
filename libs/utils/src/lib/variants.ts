export function getCapacityRange(capacities: { capacity: number }[]) {
  if (!capacities.length) return { low: 0, high: 0 };

  return capacities.reduce(
    (acc, { capacity }) => ({
      low: Math.min(acc.low, capacity),
      high: Math.max(acc.high, capacity),
    }),
    { low: Infinity, high: -Infinity }
  );
}
