function parseRichText(html: string) {
  const parsedElements = [];
  let currentText = "";

  // Flags to keep track of formatting
  let isBold = false;
  const isItalic = false;
  const isUnderline = false;
  const isOverline = false;

  for (let i = 0; i < html.length; i++) {
    if (html[i] === "<") {
      // Encountered a tag start
      if (currentText) {
        parsedElements.push({
          type: "text",
          text: currentText,
          isBold,
          isItalic,
          isUnderline,
          isOverline,
        });
        currentText = "";
      }
      const tagEnd = html.indexOf(">", i);
      const tag = html.substring(i + 1, tagEnd).toLowerCase();
      i = tagEnd; // Skip to the end of the tag

      switch (tag) {
        case "ul":
        case "ol":
          parsedElements.push({ type: tag });
          break;
        case "li":
          parsedElements.push({ type: "listItem" });
          break;
        case "strong":
          isBold = true;
          break;
        case "/strong":
          isBold = false;
          break;
        // ... Similar cases for em, u, overline, a
        default:
        // Ignore unsupported tags for now
      }
    } else if (html[i] !== "\n") {
      // <--- Change here
      currentText += html[i];
    }
  }

  // Add any remaining text
  if (currentText) {
    parsedElements.push({
      type: "text",
      text: currentText,
      isBold,
      isItalic,
      isUnderline,
      isOverline,
    });
  }

  return parsedElements;
}

export default parseRichText;
