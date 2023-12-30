import { ssr, ssrHydrationKey, escape, createComponent, isServer, getRequestEvent } from 'file:///Users/andrei/Projects/tic-tac/node_modules/solid-js/web/dist/server.js';
import { T as Title } from './index-bcfaff2e.mjs';
import { onCleanup } from 'file:///Users/andrei/Projects/tic-tac/node_modules/solid-js/dist/server.js';

function HttpStatusCode(props) {
  if (isServer) {
    const event = getRequestEvent();
    if (event)
      onCleanup(event.components.status(props));
  }
  return null;
}
const _tmpl$ = ["<main", "><!--$-->", "<!--/--><!--$-->", "<!--/--><h1>Page Not Found</h1></main>"];
function NotFound() {
  return ssr(_tmpl$, ssrHydrationKey(), escape(createComponent(Title, {
    children: "Not Found"
  })), escape(createComponent(HttpStatusCode, {
    code: 404
  })));
}

export { NotFound as default };
//# sourceMappingURL=_...404_.mjs.map
