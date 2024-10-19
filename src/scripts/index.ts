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

export const buildHierarchy = (headings: any) => {
  const toc: any[] = [];
  const parentHeadings = new Map();

  if (!headings) return toc;

  headings.forEach((h: any) => {
    const heading = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);
    // Change 2 to 1 if your markdown includes your <h1>
    if (heading.depth === 2) {
      toc.push(heading);
    } else {
      parentHeadings.get(heading.depth - 1).subheadings.push(heading);
    }
  });
  return toc;
};
