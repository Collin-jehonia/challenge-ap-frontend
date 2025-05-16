import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  useTheme,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { fetchRegistrationsByYear } from '../../services/api';
import { Filters, YearCount } from '../../types';

interface RegistrationsByYearChartProps {
  filters: Filters;
}

type ChartType = 'bar' | 'line';

const RegistrationsByYearChart: React.FC<RegistrationsByYearChartProps> = ({ filters }) => {
  const theme = useTheme();
  const [data, setData] = useState<YearCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<ChartType>('line');

  useEffect(() => {
    const getRegistrationsByYear = async () => {
      setLoading(true);
      try {
        const programmeFilter = filters.programme !== 'all' && filters.programme !== null && filters.programme !== undefined
          ? filters.programme 
          : undefined;
        
        const result = await fetchRegistrationsByYear(programmeFilter);
        
        // Sort data by year in ascending order
        const sortedData = [...result].sort((a, b) => a.year - b.year);
        setData(sortedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching registrations by year:', err);
        setError('Failed to load chart data');
      } finally {
        setLoading(false);
      }
    };

    getRegistrationsByYear();
  }, [filters]);

  const handleChartTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: ChartType | null,
  ) => {
    if (newType !== null) {
      setChartType(newType);
    }
  };

  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
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
            Year: {label}
          </Typography>
          <Typography variant="body2">
            <strong>Registrations:</strong> {payload[0].value}
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box>
            <Typography variant="h6">
              Registrations by Academic Year
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filters.programme !== 'all' ? `Programme: ${filters.programme}` : 'All Programmes'}
            </Typography>
          </Box>
          
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            aria-label="chart type"
            size="small"
          >
            <ToggleButton value="bar" aria-label="bar chart">
              <BarChartIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="line" aria-label="line chart">
              <ShowChartIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
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
              {chartType === 'line' ? (
                <LineChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 30
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" padding={{ left: 30, right: 30 }} />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Registrations"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              ) : (
                <BarChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 20,
                    bottom: 30
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Registrations"
                    fill={theme.palette.secondary.main}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RegistrationsByYearChart;
