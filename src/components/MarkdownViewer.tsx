import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import mermaid from 'mermaid';
import { Copy, Check, FileText } from 'lucide-react';

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
});

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const mermaidElements = containerRef.current.querySelectorAll('.mermaid');
      if (mermaidElements.length > 0) {
        mermaid.run({ nodes: Array.from(mermaidElements) as HTMLElement[] }).catch((err) => {
          console.warn('Mermaid rendering issue:', err);
        });
      }
    }
  }, [content]);

  return (
    <div ref={containerRef} className={`markdown-body max-w-none text-[#1B242A] dark:text-[#E8F1F5] ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
        components={{
          h1: ({ children, ...props }) => (
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0B1E33] dark:text-white mt-8 mb-4 border-b border-[#D8D4C8] dark:border-[#1C3B5E] pb-2" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-xl md:text-2xl font-bold text-[#0B1E33] dark:text-[#38BDF8] mt-8 mb-3 flex items-center gap-2 border-l-4 border-[#F26B1D] pl-3" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-lg md:text-xl font-semibold text-[#1B242A] dark:text-gray-200 mt-6 mb-2" {...props}>
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p className="leading-relaxed mb-4 text-[15px] text-gray-800 dark:text-gray-300" {...props}>
              {children}
            </p>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-[#F26B1D] bg-[#F4F1EA] dark:bg-[#14263B] p-4 my-4 italic rounded-r text-gray-700 dark:text-gray-300" {...props}>
              {children}
            </blockquote>
          ),
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-6 border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-md shadow-sm">
              <table className="min-w-full divide-y divide-[#D8D4C8] dark:divide-[#1C3B5E] text-left text-sm" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-[#EAE6DD] dark:bg-[#0E2744] text-[#0B1E33] dark:text-gray-200 font-semibold" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th className="px-4 py-3 border-b border-[#D8D4C8] dark:border-[#1C3B5E]" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-4 py-2.5 border-b border-[#EAE6DD] dark:border-[#142D4B]" {...props}>
              {children}
            </td>
          ),
          pre: ({ children }) => <>{children}</>,
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');

            if (lang === 'mermaid') {
              return (
                <div className="my-6 p-4 bg-white dark:bg-[#0A192F] border border-[#D8D4C8] dark:border-[#1C3B5E] rounded-lg shadow-inner overflow-x-auto text-center">
                  <div className="mermaid">{codeString}</div>
                </div>
              );
            }

            if (!inline) {
              return <CodeBlock language={lang} code={codeString} />;
            }

            return (
              <code className="bg-[#EAE6DD] dark:bg-[#1A3350] text-[#F26B1D] dark:text-[#F97316] font-mono text-sm px-1.5 py-0.5 rounded border border-[#D8D4C8] dark:border-[#1C3B5E]" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

const CodeBlock: React.FC<{ language: string; code: string }> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-md border border-[#D8D4C8] dark:border-[#1C3B5E] bg-[#1E293B] text-gray-100 font-mono text-sm overflow-hidden shadow">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0F172A] border-b border-gray-700 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-[#F26B1D]" />
          {language || 'text'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-gray-700 text-gray-300 transition-colors"
          title="Sao chép mã"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto max-h-[500px]">
        <pre className="m-0 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
