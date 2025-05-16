import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Stack, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'secondary.main',
        color: 'white',
        pt: 6,
        pb: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' }, gap: 4 }}>
          {/* Logo and mission statement */}
          <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
            <Box display="flex" flexDirection="column" alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Box 
                component="img" 
                src="/ium-logo-small.svg" 
                alt="IUM Logo" 
                sx={{ 
                  height: 50, 
                  mb: 2,
                  filter: 'brightness(0) invert(1)'
                }} 
              />
              <Typography variant="body2" sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
                Empowering individuals through quality and affordable education since 1994.
              </Typography>
              <Stack 
                direction="row" 
                spacing={1}
                sx={{ mb: 2 }}
              >
                <IconButton 
                  aria-label="facebook" 
                  size="small"
                  sx={{ color: 'white', '&:hover': { bgcolor: 'primary.main' } }}
                >
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  aria-label="twitter" 
                  size="small"
                  sx={{ color: 'white', '&:hover': { bgcolor: 'primary.main' } }}
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  aria-label="instagram" 
                  size="small"
                  sx={{ color: 'white', '&:hover': { bgcolor: 'primary.main' } }}
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  aria-label="linkedin" 
                  size="small"
                  sx={{ color: 'white', '&:hover': { bgcolor: 'primary.main' } }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  aria-label="youtube" 
                  size="small"
                  sx={{ color: 'white', '&:hover': { bgcolor: 'primary.main' } }}
                >
                  <YouTubeIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
          </Box>

          {/* Quick links */}
          <Box sx={{ gridColumn: { xs: 'span 6', sm: 'span 4', md: 'span 2' } }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">Programs</Link>
              <Link href="#" color="inherit" underline="hover">Admissions</Link>
              <Link href="#" color="inherit" underline="hover">Student Portal</Link>
              <Link href="#" color="inherit" underline="hover">Campus Life</Link>
              <Link href="#" color="inherit" underline="hover">About IUM</Link>
            </Stack>
          </Box>

          {/* Resources */}
          <Box sx={{ gridColumn: { xs: 'span 6', sm: 'span 4', md: 'span 2' } }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">Library</Link>
              <Link href="#" color="inherit" underline="hover">Research</Link>
              <Link href="#" color="inherit" underline="hover">Calendar</Link>
              <Link href="#" color="inherit" underline="hover">FAQs</Link>
              <Link href="#" color="inherit" underline="hover">Careers</Link>
            </Stack>
          </Box>

          {/* Contact Information */}
          <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 4', md: 'span 4' } }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">21-31 Independence Avenue, Windhoek</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">+264 61 433 6000</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">info@ium.edu.na</Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 4 }} />
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="caption">
            © {currentYear} The International University of Management. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
              <Typography variant="caption">Privacy Policy</Typography>
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
              <Typography variant="caption">Terms of Use</Typography>
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
              <Typography variant="caption">Site Map</Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 