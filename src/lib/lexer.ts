const keywords = [
  // C++ keywords
  "int", "float", "double", "char", "void", "bool", "return", "if", "else", "while", "for", "do", "switch", "case", "break", "continue", "class", "struct", "public", "private", "protected", "static", "const", "volatile", "extern", "inline", "virtual", "friend", "operator", "template", "typename", "namespace", "using", "typedef", "enum", "union", "auto", "decltype", "nullptr", "true", "false",
  // Python keywords
  "def", "class", "if", "else", "elif", "while", "for", "in", "try", "except", "finally", "with", "as", "import", "from", "return", "break", "continue", "pass", "raise", "yield", "lambda", "and", "or", "not", "is", "None", "True", "False",
  // JavaScript keywords
  "let", "const", "var", "function", "return", "if", "else", "while", "for", "do", "switch", "case", "break", "continue", "try", "catch", "finally", "throw", "class", "extends", "super", "this", "new", "delete", "typeof", "instanceof", "void", "null", "undefined", "true", "false", "async", "await", "yield", "of", "in"
];

const operators = [
  // Arithmetic
  "+", "-", "*", "/", "%", "**", "++", "--",
  // Assignment
  "=", "+=", "-=", "*=", "/=", "%=", "**=", "<<=", ">>=", "&=", "^=", "|=",
  // Comparison
  "==", "!=", "===", "!==", "<", ">", "<=", ">=",
  // Logical
  "&&", "||", "!", "and", "or", "not",
  // Bitwise
  "&", "|", "^", "~", "<<", ">>",
  // Other
  "?", ":", "->", "=>", "::", "."
];

const separators = [
  ";", ",", "(", ")", "{", "}", "[", "]", ":", "::", "->", "=>", "`", "@"
];

export function tokenize(code: string) {
  const tokens = [];
  let currentIndex = 0;

  while (currentIndex < code.length) {
    // Skip whitespace
    if (/\s/.test(code[currentIndex])) {
      currentIndex++;
      continue;
    }

    // Handle comments
    if (code[currentIndex] === '/' && code[currentIndex + 1] === '/') {
      // Single-line comment
      let comment = '';
      while (currentIndex < code.length && code[currentIndex] !== '\n') {
        comment += code[currentIndex];
        currentIndex++;
      }
      tokens.push({ type: "Comment", value: comment });
      continue;
    }

    if (code[currentIndex] === '/' && code[currentIndex + 1] === '*') {
      // Multi-line comment
      let comment = '';
      while (currentIndex < code.length && !(code[currentIndex] === '*' && code[currentIndex + 1] === '/')) {
        comment += code[currentIndex];
        currentIndex++;
      }
      if (currentIndex < code.length) {
        comment += '*/';
        currentIndex += 2;
      }
      tokens.push({ type: "Comment", value: comment });
      continue;
    }

    // Handle string literals
    if (code[currentIndex] === '"' || code[currentIndex] === "'" || code[currentIndex] === '`') {
      const quote = code[currentIndex];
      let string = quote;
      currentIndex++;
      
      while (currentIndex < code.length && code[currentIndex] !== quote) {
        if (code[currentIndex] === '\\') {
          string += code[currentIndex];
          currentIndex++;
          if (currentIndex < code.length) {
            string += code[currentIndex];
            currentIndex++;
          }
        } else {
          string += code[currentIndex];
          currentIndex++;
        }
      }
      
      if (currentIndex < code.length) {
        string += quote;
        currentIndex++;
      }
      
      tokens.push({ type: "String", value: string });
      continue;
    }

    // Handle numbers
    if (/[0-9]/.test(code[currentIndex])) {
      let number = '';
      let hasDecimal = false;
      
      while (currentIndex < code.length && (/[0-9]/.test(code[currentIndex]) || code[currentIndex] === '.')) {
        if (code[currentIndex] === '.') {
          if (hasDecimal) break;
          hasDecimal = true;
        }
        number += code[currentIndex];
        currentIndex++;
      }
      
      tokens.push({ type: "Number", value: number });
      continue;
    }

    // Handle operators and separators
    let found = false;
    for (const op of [...operators, ...separators].sort((a, b) => b.length - a.length)) {
      if (code.substring(currentIndex, currentIndex + op.length) === op) {
        tokens.push({ type: operators.includes(op) ? "Operator" : "Separator", value: op });
        currentIndex += op.length;
        found = true;
        break;
      }
    }
    if (found) continue;

    // Handle identifiers and keywords
    if (/[a-zA-Z_]/.test(code[currentIndex])) {
      let identifier = '';
      while (currentIndex < code.length && /[a-zA-Z0-9_]/.test(code[currentIndex])) {
        identifier += code[currentIndex];
        currentIndex++;
      }
      
      if (keywords.includes(identifier)) {
        tokens.push({ type: "Keyword", value: identifier });
      } else {
        tokens.push({ type: "Identifier", value: identifier });
      }
      continue;
    }

    // Handle unknown characters
    tokens.push({ type: "Unknown", value: code[currentIndex] });
    currentIndex++;
  }

  return tokens;
}
