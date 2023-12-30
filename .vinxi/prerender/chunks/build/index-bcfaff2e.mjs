import { createContext, createUniqueId, useContext, createRenderEffect, onCleanup } from 'file:///Users/andrei/Projects/tic-tac/node_modules/solid-js/dist/server.js';

const MetaContext = createContext();
const MetaTag = (tag, props, setting) => {
  useHead({
    tag,
    props,
    setting,
    id: createUniqueId(),
    get name() {
      return props.name || props.property;
    }
  });
  return null;
};
function useHead(tagDesc) {
  const c = useContext(MetaContext);
  if (!c)
    throw new Error("<MetaProvider /> should be in the tree");
  createRenderEffect(() => {
    const index = c.addTag(tagDesc);
    onCleanup(() => c.removeTag(tagDesc, index));
  });
}
const Title = (props) => MetaTag("title", props, {
  escape: true,
  close: true
});

export { Title as T };
//# sourceMappingURL=index-bcfaff2e.mjs.map
