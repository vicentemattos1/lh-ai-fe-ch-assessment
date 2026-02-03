import { Citation } from '../../types';

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function contentToMarkdownWithCitationSpans(content: string, citations: Citation[]): string {
  return content.replace(/\[\[CITATION:(\d+)\]\]/g, (_m, n) => {
    const idx = Number(n);
    const citation = Number.isFinite(idx) ? citations[idx - 1] : undefined;
    if (!citation) return `[[CITATION:${n}]]`;

    // Marker span. Styling + behavior comes from Components.span below.
    const safeText = escapeHtml(citation.text);
    return `<span data-citation-index="${n}">${safeText}</span>`;
  });
}

export function getSeverityClasses(severity: string): string {
  switch (severity) {
    case 'critical':
      return 'bg-severity-critical-bg text-severity-critical border-severity-critical-border hover:bg-severity-critical/15 hover:border-severity-critical hover:border-opacity-100';
    case 'warning':
      return 'bg-severity-warning-bg text-severity-warning border-severity-warning-border hover:bg-severity-warning/15 hover:border-severity-warning hover:border-opacity-100';
    default:
      return 'bg-severity-valid-bg text-severity-valid border-severity-valid-border hover:bg-severity-valid/15 hover:border-severity-valid hover:border-opacity-100';
  }
}
