import { getListener } from "solid-js";
import { BoardV2 } from "~/types/types";

function CheckWinner(board: BoardV2, toWin: number) {

    let player = 0;
    let size = board.length;

    // Recursive function to calculate the lenth of a line.
    // The direction is a number, with the following constrain:
    // 1   2   3
    // 4   X   6
    // 7   8   9
    function recursiveCheck(point: { i: number, j: number }, direction: number): number {
        // check if the point is still on board
        if (point.i < 0 || point.i >= size ||
            point.j < 0 || point.j >= size) {
            return 0;
        }

        // set the next point based on direction
        let nextPoint = {i:0, j:0}
        switch (direction) {
            case 1: {
                nextPoint = { i: point.i - 1, j: point.j - 1 }
                break;
            }
            case 2: {
                nextPoint = { i: point.i-1, j: point.j }
                break;
            }
            case 3: {
                nextPoint = { i: point.i + 1, j: point.j - 1 }
                break;
            }
            case 4: {
                nextPoint = { i: point.i, j: point.j - 1 }
                break;
            }
            case 6: {
                nextPoint = { i: point.i, j: point.j + 1 }
                break;
            }
            case 7: {
                nextPoint = { i: point.i + 1, j: point.j - 1 }
                break;
            }
            case 8: {
                nextPoint = { i: point.i + 1, j: point.j }
                break;
            }
            case 9: {
                nextPoint = { i: point.i + 1, j: point.j + 1 }
                break;
            }
        }
        // if symbol matches add 1 to the line and go do the new point
        if (board[point.i][point.j] == player) {
            return 1 + recursiveCheck(nextPoint, direction);
        }

        return 0
    }

    return function check(point: { i: number, j: number }): {player: number, timeToExecute: number}{

        const t1 = performance.now();

        player = board[point.i][point.j]

        let dimension = 0;

        // check horizontal
        dimension = -1 + recursiveCheck(point, 4) + recursiveCheck(point, 6);
        if (dimension >= toWin) {
            const t2 = performance.now();
            return {player, timeToExecute: t2-t1}
        }

        // check vertically
        dimension = -1 + recursiveCheck(point, 2) + recursiveCheck(point, 8);
        if (dimension >= toWin) {
            const t2 = performance.now();
            return {player, timeToExecute: t2-t1}
        }

        // check diagonal 1
        dimension = -1 + recursiveCheck(point, 1) + recursiveCheck(point, 9);
        if (dimension >= toWin) {
            const t2 = performance.now();
            return {player, timeToExecute: t2-t1}
        }

        // check diagonal 2 
        dimension = -1 + recursiveCheck(point, 3) + recursiveCheck(point, 7);
        if (dimension >= toWin) {
            const t2 = performance.now();
            return {player, timeToExecute: t2-t1}
        }

        // here nobody won yet
        const t2 = performance.now();
        return {player: 0, timeToExecute: t2-t1}
    }
}

export default CheckWinner;
