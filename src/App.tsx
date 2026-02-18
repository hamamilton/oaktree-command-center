import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Production from './pages/Production';
import Leaderboard from './pages/Leaderboard';
import Organization from './pages/Organization';
import RevShare from './pages/RevShare';
import Community from './pages/Community';
import Growth from './pages/Growth';
import Profile from './pages/Profile';
import Pipeline from './pages/Pipeline';
import ResourceDetail from './pages/ResourceDetail';
import Admin from './pages/Admin';
import Landing from './pages/Landing';
import Apply from './pages/Apply';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/apply" element={<Apply />} />

        {/* Protected Routes */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/production" element={<Production />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/revshare" element={<RevShare />} />
          <Route path="/community" element={<Community />} />
          <Route path="/growth" element={<Growth />} />
          <Route path="/growth/:resourceId" element={<ResourceDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
