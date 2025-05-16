import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  useTheme, 
  Box, 
  CircularProgress,
  CardHeader,
  IconButton
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import RefreshIcon from '@mui/icons-material/Refresh';

import { GenderCount } from '../../types';
import { fetchRegistrationsByGender } from '../../services/api';

interface GenderDistributionChartProps {
  filters: {
    academicYear: string;
    programme: string;
  };
}

const COLORS = ['#2196f3', '#f50057', '#4caf50', '#ff9800', '#9c27b0'];

const GenderDistributionChart: React.FC<GenderDistributionChartProps> = ({ filters }) => {
  const [data, setData] = useState<GenderCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const loadData = async () => {
    setLoading(true);
    try {
      const yearFilter = filters.academicYear !== 'all' && filters.academicYear !== null && filters.academicYear !== undefined
        ? filters.academicYear 
        : undefined;
      
      const programmeFilter = filters.programme !== 'all' && filters.programme !== null && filters.programme !== undefined
        ? filters.programme 
        : undefined;
      
      const genderData = await fetchRegistrationsByGender(yearFilter, programmeFilter);
      setData(genderData);
      setError(null);
    } catch (err) {
      console.error('Error loading gender distribution data:', err);
      setError('Failed to load gender distribution data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  const handleRefresh = () => {
    loadData();
  };

  const renderPieChart = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height={300}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height={300}>
          <Typography color="error">{error}</Typography>
        </Box>
      );
    }

    if (data.length === 0) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height={300}>
          <Typography>No data available</Typography>
        </Box>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            nameKey="gender"
            label={({ gender, percent }) => `${gender}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value} registrations`, 'Count']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const filteredTitle = filters.academicYear && filters.academicYear !== 'all' 
    ? `Gender Distribution (${filters.academicYear})`
    : 'Gender Distribution';

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" component="div">
            {filteredTitle}
          </Typography>
        }
        action={
          <IconButton onClick={handleRefresh} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        }
      />
      <CardContent>
        {renderPieChart()}
      </CardContent>
    </Card>
  );
};

export default GenderDistributionChart; 