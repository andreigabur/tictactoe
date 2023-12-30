import { createSignal } from 'solid-js';

import "./TicTac.css";
import { Board } from '~/types/types';

function TicTac() {
    const [board, setBoard] = createSignal<Board>(Array().fill(null));
    const [xIsNext, setXIsNext] = createSignal<boolean>(true);
    const [winner, setWinner] = createSignal<number>(0);
    const [size, setSize] = createSignal(3);
    const [toWin, setToWin] = createSignal(3);
    const [isWoke, setIsWoke] = createSignal<boolean>(false);

    const [symbols, setSymbols] = createSignal<(string | null)[]>(['', 'X', 'O']);

    function handleClick(index: number) {
        if (winner() || board()[index]) {
            return;
        }
        const newBoard = board().slice();
        newBoard[index] = xIsNext() ? 1 : 2;
        setBoard(newBoard);
        const checkWinner = calculateWinner(board(), size(), toWin());
        if (checkWinner != null) {
            setWinner(checkWinner);
        } else {
            setXIsNext(!xIsNext());
        }
    }

    function handleSizeChange(event: Event) {
        const newSize = parseInt((event.target as HTMLInputElement).value);
        setSize(newSize);
        handleReset();
    }

    function handleToWinChange(event: Event) {
        const newToWin = parseInt((event.target as HTMLInputElement).value);
        setToWin(newToWin);
    }

    function handleReset() {
        setBoard(Array().fill(null));
        setWinner(0);
        setXIsNext(true);
    }

    function handlePronounChange(event: Event & { currentTarget: HTMLInputElement }, player: number) {
        const newSymbols = symbols();
        newSymbols[player] = event.currentTarget.value;
        if (newSymbols[1] == newSymbols[2]) {
            alert('You can not have the same pronouns, we need Diversity! Please chose another race to play.');
            event.currentTarget.value = '';
        } else {
            setSymbols(newSymbols);
        }
    }

    function calculateWinner(board: Board, size: number, symbolsToWin: number): 1 | 2 | 0 {
        const lines: number[][] = [];

        // Generate horizontal and vertical winning lines
        for (let i = 0; i < size; i++) {
            const row: number[] = [];
            const col: number[] = [];
            for (let j = 0; j < size; j++) {
                row.push(i * size + j);
                col.push(j * size + i);
            }
            lines.push(row, col);
        }

        // Generate diagonal winning lines
        const diagonal1: number[] = [];
        const diagonal2: number[] = [];
        for (let i = 0; i < size; i++) {
            diagonal1.push(i * size + i);
            diagonal2.push((size - i - 1) * size + i);
        }
        lines.push(diagonal1, diagonal2);

        // Check for a winning line
        for (const line of lines) {
            for (let i = 0; i <= size - symbolsToWin; i++) {
                const players = line.slice(i, i + symbolsToWin).map(index => board[index]);
                if (players.every(player => player === players[0] && player !== null)) {
                    return players[0];
                }
            }
        }
        return 0;
    }

    function generateBoard(size: number) {
        const rows = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const index = i * size + j;
                row.push(
                    <button class="square" onClick={() => handleClick(index)}>
                        {symbols()[board()[index]] || ''}
                    </button>
                );
            }
            rows.push(<div class="board-row">{row}</div>);
        }
        return rows;
    }

    return (
        <div class="game">
            <div class="game-settings">
                <h3>Game Settings</h3>
                <div class="setting">
                    <label for="board-size">Board size:</label>
                    <input
                        type="number"
                        id="board-size"
                        min="3"
                        max="10"
                        value={size()}
                        onChange={handleSizeChange}
                    />
                </div>
                <div class="setting">
                    <label for="symbols-to-win">Symbols to win:</label>
                    <input
                        type="number"
                        id="symbols-to-win"
                        min="3"
                        max={size()}
                        value={toWin()}
                        onChange={handleToWinChange}
                    />
                </div>

                <div class="woke-setting">
                    <input type="checkbox" id="go-woke" name="go-woke" onChange={(e) => setIsWoke(e.target.checked)} />
                    <label for="go-woke">Let's go woke!</label>
                </div>
                {isWoke() &&
                    <div class="woke">
                        <p>You turned on the self-identification gender mode.<br />
                            No more X and O, you get to chose your pronouns!</p>
                        <div class="woke-player">
                            <label for="1-pronoun">Pronoun for Player 1:</label>
                            <input
                                id="1-pronoun"
                                onChange={e => handlePronounChange(e, 1)}
                            />
                        </div>
                        <div class="woke-player">
                            <label for="2-pronoun">Pronoun for Player 2:</label>
                            <input
                                id="2-pronoun"
                                onChange={e => handlePronounChange(e, 2)}
                            />
                        </div>
                    </div>
                }
                <button onClick={handleReset}>Reset</button>
            </div>
            <div class="game-board">
                <h3>Game Board</h3>
                {generateBoard(size())}
            </div>
            <div class="game-info">
                {(winner() > 0)
                    ? `Congrats, the winner is: ${symbols()[winner()]}`
                    : `Next player: ${xIsNext() ? symbols()[1] : symbols()[2]}`
                }
            </div>
        </div>
    );
}

export default TicTac;
