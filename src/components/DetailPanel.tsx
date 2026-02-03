import { useQuery } from '@tanstack/react-query';
import { X, AlertTriangle, XCircle, CheckCircle, BookOpen, Loader2, AlertCircle } from 'lucide-react';
import { VerificationResult } from '../types';
import { briefApi } from '../services/briefApi';

interface DetailPanelProps {
  citationId: string | null;
  onClose?: () => void;
}

export function DetailPanel({ citationId, onClose }: DetailPanelProps) {
  // Fetch citation details when citationId is provided
  const {
    data: citationDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['citation', citationId],
    queryFn: () => briefApi.fetchCitationDetails(citationId!),
    enabled: !!citationId,
  });

  const citation = citationDetails?.citation || null;
  const result = citationDetails?.result || null;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
              <span className="text-sm font-semibold font-sans text-muted-foreground">
                Loading details...
              </span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-black/5 transition-colors"
                aria-label="Close panel"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Loading citation details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col h-full bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <span className="text-sm font-semibold font-sans text-destructive">
                Error loading details
              </span>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-black/5 transition-colors"
                aria-label="Close panel"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-3 max-w-sm text-center">
            <AlertCircle className="w-12 h-12 text-destructive" />
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Failed to load citation</h3>
              <p className="text-sm text-muted-foreground">
                There was an error loading the citation details. Please try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!citation || !result) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-sm text-muted-foreground">Click on a citation to see verification details.</p>
        </div>
      </div>
    );
  }

  const config = getSeverityConfig(result);

  return (
    <div className="flex flex-col h-full bg-card">
      <div className={`p-4 ${config.bgClass} border-b ${config.borderClass}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <config.icon className={`w-5 h-5 ${config.textClass}`} />
            <span className={`text-sm font-semibold font-sans ${config.textClass}`}>
              {config.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-black/5 transition-colors"
            aria-label="Close panel"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Citation */}
        <section>
          <h3 className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Citation
          </h3>
          <p className="text-sm font-serif text-foreground leading-relaxed">
            {citation.text}
          </p>
        </section>

        {/* Citation Details */}
        <section>
          <h3 className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide mb-3">
            Citation Details
          </h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">Case Name</strong>
              <p className="text-sm text-foreground">{citation.caseName}</p>
            </div>
            <div className="space-y-1">
              <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">Reporter</strong>
              <p className="text-sm text-foreground">{citation.reporter}</p>
            </div>
            {citation.pinCite && (
              <div className="space-y-1">
                <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">Pin Cite</strong>
                <p className="text-sm text-foreground">{citation.pinCite}</p>
              </div>
            )}
            <div className="space-y-1">
              <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">Year</strong>
              <p className="text-sm text-foreground">{citation.year}</p>
            </div>
          </div>
        </section>

        {/* Verification Status */}
        <section>
          <h3 className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide mb-3">
            Status
          </h3>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${config.bgClass} ${config.textClass} border ${config.borderClass}`}>
            <config.icon className="w-4 h-4" />
            {getStatusLabel(result.status)}
          </div>
        </section>

        {/* Analysis */}
        <section>
          <h3 className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide mb-3">
            Analysis
          </h3>
          <p className="text-sm text-foreground leading-relaxed">
            {result.message}
          </p>
        </section>

        {/* Additional Details */}
        {(result.details?.expectedQuote || result.details?.actualQuote || result.details?.treatmentHistory) && (
          <section>
            <h3 className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide mb-3">
              Additional Details
            </h3>
            <div className="space-y-4">
              {result.details?.expectedQuote && (
                <div className="space-y-1">
                  <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">Quote in Brief</strong>
                  <p className="text-sm text-foreground leading-relaxed bg-muted/50 p-3 rounded border border-border">{result.details.expectedQuote}</p>
                </div>
              )}
              {result.details?.actualQuote && (
                <div className="space-y-1">
                  <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">Actual Quote from Source</strong>
                  <p className="text-sm text-foreground leading-relaxed bg-muted/50 p-3 rounded border border-border">{result.details.actualQuote}</p>
                </div>
              )}
              {result.details?.treatmentHistory && (
                <div className="space-y-1">
                  <strong className="text-xs font-semibold font-sans text-muted-foreground uppercase tracking-wide">Treatment History</strong>
                  <p className="text-sm text-foreground leading-relaxed bg-muted/50 p-3 rounded border border-border">{result.details.treatmentHistory}</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'valid':
        return 'Citation Verified';
      case 'not_found':
        return 'Case Not Found';
      case 'quote_mismatch':
        return 'Quote Mismatch';
      case 'overruled':
        return 'Authority Limited';
      default:
        return status;
    }
  };

const getSeverityConfig = (result: VerificationResult) => {
  
  switch (result.severity) {
    case 'critical':
      return {
        icon: XCircle,
        label: 'Critical Issue',
        bgClass: 'bg-severity-critical-bg',
        borderClass: 'border-severity-critical-border',
        textClass: 'text-severity-critical',
      };
    case 'warning':
      return {
        icon: AlertTriangle,
        label: 'Warning',
        bgClass: 'bg-severity-warning-bg',
        borderClass: 'border-severity-warning-border',
        textClass: 'text-severity-warning',
      };
    default:
      return {
        icon: CheckCircle,
        label: 'Verified',
        bgClass: 'bg-severity-valid-bg',
        borderClass: 'border-severity-valid-border',
        textClass: 'text-severity-valid',
      };
  }
};