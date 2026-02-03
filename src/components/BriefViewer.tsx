import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { format } from 'date-fns';
import { Brief, VerificationResult } from '../types';
import { VerificationSummary } from './VerificationSummary';
import { LoadingState } from './BriefViewer/LoadingState';
import { ErrorState } from './BriefViewer/ErrorState';
import { EmptyState } from './BriefViewer/EmptyState';
import { CitationSpan } from './BriefViewer/CitationSpan';
import { contentToMarkdownWithCitationSpans } from './BriefViewer/utils';

interface BriefViewerProps {
  brief: Brief | undefined;
  isLoading: boolean;
  isError: boolean;
  onCitationClick: (citationId: string) => void;
  selectedCitationId: string | null;
  onRefresh?: () => void;
}

export function BriefViewer({ brief, isLoading, isError, onCitationClick, selectedCitationId, onRefresh }: BriefViewerProps) {
  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (isError) {
    return <ErrorState onRefresh={onRefresh} />;
  }

  // Empty state
  if (!brief || (!brief.content && brief.citations.length === 0)) {
    return <EmptyState onRefresh={onRefresh} />;
  }

  const getResultForCitation = (citationId: string): VerificationResult | undefined => {
    return brief.verificationResults.find((r) => r.citationId === citationId);
  };

  const markdown = useMemo(
    () => contentToMarkdownWithCitationSpans(brief.content, brief.citations),
    [brief.content, brief.citations]
  );

  const components: Components = useMemo(
    () => ({
      span: ({ node, children, ...props }) => {
        // Check if this is a citation span by looking at the node properties
        const el = node as any;
        const rawIndex = el?.properties?.['dataCitationIndex'];

        if (rawIndex == null) {
          return <span {...props}>{children}</span>;
        }

        return (
          <CitationSpan
            node={node}
            brief={brief}
            selectedCitationId={selectedCitationId}
            onCitationClick={onCitationClick}
            getResultForCitation={getResultForCitation}
          >
            {children}
          </CitationSpan>
        );
      },
    }),
    [brief, selectedCitationId, onCitationClick]
  );

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="legal-prose max-w-4xl mx-auto">
          <VerificationSummary brief={brief} isLoading={false} />

          <div className='bg-card rounded-xl border border-border shadow-sm p-8 lg:p-12'>
            <div className="mb-6 pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{brief.title}</h1>
                <span className="text-sm text-muted-foreground">
                  Created {formatDate(brief.createdAt)}
                </span>
              </div>
            </div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
