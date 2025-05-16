import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Chip
} from '@mui/material';
import { fetchTopSchools } from '../../services/api';
import { Filters, SchoolCount } from '../../types';

interface TopSchoolsTableProps {
  filters: Filters;
}

const TopSchoolsTable: React.FC<TopSchoolsTableProps> = ({ filters }) => {
  const [data, setData] = useState<SchoolCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTopSchools = async () => {
      setLoading(true);
      try {
        const yearFilter = filters.academicYear !== 'all' && filters.academicYear !== null && filters.academicYear !== undefined
          ? filters.academicYear 
          : undefined;
        
        const programmeFilter = filters.programme !== 'all' && filters.programme !== null && filters.programme !== undefined
          ? filters.programme 
          : undefined;
        
        const result = await fetchTopSchools(yearFilter, programmeFilter, 10);
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching top schools:', err);
        setError('Failed to load top schools data');
      } finally {
        setLoading(false);
      }
    };

    getTopSchools();
  }, [filters]);

  return (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top 10 Secondary Schools
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {filters.academicYear !== 'all' && filters.programme !== 'all'
            ? `Filters: ${filters.academicYear}, ${filters.programme}`
            : filters.academicYear !== 'all'
              ? `Academic Year: ${filters.academicYear}`
              : filters.programme !== 'all'
                ? `Programme: ${filters.programme}`
                : 'All data'
          }
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <TableContainer 
            component={Paper} 
            elevation={0}
            sx={{ 
              maxHeight: 350,
              mt: 2, 
              '& .MuiTableCell-root': {
                borderBottom: '1px solid rgba(224, 224, 224, 0.5)'
              }
            }}
          >
            <Table stickyHeader aria-label="top schools table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: 'background.paper' }}>Rank</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', bgcolor: 'background.paper' }}>School Name</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', bgcolor: 'background.paper' }}>Students</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((school, index) => (
                    <TableRow 
                      key={school.school}
                      sx={{ 
                        '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                        '&:hover': { bgcolor: 'action.selected' }
                      }}
                    >
                      <TableCell>
                        {index === 0 ? (
                          <Chip 
                            label={`#${index + 1}`} 
                            size="small" 
                            color="primary" 
                            sx={{ fontWeight: 'bold' }} 
                          />
                        ) : index === 1 ? (
                          <Chip 
                            label={`#${index + 1}`} 
                            size="small" 
                            color="secondary" 
                            sx={{ fontWeight: 'bold' }} 
                          />
                        ) : index === 2 ? (
                          <Chip 
                            label={`#${index + 1}`} 
                            size="small" 
                            color="info" 
                            sx={{ fontWeight: 'bold' }} 
                          />
                        ) : (
                          `#${index + 1}`
                        )}
                      </TableCell>
                      <TableCell>{school.school}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'medium' }}>
                        {school.count}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default TopSchoolsTable;
