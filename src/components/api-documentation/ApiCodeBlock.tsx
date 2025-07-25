
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "@/context/ThemeContext";

interface ApiCodeBlockProps {
  code: string;
  language: string;
}

const ApiCodeBlock: React.FC<ApiCodeBlockProps> = ({ code, language }) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  // Map language identifiers
  const mapLanguage = (lang: string): string => {
    switch (lang) {
      case "javascript":
        return "javascript";
      case "python":
        return "python";
      case "curl":
        return "bash";
      case "json":
        return "json";
      default:
        return "text";
    }
  };

  return (
    <div className="rounded-md overflow-hidden">
      <SyntaxHighlighter
        language={mapLanguage(language)}
        style={isDarkTheme ? vscDarkPlus : solarizedlight}
        customStyle={{
          margin: 0,
          borderRadius: "0.375rem",
          fontSize: "0.85rem",
          lineHeight: 1.5,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default ApiCodeBlock;
