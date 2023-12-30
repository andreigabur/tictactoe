import { ssr, ssrHydrationKey, escape, createComponent } from 'file:///Users/andrei/Projects/tic-tac/node_modules/solid-js/web/dist/server.js';
import { T as Title } from './index-bcfaff2e.mjs';
import 'file:///Users/andrei/Projects/tic-tac/node_modules/solid-js/dist/server.js';

const _tmpl$ = ["<main", "><!--$-->", "<!--/--><h1>About this app</h1><p>Simply the best Tic Tac Toe game ever</p></main>"];
function About() {
  return ssr(_tmpl$, ssrHydrationKey(), escape(createComponent(Title, {
    children: "Tic Tac Toe"
  })));
}

export { About as default };
//# sourceMappingURL=about.mjs.map
