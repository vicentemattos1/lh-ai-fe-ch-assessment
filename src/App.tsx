import { useState } from 'react';
import { BriefViewer } from './components/BriefViewer';
import { DetailPanel } from './components/DetailPanel';
import { sampleBrief } from './data/sampleBrief';
import { Citation, VerificationResult } from './types';

function App() {
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [selectedResult, setSelectedResult] = useState<VerificationResult | null>(null);

  const handleCitationClick = (citation: Citation, result: VerificationResult) => {
    setSelectedCitation(citation);
    setSelectedResult(result);
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      <div className='flex-1 overflow-hidden'>
        <BriefViewer
          brief={sampleBrief}
          onCitationClick={handleCitationClick}
          selectedCitationId={selectedCitation?.id || null}
        />
      </div>
      <div className='h-full w-[400px] border-l border-border overflow-hidden flex flex-col'>
        <DetailPanel citation={selectedCitation} result={selectedResult} />
      </div>
    </div>
  );
}

export default App;
