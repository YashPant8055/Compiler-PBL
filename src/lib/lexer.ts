const keywords = ["int", "float", "return", "if", "else", "while"];
const operators = ["+", "-", "*", "/", "=", "==", "<", ">", "!="];
const separators = [";", ",", "(", ")", "{", "}"];

export function tokenize(code: string) {
  const tokens = [];
  const words = code.split(/\s+/);

  for (const word of words) {
    if (!word.trim()) continue;

    if (keywords.includes(word)) {
      tokens.push({ type: "Keyword", value: word });
    } else if (operators.includes(word)) {
      tokens.push({ type: "Operator", value: word });
    } else if (separators.includes(word)) {
      tokens.push({ type: "Separator", value: word });
    } else if (!isNaN(Number(word))) {
      tokens.push({ type: "Number", value: word });
    } else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(word)) {
      tokens.push({ type: "Identifier", value: word });
    } else {
      tokens.push({ type: "Unknown", value: word });
    }
  }

  return tokens;
}
