import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import type { Element } from 'hast';

import { Brief, Citation, VerificationResult } from '../types';
import { VerificationSummary } from './VerificationSummary';

interface BriefViewerProps {
  brief: Brief;
  onCitationClick: (citation: Citation, result: VerificationResult) => void;
  selectedCitationId: string | null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function contentToMarkdownWithCitationSpans(content: string, citations: Citation[]): string {
  return content.replace(/\[\[CITATION:(\d+)\]\]/g, (_m, n) => {
    const idx = Number(n);
    const citation = Number.isFinite(idx) ? citations[idx - 1] : undefined;
    if (!citation) return `[[CITATION:${n}]]`;

    // Marker span. Styling + behavior comes from Components.span below.
    const safeText = escapeHtml(citation.text);
    return `<span data-citation-index="${n}">${safeText}</span>`;
  });
}

export function BriefViewer({ brief, onCitationClick, selectedCitationId }: BriefViewerProps) {
  const getResultForCitation = (citationId: string): VerificationResult | undefined => {
    return brief.verificationResults.find((r) => r.citationId === citationId);
  };

  const getSeverityClasses = (severity: string): string => {
    switch (severity) {
      case 'critical':
        return 'bg-severity-critical-bg text-severity-critical border-severity-critical-border hover:bg-severity-critical/15 hover:border-severity-critical hover:border-opacity-100';
      case 'warning':
        return 'bg-severity-warning-bg text-severity-warning border-severity-warning-border hover:bg-severity-warning/15 hover:border-severity-warning hover:border-opacity-100';
      default:
        return 'bg-severity-valid-bg text-severity-valid border-severity-valid-border hover:bg-severity-valid/15 hover:border-severity-valid hover:border-opacity-100';
    }
  };

  const markdown = useMemo(
    () => contentToMarkdownWithCitationSpans(brief.content, brief.citations),
    [brief.content, brief.citations]
  );

  const components: Components = useMemo(
    () => ({
      span: ({ node, children, ...props }) => {
        const el = node as unknown as Element;
        const rawIndex = el.properties?.['dataCitationIndex'];

        if (rawIndex == null) {
          return <span {...props}>{children}</span>;
        }

        const n = Number(rawIndex);
        const citation = Number.isFinite(n) ? brief.citations[n - 1] : undefined;

        if (!citation) {
          return <span {...props}>{children}</span>;
        }

        const result = getResultForCitation(citation.id);
        const severity = result?.severity ?? 'none';
        const isSelected = selectedCitationId === citation.id;

        const isClickable = Boolean(result);

        const baseClasses =
          'px-1.5 py-0.5 rounded border transition-all';
        const cursorClass = isClickable ? 'cursor-pointer' : 'cursor-default';
        const hoverClasses = isClickable
          ? 'hover:scale-105 hover:shadow-md'
          : '';

        const extraEmphasis =
          severity === 'critical' ? 'font-semibold' : '';

        return (
          <span
            key={citation.id}
            onClick={() => result && onCitationClick(citation, result)}
            className={[
              baseClasses,
              cursorClass,
              getSeverityClasses(severity),
              extraEmphasis,
              hoverClasses,
              isSelected ? 'ring-2 ring-primary ring-offset-2' : 'border-transparent',
            ].join(' ')}
            title={result?.message ?? undefined}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : -1}
            onKeyDown={(e) => {
              if (!result) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCitationClick(citation, result);
              }
            }}
          >
            {citation.text}
          </span>
        );
      },
    }),
    [brief.citations, selectedCitationId]
  );

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="sticky top-0 z-10 bg-card border-b border-border px-8 py-6">
        <h1 className="text-2xl font-semibold font-sans text-primary tracking-tight">
          {brief.title}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="legal-prose  max-w-4xl mx-auto whitespace-pre-wrap">
          <VerificationSummary brief={brief} />

          <div className='bg-card rounded-xl border border-border shadow-sm p-8 lg:p-12'>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
