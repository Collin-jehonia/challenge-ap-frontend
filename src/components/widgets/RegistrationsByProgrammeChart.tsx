import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  useTheme
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { fetchRegistrationsByProgramme } from '../../services/api';
import { Filters, ProgrammeCount } from '../../types';

interface RegistrationsByProgrammeChartProps {
  filters: Filters;
}

const RegistrationsByProgrammeChart: React.FC<RegistrationsByProgrammeChartProps> = ({ filters }) => {
  const theme = useTheme();
  const [data, setData] = useState<ProgrammeCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRegistrationsByProgramme = async () => {
      setLoading(true);
      try {
        const yearFilter = filters.academicYear !== 'all' && filters.academicYear !== null && filters.academicYear !== undefined 
          ? filters.academicYear 
          : undefined;
        
        const result = await fetchRegistrationsByProgramme(yearFilter);
        
        // Format data for better visualization - truncate long programme names
        const formattedData = result.map(item => ({
          ...item,
          // Create a shortened name for display
          displayName: item.programme.length > 30 
            ? `${item.programme.substring(0, 27)}...` 
            : item.programme
        }));
        
        setData(formattedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching registrations by programme:', err);
        setError('Failed to load chart data');
      } finally {
        setLoading(false);
      }
    };

    getRegistrationsByProgramme();
  }, [filters]);

  // Custom tooltip for bar chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            p: 2,
            boxShadow: theme.shadows[3],
            borderRadius: 1,
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography variant="subtitle2" color="primary">
            {item.programme}
          </Typography>
          <Typography variant="body2">
            <strong>Registrations:</strong> {item.count}
          </Typography>
        </Box>
      );
    }
    return null;
  };

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
          Registrations by Programme
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {filters.academicYear !== 'all' ? `Academic Year: ${filters.academicYear}` : 'All Academic Years'}
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
          <Box sx={{ height: 300, mt: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 110
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="displayName" 
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={100}
                  tick={{ fontSize: 11 }}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name="Registrations" 
                  fill={theme.palette.primary.main} 
                  barSize={30}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RegistrationsByProgrammeChart;
