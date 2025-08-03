import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JobList from './pages/JobList';
import JobForm from './pages/JobForm';
import JobDetail from './pages/JobDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/add" element={<JobForm />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
