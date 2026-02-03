import { useQuery } from '@tanstack/react-query';
import { briefApi } from '../services/briefApi';
import { LoadingState } from './DetailPanel/LoadingState';
import { ErrorState } from './DetailPanel/ErrorState';
import { EmptyState } from './DetailPanel/EmptyState';
import { PanelHeader } from './DetailPanel/PanelHeader';
import { CitationSection } from './DetailPanel/CitationSection';
import { CitationDetailsSection } from './DetailPanel/CitationDetailsSection';
import { VerificationStatusSection } from './DetailPanel/VerificationStatusSection';
import { AnalysisSection } from './DetailPanel/AnalysisSection';
import { AdditionalDetailsSection } from './DetailPanel/AdditionalDetailsSection';

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
    return <LoadingState onClose={onClose} />;
  }

  // Error state
  if (isError) {
    return <ErrorState onClose={onClose} />;
  }

  // Empty state
  if (!citation || !result) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col h-full bg-card">
      <PanelHeader result={result} onClose={onClose} />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <CitationSection citation={citation} />
        <CitationDetailsSection citation={citation} />
        <VerificationStatusSection result={result} />
        <AnalysisSection result={result} />
        <AdditionalDetailsSection result={result} />
      </div>
    </div>
  );
}