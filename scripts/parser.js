const editor = document.getElementById("editor");
var isEditing = false

function parseMarkdown(text) {
    console.log("from markdown to html")
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

function parseHTML(html) {
    html = html.replace(/<h([1-6])>(.*?)<\/h\1>/g, (match, level, content) => {
        return "#".repeat(level) + " " + content;
    });
    
    html = html.replace(/<ul>\s*(<li>.*?<\/li>)\s*<\/ul>/gs, (match, items) => {
        return items.replace(/<li>(.*?)<\/li>/g, "* $1");
    });
    
    html = html.replace(/<b>(.*?)<\/b>/g, "**$1**"); // Convert bold
    html = html.replace(/<i>(.*?)<\/i>/g, "*$1*"); // Convert italic
    html = html.replace(/<code>(.*?)<\/code>/g, "`$1`"); // Convert inline code
    
    return html;
}



document.getElementById("editor").addEventListener("mouseup", () => {
    const rawText = editor.innerText;
    if (isEditing) {
        isEditing = false
        editor.innerHTML = parseMarkdown(rawText);
    }
    else {
        isEditing = true
        editor.innerHTML = parseHTML(rawText);
    }
});

editor.innerHTML = parseMarkdown("# New note\nStart typing...");
