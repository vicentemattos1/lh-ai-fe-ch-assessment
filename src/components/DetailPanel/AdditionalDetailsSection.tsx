import { VerificationResult } from '../../types';

interface AdditionalDetailsSectionProps {
  result: VerificationResult;
}

export function AdditionalDetailsSection({ result }: AdditionalDetailsSectionProps) {
  if (!result.details?.expectedQuote && !result.details?.actualQuote && !result.details?.treatmentHistory) {
    return null;
  }

  return (
    <section>
      <h3 className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide mb-3">
        Additional Details
      </h3>
      <div className="space-y-4">
        {result.details?.expectedQuote && (
          <div className="space-y-1">
            <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">
              Quote in Brief
            </strong>
            <p className="text-sm text-foreground leading-relaxed bg-muted/50 p-3 rounded border border-border">
              {result.details.expectedQuote}
            </p>
          </div>
        )}
        {result.details?.actualQuote && (
          <div className="space-y-1">
            <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">
              Actual Quote from Source
            </strong>
            <p className="text-sm text-foreground leading-relaxed bg-muted/50 p-3 rounded border border-border">
              {result.details.actualQuote}
            </p>
          </div>
        )}
        {result.details?.treatmentHistory && (
          <div className="space-y-1">
            <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">
              Treatment History
            </strong>
            <p className="text-sm text-foreground leading-relaxed bg-muted/50 p-3 rounded border border-border">
              {result.details.treatmentHistory}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
