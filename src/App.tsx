import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BriefViewer } from './components/BriefViewer';
import { DetailPanel } from './components/DetailPanel';
import { briefApi } from './services/briefApi';

function App() {
  const [selectedCitationId, setSelectedCitationId] = useState<string | null>(null);

  // Fetch brief using React Query
  const { data: brief, isLoading, isError } = useQuery({
    queryKey: ['brief', 'brief-001'],
    queryFn: () => briefApi.fetchBrief('brief-001'),
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
    <div className='relative flex h-screen overflow-hidden'>
      <div className='flex-1 overflow-hidden'>
        <BriefViewer
          brief={brief}
          isLoading={isLoading}
          isError={isError}
          onCitationClick={handleCitationClick}
          selectedCitationId={selectedCitationId}
        />
      </div>
      <div 
        className={`absolute top-[80px] right-0 h-[calc(100%-80px)] w-[400px] border-l border-border overflow-hidden flex flex-col transition-transform duration-300 ease-out z-20 ${
          isPanelVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <DetailPanel citationId={selectedCitationId} onClose={handleClosePanel} />
      </div>
    </div>
  );
}

export default App;
