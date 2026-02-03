import { useState, useEffect } from 'react';
import { BriefViewer } from './components/BriefViewer';
import { DetailPanel } from './components/DetailPanel';
import { sampleBrief } from './data/sampleBrief';
import { Citation, VerificationResult } from './types';

function App() {
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [selectedResult, setSelectedResult] = useState<VerificationResult | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  useEffect(() => {
    if (selectedCitation && selectedResult) {
      setIsPanelVisible(true);
    } else {
      setIsPanelVisible(false);
    }
  }, [selectedCitation, selectedResult]);

  const handleCitationClick = (citation: Citation, result: VerificationResult) => {
    setSelectedCitation(citation);
    setSelectedResult(result);
  };

  const handleClosePanel = () => {
    setSelectedCitation(null);
    setSelectedResult(null);
  };

  return (
    <div className='relative flex h-screen overflow-hidden'>
      <div className='flex-1 overflow-hidden'>
        <BriefViewer
          brief={sampleBrief}
          onCitationClick={handleCitationClick}
          selectedCitationId={selectedCitation?.id || null}
        />
      </div>
      <div 
        className={`absolute top-[80px] right-0 h-[calc(100%-80px)] w-[400px] border-l border-border overflow-hidden flex flex-col transition-transform duration-300 ease-out z-20 ${
          isPanelVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <DetailPanel citation={selectedCitation} result={selectedResult} onClose={handleClosePanel} />
      </div>
    </div>
  );
}

export default App;
