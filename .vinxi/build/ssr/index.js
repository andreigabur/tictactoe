import { ssr, ssrHydrationKey, ssrAttribute, escape, createComponent } from "solid-js/web";
import { T as Title } from "./assets/index-bcfaff2e.js";
import { createSignal } from "solid-js";
const TicTac = "";
const _tmpl$$1 = ["<button", ' class="square">', "</button>"], _tmpl$2 = ["<div", ' class="board-row">', "</div>"], _tmpl$3 = ["<div", ' class="game"><div class="game-settings"><h3>Game Settings</h3><div class="setting"><label for="board-size">Board size:</label><input type="number" id="board-size" min="3" max="10"', '></div><div class="setting"><label for="symbols-to-win">Symbols to win:</label><input type="number" id="symbols-to-win" min="3"', `></div><div class="woke-setting"><input type="checkbox" id="go-woke" name="go-woke"><label for="go-woke">Let's go woke!</label></div><!--$-->`, '<!--/--><button>Reset</button></div><div class="game-board"><h3>Game Board</h3><!--$-->', '<!--/--></div><div class="game-info"><p>', "</p><p>", "</p></div></div>"], _tmpl$4 = ["<div", ' class="woke"><p>You turned on the self-identification gender mode.<br>No more X and O, you get to chose your pronouns!</p><div class="woke-player"><label for="1-pronoun">Pronoun for Player 1:</label><input id="1-pronoun"></div><div class="woke-player"><label for="2-pronoun">Pronoun for Player 2:</label><input id="2-pronoun"></div></div>'];
function TicTacV2() {
  const [board, setBoard] = createSignal(new Array(3).fill(new Array(3).fill(0)));
  const [xIsNext, setXIsNext] = createSignal(true);
  const [winner, setWinner] = createSignal(0);
  const [size, setSize] = createSignal(3);
  const [toWin, setToWin] = createSignal(3);
  const [isWoke, setIsWoke] = createSignal(false);
  const [timeToExecute, setTimeToExecute] = createSignal(0);
  const [symbols, setSymbols] = createSignal(["", "X", "O"]);
  function generateBoard(size2) {
    const rows = [];
    for (let i = 0; i < size2; i++) {
      const row = [];
      for (let j = 0; j < size2; j++) {
        row.push(ssr(_tmpl$$1, ssrHydrationKey(), board()[i] && board()[i][j] ? escape(symbols()[board()[i][j]]) : ""));
      }
      rows.push(ssr(_tmpl$2, ssrHydrationKey(), escape(row)));
    }
    return rows;
  }
  return ssr(_tmpl$3, ssrHydrationKey(), ssrAttribute("value", escape(size(), true), false), ssrAttribute("max", escape(size(), true), false) + ssrAttribute("value", escape(toWin(), true), false), isWoke() && _tmpl$4[0] + ssrHydrationKey() + _tmpl$4[1], escape(generateBoard(size())), winner() ? `Congrats, the winner is: ${escape(symbols()[winner()])}` : `Next player: ${xIsNext() ? escape(symbols()[1]) : escape(symbols()[2])}`, `It took ${escape(timeToExecute())} ms for the algo to check`);
}
const _tmpl$ = ["<main", "><!--$-->", "<!--/--><h1>Tic Tac Toe</h1><!--$-->", '<!--/--><p>Made with <a href="https://start.solidjs.com" target="_blank">start.solidjs.com</a> </p></main>'];
function Home() {
  return ssr(_tmpl$, ssrHydrationKey(), escape(createComponent(Title, {
    children: "Tic Tac Toe"
  })), escape(createComponent(TicTacV2, {})));
}
export {
  Home as default
};
