import { colorWheel } from 'src/store';

/**
 * Function that returns class names for colors
 *
 */

export const colorClassCalc = (index: number) => {
  return {
    class: Object.values(colorWheel)[index % Object.keys(colorWheel).length],
    color:
      Object.keys(colorWheel)[index % Object.keys(colorWheel).length] ==
      'yellow'
        ? 'gold'
        : Object.keys(colorWheel)[index % Object.keys(colorWheel).length],
  };
};
