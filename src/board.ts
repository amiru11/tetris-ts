import { COLS, ROWS } from './constants';

export class Board {
  grid: number[][];

  // 새 게임이 시작되면 보드를 초기화한다.
  reset(): void {
    this.grid = this.getEmptyBoard();
  }

  // 0으로 채워진 행렬을 얻는다.
  getEmptyBoard(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
}
