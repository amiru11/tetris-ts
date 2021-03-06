import { SHAPES, COLORS } from './constants';
export interface IPiece {
  x: number;
  y: number;
  color: string;
  shape: number[][];
  typeId: number;
  ctx: CanvasRenderingContext2D;
  spawn: () => void;
  draw: () => void;
  move: (piece: any) => void;
  randomrizeType: (typeLength: number) => number;
  setStartingPosition: () => void;
}

export class Piece implements IPiece {
  public x: number;
  public y: number;
  public color: string;
  public shape: number[][];
  public ctx: CanvasRenderingContext2D;
  public typeId: number;

  constructor(ctx) {
    this.ctx = ctx;
    this.spawn();
  }

  // Create Piece Object
  spawn(): void {
    this.typeId = this.randomrizeType(COLORS.length - 1);
    this.shape = SHAPES[this.typeId];
    this.color = COLORS[this.typeId];

    // Starting position.
    this.x = 0;
    this.y = 0;
  }

  // Draw piece in the board!
  public draw(): void {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        // this.x, this.y는 shape의 상단 왼쪽 좌표이다
        // shape 안에 있는 블록 좌표에 x, y를 더한다.
        // 보드에서 블록의 좌표는 this.x + x가 된다.
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  // Move piece in the board!
  public move(p: Piece): void {
    this.x = p.x;
    this.y = p.y;
    this.shape = p.shape;
  }

  public randomrizeType(typeLength: number): number {
    return Math.floor(Math.random() * typeLength);
  }

  public setStartingPosition() {
    this.x = this.typeId === 4 ? 4 : 3;
  }
}
