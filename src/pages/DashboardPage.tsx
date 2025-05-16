import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  CircularProgress, 
  Paper,
  Divider,
  Card,
  CardContent,
  Button,
  Tab,
  Tabs,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Stack
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TotalRegistrationsWidget from '../components/widgets/TotalRegistrationsWidget';
import RegistrationsByProgrammeChart from '../components/widgets/RegistrationsByProgrammeChart';
import RegistrationsByYearChart from '../components/widgets/RegistrationsByYearChart';
import TopSchoolsTable from '../components/widgets/TopSchoolsTable';
import GenderDistributionChart from '../components/widgets/GenderDistributionChart';
import { Filters, YearCount } from '../types';
import { 
  fetchRegistrationsByYear, 
  fetchRegistrationsByProgramme, 
  fetchTotalRegistrations,
  fetchTopSchools 
} from '../services/api';

const DashboardPage: React.FC = () => {
  // Filter state
  const [filters, setFilters] = useState<Filters>({
    academicYear: 'all',
    programme: 'all',
  });

  // Options for filters
  const [programmeOptions, setProgrammeOptions] = useState<string[]>([]);
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  
  // Data states
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [newRegistrations, setNewRegistrations] = useState<number>(0);
  const [registrationChange, setRegistrationChange] = useState<number>(0);
  const [yearData, setYearData] = useState<YearCount[]>([]);
  
  // UI states
  const [loading, setLoading] = useState<boolean>(true);
  const [tabValue, setTabValue] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Handle filter changes
  const handleYearChange = (event: SelectChangeEvent) => {
    setFilters(prev => ({
      ...prev,
      academicYear: event.target.value
    }));
  };

  const handleProgrammeChange = (event: SelectChangeEvent) => {
    setFilters(prev => ({
      ...prev,
      programme: event.target.value
    }));
  };

  // Reset filters to default
  const handleResetFilters = () => {
    setFilters({
      academicYear: 'all',
      programme: 'all',
    });
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchDashboardData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Main data fetching function
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Prepare filter parameters
      const yearFilter = filters.academicYear !== 'all' ? filters.academicYear : undefined;
      const programmeFilter = filters.programme !== 'all' ? filters.programme : undefined;
      
      // Fetch total registrations with filters
      const totalData = await fetchTotalRegistrations(yearFilter, programmeFilter);
      setTotalStudents(totalData.total);
      
      // Fetch registration data by year (filtered by programme if set)
      const yearsData = await fetchRegistrationsByYear(programmeFilter);
      setYearData(yearsData);
      
      // Extract year options (always get all years for filters)
      if (yearOptions.length === 0) {
        const allYearsData = await fetchRegistrationsByYear();
        const years = allYearsData
          .map(item => item.year)
          .filter(year => year !== null && year !== undefined)
          .sort();
        setYearOptions(years);
      }
      
      // Calculate new registrations for current year
      if (yearsData.length > 0) {
        // If a specific year is selected, use that year's data
        if (yearFilter) {
          const selectedYearData = yearsData.find(item => item.year !== null && item.year !== undefined && item.year.toString() === yearFilter);
          if (selectedYearData) {
            setNewRegistrations(selectedYearData.count);
          }
        } else {
          // Otherwise use the most recent year
          const years = yearsData
            .filter(item => item.year !== null && item.year !== undefined)
            .map(item => item.year);
          const currentYear = years.length > 0 ? Math.max(...years) : new Date().getFullYear();
          const previousYear = currentYear - 1;
          
          const currentYearData = yearsData.find(item => item.year === currentYear);
          const previousYearData = yearsData.find(item => item.year === previousYear);
          
          if (currentYearData) {
            setNewRegistrations(currentYearData.count);
            
            // Calculate percentage change if previous year data exists
            if (previousYearData && previousYearData.count > 0) {
              const change = ((currentYearData.count - previousYearData.count) / previousYearData.count) * 100;
              setRegistrationChange(Number(change.toFixed(1)));
            }
          }
        }
      }
      
      // Fetch programmes data (with year filter if set)
      if (programmeOptions.length === 0) {
        const allProgrammesData = await fetchRegistrationsByProgramme();
        const programmes = allProgrammesData
          .map(item => item.programme)
          .filter(programme => programme !== null && programme !== undefined);
        setProgrammeOptions(programmes);
      }
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch filter options and initial data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  // Refetch data when filters change
  useEffect(() => {
    // Skip the initial render
    if (!loading) {
      fetchDashboardData();
    }
  }, [filters]); // Run effect when filters change

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Dashboard Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Registration Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Comprehensive overview of student registrations and key metrics
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<DownloadIcon />}
            sx={{ borderRadius: 0 }}
          >
            Export Data
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={refreshing}
            sx={{ borderRadius: 0 }}
          >
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </Box>
      </Box>

      {/* Filter Controls */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterAltIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="h6">Filter Dashboard</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="year-filter-label">Academic Year</InputLabel>
            <Select
              labelId="year-filter-label"
              id="year-filter"
              value={filters.academicYear}
              label="Academic Year"
              onChange={handleYearChange}
              sx={{ borderRadius: 0 }}
            >
              <MenuItem value="all">All Years</MenuItem>
              {yearOptions.filter(year => year !== null && year !== undefined).map(year => (
                <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="programme-filter-label">Programme</InputLabel>
            <Select
              labelId="programme-filter-label"
              id="programme-filter"
              value={filters.programme}
              label="Programme"
              onChange={handleProgrammeChange}
              sx={{ borderRadius: 0 }}
            >
              <MenuItem value="all">All Programmes</MenuItem>
              {programmeOptions.filter(programme => programme !== null && programme !== undefined).map(programme => (
                <MenuItem key={programme} value={programme}>{programme}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button 
            variant="outlined" 
            onClick={handleResetFilters}
            sx={{ borderRadius: 0, height: { sm: '56px' } }}
          >
            Reset Filters
          </Button>
          
          <Box flexGrow={1} />
          
          <Typography variant="body2" color="text.secondary">
            {filters.academicYear !== 'all' || filters.programme !== 'all' ? (
              <>Showing filtered data for {filters.academicYear !== 'all' ? `Year ${filters.academicYear}` : 'all years'} {filters.programme !== 'all' ? `in ${filters.programme}` : ''}</>
            ) : (
              'Showing all data - apply filters to refine results'
            )}
          </Typography>
        </Stack>
      </Paper>

      {/* Key Performance Indicators */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Key Performance Indicators
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          mx: -1
        }}>
          {/* Total Students */}
          <Box sx={{ 
            width: { xs: '100%', sm: '50%', md: '33.333%', lg: '25%' }, 
            p: 1 
          }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2.5,
                height: '100%',
                borderLeft: '4px solid #18304B',
                transition: 'transform 0.2s, box-shadow 0.2s',
                borderRadius: 0,
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                {totalStudents.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Current Academic Year
                </Typography>
                <Tooltip title="Total number of enrolled students">
                  <InfoIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: '0.875rem' }} />
                </Tooltip>
              </Box>
            </Paper>
          </Box>
          
          {/* New Registrations */}
          <Box sx={{ 
            width: { xs: '100%', sm: '50%', md: '33.333%', lg: '25%' }, 
            p: 1 
          }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2.5,
                height: '100%',
                borderLeft: '4px solid #9A0000',
                transition: 'transform 0.2s, box-shadow 0.2s',
                borderRadius: 0,
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                New Registrations
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                {newRegistrations.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {registrationChange > 0 ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                    <TrendingUpIcon fontSize="small" />
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {registrationChange}%
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                    <TrendingDownIcon fontSize="small" />
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {Math.abs(registrationChange)}%
                    </Typography>
                  </Box>
                )}
                <Typography variant="caption" color="text.secondary">
                  from last year
                </Typography>
              </Box>
            </Paper>
          </Box>
          
          {/* Total Registrations Widget */}
          <Box sx={{ 
            width: { xs: '100%', sm: '50%', md: '33.333%', lg: '25%' }, 
            p: 1 
          }}>
            <Paper 
              elevation={0} 
              sx={{ 
                height: '100%', 
                p: 2.5, 
                transition: 'transform 0.2s, box-shadow 0.2s',
                borderRadius: 0,
                borderLeft: '4px solid #673AB7',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
                } 
              }}
            >
              <TotalRegistrationsWidget filters={filters} />
            </Paper>
          </Box>
        </Box>
      </Box>
      
      {/* Chart Tabs */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={0} sx={{ borderRadius: 0 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="dashboard tabs"
              sx={{ 
                '& .MuiTab-root': { 
                  borderRadius: 0,
                  py: 2,
                  px: 3
                }
              }}
            >
              <Tab label="Registration Analytics" />
              <Tab label="Academic Performance" />
              <Tab label="Demographic Data" />
            </Tabs>
          </Box>
          <Box sx={{ p: 0 }}>
            {tabValue === 0 && (
              <Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 3, gap: 3 }}>
                  {/* Registrations by Programme Chart */}
                  <Box sx={{ flex: { xs: '100%', md: '66.666%' } }}>
                    <Box sx={{ height: '400px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Registrations by Programme</Typography>
                        <Tooltip title="Refresh data">
                          <IconButton size="small" onClick={handleRefresh}>
                            <RefreshIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      <RegistrationsByProgrammeChart filters={filters} />
                    </Box>
                  </Box>
                  
                  {/* Registrations by Year Chart */}
                  <Box sx={{ flex: { xs: '100%', md: '33.333%' } }}>
                    <Box sx={{ height: '400px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">Yearly Trend</Typography>
                        <Tooltip title="Refresh data">
                          <IconButton size="small" onClick={handleRefresh}>
                            <RefreshIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      <RegistrationsByYearChart filters={filters} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            {tabValue === 1 && (
              <Box sx={{ p: 3, height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Academic performance analytics will be available in the next update.
                </Typography>
              </Box>
            )}
            {tabValue === 2 && (
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                  <Box sx={{ flex: '1', minHeight: '400px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">Gender Distribution</Typography>
                      <Tooltip title="Refresh data">
                        <IconButton size="small" onClick={handleRefresh}>
                          <RefreshIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <GenderDistributionChart
                      academicYear={filters.academicYear}
                      programme={filters.programme}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
      
      {/* Top Schools Table */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Top Feeder Schools</Typography>
            <Tooltip title="Refresh data">
              <IconButton size="small" onClick={handleRefresh}>
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <TopSchoolsTable filters={filters} />
        </Paper>
      </Box>
      
      {/* Summary Report */}
      <Box>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 0 }}>
          <Typography variant="h6" gutterBottom>
            Registration Summary Report
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body1" paragraph>
            The current academic year has seen a <strong>{registrationChange > 0 ? `${registrationChange}% increase` : `${Math.abs(registrationChange)}% decrease`}</strong> in student registrations compared to the previous year. {programmeOptions.length > 1 && `This trend is particularly notable in the ${programmeOptions.slice(0, 2).join(' and ')} programmes.`}
          </Typography>
          <Typography variant="body1" paragraph>
            IUM continues to focus on enrollment optimization and student outreach initiatives to improve registration numbers across all programs.
          </Typography>
          <Typography variant="body1">
            The top feeder schools continue to be consistently represented, with multiple schools showing increased enrollment numbers this year.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="outlined" 
              startIcon={<DownloadIcon />}
              sx={{ borderRadius: 0 }}
            >
              Download Full Report
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default DashboardPage; 