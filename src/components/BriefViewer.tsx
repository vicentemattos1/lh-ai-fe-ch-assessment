import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import type { Element } from 'hast';
import { Loader2, AlertCircle, FileText } from 'lucide-react';

import { Brief, Citation, VerificationResult } from '../types';
import { VerificationSummary } from './VerificationSummary';

interface BriefViewerProps {
  brief: Brief | undefined;
  isLoading: boolean;
  isError: boolean;
  onCitationClick: (citationId: string) => void;
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

export function BriefViewer({ brief, isLoading, isError, onCitationClick, selectedCitationId }: BriefViewerProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-card">
        <div className="sticky top-0 z-10 bg-card border-b border-border px-8 py-6">
          <div className="h-8 w-64 bg-muted animate-pulse rounded" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Loading brief...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col h-full bg-card">
        <div className="sticky top-0 z-10 bg-card border-b border-border px-8 py-6">
          <div className="h-8 w-64 bg-muted rounded" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 max-w-md text-center">
            <AlertCircle className="w-12 h-12 text-destructive" />
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Failed to load brief</h2>
              <p className="text-sm text-muted-foreground">
                There was an error loading the brief. Please try again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!brief || (!brief.content && brief.citations.length === 0)) {
    return (
      <div className="flex flex-col h-full bg-card">
        <div className="sticky top-0 z-10 bg-card border-b border-border px-8 py-6">
          <div className="h-8 w-64 bg-muted rounded" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 max-w-md text-center">
            <FileText className="w-12 h-12 text-muted-foreground" />
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">No brief available</h2>
              <p className="text-sm text-muted-foreground">
                This brief appears to be empty or unavailable.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        const citation = Number.isFinite(n) ? brief!.citations[n - 1] : undefined;

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
            onClick={() => isClickable && onCitationClick(citation.id)}
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
              if (!isClickable) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCitationClick(citation.id);
              }
            }}
          >
            {citation.text}
          </span>
        );
      },
    }),
    [brief, selectedCitationId, onCitationClick]
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
          <VerificationSummary brief={brief} isLoading={false} />

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
