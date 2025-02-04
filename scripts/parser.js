const editor = document.getElementById("editor");
const doneButton = document.getElementById("done-button");
var isEditing = false

//TODO
// create your own parsers

function parseMarkdownToHTML(text) {
    var html = text
    html = html.replace(/^(#{1,6})\s+(.*)$/gm, (match, hashes, content) => {
        let level = hashes.length;
        return `<h${level}>${content}</h${level}>`;
    });
    html = html.replace(/^\* (.*$)/gm, "<ul><li>$1</li></ul>"); // * List Item
    html = html.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");     // **Bold**
    html = html.replace(/\*(.*?)\*/g, "<i>$1</i>");         // *Italic*
    html = html.replace(/`(.*?)`/g, "<code>$1</code>");     // `inline code`
    return html;
}

function parseHTMLToMarkdown(html) {
    var markdown = html
    markdown = markdown.replace(/<h([1-6])>(.*?)<\/h\1>/g, (match, level, content) => {
        return "#".repeat(level) + " " + content + "";
    });
    
    markdown = markdown.replace(/<ul>\s*(<li>.*?<\/li>)\s*<\/ul>/gs, (match, items) => {
        return items.replace(/<li>(.*?)<\/li>/g, "* $1");
    });
    
    markdown = markdown.replace(/<b>(.*?)<\/b>/g, "**$1**"); // Convert bold
    markdown = markdown.replace(/<i>(.*?)<\/i>/g, "*$1*"); // Convert italic
    markdown = markdown.replace(/<code>(.*?)<\/code>/g, "$1"); // Convert inline code
    markdown = markdown.replace(/<div>(.*?)<\/div>/g, "$1")
    markdown = markdown.replace(/<br>/g, "\n")

    return markdown;
}



document.getElementById("editor").addEventListener("mouseup", () => {
    const rawText = editor.innerHTML;
    if (isEditing) {
        isEditing = false
        editor.innerHTML = parseMarkdownToHTML(rawText);
    }
    else {
        isEditing = true
        editor.innerHTML = parseHTMLToMarkdown(rawText);
    }
});

editor.innerHTML = parseMarkdownToHTML("# Hello");
