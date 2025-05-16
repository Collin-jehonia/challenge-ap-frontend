import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  useTheme,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Grid
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { fetchRegistrationsByProgramme } from '../../services/api';
import { Filters, ProgrammeCount } from '../../types';

interface RegistrationsByProgrammeChartProps {
  filters: Filters;
}

// Number of programmes to display
const DEFAULT_LIMIT = 15;

// Extended ProgrammeCount with display name
interface ExtendedProgrammeCount extends ProgrammeCount {
  displayName: string;
}

const RegistrationsByProgrammeChart: React.FC<RegistrationsByProgrammeChartProps> = ({ filters }) => {
  const theme = useTheme();
  const [data, setData] = useState<ExtendedProgrammeCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('count-desc');
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);

  // Generate a color array from the theme
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.primary.dark,
    theme.palette.secondary.main,
    theme.palette.secondary.dark,
    '#3498db',
    '#2980b9',
    '#e74c3c',
    '#c0392b',
    '#f1c40f',
    '#f39c12',
    '#2ecc71',
    '#27ae60',
    '#9b59b6',
    '#8e44ad',
    '#1abc9c'
  ];

  useEffect(() => {
    const getRegistrationsByProgramme = async () => {
      setLoading(true);
      try {
        const yearFilter = filters.academicYear !== 'all' && filters.academicYear !== null && filters.academicYear !== undefined 
          ? filters.academicYear 
          : undefined;
      
        
        // Fetch data with a higher limit to get more accurate representation
        const result = await fetchRegistrationsByProgramme(yearFilter, 30);
        
        // Format and sort data
        let formattedData = result.map(item => ({
          ...item,
          // Create a shortened name for display
          displayName: formatProgrammeName(item.programme)
        }));
        
        // Apply sorting
        formattedData = sortData(formattedData, sortBy);
        
        // Apply limit
        formattedData = formattedData.slice(0, limit);
        
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
  }, [filters, sortBy, limit]);

  // Format programme name for display
  const formatProgrammeName = (name: string): string => {
    // If name is too long, truncate it and add ellipsis
    if (name.length > 25) {
      // Try to find a good break point (space, dash, etc.)
      const breakPoint = name.lastIndexOf(' ', 22);
      if (breakPoint > 15) {
        return `${name.substring(0, breakPoint)}...`;
      }
      return `${name.substring(0, 22)}...`;
    }
    return name;
  };

  // Sort data based on selected option
  const sortData = (data: ExtendedProgrammeCount[], sortOption: string): ExtendedProgrammeCount[] => {
    const sortedData = [...data];
    
    switch (sortOption) {
      case 'count-desc':
        return sortedData.sort((a, b) => b.count - a.count);
      case 'count-asc':
        return sortedData.sort((a, b) => a.count - b.count);
      case 'name-asc':
        return sortedData.sort((a, b) => a.programme.localeCompare(b.programme));
      case 'name-desc':
        return sortedData.sort((a, b) => b.programme.localeCompare(a.programme));
      default:
        return sortedData;
    }
  };

  // Handle sort change
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
  };

  // Handle limit change
  const handleLimitChange = (event: SelectChangeEvent) => {
    setLimit(Number(event.target.value));
  };

  // Custom tooltip for bar chart with improved styling
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
            border: `1px solid ${theme.palette.divider}`,
            minWidth: '200px'
          }}
        >
          <Typography variant="subtitle2" color="primary" gutterBottom>
            {item.programme}
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Registrations:</span> <strong>{item.count.toLocaleString()}</strong>
          </Typography>
          {filters.academicYear === 'all' && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              All academic years combined
            </Typography>
          )}
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
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Registrations by Programme
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {filters.academicYear !== 'all' ? `Academic Year: ${filters.academicYear}` : 'All Academic Years'}
          </Typography>
          
          {/* Controls for sorting and limiting */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: 2, 
            mt: 2 
          }}>
            <Box>
              <FormControl fullWidth size="small">
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  value={sortBy}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  <MenuItem value="count-desc">Highest Count</MenuItem>
                  <MenuItem value="count-asc">Lowest Count</MenuItem>
                  <MenuItem value="name-asc">Programme Name (A-Z)</MenuItem>
                  <MenuItem value="name-desc">Programme Name (Z-A)</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth size="small">
                <InputLabel id="limit-label">Show Top</InputLabel>
                <Select
                  labelId="limit-label"
                  value={limit.toString()}
                  label="Show Top"
                  onChange={handleLimitChange}
                >
                  <MenuItem value="5">Top 5</MenuItem>
                  <MenuItem value="10">Top 10</MenuItem>
                  <MenuItem value="15">Top 15</MenuItem>
                  <MenuItem value="20">Top 20</MenuItem>
                  <MenuItem value="25">Top 25</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

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
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 120,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  type="category"
                  dataKey="displayName" 
                  width={110}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="count" 
                  name="Registrations" 
                  barSize={20}
                  radius={[0, 4, 4, 0]}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RegistrationsByProgrammeChart;
