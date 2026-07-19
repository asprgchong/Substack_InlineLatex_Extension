(function () {
  const el = document.querySelector('.ProseMirror');
  const editor = el && el.editor;
  if (!editor) return;
  if (el.dataset.latexHooked) return;
  el.dataset.latexHooked = "1";

  el.addEventListener('keydown', function (e) {
    if (e.key !== '$') return;

    const { state } = editor.view;
    const { $from } = state.selection;
    const textBefore = $from.parent.textBetween(
      0, $from.parentOffset, undefined, '\ufffc'
    );

    const open = textBefore.lastIndexOf('$');
    if (open === -1) return;
    if (textBefore[open + 1] === ' ') return;
    const latex = textBefore.slice(open + 1);
    if (latex.length === 0) return;

    e.preventDefault();

    const from = $from.pos - (textBefore.length - open);
    const to = $from.pos;

    editor.chain().focus()
      .deleteRange({ from, to })
      .insertContent({
        type: "inline_latex",
        attrs: { persistentExpression: latex }
      })
      .run();
  });
})();