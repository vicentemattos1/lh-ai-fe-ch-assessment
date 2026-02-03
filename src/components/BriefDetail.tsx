import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { BriefViewer } from './BriefViewer';
import { DetailPanel } from './DetailPanel';
import { AppHeader } from './AppHeader';
import { briefApi } from '../services/briefApi';

export function BriefDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedCitationId, setSelectedCitationId] = useState<string | null>(null);

  // Fetch brief using React Query
  const { data: brief, isLoading, isError, refetch } = useQuery({
    queryKey: ['brief', id],
    queryFn: () => briefApi.fetchBrief(id!),
    enabled: !!id,
  });

  const handleCitationClick = (citationId: string) => {
    setSelectedCitationId(citationId);
  };

  const handleClosePanel = () => {
    setSelectedCitationId(null);
  };

  // Panel is visible when a citation is selected
  const isPanelVisible = !!selectedCitationId;

  return (
    <div className='relative flex h-screen overflow-hidden flex-col'>
      <AppHeader />

      {/* Main content */}
      <div className='relative flex flex-1 overflow-hidden'>
        <div className='flex-1 overflow-hidden'>
          <BriefViewer
            brief={brief}
            isLoading={isLoading}
            isError={isError}
            onCitationClick={handleCitationClick}
            selectedCitationId={selectedCitationId}
            onRefresh={refetch}
          />
        </div>
        <div 
          className={`absolute top-0 right-0 h-full w-[400px] border-l border-border overflow-hidden flex flex-col transition-transform duration-300 ease-out z-20 ${
            isPanelVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <DetailPanel citationId={selectedCitationId} onClose={handleClosePanel} />
        </div>
      </div>
    </div>
  );
}
