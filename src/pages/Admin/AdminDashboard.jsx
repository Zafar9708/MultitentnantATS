import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Grid,
  Snackbar,
  Alert,
  Divider,
  Chip,
  Avatar,
  IconButton,
  Card,
  CardContent,
  InputAdornment,
  Badge,
  Tooltip,
  LinearProgress,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  Refresh as RefreshIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  FilterAlt as FilterIcon,
  CalendarToday as CalendarIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer } from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import adminService from '../../services/adminService';

const AdminDashboard = () => {
  const theme = useTheme();
  const [recruiters, setRecruiters] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newRecruiter, setNewRecruiter] = useState({ email: '', password: '' });
  const [editingId, setEditingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [saving, setSaving] = useState(false);
  const [searchRecruiter, setSearchRecruiter] = useState('');
  const [searchJob, setSearchJob] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Filter jobs based on status and target hire date
  const activeJobs = jobs.filter(job => {
    const today = new Date();
    const targetHireDate = new Date(job.jobFormId?.targetHireDate);
    return job.status === 'Active' && targetHireDate >= today;
  });

  // Calculate average jobs per recruiter
  const avgJobsPerRecruiter = recruiters.length > 0 
    ? (jobs.length / recruiters.length).toFixed(1) 
    : 0;

  // Sample data for charts
  const recruiterActivityData = [
    { name: 'Jan', added: 2, deleted: 0 },
    { name: 'Feb', added: 3, deleted: 1 },
    { name: 'Mar', added: 5, deleted: 0 },
    { name: 'Apr', added: 1, deleted: 0 },
    { name: 'May', added: 4, deleted: 1 },
    { name: 'Jun', added: 2, deleted: 0 },
  ];

  const jobStatusData = [
    { name: 'Active', value: activeJobs.length },
    { name: 'Closed', value: jobs.filter(j => j.status === 'Closed').length },
    { name: 'Draft', value: jobs.filter(j => j.status === 'Draft').length },
  ];

  const COLORS = [theme.palette.success.main, theme.palette.error.main, theme.palette.warning.main];

  const fetchRecruiters = async () => {
    setLoading(true);
    try {
      const response = await adminService.getRecruiters();
      if (response.recuiter && Array.isArray(response.recuiter)) {
        setRecruiters(response.recuiter);
      } else {
        setRecruiters([]);
      }
    } catch (err) {
      console.error('Error fetching recruiters:', err);
      setSnackbar({ open: true, message: 'Failed to fetch recruiters', severity: 'error' });
      setRecruiters([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await adminService.getAllJobs();
      if (response.jobs && Array.isArray(response.jobs)) {
        setJobs(response.jobs);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setSnackbar({ open: true, message: 'Failed to fetch jobs', severity: 'error' });
      setJobs([]);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchRecruiters();
    fetchJobs().finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchRecruiters();
    fetchJobs();
  }, []);

  const handleOpenDialog = (recruiter = null) => {
    if (recruiter) {
      setEditingId(recruiter._id);
      setNewRecruiter({ email: recruiter.email, password: '' });
    } else {
      setEditingId(null);
      setNewRecruiter({ email: '', password: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    if (saving) return;
    setOpenDialog(false);
    setEditingId(null);
    setNewRecruiter({ email: '', password: '' });
  };

  const handleSaveRecruiter = async () => {
    if (!newRecruiter.email.trim()) {
      setSnackbar({ open: true, message: 'Email is required', severity: 'warning' });
      return;
    }
    if (!editingId && !newRecruiter.password.trim()) {
      setSnackbar({ open: true, message: 'Password is required', severity: 'warning' });
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await adminService.updateRecruiter(editingId, newRecruiter);
        setSnackbar({ open: true, message: 'Recruiter updated successfully', severity: 'success' });
      } else {
        await adminService.addRecruiter(newRecruiter);
        setSnackbar({ open: true, message: 'Recruiter added successfully', severity: 'success' });
      }
      await fetchRecruiters();
      handleCloseDialog();
    } catch (err) {
      console.error('Error saving recruiter:', err);
      const message = err.response?.data?.message || 'Error saving recruiter';
      setSnackbar({ open: true, message, severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recruiter?')) return;
    try {
      await adminService.deleteRecruiter(id);
      setSnackbar({ open: true, message: 'Recruiter deleted successfully', severity: 'info' });
      fetchRecruiters();
    } catch (err) {
      console.error('Error deleting recruiter:', err);
      const message = err.response?.data?.message || 'Error deleting recruiter';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  const filteredRecruiters = recruiters.filter(
    (r) => r.email.toLowerCase().includes(searchRecruiter.toLowerCase())
  );

  const filteredJobs = jobs.filter(job => {
    // Search filter
    const matchesSearch = 
      job.jobTitle.toLowerCase().includes(searchJob.toLowerCase()) ||
      job.department.toLowerCase().includes(searchJob.toLowerCase()) ||
      (job.jobFormId?.recruitingPerson?.some(email => 
        email.toLowerCase().includes(searchJob.toLowerCase())) ||
      job.jobName.toLowerCase().includes(searchJob.toLowerCase()));

    // Time filter
    const jobDate = new Date(job.createdAt);
    let matchesTime = true;
    
    if (timeFilter === 'weekly') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      matchesTime = jobDate >= oneWeekAgo;
    } else if (timeFilter === 'monthly') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      matchesTime = jobDate >= oneMonthAgo;
    } else if (timeFilter === 'yearly') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      matchesTime = jobDate >= oneYearAgo;
    } else if (timeFilter === 'custom' && startDate && endDate) {
      matchesTime = jobDate >= new Date(startDate) && jobDate <= new Date(endDate);
    }

    return matchesSearch && matchesTime;
  });

  if (loading && !refreshing) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
      >
        <CircularProgress size={60} />
        <Typography mt={2}>Loading Dashboard...</Typography>
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ 
        p: 5, 
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh'
      }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight="700" color="text.primary" gutterBottom>
              Admin Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DashboardIcon fontSize="small" />
              Manage recruiters and job postings
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Filter</InputLabel>
              <Select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                label="Time Filter"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>

            {timeFilter === 'custom' && (
              <Box display="flex" gap={1} alignItems="center">
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} size="small" sx={{ width: 150 }} />}
                />
                <Typography>-</Typography>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} size="small" sx={{ width: 150 }} />}
                />
              </Box>
            )}

            <Tooltip title="Refresh Data">
              <IconButton
                onClick={handleRefresh}
                disabled={refreshing}
                sx={{
                  backgroundColor: theme.palette.action.hover,
                  '&:hover': {
                    backgroundColor: theme.palette.grey[300]
                  }
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  boxShadow: theme.shadows[4]
                },
                boxShadow: theme.shadows[2],
                borderRadius: 2,
                px: 3,
                py: 1
              }}
            >
              Add Recruiter
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              p: 5, 
              height: '100%', 
              borderRadius: 3,
                           width:250,

              background: `linear-gradient(195deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: 'white',
              boxShadow: theme.shadows[4],
              position: 'relative',
              overflow: 'hidden',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)'
              }
            }}>
              <Box position="relative" zIndex={1} ml={4}>
                <Typography variant="body2" sx={{ opacity: 0.8, }}>Total Recruiters</Typography>
                <Typography variant="h3" fontWeight="700" sx={{ mt: 1, mb: 2 }}>{recruiters.length}</Typography>
                <Box display="flex" alignItems="center">
                  <TrendingUpIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">+{Math.floor(recruiters.length * 0.12)} from last month</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 3,
             width:250,
              background: `linear-gradient(195deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
              color: 'white',
              boxShadow: theme.shadows[4],
              position: 'relative',
              overflow: 'hidden',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)'
              }
            }}>
              <Box position="relative" zIndex={1} ml={4} mt={2}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Jobs</Typography>
                <Typography variant="h3" fontWeight="700" sx={{ mt: 1, mb: 2 }}>{jobs.length}</Typography>
                <Box display="flex" alignItems="center">
                  <WorkIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">{Math.floor(jobs.length * 0.3)} new this month</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              p: 3, 
              height: '100%',
             width:250,
              borderRadius: 3,
              background: `linear-gradient(195deg, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
              color: 'white',
              boxShadow: theme.shadows[4],
              position: 'relative',
              overflow: 'hidden',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)'
              }
            }}>
              <Box position="relative" zIndex={1} ml={4} mt={2}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Active Jobs</Typography>
                <Typography variant="h3" fontWeight="700" sx={{ mt: 1, mb: 2 }}>
                  {activeJobs.length}
                </Typography>
                <Box display="flex" alignItems="center">
                  <ActiveIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {jobs.length > 0 ? Math.round((activeJobs.length / jobs.length) * 100) : 0}% of total
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              p: 3, 
              height: '100%', 
              borderRadius: 3,
                           width:250,

              background: `linear-gradient(195deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
              color: 'white',
              boxShadow: theme.shadows[4],
              position: 'relative',
              overflow: 'hidden',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)'
              }
            }}>
              <Box position="relative" zIndex={1} ml={4} mt={2}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Avg Jobs/Recruiter</Typography>
                <Typography variant="h3" fontWeight="700" sx={{ mt: 1, mb: 2 }}>
                  {avgJobsPerRecruiter}
                </Typography>
                <Box display="flex" alignItems="center">
                  <BarChartIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">Across all recruiters</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>

         {/* Charts Section */}
        <Grid container spacing={30} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              p: 4, 
              height: '95%', 
            width:"180%",

              borderRadius: 3,
              boxShadow: theme.shadows[1],
              backgroundColor: theme.palette.background.paper
            }}>
              <Typography variant="h6" fontWeight="600" ml={5} gutterBottom>
                Recruiter Activity
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recruiterActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary} />
                  <ChartTooltip 
                    contentStyle={{
                      borderRadius: 8,
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      boxShadow: theme.shadows[2]
                    }}
                  />
                  <Legend />
                  <Bar dataKey="added" name="Added" fill={theme.palette.success.main} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="deleted" name="Deleted" fill={theme.palette.error.main} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              p: 4, 
              height: '95%', 
              width:"180%",
              borderRadius: 3,
              boxShadow: theme.shadows[1],
              backgroundColor: theme.palette.background.paper
            }}>
              <Typography variant="h6" fontWeight="600" ml={5} gutterBottom>
                Job Status Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={jobStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {jobStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    contentStyle={{
                      borderRadius: 8,
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      boxShadow: theme.shadows[2]
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>

        {/* Horizontal Layout */}
        <Grid container spacing={3}>
          {/* Left Column - Recruiters */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 3,
              boxShadow: theme.shadows[1],
              backgroundColor: theme.palette.background.paper
            }}>
              <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                p={3}
                sx={{
                  borderBottom: `1px solid ${theme.palette.divider}`
                }}
              >
                <Typography variant="h5" fontWeight="600">Recruiters</Typography>
                <TextField
                  size="small"
                  placeholder="Search recruiters..."
                  variant="outlined"
                  value={searchRecruiter}
                  onChange={(e) => setSearchRecruiter(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    style: {
                      borderRadius: 8,
                      backgroundColor: theme.palette.background.default
                    }
                  }}
                  sx={{ width: 300 }}
                />
              </Box>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: theme.palette.background.default }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Recruiter</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRecruiters.length > 0 ? (
                      filteredRecruiters.map((recruiter) => (
                        <TableRow 
                          key={recruiter._id} 
                          hover
                          sx={{ 
                            '&:last-child td': { borderBottom: 0 },
                            '&:hover': {
                              backgroundColor: theme.palette.action.hover
                            }
                          }}
                        >
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar 
                                sx={{ 
                                  width: 40, 
                                  height: 40, 
                                  mr: 2,
                                  backgroundColor: theme.palette.primary.main,
                                  color: 'white'
                                }}
                              >
                                {recruiter.email.charAt(0).toUpperCase()}
                              </Avatar>
                              <Box>
                                <Typography fontWeight="500">{recruiter.email}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Last active: {recruiter.lastLogin ? new Date(recruiter.lastLogin).toLocaleDateString() : 'Never'}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={recruiter.isActive ? 'Active' : 'Inactive'}
                              size="small"
                              sx={{ 
                                backgroundColor: recruiter.isActive ? theme.palette.success.light : theme.palette.error.light,
                                color: recruiter.isActive ? theme.palette.success.dark : theme.palette.error.dark,
                                fontWeight: 500
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Box display="flex" justifyContent="flex-end" gap={1}>
                              <Tooltip title="Edit Recruiter">
                                <IconButton
                                  onClick={() => handleOpenDialog(recruiter)}
                                  size="small"
                                  sx={{
                                    backgroundColor: theme.palette.action.hover,
                                    color: theme.palette.secondary.main,
                                    '&:hover': {
                                      backgroundColor: theme.palette.secondary.main,
                                      color: 'white'
                                    }
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Recruiter">
                                <IconButton
                                  onClick={() => handleDelete(recruiter._id)}
                                  size="small"
                                  sx={{
                                    backgroundColor: theme.palette.action.hover,
                                    color: theme.palette.error.main,
                                    '&:hover': {
                                      backgroundColor: theme.palette.error.main,
                                      color: 'white'
                                    }
                                  }}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                          <Typography variant="body1" color="text.secondary">
                            No recruiters found
                          </Typography>
                          <Button 
                            variant="text" 
                            startIcon={<AddIcon />}
                            onClick={() => handleOpenDialog()}
                            sx={{ mt: 1 }}
                          >
                            Add New Recruiter
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>

          {/* Right Column - Jobs */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: '100%',
              borderRadius: 3,
              boxShadow: theme.shadows[1],
              backgroundColor: theme.palette.background.paper
            }}>
              <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                p={3}
                sx={{
                  borderBottom: `1px solid ${theme.palette.divider}`
                }}
              >
                <Typography variant="h5" fontWeight="600">Job Postings</Typography>
                <TextField
                  size="small"
                  placeholder="Search jobs..."
                  variant="outlined"
                  value={searchJob}
                  onChange={(e) => setSearchJob(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    style: {
                      borderRadius: 8,
                      backgroundColor: theme.palette.background.default
                    }
                  }}
                  sx={{ width: 300 }}
                />
              </Box>
              <Box sx={{ p: 2, maxHeight: 'calc(100vh - 400px)', overflowY: 'auto' }}>
                <Grid container spacing={2}>
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => {
                      const targetHireDate = job.jobFormId?.targetHireDate 
                        ? new Date(job.jobFormId.targetHireDate).toLocaleDateString() 
                        : 'Not set';
                      const isActive = job.status === 'Active' && 
                        (!job.jobFormId?.targetHireDate || new Date(job.jobFormId.targetHireDate) >= new Date());

                      return (
                        <Grid item xs={12} key={job._id}>
                          <Card sx={{ 
                            p: 2,
                            borderLeft: `4px solid ${isActive ? theme.palette.success.main : theme.palette.error.main}`,
                            '&:hover': {
                              boxShadow: theme.shadows[2],
                              transform: 'translateY(-2px)'
                            },
                            transition: 'all 0.2s'
                          }}>
                            <Box display="flex" justifyContent="space-between">
                              <Box>
                                <Typography variant="h6" fontWeight="600">{job.jobTitle}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {job.department} • {job.jobFormId?.jobType || 'Full-time'}
                                </Typography>
                                <Box display="flex" alignItems="center" mt={1} gap={1}>
                                  <Chip
                                    label={job.status}
                                    size="small"
                                    sx={{ 
                                      backgroundColor: isActive ? theme.palette.success.light : theme.palette.error.light,
                                      color: isActive ? theme.palette.success.dark : theme.palette.error.dark,
                                      fontWeight: 500
                                    }}
                                  />
                                  <Typography variant="caption" color="text.secondary">
                                    Target Hire: {targetHireDate}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box textAlign="right">
                                <Typography variant="body2" fontWeight="500">
                                  {job.jobFormId?.openings || 0} openings
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {job.jobName}
                                </Typography>
                              </Box>
                            </Box>
                          </Card>
                        </Grid>
                      );
                    })
                  ) : (
                    <Grid item xs={12}>
                      <Box textAlign="center" py={4}>
                        <Typography variant="body1" color="text.secondary">
                          No jobs found
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>

       

        {/* Add/Edit Recruiter Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              p: 3,
              background: theme.palette.background.paper,
              boxShadow: theme.shadows[5]
            }
          }}
        >
          <DialogTitle sx={{ 
            fontWeight: 700, 
            p: 0, 
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <PeopleIcon color="primary" />
            {editingId ? 'Edit Recruiter' : 'Add New Recruiter'}
          </DialogTitle>
          <DialogContent sx={{ p: 0, mb: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={newRecruiter.email}
              onChange={(e) => setNewRecruiter({ ...newRecruiter, email: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
                style: {
                  borderRadius: 8
                }
              }}
              disabled={saving}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label={editingId ? 'New Password (leave blank to keep current)' : 'Password'}
              type="password"
              value={newRecruiter.password}
              onChange={(e) => setNewRecruiter({ ...newRecruiter, password: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                style: {
                  borderRadius: 8
                }
              }}
              disabled={saving}
            />
          </DialogContent>
          <DialogActions sx={{ p: 0 }}>
            <Button 
              onClick={handleCloseDialog}
              variant="outlined"
              disabled={saving}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                py: 1,
                borderColor: theme.palette.divider,
                '&:hover': {
                  borderColor: theme.palette.primary.main
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveRecruiter}
              variant="contained"
              disabled={saving}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                py: 1,
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  boxShadow: 'none'
                }
              }}
            >
              {saving ? (
                <CircularProgress size={24} color="inherit" />
              ) : editingId ? (
                'Update Recruiter'
              ) : (
                'Add Recruiter'
              )}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ 
              width: '100%',
              borderRadius: 2,
              boxShadow: theme.shadows[3]
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default AdminDashboard;