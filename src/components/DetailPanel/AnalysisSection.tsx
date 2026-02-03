import { VerificationResult } from '../../types';

interface AnalysisSectionProps {
  result: VerificationResult;
}

export function AnalysisSection({ result }: AnalysisSectionProps) {
  return (
    <section>
      <h3 className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide mb-3">
        Analysis
      </h3>
      <p className="text-sm text-foreground leading-relaxed">{result.message}</p>
    </section>
  );
}
