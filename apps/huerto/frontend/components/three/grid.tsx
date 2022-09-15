import { FC } from 'react';
import { Vector3 } from 'three';

import { Box } from './box';

export type GridProps = {
  size?: number;
  unit?: number;
  as?: GridElement;
};
export type GridElement = FC<GridElementProps>;
export type GridElementProps = {
  position?: number[];
  translate?: [number, number, number];
};

export const Grid: FC<GridProps> = ({
  size: length = 4,
  unit = 1,
  as: Element = Box,
  ...props
}) => {
  const list = Array.from({ length }).flatMap((_, x) =>
    Array.from({ length }).map((_, y) => {
      return [x, y];
    }),
  );
  const offset = ((length - 1) / 2) * unit;

  return (
    // does not come with group context baked in
    <>
      {list.map(([x, y], i) => (
        <Element
          key={[x, y, i].join()}
          position={[x, y, 0]}
          translate={[-offset, -offset, 0]}
        />
      ))}
    </>
  );
};
