import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  AppBar, 
  Toolbar, 
  Container,
  useMediaQuery,
  IconButton,
  SelectChangeEvent
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Filters } from '../../types';

interface HeaderProps {
  filters: Filters;
  onFilterChange: (name: string, value: string) => void;
  programmeOptions: string[];
  yearOptions: number[];
  toggleDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  filters, 
  onFilterChange, 
  programmeOptions, 
  yearOptions, 
  toggleDrawer 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  
  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{
        bgcolor: '#18304B',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 0
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1, px: { xs: 1, sm: 2 } }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ 
                mr: 1,
                borderRadius: 0
              }}
              size="small"
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            pr: 2,
            borderRight: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Box 
              component="img" 
              src="/ium-logo-small.svg" 
              alt="IUM Logo" 
              sx={{ 
                height: 45,
                mr: 2
              }} 
            />
            {!isMobile && (
              <Box>
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    lineHeight: 1.2
                  }}
                >
                  Student Registration Dashboard
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ opacity: 0.8 }}
                >
                  The International University of Management
                </Typography>
              </Box>
            )}
          </Box>
          
          {!isMobile && (
            <Box sx={{ 
              display: 'flex', 
              flexGrow: 1, 
              pl: 3, 
              gap: 4
            }}>
              <Box 
                component={Link} 
                to="/" 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1,
                  px: 1.5,
                  borderRadius: 0,
                  bgcolor: location.pathname === '/' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <DashboardIcon fontSize="small" />
                <Typography variant="body2">Dashboard</Typography>
              </Box>
              <Box 
                component={Link} 
                to="/student-records" 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1,
                  px: 1.5,
                  borderRadius: 0,
                  bgcolor: location.pathname === '/student-records' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                <SchoolIcon fontSize="small" />
                <Typography variant="body2">Student Records</Typography>
              </Box>
              <Box 
                component={Link} 
                to="/academic-calendar" 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 1,
                  px: 1.5,
                  borderRadius: 0,
                  bgcolor: location.pathname === '/academic-calendar' ? 'rgba(255,255,255,0.1)' : 'transparent',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.15)'
                  }
                }}
              >
                <EventNoteIcon fontSize="small" />
                <Typography variant="body2">Academic Calendar</Typography>
              </Box>
            </Box>
          )}
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1.5
          }}>
            <FormControl 
              size="small" 
              sx={{ 
                width: 130,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  borderRadius: 0,
                  fontSize: '0.875rem'
                }
              }}
            >
              <InputLabel id="year-label" sx={{ fontSize: '0.875rem' }}>Academic Year</InputLabel>
              <Select
                labelId="year-label"
                id="academicYear"
                value={filters.academicYear}
                label="Academic Year"
                onChange={(e: SelectChangeEvent) => onFilterChange('academicYear', e.target.value)}
              >
                <MenuItem value="all">All Years</MenuItem>
                {yearOptions.filter(year => year !== null && year !== undefined).map(year => (
                  <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl 
              size="small" 
              sx={{ 
                width: 150,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  borderRadius: 0,
                  fontSize: '0.875rem'
                }
              }}
            >
              <InputLabel id="programme-label" sx={{ fontSize: '0.875rem' }}>Programme</InputLabel>
              <Select
                labelId="programme-label"
                id="programme"
                value={filters.programme}
                label="Programme"
                onChange={(e: SelectChangeEvent) => onFilterChange('programme', e.target.value)}
              >
                <MenuItem value="all">All Programmes</MenuItem>
                {programmeOptions.filter(programme => programme !== null && programme !== undefined).map(programme => (
                  <MenuItem key={programme} value={programme}>{programme}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            {isMobile && (
              <IconButton 
                color="inherit" 
                onClick={toggleDrawer}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 0,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <FilterAltIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 