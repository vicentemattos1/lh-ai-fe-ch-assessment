import { Routes, Route, Navigate } from 'react-router-dom';
import { BriefList } from './components/BriefList';
import { BriefDetail } from './components/BriefDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BriefList />} />
      <Route path="/:id" element={<BriefDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
