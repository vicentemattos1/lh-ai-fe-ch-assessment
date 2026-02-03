import { Citation } from '../../types';

interface CitationDetailsSectionProps {
  citation: Citation;
}

export function CitationDetailsSection({ citation }: CitationDetailsSectionProps) {
  return (
    <section>
      <h3 className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide mb-3">
        Citation Details
      </h3>
      <div className="space-y-3">
        <div className="space-y-1">
          <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">
            Case Name
          </strong>
          <p className="text-sm text-foreground">{citation.caseName}</p>
        </div>
        <div className="space-y-1">
          <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">
            Reporter
          </strong>
          <p className="text-sm text-foreground">{citation.reporter}</p>
        </div>
        {citation.pinCite && (
          <div className="space-y-1">
            <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">
              Pin Cite
            </strong>
            <p className="text-sm text-foreground">{citation.pinCite}</p>
          </div>
        )}
        <div className="space-y-1">
          <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">
            Year
          </strong>
          <p className="text-sm text-foreground">{citation.year}</p>
        </div>
      </div>
    </section>
  );
}
