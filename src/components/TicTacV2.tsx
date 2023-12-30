

import { createSignal } from 'solid-js';

import "./TicTac.css";
import { BoardV2 } from '~/types/types';
import Check from '~/utils/checkWinner';
import CheckWinner from '~/utils/checkWinner';

function TicTacV2() {

    const [board, setBoard] = createSignal<BoardV2>(new Array(3).fill(new Array(3).fill(0)));
    const [xIsNext, setXIsNext] = createSignal<boolean>(true);
    const [winner, setWinner] = createSignal<number>(0);
    const [size, setSize] = createSignal(3);
    const [toWin, setToWin] = createSignal(3);
    const [isWoke, setIsWoke] = createSignal<boolean>(false);
    const [timeToExecute, setTimeToExecute] = createSignal<number>(0);
    const [symbols, setSymbols] = createSignal<(string | null)[]>(['', 'X', 'O']);

    function handleClick(i: number, j: number) {
        if (winner() || board()[i] && board()[i][j]) {
            return;
        }
        const newBoard = [...board()];
        if (!newBoard[i]) {
            newBoard[i] = new Array(size()).fill(0);
        }
        newBoard[i] = [...newBoard[i]];
        newBoard[i][j] = xIsNext() ? 1 : 2;

        setBoard(newBoard);

        const checkWinner = CheckWinner(newBoard, toWin())({ i, j });
        if (checkWinner.player) {
            setWinner(checkWinner.player);
        } else {
            setXIsNext(!xIsNext());
        }
        setTimeToExecute(checkWinner.timeToExecute);
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
        setBoard(new Array(size()).fill(new Array(size()).fill(0)));
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

    function generateBoard(size: number) {
        const rows = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(
                    <button class="square" onClick={() => handleClick(i, j)}>
                        {(board()[i] && board()[i][j]) ?
                            symbols()[board()[i][j]] :
                            ''
                        }
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
                <p>
                    {(winner())
                        ? `Congrats, the winner is: ${symbols()[winner()]}`
                        : `Next player: ${xIsNext() ? symbols()[1] : symbols()[2]}`
                    }
                </p>
                <p>
                    {`It took ${timeToExecute()} ms for the algo to check`}
                </p>
            </div>
        </div>
    );
}

export default TicTacV2;
