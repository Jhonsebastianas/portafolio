import React, { useState } from 'react';
import styled from 'styled-components';
//import highlight from './highlight';
import hljs from 'highlight.js';
import customTheme from '@styles/customTheme';


// Styled component for the main container
const EditorContainer = styled.div`
  background: #17181F;
  border-radius: 5px;
  overflow: hidden;
  font-family: 'Courier New', Courier, monospace;
  margin: 20px 0;
  position: relative;
`;

// Styled component for the header with dots and file name
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background: #44475a;
  position: relative;
`;

// Styled component for the dots container
const DotsContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Styled component for the dots
const Dot = styled.span`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  background-color: ${(props) => props.color};
`;

// Styled component for the file name
const FileName = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #f8f8f2;
  font-size: 14px;
  font-weight: bold;
`;

const CodeContainer = styled.div`
  padding: 20px;
  overflow-x: auto;
  background-color: ${customTheme.background};
  color: ${customTheme.text};
  font-family: 'Courier New', Courier, monospace;
  white-space: pre-wrap;

  .hljs-keyword {
    color: ${customTheme.keywords};
  }
  .hljs-string {
    color: ${customTheme.strings};
  }
  .hljs-number {
    color: ${customTheme.numbers};
  }
  .hljs-comment {
    color: ${customTheme.comments};
    font-style: italic;
  }
  .hljs-function {
    color: ${customTheme.functions};
  }
  .hljs-variable {
    color: ${customTheme.variables};
  }
  .hljs-punctuation {
    color: ${customTheme.punctuation};
  }
`;

// Styled component for the copy button
const CopyButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #6272a4;
  border: none;
  color: #f8f8f2;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;

  &:hover {
    background: #50fa7b;
  }
`;

const Icon = styled.i`
  font-size: 16px;
  margin-left: 5px;
`;

const CodeBlock = ({ code, language, fileName }) => {
  const highlight = (code, language) => {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(validLanguage, code).value;
  };

  const [copied, setCopied] = useState(false);
  const highlightedCode = highlight(code, language);

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Error al copiar el código: ', err);
      });
  };

  return (
    <EditorContainer>
      <Header>
        <DotsContainer>
          <Dot color="#ff5f56" />
          <Dot color="#ffbd2e" />
          <Dot color="#27c93f" />
        </DotsContainer>
        {fileName && <FileName>{fileName}</FileName>}
        <CopyButton onClick={handleCopy}>
          {copied ? (
            <Icon className="uil uil-check" />
          ) : (
            <Icon className="uil uil-copy" />
          )}
        </CopyButton>
      </Header>
      <CodeContainer>
        <pre dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </CodeContainer>
    </EditorContainer>
  );
};

export default CodeBlock;
