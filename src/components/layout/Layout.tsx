import React, { useState, ReactNode } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import MobileDrawer from '../navigation/MobileDrawer';
import { Filters } from '../../types';

interface LayoutProps {
  children: ReactNode;
  filters: Filters;
  onFilterChange: (name: string, value: string) => void;
  programmeOptions: string[];
  yearOptions: number[];
}

const Layout: React.FC<LayoutProps> = ({
  children,
  filters,
  onFilterChange,
  programmeOptions,
  yearOptions
}) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: 'background.default' 
    }}>
      <Header 
        onFilterChange={onFilterChange} 
        filters={filters} 
        programmeOptions={programmeOptions}
        yearOptions={yearOptions}
        toggleDrawer={toggleDrawer}
      />
      
      <MobileDrawer 
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onFilterChange={onFilterChange}
        programmeOptions={programmeOptions}
        yearOptions={yearOptions}
      />
      
      <Box sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      
      <Footer />
    </Box>
  );
};

export default Layout; 