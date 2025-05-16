import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';

// Import theme
import theme from './theme/theme';

// Import layout
import Layout from './components/layout/Layout';

// Import pages
import DashboardPage from './pages/DashboardPage';
import StudentRecordsPage from './pages/StudentRecordsPage';
import AcademicCalendarPage from './pages/AcademicCalendarPage';

// Import types and API services
import { Filters } from './types';
import { fetchRegistrationsByYear, fetchRegistrationsByProgramme } from './services/api';

function App() {
  // Filter state for the dashboard
  const [filters, setFilters] = useState<Filters>({
    academicYear: 'all',
    programme: 'all',
  });

  const [programmeOptions, setProgrammeOptions] = useState<string[]>([]);
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch filter options on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      setLoading(true);
      try {
        // Fetch years data
        const yearsData = await fetchRegistrationsByYear();
        const years = yearsData
          .map(item => item.year)
          .filter(year => year !== null && year !== undefined)
          .sort();
        setYearOptions(years);
        
        // Fetch programmes data
        const programmesData = await fetchRegistrationsByProgramme();
        const programmes = programmesData
          .map(item => item.programme)
          .filter(programme => programme !== null && programme !== undefined);
        setProgrammeOptions(programmes);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  // Update filters when user changes selections
  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box 
          display="flex" 
          flexDirection="column"
          justifyContent="center" 
          alignItems="center" 
          minHeight="100vh"
          bgcolor="background.default"
        >
          <Box component="img" src="/ium-logo.svg" alt="IUM Logo" sx={{ height: 150, mb: 4 }} />
          <CircularProgress color="primary" />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout
          filters={filters}
          onFilterChange={handleFilterChange}
          programmeOptions={programmeOptions}
          yearOptions={yearOptions}
        >
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/student-records" element={<StudentRecordsPage />} />
            <Route path="/academic-calendar" element={<AcademicCalendarPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
