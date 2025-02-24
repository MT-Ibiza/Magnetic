import { Image } from '@magnetic/interfaces';

export function sortImagesByPosition(images: Image[]) {
  return [...images].sort((a, b) => a.position - b.position);
}
