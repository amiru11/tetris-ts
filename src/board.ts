import { BLOCK_SIZE, COLS, ROWS } from './constants';
import { Piece } from './piece';

export class Board {
  grid: number[][];
  piece: Piece;
  ctx: CanvasRenderingContext2D;

  constructor(ctx) {
    this.ctx = ctx;
    this.init();
  }

  init() {
    // Calculate size of canvas from constants.
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;

    // Scale so we don't need to give size on every draw.
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  // 새 게임이 시작되면 보드를 초기화한다.
  reset(): void {
    this.grid = this.getEmptyBoard();
    this.piece = new Piece(this.ctx);
    this.piece.draw();
  }

  // 0으로 채워진 행렬을 얻는다.
  getEmptyBoard(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  isInsideWalls(x, y) {
    return x >= 0 && x < COLS && y <= ROWS;
  }

  notOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }

  valid(piece: Piece): boolean {
    return piece.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = piece.x + dx;
        let y = piece.y + dy;
        return value === 0 || (this.isInsideWalls(x, y) && this.notOccupied(x, y));
      });
    });
  }

  rotate(piece: Piece): Piece {
    let clone = JSON.parse(JSON.stringify(piece));
    // swap the symmetric elements
    for (let y = 0; y < clone.shape.length; y++) {
      for (let x = 0; x < y; ++x) {
        const temp = clone.shape[y][x];
        clone.shape[y][x] = clone.shape[x][y];
        clone.shape[x][y] = temp;
      }
    }
    clone.shape.forEach((row) => row.reverse());
    return clone;
  }
}
