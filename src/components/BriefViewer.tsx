import { sampleBrief } from '../data/sampleBrief';
import { Brief, Citation, VerificationResult } from '../types';
import { VerificationSummary } from './VerificationSummary';

interface BriefViewerProps {
  brief: Brief;
  onCitationClick: (citation: Citation, result: VerificationResult) => void;
  selectedCitationId: string | null;
}

export function BriefViewer({
  brief,
  onCitationClick,
  selectedCitationId,
}: BriefViewerProps) {
  const getResultForCitation = (citationId: string): VerificationResult | undefined => {
    return brief.verificationResults.find((r) => r.citationId === citationId);
  };

  const getSeverityClasses = (severity: string): string => {
    switch (severity) {
      case 'critical':
        return 'bg-severity-critical-bg text-severity-critical border-severity-critical-border';
      case 'warning':
        return 'bg-severity-warning-bg text-severity-warning border-severity-warning-border';
      default:
        return 'bg-severity-valid-bg text-severity-valid border-severity-valid-border';
    }
  };

  const renderContent = () => {
    const content = brief.content;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    const citationRegex = /\[\[CITATION:(\d+)\]\]/g;
    let match;

    while ((match = citationRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }

      const citationIndex = parseInt(match[1], 10) - 1;
      const citation = brief.citations[citationIndex];

      if (citation) {
        const result = getResultForCitation(citation.id);
        const severity = result?.severity || 'none';
        const isSelected = selectedCitationId === citation.id;

        parts.push(
          <span
            key={citation.id}
            onClick={() => result && onCitationClick(citation, result)}
            className={`px-1.5 py-0.5 rounded cursor-pointer border transition-all hover:opacity-90 ${getSeverityClasses(severity)} ${isSelected ? 'ring-2 ring-primary ring-offset-2' : 'border-transparent'}`}
          >
            {citation.text}
          </span>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts;
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="sticky top-0 z-10 bg-card border-b border-border px-8 py-6">
        <h1 className="text-2xl font-semibold font-sans text-primary tracking-tight">{brief.title}</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="legal-prose max-w-4xl mx-auto whitespace-pre-wrap">
          <VerificationSummary brief={brief} />
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
