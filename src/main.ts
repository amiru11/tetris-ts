import { COLS, ROWS, BLOCK_SIZE } from './constants';
import { Board } from './board';
import { Piece } from './piece';

const canvas: any = document.getElementById('board');

if (canvas.getContext) {
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

  // 상수를 사용해 캔버스의 크기를 계산한다.
  ctx.canvas.width = COLS * BLOCK_SIZE;
  ctx.canvas.height = ROWS * BLOCK_SIZE;
  // 블록의 크기를 변경한다.
  ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

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
  const playButton: HTMLButtonElement = document.querySelector('.play-button');
  playButton.addEventListener('click', play);
}
