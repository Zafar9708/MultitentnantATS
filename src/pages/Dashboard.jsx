// src/pages/Dashboard.js
import React from 'react';
import MainLayout from '../layout/MainLayout';
import SuperAdminDashboard from './SuperAdmin/SuperAdminDashboard';
import AdminDashboard from './Admin/AdminDashboard';
import RecruiterDashboard from './Recruiter/RecruiterDashboard';

const DashboardPage = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userName = userData?.name || "User"; 
  
  const renderDashboardContent = () => {
    if (!userData) return null;
    
    switch(userData.role) {
      case 'superadmin':
        return <SuperAdminDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'recruiter':
        return <RecruiterDashboard />;
      default:
        return <DefaultContent />;
    }
  };

  return (
    <MainLayout userName={userName}>
      {renderDashboardContent()}
    </MainLayout>
  );
};

// Content components (can be in separate files)
const SuperAdminContent = () => (
  <div>
    <h2>Super Admin Dashboard</h2>
    {/* Super Admin specific components */}
  </div>
);

const AdminContent = () => (
  <div>
    <h2>Admin Dashboard</h2>
    {/* Admin specific components */}
  </div>
);

const RecruiterContent = () => (
  <div>
    <h2>Recruiter Dashboard</h2>
    {/* Recruiter specific components */}
  </div>
);

const DefaultContent = () => (
  <div>
    <h2>Dashboard</h2>
    {/* Default content */}
  </div>
);

export default DashboardPage;