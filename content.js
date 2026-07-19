function injectLatexHandler() {
  const el = document.querySelector('.ProseMirror');
  if (!el || el.dataset.latexHooked) return;

  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('injected.js');
  script.onload = () => script.remove();
  document.documentElement.appendChild(script);
}

function waitForEditor() {
  if (document.querySelector('.ProseMirror')) injectLatexHandler();
  const observer = new MutationObserver(() => {
    if (document.querySelector('.ProseMirror')) injectLatexHandler();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

waitForEditor();