import { isServer, getRequestEvent, ssr, ssrHydrationKey, escape, createComponent } from "solid-js/web";
import { T as Title } from "./assets/index-bcfaff2e.js";
import "./assets/routes-48694842.js";
import { onCleanup } from "solid-js";
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
export {
  NotFound as default
};
