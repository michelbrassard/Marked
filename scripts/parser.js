const editor = document.getElementById("editor");

function parseMarkdown(text) {
    text = text.replace(/^(#{1,6})\s+(.*)$/gm, (match, hashes, content) => {
        let level = hashes.length;
        return `<h${level}>${content}</h${level}>`;
    });
    text = text.replace(/^\* (.*$)/gm, "<ul><li>$1</li></ul>"); // * List Item
    text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");     // **Bold**
    text = text.replace(/\*(.*?)\*/g, "<i>$1</i>");         // *Italic*
    text = text.replace(/`(.*?)`/g, "<code>$1</code>");     // `inline code`
    return text;
}

function parseHTML(text) {
    //parse html to .md
    return text
}

editor.addEventListener("input", () => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const caretOffset = range.startOffset;

    const rawText = editor.innerText;
    editor.innerHTML = parseMarkdown(rawText);

    // Restore cursor position
    const newRange = document.createRange();
    newRange.setStart(editor.childNodes[0] || editor, caretOffset);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
});

document.getElementById("editor").addEventListener("selectstart", () => {
    console.log("Select start");
});

document.getElementById("editor").addEventListener("mouseup", () => {
    console.log("Mouse up!");
});

editor.innerHTML = parseMarkdown("# New note\nStart typing...");
