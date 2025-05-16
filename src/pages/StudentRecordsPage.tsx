import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Grid as MuiGrid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';

import { fetchStudentRecords } from '../services/api';

// Interface for student records from API
interface Student {
  id: number;
  student_id: string;
  name: string;
  email: string;
  programme: string;
  year: number | null;
  status: 'Active' | 'Inactive' | 'Graduated';
  secondary_school: string;
}

const StudentRecordsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  
  // Filters
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [programmeFilter, setProgrammeFilter] = useState<string>('all');
  const [programmes, setProgrammes] = useState<string[]>([]);
  const [years, setYears] = useState<(number | null)[]>([]);

  // Fetch data with current filters and pagination
  const fetchData = async () => {
    setLoading(true);
    try {
      // Prepare filters
      const filters: any = {
        skip: page * rowsPerPage,
        limit: rowsPerPage
      };
      
      if (searchTerm) {
        filters.search = searchTerm;
      }
      
      if (yearFilter !== 'all') {
        filters.year = yearFilter;
      }
      
      if (programmeFilter !== 'all') {
        filters.programme = programmeFilter;
      }
      
      const data = await fetchStudentRecords(filters);
      setStudents(data.students || []);
      setTotalCount(data.total || data.students.length);
      
      // Extract unique programmes and years for filters if not already set
      if (programmes.length === 0) {
        const uniqueProgrammes = Array.from(
          new Set(data.students.map((student: Student) => student.programme))
        ) as string[];
        setProgrammes(uniqueProgrammes);
      }
      
      if (years.length === 0) {
        const uniqueYears = Array.from(
          new Set(data.students.map((student: Student) => student.year))
        ).filter(year => year !== undefined).sort();
        setYears(uniqueYears as (number | null)[]);
      }
    } catch (error) {
      console.error('Error fetching student records:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, yearFilter, programmeFilter]);

  // Separate effect for search to add debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (page !== 0) {
        setPage(0); // Reset to first page on search
      } else {
        fetchData();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const handleYearFilterChange = (event: SelectChangeEvent) => {
    setYearFilter(event.target.value);
    setPage(0);
  };
  
  const handleProgrammeFilterChange = (event: SelectChangeEvent) => {
    setProgrammeFilter(event.target.value);
    setPage(0);
  };
  
  const handleRefresh = () => {
    fetchData();
  };
  
  const handleReset = () => {
    setSearchTerm('');
    setYearFilter('all');
    setProgrammeFilter('all');
    setPage(0);
  };

  const getStatusColor = (status: 'Active' | 'Inactive' | 'Graduated') => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'error';
      case 'Graduated':
        return 'primary';
      default:
        return 'default';
    }
  };

  if (loading && students.length === 0) {
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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Student Records
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage student registration records
        </Typography>
      </Box>
      
      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 0 }}>
        <MuiGrid container spacing={3}>
          {/* <MuiGrid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by name, email, ID, or programme"
              value={searchTerm}
              onChange={handleSearch}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 0 }
              }}
            />
          </MuiGrid> */}
          
          {/* <MuiGrid item xs={12} md={6}>
            <Box display="flex" gap={2}>
              <FormControl fullWidth>
                <InputLabel id="year-filter-label">Academic Year</InputLabel>
                <Select
                  labelId="year-filter-label"
                  id="year-filter"
                  value={yearFilter}
                  label="Academic Year"
                  onChange={handleYearFilterChange}
                  sx={{ borderRadius: 0 }}
                >
                  <MenuItem value="all">All Years</MenuItem>
                  <MenuItem value="null">Not Specified</MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year ? year.toString() : 'null'}>
                      {year ? `Year ${year}` : 'Not Specified'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel id="programme-filter-label">Programme</InputLabel>
                <Select
                  labelId="programme-filter-label"
                  id="programme-filter"
                  value={programmeFilter}
                  label="Programme"
                  onChange={handleProgrammeFilterChange}
                  sx={{ borderRadius: 0 }}
                >
                  <MenuItem value="all">All Programmes</MenuItem>
                  {programmes.map((prog) => (
                    <MenuItem key={prog} value={prog}>{prog}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Box display="flex" gap={1}>
                <Button 
                  variant="outlined" 
                  onClick={handleReset}
                  startIcon={<FilterListIcon />}
                  sx={{ borderRadius: 0, minWidth: '120px' }}
                >
                  Clear
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={handleRefresh}
                  startIcon={<RefreshIcon />}
                  sx={{ borderRadius: 0, minWidth: '120px' }}
                >
                  Refresh
                </Button>
              </Box>
            </Box>
          </MuiGrid> */}
        </MuiGrid>
      </Paper>
      
      {/* Student Records Table */}
      <Paper sx={{ width: '100%', borderRadius: 0 }}>
        {loading && (
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress size={30} />
          </Box>
        )}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Student ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Programme</TableCell>
                <TableCell>School</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>{student.student_id}</TableCell>
                  <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon fontSize="small" color="action" />
                    {student.name}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon fontSize="small" color="action" />
                      {student.email}
                    </Box>
                  </TableCell>
                  <TableCell>{student.programme}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SchoolIcon fontSize="small" color="action" />
                      {student.secondary_school}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {student.year ? `Year ${student.year}` : 'Not Specified'}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={student.status} 
                      size="small" 
                      color={getStatusColor(student.status) as any}
                      sx={{ borderRadius: 0 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {students.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default StudentRecordsPage; 