/* eslint-disable */

//6 - A lot of comments
//Large class
export class Game {
  private _lastSymbol = ' ';
  private _board: Board = new Board();

  //5 - Long method
  //1 - Primitive obsession
  // Data clump - x and y are always together but not encapsulated in a class
  //Long parameter list
  //Shotgun surgery "-"" in symbol string since cannot be changed because its not encapsulated
  public Play(symbol: string, x: number, y: number): void {
    //if first move
    //Magic string
    //Anidación de dos niveles
    // EXTRA - Switch statement
    if (this._lastSymbol == ' ') {
      //if player is X
      if (symbol == 'O') {
        throw new Error('Invalid first player');
      }
    }
    //if not first move but player repeated
    else if (symbol == this._lastSymbol) {
      throw new Error('Invalid next player');
    }
    //if not first move but play on an already played tile
    //8 - Possible shotgun surgery over the != ' ' condition
    //Message chain
    //Inappropriate intimacys
    else if (this._board.TileAt(x, y).Symbol != ' ') {
      throw new Error('Invalid position');
    }

    // update game state
    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  //5 - Long method
  //Feature envy - The method is more interested in the data of the board than in its own data
  public Winner(): string {
    //if the positions in first row are taken
    //9- Duplicate code
    //Innappropriate intimacy
    if (
      //This tileAt is played
      this._board.TileAt(0, 0)!.Symbol != ' ' &&
      this._board.TileAt(0, 1)!.Symbol != ' ' &&
      this._board.TileAt(0, 2)!.Symbol != ' '
    ) {
      //if first row is full with same symbol
      if (
        //9-Duplicate code
        //Message chain (Law of Demeter)
        this._board.TileAt(0, 0)!.Symbol == this._board.TileAt(0, 1)!.Symbol &&
        this._board.TileAt(0, 2)!.Symbol == this._board.TileAt(0, 1)!.Symbol
      ) {
        return this._board.TileAt(0, 0)!.Symbol;
      }
    }

    //if the positions in first row are taken
    if (
      this._board.TileAt(1, 0)!.Symbol != ' ' &&
      this._board.TileAt(1, 1)!.Symbol != ' ' &&
      this._board.TileAt(1, 2)!.Symbol != ' '
    ) {
      //if middle row is full with same symbol
      if (
        this._board.TileAt(1, 0)!.Symbol == this._board.TileAt(1, 1)!.Symbol &&
        this._board.TileAt(1, 2)!.Symbol == this._board.TileAt(1, 1)!.Symbol
      ) {
        return this._board.TileAt(1, 0)!.Symbol;
      }
    }

    //if the positions in first row are taken
    //4 - Message chain (Law of Demeter)
    if (
      this._board.TileAt(2, 0)!.Symbol != ' ' &&
      this._board.TileAt(2, 1)!.Symbol != ' ' &&
      this._board.TileAt(2, 2)!.Symbol != ' '
    ) {
      //if middle row is full with same symbol
      if (
        this._board.TileAt(2, 0)!.Symbol == this._board.TileAt(2, 1)!.Symbol &&
        this._board.TileAt(2, 2)!.Symbol == this._board.TileAt(2, 1)!.Symbol
      ) {
        return this._board.TileAt(2, 0)!.Symbol;
      }
    }

    return ' ';
  }
}

//2 - Data class
//13 - Lazy class - clase que debería tener comportamiento
interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  //Descriptives names
  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: ' ' };
        this._plays.push(tile);
      }
    }
  }

  //Data clump x and y
  //Long parameter list because x and y are not encapsulated in a class
  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  //Data clump x and y
  //Long parameter list because x and y are not encapsulated in a class
  public AddTileAt(symbol: string, x: number, y: number): void {
    //@ts-ignore
    // Dead code
    const tile: Tile = { X: x, Y: y, Symbol: symbol };

    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
