import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  CircularProgress,
  Avatar
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import { fetchTotalRegistrations } from '../../services/api';
import { Filters } from '../../types';

interface TotalRegistrationsWidgetProps {
  filters: Filters;
}

const TotalRegistrationsWidget: React.FC<TotalRegistrationsWidgetProps> = ({ filters }) => {
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTotalRegistrations = async () => {
      setLoading(true);
      try {
        const yearFilter = filters.academicYear !== 'all' ? filters.academicYear : undefined;
        const programmeFilter = filters.programme !== 'all' ? filters.programme : undefined;
        
        const data = await fetchTotalRegistrations(
          yearFilter,
          programmeFilter
        );
        setTotal(data.total);
        setError(null);
      } catch (err) {
        console.error('Error fetching total registrations:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    getTotalRegistrations();
  }, [filters]); // Re-fetch when filters change

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <GroupIcon />
          </Avatar>
          <Typography variant="h6" component="div">
            Total Registrations
          </Typography>
        </Box>
        
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100px">
            <CircularProgress size={40} />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box textAlign="center" py={2}>
            <Typography 
              variant="h2" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main'
              }}
            >
              {total?.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {filters.academicYear !== 'all' && filters.programme !== 'all' ? 
                `${filters.programme} (${filters.academicYear === 'null' ? 'Not Specified Year' : filters.academicYear})` :
                filters.academicYear !== 'all' ? 
                  (filters.academicYear === 'null' ? 'Not Specified Year' : `Year ${filters.academicYear}`) : 
                  filters.programme !== 'all' ? 
                    `${filters.programme}` : 
                    'All Registrations'}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalRegistrationsWidget;
