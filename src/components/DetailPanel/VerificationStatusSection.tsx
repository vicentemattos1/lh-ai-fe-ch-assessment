import { VerificationResult } from '../../types';
import { getSeverityConfig, getStatusLabel } from './utils';

interface VerificationStatusSectionProps {
  result: VerificationResult;
}

export function VerificationStatusSection({ result }: VerificationStatusSectionProps) {
  const config = getSeverityConfig(result);

  return (
    <section>
      <h3 className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide mb-3">
        Status
      </h3>
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${config.bgClass} ${config.textClass} border ${config.borderClass}`}
      >
        <config.icon className="w-4 h-4" />
        {getStatusLabel(result.status)}
      </div>
    </section>
  );
}
