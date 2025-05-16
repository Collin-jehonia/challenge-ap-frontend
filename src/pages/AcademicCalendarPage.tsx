import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CelebrationIcon from '@mui/icons-material/Celebration';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';

// Mock data for academic calendar
interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  endDate?: string;
  type: 'class' | 'exam' | 'holiday' | 'event' | 'graduation' | 'registration';
  location?: string;
  description?: string;
}

const generateMockCalendarData = (): CalendarEvent[] => {
  const currentYear = new Date().getFullYear();
  
  return [
    {
      id: 1,
      title: 'First Semester Begins',
      date: `${currentYear}-01-25`,
      type: 'class',
      description: 'Start of classes for the first semester'
    },
    {
      id: 2,
      title: 'Add/Drop Period',
      date: `${currentYear}-01-25`,
      endDate: `${currentYear}-02-08`,
      type: 'registration',
      description: 'Period to add or drop courses for the first semester'
    },
    {
      id: 3,
      title: 'Independence Day Holiday',
      date: `${currentYear}-03-21`,
      type: 'holiday',
      description: 'University closed for Independence Day'
    },
    {
      id: 4,
      title: 'Mid-Semester Examinations',
      date: `${currentYear}-03-15`,
      endDate: `${currentYear}-03-26`,
      type: 'exam',
      description: 'Mid-semester examinations for all programmes'
    },
    {
      id: 5,
      title: 'Easter Break',
      date: `${currentYear}-04-02`,
      endDate: `${currentYear}-04-05`,
      type: 'holiday',
      description: 'University closed for Easter holidays'
    },
    {
      id: 6,
      title: 'Career Fair',
      date: `${currentYear}-04-15`,
      type: 'event',
      location: 'Main Campus Hall',
      description: 'Annual career fair with industry partners'
    },
    {
      id: 7,
      title: 'Last Day of Classes',
      date: `${currentYear}-05-14`,
      type: 'class',
      description: 'End of teaching for first semester'
    },
    {
      id: 8,
      title: 'Final Examinations',
      date: `${currentYear}-05-21`,
      endDate: `${currentYear}-06-04`,
      type: 'exam',
      description: 'Final examinations for all programmes'
    },
    {
      id: 9,
      title: 'Results Publication',
      date: `${currentYear}-06-25`,
      type: 'event',
      description: 'Publication of first semester examination results'
    },
    {
      id: 10,
      title: 'Winter Break',
      date: `${currentYear}-06-05`,
      endDate: `${currentYear}-07-15`,
      type: 'holiday',
      description: 'University winter break'
    },
    {
      id: 11,
      title: 'Second Semester Registration',
      date: `${currentYear}-07-15`,
      endDate: `${currentYear}-07-22`,
      type: 'registration',
      description: 'Registration for second semester'
    },
    {
      id: 12,
      title: 'Second Semester Begins',
      date: `${currentYear}-07-25`,
      type: 'class',
      description: 'Start of classes for second semester'
    },
    {
      id: 13,
      title: 'Africa Day',
      date: `${currentYear}-08-31`,
      type: 'holiday',
      description: 'University closed for Africa Day celebrations'
    },
    {
      id: 14,
      title: 'Mid-Semester Examinations',
      date: `${currentYear}-09-15`,
      endDate: `${currentYear}-09-26`,
      type: 'exam',
      description: 'Mid-semester examinations for all programmes'
    },
    {
      id: 15,
      title: 'Last Day of Classes',
      date: `${currentYear}-11-14`,
      type: 'class',
      description: 'End of teaching for second semester'
    },
    {
      id: 16,
      title: 'Final Examinations',
      date: `${currentYear}-11-21`,
      endDate: `${currentYear}-12-04`,
      type: 'exam',
      description: 'Final examinations for all programmes'
    },
    {
      id: 17,
      title: 'Graduation Ceremony',
      date: `${currentYear}-12-15`,
      type: 'graduation',
      location: 'Main Campus Auditorium',
      description: 'Annual graduation ceremony for all faculties'
    },
    {
      id: 18,
      title: 'Results Publication',
      date: `${currentYear}-12-22`,
      type: 'event',
      description: 'Publication of second semester examination results'
    },
    {
      id: 19,
      title: 'Christmas and New Year Break',
      date: `${currentYear}-12-23`,
      endDate: `${currentYear + 1}-01-03`,
      type: 'holiday',
      description: 'University closed for Christmas and New Year'
    }
  ];
};

// Month options
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Filter options
const eventTypes = [
  { value: 'all', label: 'All Events' },
  { value: 'class', label: 'Classes' },
  { value: 'exam', label: 'Examinations' },
  { value: 'holiday', label: 'Holidays' },
  { value: 'event', label: 'Events' },
  { value: 'graduation', label: 'Graduation' },
  { value: 'registration', label: 'Registration' }
];

const AcademicCalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    // Simulate API call with delay
    const timer = setTimeout(() => {
      setEvents(generateMockCalendarData());
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleMonthChange = (event: SelectChangeEvent) => {
    setSelectedMonth(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'class':
        return <SchoolIcon />;
      case 'exam':
        return <AssignmentIcon />;
      case 'holiday':
        return <HolidayVillageIcon />;
      case 'graduation':
        return <CelebrationIcon />;
      case 'registration':
        return <BusinessCenterIcon />;
      default:
        return <EventIcon />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'class':
        return 'primary';
      case 'exam':
        return 'error';
      case 'holiday':
        return 'success';
      case 'graduation':
        return 'secondary';
      case 'registration':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDateRange = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const startFormatted = start.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
    
    if (endDate) {
      const end = new Date(endDate);
      const endFormatted = end.toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
      return `${startFormatted} - ${endFormatted}`;
    }
    
    return startFormatted;
  };

  const filteredEvents = events.filter(event => {
    const eventMonth = new Date(event.date).getMonth().toString();
    const isMonthMatch = selectedMonth === 'all' || eventMonth === selectedMonth;
    const isTypeMatch = selectedType === 'all' || event.type === selectedType;
    
    return isMonthMatch && isTypeMatch;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

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
          Academic Calendar
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View important academic dates and events for the current year
        </Typography>
      </Box>
      
      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 0 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}>
              <InputLabel id="month-filter-label">Month</InputLabel>
              <Select
                labelId="month-filter-label"
                id="month-filter"
                value={selectedMonth}
                label="Month"
                onChange={handleMonthChange}
              >
                <MenuItem value="all">All Months</MenuItem>
                {months.map((month, index) => (
                  <MenuItem key={month} value={index.toString()}>{month}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0 } }}>
              <InputLabel id="type-filter-label">Event Type</InputLabel>
              <Select
                labelId="type-filter-label"
                id="type-filter"
                value={selectedType}
                label="Event Type"
                onChange={handleTypeChange}
              >
                {eventTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Paper>
      
      {/* Events List */}
      <Paper sx={{ width: '100%', borderRadius: 0 }}>
        <List>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <React.Fragment key={event.id}>
                {index > 0 && <Divider component="li" />}
                <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                  <ListItemIcon>
                    {getEventIcon(event.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="h6" component="span">
                          {event.title}
                        </Typography>
                        <Chip 
                          label={event.type.charAt(0).toUpperCase() + event.type.slice(1)} 
                          size="small" 
                          color={getEventColor(event.type) as any}
                          sx={{ borderRadius: 0 }}
                        />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'block' }}>
                          {formatDateRange(event.date, event.endDate)}
                        </Typography>
                        {event.location && (
                          <Typography component="span" variant="body2" sx={{ display: 'block', mt: 0.5 }}>
                            <b>Location:</b> {event.location}
                          </Typography>
                        )}
                        {event.description && (
                          <Typography component="span" variant="body2" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                            {event.description}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText 
                primary={<Typography variant="body1">No events found for the selected filters.</Typography>}
                secondary={<Typography variant="body2">Try changing the month or event type filter.</Typography>}
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default AcademicCalendarPage; 