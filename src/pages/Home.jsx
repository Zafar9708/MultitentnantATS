import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
  Avatar,
  useMediaQuery,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Link,
  Divider,
  Paper,
  Stack,
  IconButton,
  useScrollTrigger,
  Slide,
  Fab,
  Fade
} from '@mui/material';
import {
  Business as BusinessIcon,
  Person as PersonIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Custom theme with modern color palette
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#757de8',
      dark: '#002984',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff5983',
      dark: '#bb002f',
      contrastText: '#fff',
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '"Inter"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontWeight: 800,
      fontSize: '3rem',
      lineHeight: 1.2,
      '@media (min-width:600px)': {
        fontSize: '4.5rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '12px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

// Scroll to top component
function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 32, right: 32 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const Home = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      title: "Candidate Management",
      description: "Track and manage all candidate applications in one centralized dashboard with advanced filtering and sorting capabilities.",
      icon: "👥",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Job Posting",
      description: "Create, publish, and manage job openings across multiple platforms with just a few clicks.",
      icon: "📝",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Interview Scheduling",
      description: "Automated scheduling with calendar integrations to coordinate interviews effortlessly.",
      icon: "📅",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time insights and reports on your hiring pipeline with customizable metrics.",
      icon: "📊",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "AI Resume Parser",
      description: "Automatically extract and categorize key information from resumes with our advanced AI technology.",
      icon: "📄",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Team Collaboration",
      description: "Share feedback, notes, and ratings with your hiring team in real-time.",
      icon: "💬",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const testimonials = [
    {
      quote: "HireOnBoard reduced our hiring time by 40% and improved our candidate experience dramatically. The platform is intuitive and packed with features.",
      name: "Sarah Johnson",
      position: "HR Director, TechCorp",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The onboarding automation saved us hundreds of hours in paperwork. Our new hires now complete all formalities before day one!",
      name: "Michael Chen",
      position: "Talent Acquisition, StartUp Inc",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "Best recruitment platform we've used. The analytics helped us identify bottlenecks we didn't even know existed in our hiring process.",
      name: "David Wilson",
      position: "CEO, Growth Ventures",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Companies Trust Us" },
    { value: "2M+", label: "Candidates Hired" },
    { value: "85%", label: "Faster Hiring" },
    { value: "4.9/5", label: "Customer Satisfaction" }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navigation Bar */}
        <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              <Avatar 
                src="/logo.png" 
                alt="HireOnBoard Logo"
                sx={{ width: 48, height: 48, mr: 2 }}
              />
              <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: 'primary.main' }}>
                HireOnBoard
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="outlined" 
                color="primary"
                startIcon={<BusinessIcon />}
                component={RouterLink}
                to="/vendor-login"
                sx={{ borderRadius: '50px' }}
              >
                Vendor Login
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<PersonIcon />}
                component={RouterLink}
                to="/login"
                sx={{ borderRadius: '50px' }}
              >
                Employer Login
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
          id="back-to-top-anchor"
          sx={{
            background: 'linear-gradient(135deg, rgba(63,81,181,0.9) 0%, rgba(100,115,255,0.9) 100%), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: isMobile ? 'scroll' : 'fixed',
            color: 'white',
            py: 12,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh'
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h1" component="h1" gutterBottom sx={{ mb: 4, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              Revolutionize Your Hiring Process
            </Typography>
            <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ mb: 6, maxWidth: '800px', mx: 'auto', opacity: 0.9 }}>
              The all-in-one platform that transforms how you attract, hire, and onboard top talent with cutting-edge technology.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
              <Button 
                variant="contained" 
                color="secondary"
                size="large"
                sx={{ px: 6, py: 2, borderRadius: '50px' }}
                component={RouterLink}
                to="/register"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outlined" 
                color="inherit"
                size="large"
                sx={{ px: 6, py: 2, borderRadius: '50px' }}
                component={RouterLink}
                to="/demo"
              >
                Request Demo
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Stats Section */}
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'transparent' }}>
                    <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 2 }}>
            Powerful Features
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 8, maxWidth: '700px', mx: 'auto' }}>
            Everything you need to streamline your recruitment and onboarding processes
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={feature.image}
                    alt={feature.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {feature.icon} {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button 
                      variant="text" 
                      color="primary" 
                      fullWidth
                      component={RouterLink}
                      to="/features"
                      endIcon={<KeyboardArrowUpIcon sx={{ transform: 'rotate(45deg)' }} />}
                    >
                      Learn more
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Testimonials Section */}
        <Box sx={{ py: 10, bgcolor: 'primary.light' }}>
          <Container maxWidth="lg">
            <Typography variant="h2" align="center" gutterBottom sx={{ mb: 2, color: 'primary.contrastText' }}>
              Trusted by Industry Leaders
            </Typography>
            <Typography variant="h5" align="center" sx={{ mb: 8, maxWidth: '700px', mx: 'auto', color: 'primary.contrastText', opacity: 0.9 }}>
              Don't just take our word for it. Here's what our customers say about us.
            </Typography>
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: 3, bgcolor: 'background.paper' }}>
                    <Typography variant="body1" fontStyle="italic" sx={{ mb: 3 }}>
                      "{testimonial.quote}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                      <Avatar src={testimonial.avatar} alt={testimonial.name} sx={{ width: 56, height: 56, mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.position}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{ py: 12, background: 'linear-gradient(135deg, #f50057 0%, #ff5983 100%)', color: 'white' }}>
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom sx={{ mb: 3 }}>
              Ready to Transform Your Hiring?
            </Typography>
            <Typography variant="h5" sx={{ mb: 6, maxWidth: '700px', mx: 'auto', opacity: 0.9 }}>
              Join thousands of companies who have modernized their recruitment with HireOnBoard
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
              <Button
                variant="contained"
                color="inherit"
                size="large"
                sx={{ px: 6, py: 2, borderRadius: '50px', color: 'secondary.main' }}
                component={RouterLink}
                to="/register"
              >
                Get Started for Free
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ px: 6, py: 2, borderRadius: '50px' }}
                component={RouterLink}
                to="/demo"
              >
                Schedule a Demo
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Footer */}
        <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'white', pt: 8, pb: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={6}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar 
                    src="/logo-white.png" 
                    alt="Logo"
                    sx={{ width: 50, height: 50, mr: 2, bgcolor: 'primary.main' }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    HireOnBoard
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
                  The modern hiring and onboarding platform that helps companies attract, hire, and retain top talent.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <IconButton aria-label="Facebook" color="inherit">
                    <Facebook />
                  </IconButton>
                  <IconButton aria-label="Twitter" color="inherit">
                    <Twitter />
                  </IconButton>
                  <IconButton aria-label="LinkedIn" color="inherit">
                    <LinkedIn />
                  </IconButton>
                  <IconButton aria-label="Instagram" color="inherit">
                    <Instagram />
                  </IconButton>
                </Stack>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Product
                </Typography>
                <Stack spacing={1}>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Features</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Pricing</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Integrations</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Updates</Link>
                </Stack>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Solutions
                </Typography>
                <Stack spacing={1}>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Enterprise</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Startups</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Recruitment Agencies</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>HR Teams</Link>
                </Stack>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Resources
                </Typography>
                <Stack spacing={1}>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Blog</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Guides</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Help Center</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Webinars</Link>
                </Stack>
              </Grid>
              <Grid item xs={6} md={2}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Company
                </Typography>
                <Stack spacing={1}>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>About Us</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Careers</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Contact</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>Partners</Link>
                </Stack>
              </Grid>
            </Grid>
            <Divider sx={{ my: 6, borderColor: 'rgba(255,255,255,0.1)' }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  © {new Date().getFullYear()} HireOnBoard. All rights reserved.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>Privacy Policy</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>Terms of Service</Link>
                  <Link href="#" variant="body2" color="inherit" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>Cookie Policy</Link>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Scroll to top button */}
        <ScrollTop>
          <Fab color="secondary" size="medium" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Box>
    </ThemeProvider>
  );
};

export default Home;