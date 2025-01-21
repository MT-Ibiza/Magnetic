export function cmToMeters(cm: number) {
  const meters = cm / 100;
  return meters;
}

export function metersToCm(meters: number) {
  const cm = meters * 100;
  return cm;
}
