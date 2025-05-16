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
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';

// Mock data for student records
interface Student {
  id: number;
  name: string;
  email: string;
  programme: string;
  year: number;
  status: 'Active' | 'Inactive' | 'Graduated';
  gpa: number;
}

const generateMockData = (): Student[] => {
  const programmes = ['Computer Science', 'Business Administration', 'Engineering', 'Medicine', 'Law'];
  const statuses: Array<'Active' | 'Inactive' | 'Graduated'> = ['Active', 'Inactive', 'Graduated'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: 10000 + i,
    name: `Student ${i + 1}`,
    email: `student${i + 1}@ium.edu`,
    programme: programmes[Math.floor(Math.random() * programmes.length)],
    year: Math.floor(Math.random() * 4) + 1,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    gpa: parseFloat((Math.random() * 4).toFixed(2)),
  }));
};

const StudentRecordsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call with delay
    const timer = setTimeout(() => {
      setStudents(generateMockData());
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredStudents = students.filter((student) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(searchTermLower) ||
      student.email.toLowerCase().includes(searchTermLower) ||
      student.programme.toLowerCase().includes(searchTermLower) ||
      student.id.toString().includes(searchTerm)
    );
  });

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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Student Records
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage student registration records
        </Typography>
      </Box>
      
      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 0 }}>
        <TextField
          fullWidth
          placeholder="Search by name, email, program or ID"
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
      </Paper>
      
      {/* Student Records Table */}
      <Paper sx={{ width: '100%', borderRadius: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Programme</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>GPA</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>{student.id}</TableCell>
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
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SchoolIcon fontSize="small" color="action" />
                        {student.programme}
                      </Box>
                    </TableCell>
                    <TableCell>Year {student.year}</TableCell>
                    <TableCell>
                      <Chip 
                        label={student.status} 
                        size="small" 
                        color={getStatusColor(student.status) as any}
                        sx={{ borderRadius: 0 }}
                      />
                    </TableCell>
                    <TableCell>
                      {student.gpa}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredStudents.length}
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