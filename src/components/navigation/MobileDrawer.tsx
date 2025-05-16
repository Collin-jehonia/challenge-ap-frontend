import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Divider, 
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Filters } from '../../types';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  onFilterChange: (name: string, value: string) => void;
  programmeOptions: string[];
  yearOptions: number[];
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  filters,
  onFilterChange,
  programmeOptions,
  yearOptions
}) => {
  const location = useLocation();
  
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          p: 2,
          borderRadius: 0
        }
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        <Box component="img" src="/ium-logo-small.svg" alt="IUM Logo" sx={{ height: 60 }} />
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
        Filters
      </Typography>
      
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="mobile-year-label">Academic Year</InputLabel>
        <Select
          labelId="mobile-year-label"
          id="mobile-academicYear"
          value={filters.academicYear}
          label="Academic Year"
          onChange={(e: SelectChangeEvent) => onFilterChange('academicYear', e.target.value)}
          sx={{ borderRadius: 0 }}
        >
          <MenuItem value="all">All Years</MenuItem>
          {yearOptions.map(year => (
            <MenuItem key={year} value={year.toString()}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <FormControl fullWidth>
        <InputLabel id="mobile-programme-label">Programme</InputLabel>
        <Select
          labelId="mobile-programme-label"
          id="mobile-programme"
          value={filters.programme}
          label="Programme"
          onChange={(e: SelectChangeEvent) => onFilterChange('programme', e.target.value)}
          sx={{ borderRadius: 0 }}
        >
          <MenuItem value="all">All Programmes</MenuItem>
          {programmeOptions.map(programme => (
            <MenuItem key={programme} value={programme}>{programme}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Divider sx={{ my: 3 }} />
      
      <List>
        <ListItemButton 
          component={Link} 
          to="/" 
          sx={{ 
            borderRadius: 0,
            bgcolor: location.pathname === '/' ? 'rgba(0,0,0,0.05)' : 'transparent'
          }}
          onClick={onClose}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton 
          component={Link} 
          to="/student-records" 
          sx={{ 
            borderRadius: 0,
            bgcolor: location.pathname === '/student-records' ? 'rgba(0,0,0,0.05)' : 'transparent'
          }}
          onClick={onClose}
        >
          <ListItemIcon>
            <SchoolIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Student Records" />
        </ListItemButton>
        <ListItemButton 
          component={Link} 
          to="/academic-calendar" 
          sx={{ 
            borderRadius: 0,
            bgcolor: location.pathname === '/academic-calendar' ? 'rgba(0,0,0,0.05)' : 'transparent'
          }}
          onClick={onClose}
        >
          <ListItemIcon>
            <EventNoteIcon sx={{ color: 'secondary.main' }} />
          </ListItemIcon>
          <ListItemText primary="Academic Calendar" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default MobileDrawer; 