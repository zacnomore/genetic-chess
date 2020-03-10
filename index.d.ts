import { ChessInstance } from "chess.js";

declare module "chess.js" {

  export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';

  export interface ChessInstance {
    board(): Array<Array<{ type: PieceType; color: 'w' | 'b' } | null>>;
  }
}
