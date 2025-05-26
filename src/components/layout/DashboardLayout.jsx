import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-neutral-50">
      {children}
    </div>
  );
};

export default DashboardLayout;