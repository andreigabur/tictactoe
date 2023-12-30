import { Title } from "@solidjs/meta";
import TicTacV2 from "~/components/TicTacV2";

export default function Home() {
  return (
    <main>
      <Title>Tic Tac Toe</Title>
      <h1>Tic Tac Toe</h1>
      <TicTacV2 />
      <p>
        Made with{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
      </p>
    </main>
  );
}
