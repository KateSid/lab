import { Cell } from './Cell';

export class Labyrinth {
  width: number;
  height: number;
  pattern: number[][];
  theme = 0;
  start: Cell;
  stop: Cell;
}
