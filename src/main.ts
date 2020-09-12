import { COLS, ROWS, BLOCK_SIZE, KEY_CODES } from './constants';
import { Board } from './board';
import { Piece, IPiece } from './piece';

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
  [KEY_CODES.SPACE]: (piece: IPiece) => ({ ...piece, y: piece.y + 1 }),
  [KEY_CODES.UP]: (piece: IPiece) => board.rotate(piece),
  [KEY_CODES.LEFT]: (piece: IPiece) => ({ ...piece, x: piece.x - 1 }),
  [KEY_CODES.RIGHT]: (piece: IPiece) => ({ ...piece, x: piece.x + 1 }),
  [KEY_CODES.DOWN]: (piece: IPiece) => ({ ...piece, y: piece.y + 1 }),
};

let board = new Board();

function play(): void {
  board.reset();
  let piece = new Piece(ctx);
  piece.draw();

  board.piece = piece;
}

function movePiece(piece: Piece): void {
  // 이동이 가능한 상태라면 조각을 이동한다.
  board.piece.move(piece);

  // 그리기 전에 이전 좌표를 지운다.
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  board.piece.draw();
  console.table(board.grid);
}

/**
 * EventListner
 */
playButton.addEventListener('click', play);

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (moves[event.keyCode]) {
    // 이벤트 버블링을 막는다.
    event.preventDefault();

    // 조각의 새 상태를 얻는다.
    let piece: Piece = moves[event.keyCode](board.piece);

    if (event.keyCode === KEY_CODES.SPACE) {
      // 하드 드롭한다.
      while (board.valid(piece)) {
        movePiece(piece);
        piece = moves[KEY_CODES.DOWN](board.piece);
      }
    } else {
      if (board.valid(piece)) {
        movePiece(piece);
      }
    }
  }
});
