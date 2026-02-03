import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Shield, Scale } from 'lucide-react';
import { BriefViewer } from './components/BriefViewer';
import { DetailPanel } from './components/DetailPanel';
import { briefApi } from './services/briefApi';

function App() {
  const [selectedCitationId, setSelectedCitationId] = useState<string | null>(null);

  // Fetch brief using React Query
  const { data: brief, isLoading, isError, refetch } = useQuery({
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
    <div className='relative flex h-screen overflow-hidden flex-col'>
      {/* Header */}
      <header className='bg-[#1a1f2e] text-white px-6 py-4 flex items-center justify-between z-30'>
        {/* Left side - Branding */}
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-[#252b3d] rounded-lg flex items-center justify-center'>
            <Shield className='w-6 h-6 text-white' strokeWidth={1.5} />
          </div>
          <div className='flex flex-col'>
            <h1 className='text-white font-semibold text-base leading-tight'>Trusted Hand</h1>
            <p className='text-gray-400 text-sm leading-tight'>Citation Verification</p>
          </div>
        </div>

        {/* Right side - Navigation and CTA */}
        <div className='flex items-center gap-6'>
          <nav className='flex items-center gap-6'>
            <a href='#' className='text-white hover:text-gray-300 transition-colors text-sm font-medium'>
              Documents
            </a>
            <a href='#' className='text-white hover:text-gray-300 transition-colors text-sm font-medium'>
              History
            </a>
          </nav>
          <button className='bg-[#141821] hover:bg-[#1a1f2e] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium'>
            <Scale className='w-4 h-4' strokeWidth={2} />
            <span>New Verification</span>
          </button>
        </div>
      </header>

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

export default App;
