import construct = Reflect.construct;

export class Cell {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }
}

