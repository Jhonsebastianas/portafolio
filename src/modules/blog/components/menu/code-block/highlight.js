const highlight = (code, language) => {
    const patterns = {
      js: {
        keywords: /\b(abstract|arguments|await|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var|void|volatile|while|with|yield)\b/g,
        numbers: /\b(\d+)\b/g,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
        variables: /\b[A-Za-z_]\w*\b/g
      },
      java: {
        keywords: /\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|false|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|null|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|true|try|void|volatile|while)\b/g,
        numbers: /\b(\d+)\b/g,
        strings: /(["'])(?:(?=(\\?))\2.)*?\1/g,
        comments: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
        variables: /\b[A-Za-z_]\w*\b/g
      },
      json: {
        keys: /\"(\w+)\":/g,
        values: /: (\".*?\"|\d+)/g,
        punctuation: /([{}[\],])/g,
        strings: /"(.*?)"/g,
        numbers: /\b(\d+)\b/g
      }
    };
  
    const applyPattern = (text, pattern, className) => {
      return text.replace(pattern, (match, group1) => `<span class="${className}">${group1 || match}</span>`);
    };
  
    let result = code;
    const languagePatterns = patterns[language];
  
    if (languagePatterns) {
      for (const [className, pattern] of Object.entries(languagePatterns)) {
        result = applyPattern(result, pattern, className);
      }
    }
  
    return result;
  };
  
  export default highlight;
  