// https://svelte.dev/repl/acd92c9726634ec7b3d8f5f759824d15?version=4.2.2
import { browser } from "$app/environment";

export function shortcut(node, params) {
  if (!browser) return

  let handler;

  function setHandler() {
    removeHandler();

    if (!params) return;

    handler = (e) => {
      if ((!!params.alt != e.altKey) ||
        (!!params.shift != e.shiftKey) ||
        (!!params.control != (e.ctrlKey || e.metaKey)) ||
        params.code != e.code)
        return;
      e.preventDefault();
      params.callback ? params.callback() : node.click();
    };

    window.addEventListener('keydown', handler);
  }

  function removeHandler() {
    return window.removeEventListener('keydown', handler);
  }

  setHandler();

  return {
    update: setHandler,
    destroy: removeHandler,
  };
}
