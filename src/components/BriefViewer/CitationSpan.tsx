import React from 'react';
import { Brief, VerificationResult } from '../../types';
import { getSeverityClasses } from './utils';

interface CitationSpanProps {
  node: unknown;
  children: React.ReactNode;
  brief: Brief;
  selectedCitationId: string | null;
  onCitationClick: (citationId: string) => void;
  getResultForCitation: (citationId: string) => VerificationResult | undefined;
}

export function CitationSpan({
  node,
  children,
  brief,
  selectedCitationId,
  onCitationClick,
  getResultForCitation,
}: CitationSpanProps) {
  const el = node as any;
  const rawIndex = el?.properties?.['dataCitationIndex'];

  if (rawIndex == null) {
    return <span>{children}</span>;
  }

  const n = Number(rawIndex);
  const citation = Number.isFinite(n) ? brief.citations[n - 1] : undefined;

  if (!citation) {
    return <span>{children}</span>;
  }

  const result = getResultForCitation(citation.id);
  const severity = result?.severity ?? 'none';
  const isSelected = selectedCitationId === citation.id;
  const isClickable = Boolean(result);

  const baseClasses = 'px-1.5 py-0.5 rounded border transition-all';
  const cursorClass = isClickable ? 'cursor-pointer' : 'cursor-default';
  const hoverClasses = isClickable ? 'hover:scale-105 hover:shadow-md' : '';
  const extraEmphasis = severity === 'critical' ? 'font-semibold' : '';

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
}
