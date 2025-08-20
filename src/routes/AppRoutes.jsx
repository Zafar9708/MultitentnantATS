import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'; 
import LoginForm from '../pages/Auth/LoginForm';
import RegisterForm from '../pages/Auth/RegisterForm';
import Home from '../pages/Home';
import DashboardPage from '../pages/Dashboard';
import JobsPage from '../pages/JobsPage';
import MainLayout from '../layout/MainLayout';
import JobCreationPage from '../pages/JobCreationPage';
import JobDetail from '../pages/JobDetail';
import CandidateDetailsPage from '../pages/Candidate/CandidateDetailsPage';
// import CandidatesTab from '../pages/Candidate/TotalCandidates';
import {CandidatesTab} from '../pages/Candidate/TotalCandidates';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/jobs" element={<JobsPage />} />

      
      {/* Protected role-based routes */}
      <Route path="/superadmin/*" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }/>
      
      <Route path="/tenant/:tenantId/*" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }/>
      
      <Route path="/recruiter/:tenantId/*" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }/>
    <Route
  path="/jobs"
  element={
    <ProtectedRoute>
      <MainLayout userName={JSON.parse(localStorage.getItem('userData'))?.name || 'User'}>
        <JobsPage />
        <JobDetail />
      </MainLayout>
    </ProtectedRoute>
  }
/>
 <Route
  path="/dashboard/jobs/:id/*"
  element={
    <ProtectedRoute>
      <MainLayout userName={JSON.parse(localStorage.getItem('userData'))?.name || 'User'}>
        <JobDetail />
      </MainLayout>
    </ProtectedRoute>
  }
/>



<Route 
 path='/dashboard/jobs/createJob'
 element={
  <ProtectedRoute>
    <JobCreationPage />
  </ProtectedRoute>
 }
/> 
<Route 
  path='/jobs/update/:id'
  element={
    <ProtectedRoute>
      <JobCreationPage />
    </ProtectedRoute>
  }
/> 


 <Route
  path="/candidates/:id/*"
  element={
    <ProtectedRoute>
      <MainLayout userName={JSON.parse(localStorage.getItem('userData'))?.name || 'User'}>
        <CandidateDetailsPage />
      </MainLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/all/candidates/*"
  element={
    <ProtectedRoute>
      <MainLayout userName={JSON.parse(localStorage.getItem('userData'))?.name || 'User'}>
        <CandidatesTab />
      </MainLayout>
    </ProtectedRoute>
  }
/>

</Routes>
  );
};

export default AppRoutes;