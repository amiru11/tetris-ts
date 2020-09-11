import { COLS, ROWS, BLOCK_SIZE, KEY_CODES } from './constants';
import { Board } from './board';
import { Piece } from './piece';

/**
 * Define DOM Element
 */
const canvas: any = document.getElementById('board');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
const playButton: HTMLButtonElement = document.querySelector('.play-button');

// 상수를 사용해 캔버스의 크기를 계산한다.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
// 블록의 크기를 변경한다.
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

const moves = {
  [KEY_CODES.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY_CODES.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY_CODES.UP]: (p) => ({ ...p, y: p.y + 1 }),
};

let board = new Board();

function play() {
  board.reset();
  console.table(board.grid);
  let piece = new Piece(ctx);
  piece.draw();

  board.piece = piece;
}

/**
 * EventListner
 */
playButton.addEventListener('click', play);

document.addEventListener('keydown', (event) => {
  if (moves[event.keyCode]) {
    // 이벤트 버블링을 막는다.
    event.preventDefault();

    // 조각의 새 상태를 얻는다.
    let p = moves[event.keyCode](board.piece);

    if (board.valid(p)) {
      // 이동이 가능한 상태라면 조각을 이동한다.
      board.piece.move(p);

      // 그리기 전에 이전 좌표를 지운다.
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      board.piece.draw();
    }
  }
});
