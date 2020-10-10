import { BLOCK_SIZE, COLS, ROWS, KEY_CODES, COLORS } from './constants';
import { Piece } from './piece';

export class Board {
  grid: number[][];
  piece: Piece;
  nextPiece: Piece;
  ctx: CanvasRenderingContext2D;
  ctxNext: CanvasRenderingContext2D;

  constructor(ctx, ctxNext) {
    this.ctx = ctx;
    this.ctxNext = ctxNext;
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
    this.piece.setStartingPosition();
    this.getNewPiece();
  }

  // 새로운 조각을 캔버스에 그려준다.
  getNewPiece() {
    const { width, height } = this.ctxNext.canvas;
    this.nextPiece = new Piece(this.ctxNext);
    this.ctxNext.clearRect(0, 0, width, height);
    this.nextPiece.draw();
  }

  // 0으로 채워진 행렬을 얻는다.
  getEmptyBoard(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  // 테트리스 판 안에 존재하는지 확인
  isInsideWalls(x, y) {
    return x >= 0 && x < COLS && y <= ROWS;
  }

  notOccupied(x, y) {
    return this.grid[y] && this.grid[y][x] === 0;
  }

  drop(moves: any): boolean {
    let p = moves[KEY_CODES.DOWN](this.piece);
    if (this.valid(p)) {
      // 유효성 검사에 걸리지 않을 때까지 계속 아래로 이동.
      this.piece.move(p);
    } else {
      /**
       * 제일 밑에 도착하면, piece freezing
       * 해당 row가 조각으로 꽉차면 라인 클리어해주기
       * 새로운 piece 나오도록 하기
       */
      this.freeze();
      this.piece = this.nextPiece;
      this.piece.ctx = this.ctx;
      this.piece.setStartingPosition();
      this.getNewPiece();
    }
    return true;
  }

  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }

  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = COLORS[value - 1];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  draw() {
    this.piece.draw();
    this.drawBoard();
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
