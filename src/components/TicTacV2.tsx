

import { createSignal } from 'solid-js';

import "./TicTacV2.css";
import { BoardV2 } from '~/types/types';
import Check from '~/utils/checkWinner';
import CheckWinner from '~/utils/checkWinner';
import { Switch, Button, TextField, Card, CardContent, Divider } from '@suid/material';

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

    function handlePronounChange(event: any, player: number) {
        const value = event.currentTarget.value;
        if (value.length > 3) {
            alert('Is cool to be woke, but no more than 3 characters woke!\nOtherwise the pronoun can to be taken as a name :(')
            event.currentTarget.value = '';
        }
        const newSymbols = symbols();
        newSymbols[player] = value;
        if (newSymbols[1] == newSymbols[2]) {
            alert('You can not have the same pronouns, we need Diversity!\nPlease chose another race to play.');
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
                    <Button variant="outlined" onClick={() => handleClick(i, j)}>
                        {(board()[i] && board()[i][j]) ?
                            symbols()[board()[i][j]] :
                            ''
                        }
                    </Button>
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
                    <Switch id="go-woke" onChange={(e) => setIsWoke(e.target.checked)} />
                    <label for="go-woke">Let's go woke!</label>
                </div>
                {isWoke() &&
                    <div class="woke">
                        <Card variant="outlined">
                            <CardContent>
                                <p>You turned on the self-identification gender mode.<br />
                                    No more X and O, you get to chose your pronouns!</p>
                                <div class="woke-player">
                                    {/* <label for="1-pronoun">Pronoun for Player 1:</label> */}
                                    <TextField
                                        id="1-pronoun"
                                        label="Pronoun for Player 1"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="filled"
                                        onChange={e => handlePronounChange(e, 1)}
                                    />

                                </div>
                                <div class="woke-player">
                                    {/* <label for="2-pronoun">Pronoun for Player 2:</label> */}
                                    <TextField
                                        id="2-pronoun"
                                        label="Pronoun for Player 2"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="filled"
                                        onChange={e => handlePronounChange(e, 2)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                }
                <Button variant="contained" onClick={handleReset}>Reset</Button>
            </div>
            <Divider />
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
                <Divider />
                <p>
                    {`It took ${timeToExecute()} ms for the algo to check`}
                </p>
            </div>
        </div>
    );
}

export default TicTacV2;
