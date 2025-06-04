import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <TopHeader 
        onToggleSidebar={toggleSidebar} 
        isSidebarCollapsed={isSidebarCollapsed} 
      />
      <main 
        className={cn(
          "pt-[70px] transition-all duration-300 ease-in-out", // For fixed header
          "p-6", // Main content padding as per layout requirements
          isSidebarCollapsed ? "ml-[80px]" : "ml-[256px]" // For fixed sidebar (w-20 collapsed, w-64 expanded)
        )}
      >
        <div className="container mx-auto max-w-full">
            {/* The requirement "mainContent: { container: "grid grid-cols-3 gap-6" }" is for the CRM Dashboard page content, not AdminLayout itself */} 
            {/* AdminLayout provides the shell, children (e.g. CRM Dashboard page) will implement its own grid */} 
            {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
