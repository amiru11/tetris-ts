export class Piece {
  x: number;
  y: number;
  color: string;
  shape: number[][];
  ctx: CanvasRenderingContext2D;

  constructor(ctx) {
    this.ctx = ctx;
    this.spawn();
  }

  // Create Piece Object
  spawn() {
    this.color = 'blue';
    this.shape = [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ];

    // Starting position.
    this.x = 3;
    this.y = 0;
  }

  // Draw piece in the board!
  draw() {
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
  move(p) {
    this.x = p.x;
    this.y = p.y;
  }
}
