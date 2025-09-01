// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Alert,
//   Button,
//   Avatar,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   Switch,
//   TextField,
//   InputAdornment,
//   MenuItem,
//   Select,
//   Divider,
//   Tooltip,
//   LinearProgress,
//   useTheme,
//   Badge
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Visibility as VisibilityIcon,
//   Search as SearchIcon,
//   FilterList as FilterIcon,
//   CheckCircle as ActiveIcon,
//   Cancel as InactiveIcon,
//   MoreVert as MoreIcon,
//   Notifications as NotificationsIcon,
//   DateRange as DateRangeIcon,
//   Refresh as RefreshIcon,
//   BarChart as BarChartIcon,
//   TrendingUp as TrendingUpIcon,
//   People as PeopleIcon,
//   Business as BusinessIcon,
//   Settings as SettingsIcon,
  
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip as ChartTooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   PieChart,
//   Pie,
//   Cell
// } from 'recharts';
// import {
//   getTenants,
//   createTenant,
//   updateTenantStatus,
//   deleteTenant
// } from '../../services/tenantService';

// const SuperAdminDashboard = () => {
//   const theme = useTheme();
//   const [tenants, setTenants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [tenantToDelete, setTenantToDelete] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [timeFilter, setTimeFilter] = useState('month');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [refreshing, setRefreshing] = useState(false);
//   const [addDialogOpen, setAddDialogOpen] = useState(false);
//   const [newTenant, setNewTenant] = useState({
//     name: '',
//     domain: '',
//     email: '',
//     adminPassword: ''
//   });
//   const [formErrors, setFormErrors] = useState({});
//   const navigate = useNavigate();

//   // Sample data
//   const activityData = [
//     { name: 'Jan', active: 12, inactive: 5 },
//     { name: 'Feb', active: 18, inactive: 3 },
//     { name: 'Mar', active: 22, inactive: 2 },
//     { name: 'Apr', active: 25, inactive: 1 },
//     { name: 'May', active: 28, inactive: 0 },
//     { name: 'Jun', active: 32, inactive: 1 },
//   ];

//   const growthData = [
//     { name: 'Q1', growth: 12 },
//     { name: 'Q2', growth: 19 },
//     { name: 'Q3', growth: 15 },
//     { name: 'Q4', growth: 22 },
//   ];

//   const statusData = [
//     { name: 'Active', value: 75 },
//     { name: 'Inactive', value: 25 },
//   ];

//   const COLORS = [theme.palette.success.main, theme.palette.error.main];

//   const fetchTenants = async () => {
//     try {
//       setLoading(true);
//       const tenants = await getTenants();
//       setTenants(tenants);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchTenants();
//   }, []);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchTenants();
//   };

//   const filteredTenants = tenants.filter(tenant => {
//     const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          tenant.domain.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || 
//                         (statusFilter === 'active' && tenant.isActive) || 
//                         (statusFilter === 'inactive' && !tenant.isActive);
//     return matchesSearch && matchesStatus;
//   });

//   const totalTenants = tenants.length;
//   const activeTenants = tenants.filter(t => t.isActive).length;
//   const inactiveTenants = tenants.filter(t => !t.isActive).length;

//   const handleEditTenant = (tenantId) => navigate(`/superadmin/tenants/edit/${tenantId}`);
//   const handleViewTenant = (tenantId) => navigate(`/superadmin/tenants/${tenantId}`);

//   const confirmDelete = (tenant) => {
//     setTenantToDelete(tenant);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteTenant = async () => {
//     try {
//       await deleteTenant(tenantToDelete._id);
//       setDeleteDialogOpen(false);
//       setTenants(tenants.filter(t => t._id !== tenantToDelete._id));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const toggleStatus = async (tenantId, currentStatus) => {
//     try {
//       await updateTenantStatus(tenantId, !currentStatus);
//       setTenants(tenants.map(tenant => 
//         tenant._id === tenantId ? { ...tenant, isActive: !currentStatus } : tenant
//       ));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleAddDialogOpen = () => {
//     setAddDialogOpen(true);
//   };

//   const handleAddDialogClose = () => {
//     setAddDialogOpen(false);
//     setNewTenant({
//       name: '',
//       domain: '',
//       email: '',
//       adminPassword: ''
//     });
//     setFormErrors({});
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTenant(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     const errors = {};
//     if (!newTenant.name.trim()) errors.name = 'Name is required';
//     if (!newTenant.domain.trim()) errors.domain = 'Domain is required';
//     if (!newTenant.email.trim()) {
//       errors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newTenant.email)) {
//       errors.email = 'Email is invalid';
//     }
//     if (!newTenant.adminPassword) {
//       errors.adminPassword = 'Password is required';
//     } else if (newTenant.adminPassword.length < 8) {
//       errors.adminPassword = 'Password must be at least 8 characters';
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       try {
//         await createTenant(newTenant);
//         handleAddDialogClose();
//         fetchTenants();
//       } catch (err) {
//         setError(err.message);
//       }
//     }
//   };

//   if (loading && !refreshing) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Alert severity="error" sx={{ mb: 3, mx: 3 }} onClose={() => setError(null)}>
//         {error}
//       </Alert>
//     );
//   }

//   return (
//     <Box sx={{ 
//       p: 3, 
//       height: '100%', 
//       minHeight: '100vh', 
//       backgroundColor: theme.palette.background.default,
//       backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'
//     }}>
//       {/* Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
//         <Box>
//           <Typography variant="h4" fontWeight="700" color="text.primary" sx={{ mb: 0.5 }}>
//             Organization Management
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <BusinessIcon fontSize="small" />
//             Manage all admin accounts and configurations
//           </Typography>
//         </Box>
//         <Box display="flex" alignItems="center" gap={2}>
//           <Button
//             variant="contained"
//             startIcon={<RefreshIcon />}
//             onClick={handleRefresh}
//             disabled={refreshing}
//             sx={{
//               backgroundColor: theme.palette.grey[200],
//               color: theme.palette.text.primary,
//               '&:hover': {
//                 backgroundColor: theme.palette.grey[300]
//               }
//             }}
//           >
//             Refresh
//           </Button>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={handleAddDialogOpen}
//             sx={{
//               backgroundColor: theme.palette.primary.main,
//               color: 'white',
//               '&:hover': {
//                 backgroundColor: theme.palette.primary.dark,
//                 boxShadow: theme.shadows[4]
//               },
//               boxShadow: theme.shadows[2]
//             }}
//           >
//             ADD ADMIN 
//           </Button>
//         </Box>
//       </Box>

//       <Grid container spacing={3}>
//         {/* Left Column - 70% width */}
//         <Grid item xs={12} md={8}>
//           {/* Stats Cards */}
//           <Grid container spacing={3} sx={{ mb: 3 }}>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ 
//                 p: 2, 
//                 height: '100%', 
//                 borderRadius: 3,
//                 background: `linear-gradient(195deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//                 color: 'white',
//                 boxShadow: theme.shadows[4],
//                 position: 'relative',
//                 overflow: 'hidden',
//                 '&:before': {
//                   content: '""',
//                   position: 'absolute',
//                   top: '-50px',
//                   right: '-50px',
//                   width: '120px',
//                   height: '120px',
//                   borderRadius: '50%',
//                   background: 'rgba(255,255,255,0.1)'
//                 }
//               }}>
//                 <Box position="relative" zIndex={1}>
//                   <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Tenants</Typography>
//                   <Typography variant="h3" fontWeight="700" sx={{ mt: 1, mb: 2 }}>{totalTenants}</Typography>
//                   <Box display="flex" alignItems="center">
//                     <TrendingUpIcon sx={{ mr: 1 }} />
//                     <Typography variant="body2">+12% from last month</Typography>
//                   </Box>
//                 </Box>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ 
//                 p: 2, 
//                 height: '100%', 
//                 borderRadius: 3,
//                 background: `linear-gradient(195deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
//                 color: 'white',
//                 boxShadow: theme.shadows[4],
//                 position: 'relative',
//                 overflow: 'hidden',
//                 '&:before': {
//                   content: '""',
//                   position: 'absolute',
//                   top: '-50px',
//                   right: '-50px',
//                   width: '120px',
//                   height: '120px',
//                   borderRadius: '50%',
//                   background: 'rgba(255,255,255,0.1)'
//                 }
//               }}>
//                 <Box position="relative" zIndex={1}>
//                   <Typography variant="body2" sx={{ opacity: 0.8 }}>Active Tenants</Typography>
//                   <Typography variant="h3" fontWeight="700" sx={{ mt: 1, mb: 2 }}>{activeTenants}</Typography>
//                   <Box display="flex" alignItems="center">
//                     <ActiveIcon sx={{ mr: 1 }} />
//                     <Typography variant="body2">{Math.round((activeTenants/totalTenants)*100)}% of total</Typography>
//                   </Box>
//                 </Box>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ 
//                 p: 2, 
//                 height: '100%', 
//                 borderRadius: 3,
//                 background: `linear-gradient(195deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
//                 color: 'white',
//                 boxShadow: theme.shadows[4],
//                 position: 'relative',
//                 overflow: 'hidden',
//                 '&:before': {
//                   content: '""',
//                   position: 'absolute',
//                   top: '-50px',
//                   right: '-50px',
//                   width: '120px',
//                   height: '120px',
//                   borderRadius: '50%',
//                   background: 'rgba(255,255,255,0.1)'
//                 }
//               }}>
//                 <Box position="relative" zIndex={1}>
//                   <Typography variant="body2" sx={{ opacity: 0.8 }}>Inactive Tenants</Typography>
//                   <Typography variant="h3" fontWeight="700" sx={{ mt: 1, mb: 2 }}>{inactiveTenants}</Typography>
//                   <Box display="flex" alignItems="center">
//                     <InactiveIcon sx={{ mr: 1 }} />
//                     <Typography variant="body2">{Math.round((inactiveTenants/totalTenants)*100)}% of total</Typography>
//                   </Box>
//                 </Box>
//               </Card>
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Card sx={{ 
//                 p: 2, 
//                 height: '100%', 
//                 borderRadius: 3,
//                 background: `linear-gradient(195deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
//                 color: 'white',
//                 boxShadow: theme.shadows[4],
//                 position: 'relative',
//                 overflow: 'hidden',
//                 '&:before': {
//                   content: '""',
//                   position: 'absolute',
//                   top: '-50px',
//                   right: '-50px',
//                   width: '120px',
//                   height: '120px',
//                   borderRadius: '50%',
//                   background: 'rgba(255,255,255,0.1)'
//                 }
//               }}>
//                 <Box position="relative" zIndex={1}>
//                   <Typography variant="body2" sx={{ opacity: 0.8 }}>Growth Rate</Typography>
//                   <Typography variant="h3" fontWeight="700" sx={{ mt: 1, mb: 2 }}>+22%</Typography>
//                   <Box display="flex" alignItems="center">
//                     <BarChartIcon sx={{ mr: 1 }} />
//                     <Typography variant="body2">Quarterly increase</Typography>
//                   </Box>
//                 </Box>
//               </Card>
//             </Grid>
//           </Grid>

//           {/* Search and Filter Row */}
//           <Card sx={{ 
//             p: 2, 
//             mb: 3, 
//             borderRadius: 3,
//             boxShadow: theme.shadows[1],
//             backgroundColor: theme.palette.background.paper,
//             border: `1px solid ${theme.palette.divider}`
//           }}>
//             <Grid container spacing={2} alignItems="center">
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   placeholder="Search tenants by name or domain..."
//                   variant="outlined"
//                   size="small"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <SearchIcon color="action" />
//                       </InputAdornment>
//                     ),
//                     style: {
//                       borderRadius: 8,
//                       backgroundColor: theme.palette.background.default
//                     }
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={6} md={3}>
//                 <TextField
//                   select
//                   fullWidth
//                   value={timeFilter}
//                   onChange={(e) => setTimeFilter(e.target.value)}
//                   size="small"
//                   variant="outlined"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <DateRangeIcon color="action" fontSize="small" />
//                       </InputAdornment>
//                     ),
//                     style: {
//                       borderRadius: 8,
//                       backgroundColor: theme.palette.background.default
//                     }
//                   }}
//                 >
//                   <MenuItem value="24h">Last 24 Hours</MenuItem>
//                   <MenuItem value="week">Last Week</MenuItem>
//                   <MenuItem value="month">Last Month</MenuItem>
//                   <MenuItem value="year">Last Year</MenuItem>
//                   <MenuItem value="all">All Time</MenuItem>
//                 </TextField>
//               </Grid>
//               <Grid item xs={6} md={3}>
//                 <TextField
//                   select
//                   fullWidth
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   size="small"
//                   variant="outlined"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <FilterIcon color="action" fontSize="small" />
//                       </InputAdornment>
//                     ),
//                     style: {
//                       borderRadius: 8,
//                       backgroundColor: theme.palette.background.default
//                     }
//                   }}
//                 >
//                   <MenuItem value="all">All Status</MenuItem>
//                   <MenuItem value="active">Active Only</MenuItem>
//                   <MenuItem value="inactive">Inactive Only</MenuItem>
//                 </TextField>
//               </Grid>
//             </Grid>
//           </Card>

//           {/* Activity Charts */}
//           <Grid container spacing={4} sx={{ mb: 3 }}>
//             <Grid item xs={12} md={6}>
//               <Card sx={{ 
//                 p: 5, 
//                 height: 320, 
//                 borderRadius: 3,
//                 boxShadow: theme.shadows[1],
//                 backgroundColor: theme.palette.background.paper,
//                 border: `1px solid ${theme.palette.divider}`
//               }}>
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                   <Typography variant="h6" fontWeight="600">Tenant Activity</Typography>
//                   <Box display="flex" alignItems="center">
//                     <Chip 
//                       label="Monthly" 
//                       size="small" 
//                       sx={{ mr: 1, backgroundColor: theme.palette.action.selected }}
//                     />
//                     <IconButton size="small">
//                       <MoreIcon />
//                     </IconButton>
//                   </Box>
//                 </Box>
//                 <ResponsiveContainer width="110%" height="85%">
//                   <AreaChart data={activityData}>
//                     <defs>
//                       <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor={theme.palette.success.main} stopOpacity={0.8}/>
//                         <stop offset="95%" stopColor={theme.palette.success.main} stopOpacity={0.1}/>
//                       </linearGradient>
//                       <linearGradient id="colorInactive" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor={theme.palette.error.main} stopOpacity={0.8}/>
//                         <stop offset="95%" stopColor={theme.palette.error.main} stopOpacity={0.1}/>
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                     <XAxis 
//                       dataKey="name" 
//                       stroke={theme.palette.text.secondary} 
//                       tickLine={false}
//                       axisLine={false}
//                     />
//                     <YAxis 
//                       stroke={theme.palette.text.secondary} 
//                       tickLine={false}
//                       axisLine={false}
//                     />
//                     <ChartTooltip 
//                       contentStyle={{
//                         borderRadius: 8,
//                         backgroundColor: theme.palette.background.paper,
//                         border: `1px solid ${theme.palette.divider}`,
//                         boxShadow: theme.shadows[2]
//                       }}
//                     />
//                     <Area 
//                       type="monotone" 
//                       dataKey="active" 
//                       name="Active" 
//                       stroke={theme.palette.success.main} 
//                       strokeWidth={2}
//                       fillOpacity={1} 
//                       fill="url(#colorActive)" 
//                     />
//                     <Area 
//                       type="monotone" 
//                       dataKey="inactive" 
//                       name="Inactive" 
//                       stroke={theme.palette.error.main} 
//                       strokeWidth={2}
//                       fillOpacity={1} 
//                       fill="url(#colorInactive)" 
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Card sx={{ 
//                 p: 5, 
//                 height: 320, 
//                 borderRadius: 3,
//                 boxShadow: theme.shadows[1],
//                 backgroundColor: theme.palette.background.paper,
//                 border: `1px solid ${theme.palette.divider}`
//               }}>
//                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                   <Typography variant="h6" fontWeight="600">Status Distribution</Typography>
//                   <Box display="flex" alignItems="center">
//                     <Chip 
//                       label="Current" 
//                       size="small" 
//                       sx={{ mr: 1, backgroundColor: theme.palette.action.selected }}
//                     />
//                     <IconButton size="small">
//                       <MoreIcon />
//                     </IconButton>
//                   </Box>
//                 </Box>
//                 <ResponsiveContainer width="100%" height="85%">
//                   <PieChart>
//                     <Pie
//                       data={statusData}
//                       cx="55%"
//                       cy="55%"
//                       labelLine={false}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                       label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                     >
//                       {statusData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <ChartTooltip 
//                       contentStyle={{
//                         borderRadius: 8,
//                         backgroundColor: theme.palette.background.paper,
//                         border: `1px solid ${theme.palette.divider}`,
//                         boxShadow: theme.shadows[2]
//                       }}
//                     />
//                     <Legend 
//                       layout="horizontal" 
//                       verticalAlign="bottom" 
//                       align="center"
//                       wrapperStyle={{
//                         paddingTop: '20px'
//                       }}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </Card>
//             </Grid>
//           </Grid>

//           {/* Tenants Table */}
//           <Card sx={{ 
//             p: 0, 
//             borderRadius: 3,
//             boxShadow: theme.shadows[1],
//             backgroundColor: theme.palette.background.paper,
//             border: `1px solid ${theme.palette.divider}`,
//             overflow: 'hidden'
//           }}>
//             <Box 
//               display="flex" 
//               justifyContent="space-between" 
//               alignItems="center" 
//               p={3}
//               sx={{
//                 borderBottom: `1px solid ${theme.palette.divider}`
//               }}
//             >
//               <Typography variant="h6" fontWeight="600">Tenant List</Typography>
//               <Box display="flex" alignItems="center" gap={1}>
//                 <Typography variant="body2" color="text.secondary">
//                   Showing {filteredTenants.length} of {tenants.length} tenants
//                 </Typography>
//                 <Chip 
//                   label={`${Math.round((filteredTenants.length/tenants.length)*100)}%`} 
//                   size="small" 
//                   sx={{ 
//                     backgroundColor: theme.palette.action.selected,
//                     fontWeight: 500
//                   }} 
//                 />
//               </Box>
//             </Box>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
//                     <TableCell sx={{ fontWeight: 600 }}>Tenant</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Domain</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
//                     <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredTenants.map((tenant) => (
//                     <TableRow 
//                       key={tenant._id} 
//                       hover
//                       sx={{ 
//                         '&:last-child td': { borderBottom: 0 },
//                         opacity: tenant.isActive ? 1 : 0.9,
//                         '&:hover': {
//                           backgroundColor: theme.palette.action.hover
//                         }
//                       }}
//                     >
//                       <TableCell>
//                         <Box display="flex" alignItems="center">
//                           <Badge
//                             overlap="circular"
//                             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                             badgeContent={
//                               tenant.isActive ? (
//                                 <ActiveIcon sx={{ 
//                                   color: theme.palette.success.main,
//                                   fontSize: '1rem',
//                                   backgroundColor: theme.palette.background.paper,
//                                   borderRadius: '50%'
//                                 }} />
//                               ) : (
//                                 <InactiveIcon sx={{ 
//                                   color: theme.palette.error.main,
//                                   fontSize: '1rem',
//                                   backgroundColor: theme.palette.background.paper,
//                                   borderRadius: '50%'
//                                 }} />
//                               )
//                             }
//                           >
//                             <Avatar 
//                               src={tenant.settings?.logo} 
//                               sx={{ 
//                                 width: 40, 
//                                 height: 40, 
//                                 mr: 2,
//                                 boxShadow: theme.shadows[1]
//                               }}
//                             >
//                               {tenant.name.charAt(0)}
//                             </Avatar>
//                           </Badge>
//                           <Box>
//                             <Typography fontWeight="600">{tenant.name}</Typography>
//                             <Typography variant="body2" color="text.secondary">{tenant.email}</Typography>
//                           </Box>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Chip 
//                           label={tenant.domain} 
//                           size="small" 
//                           sx={{ 
//                             backgroundColor: theme.palette.grey[200],
//                             fontWeight: 500,
//                             '& .MuiChip-label': {
//                               px: 1.5
//                             }
//                           }} 
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="body2">
//                           {new Date(tenant.createdAt).toLocaleDateString()}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           {new Date(tenant.createdAt).toLocaleTimeString()}
//                         </Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Box display="flex" alignItems="center">
//                           <Tooltip title={tenant.isActive ? 'Active' : 'Inactive'}>
//                             <Switch
//                               checked={tenant.isActive}
//                               onChange={() => toggleStatus(tenant._id, tenant.isActive)}
//                               color={tenant.isActive ? 'success' : 'error'}
//                               sx={{
//                                 '& .MuiSwitch-thumb': {
//                                   backgroundColor: tenant.isActive ? theme.palette.success.main : theme.palette.error.main
//                                 }
//                               }}
//                             />
//                           </Tooltip>
//                           <Chip
//                             label={tenant.isActive ? 'Active' : 'Inactive'}
//                             size="small"
//                             sx={{ 
//                               ml: 1,
//                               backgroundColor: tenant.isActive ? 
//                                 theme.palette.success.light : 
//                                 theme.palette.error.light,
//                               color: tenant.isActive ? 
//                                 theme.palette.success.dark : 
//                                 theme.palette.error.dark,
//                               fontWeight: 500
//                             }}
//                           />
//                         </Box>
//                       </TableCell>
//                       <TableCell align="right">
//                         <Box display="flex" justifyContent="flex-end" gap={1}>
//                           <Tooltip title="View Details">
//                             <IconButton
//                               onClick={() => handleViewTenant(tenant._id)}
//                               size="small"
//                               sx={{
//                                 backgroundColor: theme.palette.action.hover,
//                                 color: theme.palette.primary.main,
//                                 '&:hover': {
//                                   backgroundColor: theme.palette.primary.main,
//                                   color: 'white'
//                                 }
//                               }}
//                             >
//                               <VisibilityIcon fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Edit Tenant">
//                             <IconButton
//                               onClick={() => handleEditTenant(tenant._id)}
//                               size="small"
//                               sx={{
//                                 backgroundColor: theme.palette.action.hover,
//                                 color: theme.palette.secondary.main,
//                                 '&:hover': {
//                                   backgroundColor: theme.palette.secondary.main,
//                                   color: 'white'
//                                 }
//                               }}
//                             >
//                               <EditIcon fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                           <Tooltip title="Delete Tenant">
//                             <IconButton
//                               onClick={() => confirmDelete(tenant)}
//                               size="small"
//                               sx={{
//                                 backgroundColor: theme.palette.action.hover,
//                                 color: theme.palette.error.main,
//                                 '&:hover': {
//                                   backgroundColor: theme.palette.error.main,
//                                   color: 'white'
//                                 }
//                               }}
//                             >
//                               <DeleteIcon fontSize="small" />
//                             </IconButton>
//                           </Tooltip>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Card>
//         </Grid>

//         {/* Right Column - 30% width */}
//         <Grid item xs={12} md={4}>
//           {/* Recent Activity */}
//           <Card sx={{ 
//             p: 0, 
//             mb: 3, 
//             height: 400,
//             borderRadius: 3,
//             boxShadow: theme.shadows[1],
//             backgroundColor: theme.palette.background.paper,
//             border: `1px solid ${theme.palette.divider}`
//           }}>
//             <Box 
//               display="flex" 
//               justifyContent="space-between" 
//               alignItems="center" 
//               p={3}
//               sx={{
//                 borderBottom: `1px solid ${theme.palette.divider}`
//               }}
//             >
//               <Typography variant="h6" fontWeight="600">Recent Activity</Typography>
//               <IconButton size="small">
//                 <MoreIcon />
//               </IconButton>
//             </Box>
//             <Box sx={{ height: 340, overflowY: 'auto', p: 2 }}>
//               {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
//                 <Box 
//                   key={item} 
//                   sx={{ 
//                     mb: 2, 
//                     p: 2, 
//                     borderRadius: 2,
//                     backgroundColor: theme.palette.background.default,
//                     transition: 'all 0.2s',
//                     '&:hover': {
//                       transform: 'translateY(-2px)',
//                       boxShadow: theme.shadows[1]
//                     }
//                   }}
//                 >
//                   <Box display="flex" alignItems="center" mb={1}>
//                     <Avatar 
//                       sx={{ 
//                         width: 32, 
//                         height: 32, 
//                         mr: 1.5,
//                         backgroundColor: theme.palette.primary.main,
//                         color: 'white'
//                       }}
//                     >
//                       U
//                     </Avatar>
//                     <Typography variant="body2" fontWeight="500">User Action</Typography>
//                     <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
//                       {item}h ago
//                     </Typography>
//                   </Box>
//                   <Typography variant="body2" color="text.secondary">
//                     {item === 1 && "Created new tenant 'Acme Corp'"}
//                     {item === 2 && "Updated settings for 'Tech Solutions'"}
//                     {item === 3 && "Deactivated tenant 'Global Enterprises'"}
//                     {item === 4 && "Logged in to dashboard"}
//                     {item === 5 && "Generated monthly report"}
//                     {item === 6 && "Added new admin user"}
//                     {item === 7 && "Changed password"}
//                     {item === 8 && "Viewed tenant details"}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Card>

//           {/* Latest Tenants */}
//           <Card sx={{ 
//             p: 0, 
//             mb: 3,
//             borderRadius: 3,
//             boxShadow: theme.shadows[1],
//             backgroundColor: theme.palette.background.paper,
//             border: `1px solid ${theme.palette.divider}`
//           }}>
//             <Box 
//               display="flex" 
//               justifyContent="space-between" 
//               alignItems="center" 
//               p={3}
//               sx={{
//                 borderBottom: `1px solid ${theme.palette.divider}`
//               }}
//             >
//               <Typography variant="h6" fontWeight="600">Latest Tenants</Typography>
//               <IconButton size="small">
//                 <MoreIcon />
//               </IconButton>
//             </Box>
//             <Box sx={{ maxHeight: 300, overflowY: 'auto', p: 2 }}>
//               {tenants.slice(0, 5).map((tenant) => (
//                 <Box 
//                   key={tenant._id} 
//                   sx={{ 
//                     mb: 2, 
//                     p: 2, 
//                     borderRadius: 2,
//                     backgroundColor: theme.palette.background.default,
//                     transition: 'all 0.2s',
//                     '&:hover': {
//                       transform: 'translateY(-2px)',
//                       boxShadow: theme.shadows[1]
//                     }
//                   }}
//                 >
//                   <Box display="flex" alignItems="center" mb={1}>
//                     <Badge
//                       overlap="circular"
//                       anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                       badgeContent={
//                         tenant.isActive ? (
//                           <ActiveIcon sx={{ 
//                             color: theme.palette.success.main,
//                             fontSize: '0.8rem',
//                             backgroundColor: theme.palette.background.paper,
//                             borderRadius: '50%'
//                           }} />
//                         ) : (
//                           <InactiveIcon sx={{ 
//                             color: theme.palette.error.main,
//                             fontSize: '0.8rem',
//                             backgroundColor: theme.palette.background.paper,
//                             borderRadius: '50%'
//                           }} />
//                         )
//                       }
//                     >
//                       <Avatar 
//                         src={tenant.settings?.logo} 
//                         sx={{ 
//                           width: 40, 
//                           height: 40, 
//                           mr: 2,
//                           boxShadow: theme.shadows[1]
//                         }}
//                       >
//                         {tenant.name.charAt(0)}
//                       </Avatar>
//                     </Badge>
//                     <Box flexGrow={1}>
//                       <Typography fontWeight="600">{tenant.name}</Typography>
//                       <Typography variant="body2" color="text.secondary">{tenant.domain}</Typography>
//                     </Box>
//                     <Chip
//                       label={tenant.isActive ? 'Active' : 'Inactive'}
//                       size="small"
//                       sx={{
//                         backgroundColor: tenant.isActive ? 
//                           theme.palette.success.light : 
//                           theme.palette.error.light,
//                         color: tenant.isActive ? 
//                           theme.palette.success.dark : 
//                           theme.palette.error.dark,
//                         fontWeight: 500
//                       }}
//                     />
//                   </Box>
//                   <Box display="flex" justifyContent="space-between" alignItems="center">
//                     <Typography variant="caption" color="text.secondary">
//                       Created: {new Date(tenant.createdAt).toLocaleDateString()}
//                     </Typography>
//                     <Button 
//                       size="small" 
//                       onClick={() => handleViewTenant(tenant._id)}
//                       sx={{
//                         textTransform: 'none',
//                         color: theme.palette.primary.main,
//                         fontWeight: 500
//                       }}
//                     >
//                       View Details
//                     </Button>
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           </Card>

//           {/* Quick Actions */}
//           <Card sx={{ 
//             p: 0,
//             borderRadius: 3,
//             boxShadow: theme.shadows[1],
//             backgroundColor: theme.palette.background.paper,
//             border: `1px solid ${theme.palette.divider}`
//           }}>
//             <Box 
//               display="flex" 
//               justifyContent="space-between" 
//               alignItems="center" 
//               p={3}
//               sx={{
//                 borderBottom: `1px solid ${theme.palette.divider}`
//               }}
//             >
//               <Typography variant="h6" fontWeight="600">Quick Actions</Typography>
//               <IconButton size="small">
//                 <MoreIcon />
//               </IconButton>
//             </Box>
//             <Grid container spacing={1} sx={{ p: 2 }}>
//               <Grid item xs={6}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   startIcon={<AddIcon />}
//                   onClick={handleAddDialogOpen}
//                   sx={{
//                     mb: 1,
//                     py: 1.5,
//                     borderRadius: 2,
//                     backgroundColor: theme.palette.primary.main,
//                     '&:hover': {
//                       backgroundColor: theme.palette.primary.dark,
//                       boxShadow: theme.shadows[2]
//                     },
//                     boxShadow: theme.shadows[1]
//                   }}
//                 >
//                   Add Tenant
//                 </Button>
//               </Grid>
//               <Grid item xs={6}>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   startIcon={<FilterIcon />}
//                   sx={{ 
//                     mb: 1,
//                     py: 1.5,
//                     borderRadius: 2,
//                     borderColor: theme.palette.divider,
//                     '&:hover': {
//                       backgroundColor: theme.palette.action.hover,
//                       borderColor: theme.palette.primary.main
//                     }
//                   }}
//                 >
//                   Filter
//                 </Button>
//               </Grid>
//               <Grid item xs={6}>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   startIcon={<SettingsIcon />}
//                   sx={{ 
//                     py: 1.5,
//                     borderRadius: 2,
//                     borderColor: theme.palette.divider,
//                     '&:hover': {
//                       backgroundColor: theme.palette.action.hover,
//                       borderColor: theme.palette.primary.main
//                     }
//                   }}
//                 >
//                   Settings
//                 </Button>
//               </Grid>
//               <Grid item xs={6}>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   startIcon={<PeopleIcon />}
//                   sx={{ 
//                     py: 1.5,
//                     borderRadius: 2,
//                     borderColor: theme.palette.divider,
//                     '&:hover': {
//                       backgroundColor: theme.palette.action.hover,
//                       borderColor: theme.palette.primary.main
//                     }
//                   }}
//                 >
//                   Users
//                 </Button>
//               </Grid>
//             </Grid>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Add Tenant Dialog */}
//       <Dialog
//         open={addDialogOpen}
//         onClose={handleAddDialogClose}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             p: 3,
//             background: theme.palette.background.paper,
//             boxShadow: theme.shadows[5]
//           }
//         }}
//       >
//         <DialogTitle sx={{ fontWeight: 700, p: 0, mb: 3 }}>Register New Company</DialogTitle>
//         <form onSubmit={handleSubmit}>
//           <DialogContent sx={{ p: 0 }}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Compnay Name"
//                   name="name"
//                   value={newTenant.name}
//                   onChange={handleInputChange}
//                   error={!!formErrors.name}
//                   helperText={formErrors.name}
//                   variant="outlined"
//                   InputProps={{
//                     sx: {
//                       borderRadius: 2,
//                       backgroundColor: theme.palette.background.default
//                     }
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Domain"
//                   name="domain"
//                   value={newTenant.domain}
//                   onChange={handleInputChange}
//                   error={!!formErrors.domain}
//                   helperText={formErrors.domain}
//                   variant="outlined"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">https://</InputAdornment>
//                     ),
//                     endAdornment: (
//                       <InputAdornment position="end">.yourdomain.com</InputAdornment>
//                     ),
//                     sx: {
//                       borderRadius: 2,
//                       backgroundColor: theme.palette.background.default
//                     }
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Company Email"
//                   name="email"
//                   type="email"
//                   value={newTenant.email}
//                   onChange={handleInputChange}
//                   error={!!formErrors.email}
//                   helperText={formErrors.email}
//                   variant="outlined"
//                   InputProps={{
//                     sx: {
//                       borderRadius: 2,
//                       backgroundColor: theme.palette.background.default
//                     }
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Company Password"
//                   name="adminPassword"
//                   type="password"
//                   value={newTenant.adminPassword}
//                   onChange={handleInputChange}
//                   error={!!formErrors.adminPassword}
//                   helperText={formErrors.adminPassword}
//                   variant="outlined"
//                   InputProps={{
//                     sx: {
//                       borderRadius: 2,
//                       backgroundColor: theme.palette.background.default
//                     }
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions sx={{ p: 0, mt: 3 }}>
//             <Button 
//               onClick={handleAddDialogClose}
//               variant="outlined"
//               sx={{
//                 borderRadius: 2,
//                 textTransform: 'none',
//                 px: 3,
//                 py: 1,
//                 borderColor: theme.palette.divider,
//                 '&:hover': {
//                   borderColor: theme.palette.primary.main
//                 }
//               }}
//             >
//               Cancel
//             </Button>
//             <Button 
//               type="submit"
//               variant="contained"
//               sx={{
//                 borderRadius: 2,
//                 textTransform: 'none',
//                 px: 3,
//                 py: 1,
//                 backgroundColor: theme.palette.primary.main,
//                 '&:hover': {
//                   backgroundColor: theme.palette.primary.dark,
//                   boxShadow: theme.shadows[1]
//                 }
//               }}
//             >
//               Register Company
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             padding: 3,
//             minWidth: 500,
//             background: theme.palette.background.paper,
//             boxShadow: theme.shadows[5]
//           }
//         }}
//       >
//         <DialogTitle sx={{ fontWeight: 700, p: 0, mb: 2 }}>Confirm Tenant Deletion</DialogTitle>
//         <DialogContent sx={{ p: 0, mb: 3 }}>
//           <Typography>
//             Are you sure you want to permanently delete <strong>{tenantToDelete?.name}</strong>?
//           </Typography>
//           <Typography variant="body2" color="error" mt={2}>
//             <strong>Warning:</strong> This action cannot be undone and will remove all associated data.
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ p: 0 }}>
//           <Button 
//             onClick={() => setDeleteDialogOpen(false)}
//             variant="outlined"
//             sx={{
//               borderRadius: 2,
//               textTransform: 'none',
//               px: 3,
//               py: 1,
//               borderColor: theme.palette.divider,
//               '&:hover': {
//                 borderColor: theme.palette.primary.main
//               }
//             }}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleDeleteTenant} 
//             variant="contained"
//             color="error"
//             sx={{
//               borderRadius: 2,
//               textTransform: 'none',
//               px: 3,
//               py: 1,
//               boxShadow: 'none',
//               '&:hover': {
//                 backgroundColor: theme.palette.error.dark,
//                 boxShadow: 'none'
//               }
//             }}
//           >
//             Delete Permanently
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default SuperAdminDashboard;


import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert,
  Button,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  Chip,
  Switch,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  Divider,
  Tooltip,
  useTheme,
  Badge,
  Snackbar,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  MoreVert as MoreIcon,
  Refresh as RefreshIcon,
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Settings as SettingsIcon,
  Email as EmailIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  getTenants,
  createTenant,
  updateTenantStatus,
  deleteTenant,
  resendWelcomeEmail
} from '../../services/tenantService';

const SuperAdminDashboard = () => {
  const theme = useTheme();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('month');
  const [statusFilter, setStatusFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newTenant, setNewTenant] = useState({
    name: '',
    domain: '',
    email: '',
    adminPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [newTenantLink, setNewTenantLink] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  // Sample data
  const activityData = [
    { name: 'Jan', active: 12, inactive: 5 },
    { name: 'Feb', active: 18, inactive: 3 },
    { name: 'Mar', active: 22, inactive: 2 },
    { name: 'Apr', active: 25, inactive: 1 },
    { name: 'May', active: 28, inactive: 0 },
    { name: 'Jun', active: 32, inactive: 1 },
  ];

  const statusData = [
    { name: 'Active', value: 75 },
    { name: 'Inactive', value: 25 },
  ];

  const COLORS = [theme.palette.success.main, theme.palette.error.main];

  const fetchTenants = async () => {
    try {
      setLoading(true);
      const response = await getTenants();
      setTenants(response.data.tenants || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTenants();
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tenant.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                        (statusFilter === 'active' && tenant.isActive) || 
                        (statusFilter === 'inactive' && !tenant.isActive);
    return matchesSearch && matchesStatus;
  });

  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(t => t.isActive).length;
  const inactiveTenants = tenants.filter(t => !t.isActive).length;

  const handleEditTenant = (tenantId) => navigate(`/superadmin/tenants/edit/${tenantId}`);
  const handleViewTenant = (tenantId) => navigate(`/superadmin/tenants/${tenantId}`);

  const confirmDelete = (tenant) => {
    setTenantToDelete(tenant);
    setDeleteDialogOpen(true);
  };

  const handleDeleteTenant = async () => {
    try {
      await deleteTenant(tenantToDelete._id);
      setDeleteDialogOpen(false);
      setTenants(tenants.filter(t => t._id !== tenantToDelete._id));
      setSnackbar({ open: true, message: 'Tenant deleted successfully', severity: 'success' });
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleStatus = async (tenantId, currentStatus) => {
    try {
      await updateTenantStatus(tenantId, !currentStatus);
      setTenants(tenants.map(tenant => 
        tenant._id === tenantId ? { ...tenant, isActive: !currentStatus } : tenant
      ));
      setSnackbar({ open: true, message: `Tenant ${!currentStatus ? 'activated' : 'deactivated'} successfully`, severity: 'success' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setNewTenant({
      name: '',
      domain: '',
      email: '',
      adminPassword: ''
    });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTenant(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!newTenant.name.trim()) errors.name = 'Name is required';
    if (!newTenant.domain.trim()) errors.domain = 'Domain is required';
    if (!newTenant.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newTenant.email)) {
      errors.email = 'Email is invalid';
    }
    if (!newTenant.adminPassword) {
      errors.adminPassword = 'Password is required';
    } else if (newTenant.adminPassword.length < 8) {
      errors.adminPassword = 'Password must be at least 8 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await createTenant(newTenant);
        
        if (response.status === 'success') {
          setSnackbar({ 
            open: true, 
            message: 'Tenant created successfully. Welcome email sent!', 
            severity: 'success' 
          });
          
          // Show welcome dialog with login link
          setNewTenantLink(response.data.loginLink);
          setShowWelcomeDialog(true);
        } else if (response.status === 'partial_success') {
          setSnackbar({ 
            open: true, 
            message: 'Tenant created but welcome email failed to send', 
            severity: 'warning' 
          });
          
          // Show dialog with manual link
          setNewTenantLink(response.data.loginLink);
          setShowWelcomeDialog(true);
        }
        
        handleAddDialogClose();
        fetchTenants();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to create tenant');
      }
    }
  };

  const handleResendWelcomeEmail = async (tenantId) => {
    try {
      const response = await resendWelcomeEmail(tenantId);
      setSnackbar({ 
        open: true, 
        message: 'Welcome email resent successfully', 
        severity: 'success' 
      });
      setNewTenantLink(response.data.loginLink);
      setShowWelcomeDialog(true);
    } catch (err) {
      console.error('Error resending welcome email:', err);
      setSnackbar({ 
        open: true, 
        message: 'Failed to resend welcome email', 
        severity: 'error' 
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbar({ open: true, message: 'Link copied to clipboard', severity: 'success' });
    });
  };

  if (loading && !refreshing) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3, mx: 3 }} onClose={() => setError(null)}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3, minHeight: '100vh',  backgroundColor: theme.palette.background.default }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="700" color="text.primary" sx={{ mb: 0.5 }}>
            Organization Management
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusinessIcon fontSize="small" />
            Manage all admin accounts and configurations
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={refreshing}
            sx={{
              backgroundColor: theme.palette.grey[200],
              color: theme.palette.text.primary,
              '&:hover': { backgroundColor: theme.palette.grey[300] }
            }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddDialogOpen}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              '&:hover': { backgroundColor: theme.palette.primary.dark },
              boxShadow: theme.shadows[2]
            }}
          >
            ADD ADMIN 
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - 70% width */}
        <Grid item xs={12} md={8}>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {[
              { title: 'Total Tenants', value: totalTenants, color: 'primary', icon: <TrendingUpIcon />, trend: '+12% from last month' },
              { title: 'Active Tenants', value: activeTenants, color: 'success', icon: <ActiveIcon />, trend: `${Math.round((activeTenants/totalTenants)*100)}% of total` },
              { title: 'Inactive Tenants', value: inactiveTenants, color: 'error', icon: <InactiveIcon />, trend: `${Math.round((inactiveTenants/totalTenants)*100)}% of total` },
              { title: 'Growth Rate', value: '+22%', color: 'warning', icon: <BarChartIcon />, trend: 'Quarterly increase' }
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  p: 2, height: '100%', borderRadius: 3,
                  background: `linear-gradient(195deg, ${theme.palette[stat.color].main}, ${theme.palette[stat.color].dark})`,
                  color: 'white', boxShadow: theme.shadows[4], position: 'relative', overflow: 'hidden',
                  '&:before': {
                    content: '""', position: 'absolute', top: '-50px', right: '-50px',
                    width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)'
                  }
                }}>
                  <Box position="relative" zIndex={1}>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>{stat.title}</Typography>
                    <Typography variant="h3" fontWeight="700" sx={{ mt: 1, mb: 2 }}>{stat.value}</Typography>
                    <Box display="flex" alignItems="center">
                      {stat.icon}
                      <Typography variant="body2" sx={{ ml: 1 }}>{stat.trend}</Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Search and Filter Row */}
          <Card sx={{ p: 2, mb: 3, borderRadius: 3, boxShadow: theme.shadows[1], backgroundColor: theme.palette.background.paper }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth placeholder="Search tenants by name or domain..."
                  variant="outlined" size="small" value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>,
                    style: { borderRadius: 8, backgroundColor: theme.palette.background.default }
                  }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Time Filter</InputLabel>
                  <Select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} label="Time Filter" sx={{ borderRadius: 8 }}>
                    <MenuItem value="24h">Last 24 Hours</MenuItem>
                    <MenuItem value="week">Last Week</MenuItem>
                    <MenuItem value="month">Last Month</MenuItem>
                    <MenuItem value="year">Last Year</MenuItem>
                    <MenuItem value="all">All Time</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status Filter</InputLabel>
                  <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status Filter" sx={{ borderRadius: 8 }}>
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="active">Active Only</MenuItem>
                    <MenuItem value="inactive">Inactive Only</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Card>

          {/* Activity Charts */}
          <Grid container spacing={4} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, height: 320, borderRadius: 3, boxShadow: theme.shadows[1], backgroundColor: theme.palette.background.paper }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight="600">Tenant Activity</Typography>
                  <Box display="flex" alignItems="center">
                    <Chip label="Monthly" size="small" sx={{ mr: 1, backgroundColor: theme.palette.action.selected }} />
                    <IconButton size="small"><MoreIcon /></IconButton>
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height="85%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.success.main} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={theme.palette.success.main} stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorInactive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.palette.error.main} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={theme.palette.error.main} stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} tickLine={false} axisLine={false} />
                    <YAxis stroke={theme.palette.text.secondary} tickLine={false} axisLine={false} />
                    <ChartTooltip contentStyle={{ borderRadius: 8, backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }} />
                    <Area type="monotone" dataKey="active" name="Active" stroke={theme.palette.success.main} strokeWidth={2} fillOpacity={1} fill="url(#colorActive)" />
                    <Area type="monotone" dataKey="inactive" name="Inactive" stroke={theme.palette.error.main} strokeWidth={2} fillOpacity={1} fill="url(#colorInactive)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, height: 320, borderRadius: 3, boxShadow: theme.shadows[1], backgroundColor: theme.palette.background.paper }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight="600">Status Distribution</Typography>
                  <Box display="flex" alignItems="center">
                    <Chip label="Current" size="small" sx={{ mr: 1, backgroundColor: theme.palette.action.selected }} />
                    <IconButton size="small"><MoreIcon /></IconButton>
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                      {statusData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                    </Pie>
                    <ChartTooltip contentStyle={{ borderRadius: 8, backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}` }} />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
          </Grid>

          {/* Tenants Table */}
          <Card sx={{ p: 0, borderRadius: 3, boxShadow: theme.shadows[1], backgroundColor: theme.palette.background.paper, overflow: 'hidden' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={3} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" fontWeight="600">Tenant List</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" color="text.secondary">Showing {filteredTenants.length} of {tenants.length} tenants</Typography>
                <Chip label={`${Math.round((filteredTenants.length/tenants.length)*100)}%`} size="small" sx={{ backgroundColor: theme.palette.action.selected, fontWeight: 500 }} />
              </Box>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
                    <TableCell sx={{ fontWeight: 600 }}>Tenant</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Domain</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTenants.map((tenant) => (
                    <TableRow key={tenant._id} hover sx={{ '&:last-child td': { borderBottom: 0 }, opacity: tenant.isActive ? 1 : 0.9, '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={
                            tenant.isActive ? (<ActiveIcon sx={{ color: theme.palette.success.main, fontSize: '1rem', backgroundColor: theme.palette.background.paper, borderRadius: '50%' }} />) : 
                            (<InactiveIcon sx={{ color: theme.palette.error.main, fontSize: '1rem', backgroundColor: theme.palette.background.paper, borderRadius: '50%' }} />)
                          }>
                            <Avatar sx={{ width: 40, height: 40, mr: 2, boxShadow: theme.shadows[1], backgroundColor: theme.palette.primary.main }}>
                              {tenant.name.charAt(0)}
                            </Avatar>
                          </Badge>
                          <Box>
                            <Typography fontWeight="600">{tenant.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{tenant.email}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={tenant.domain} size="small" sx={{ backgroundColor: theme.palette.grey[200], fontWeight: 500, '& .MuiChip-label': { px: 1.5 } }} />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{new Date(tenant.createdAt).toLocaleDateString()}</Typography>
                        <Typography variant="caption" color="text.secondary">{new Date(tenant.createdAt).toLocaleTimeString()}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Tooltip title={tenant.isActive ? 'Active' : 'Inactive'}>
                            <Switch checked={tenant.isActive} onChange={() => toggleStatus(tenant._id, tenant.isActive)} color={tenant.isActive ? 'success' : 'error'} sx={{ '& .MuiSwitch-thumb': { backgroundColor: tenant.isActive ? theme.palette.success.main : theme.palette.error.main } }} />
                          </Tooltip>
                          <Chip label={tenant.isActive ? 'Active' : 'Inactive'} size="small" sx={{ ml: 1, backgroundColor: tenant.isActive ? theme.palette.success.light : theme.palette.error.light, color: tenant.isActive ? theme.palette.success.dark : theme.palette.error.dark, fontWeight: 500 }} />
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box display="flex" justifyContent="flex-end" gap={1}>
                          <Tooltip title="Resend Welcome Email">
                            <IconButton onClick={() => handleResendWelcomeEmail(tenant._id)} size="small" sx={{ backgroundColor: theme.palette.action.hover, color: theme.palette.info.main, '&:hover': { backgroundColor: theme.palette.info.main, color: 'white' } }}>
                              <EmailIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="View Details">
                            <IconButton onClick={() => handleViewTenant(tenant._id)} size="small" sx={{ backgroundColor: theme.palette.action.hover, color: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.main, color: 'white' } }}>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Tenant">
                            <IconButton onClick={() => handleEditTenant(tenant._id)} size="mall" sx={{ backgroundColor: theme.palette.action.hover, color: theme.palette.secondary.main, '&:hover': { backgroundColor: theme.palette.secondary.main, color: 'white' } }}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Tenant">
                            <IconButton onClick={() => confirmDelete(tenant)} size="small" sx={{ backgroundColor: theme.palette.action.hover, color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: 'white' } }}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Right Column - 30% width */}
        <Grid item xs={12} md={4}>
          {/* Recent Activity */}
          <Card sx={{ p: 0, mb: 3, height: 400, borderRadius: 3, boxShadow: theme.shadows[1], backgroundColor: theme.palette.background.paper }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={3} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" fontWeight="600">Recent Activity</Typography>
              <IconButton size="small"><MoreIcon /></IconButton>
            </Box>
            <Box sx={{ height: 340, overflowY: 'auto', p: 2 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Box key={item} sx={{ mb: 2, p: 2, borderRadius: 2, backgroundColor: theme.palette.background.default, transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: theme.shadows[1] } }}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1.5, backgroundColor: theme.palette.primary.main, color: 'white' }}>U</Avatar>
                    <Typography variant="body2" fontWeight="500">User Action</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>{item}h ago</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {item === 1 && "Created new tenant 'Acme Corp'"}
                    {item === 2 && "Updated settings for 'Tech Solutions'"}
                    {item === 3 && "Deactivated tenant 'Global Enterprises'"}
                    {item === 4 && "Logged in to dashboard"}
                    {item === 5 && "Generated monthly report"}
                    {item === 6 && "Added new admin user"}
                    {item === 7 && "Changed password"}
                    {item === 8 && "Viewed tenant details"}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Card>

          {/* Latest Tenants */}
          <Card sx={{ p: 0, mb: 3, borderRadius: 3, boxShadow: theme.shadows[1], backgroundColor: theme.palette.background.paper }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={3} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" fontWeight="600">Latest Tenants</Typography>
              <IconButton size="small"><MoreIcon /></IconButton>
            </Box>
            <Box sx={{ maxHeight: 300, overflowY: 'auto', p: 2 }}>
              {tenants.slice(0, 5).map((tenant) => (
                <Box key={tenant._id} sx={{ mb: 2, p: 2, borderRadius: 2, backgroundColor: theme.palette.background.default, transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: theme.shadows[1] } }}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={
                      tenant.isActive ? (<ActiveIcon sx={{ color: theme.palette.success.main, fontSize: '0.8rem', backgroundColor: theme.palette.background.paper, borderRadius: '50%' }} />) : 
                      (<InactiveIcon sx={{ color: theme.palette.error.main, fontSize: '0.8rem', backgroundColor: theme.palette.background.paper, borderRadius: '50%' }} />)
                    }>
                      <Avatar sx={{ width: 40, height: 40, mr: 2, boxShadow: theme.shadows[1], backgroundColor: theme.palette.primary.main, color: 'white' }}>
                        {tenant.name.charAt(0)}
                      </Avatar>
                    </Badge>
                    <Box flexGrow={1}>
                      <Typography fontWeight="600">{tenant.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{tenant.domain}</Typography>
                    </Box>
                    <Chip label={tenant.isActive ? 'Active' : 'Inactive'} size="small" sx={{
                      backgroundColor: tenant.isActive ? theme.palette.success.light : theme.palette.error.light,
                      color: tenant.isActive ? theme.palette.success.dark : theme.palette.error.dark, fontWeight: 500
                    }} />
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" color="text.secondary">Created: {new Date(tenant.createdAt).toLocaleDateString()}</Typography>
                    <Button size="small" onClick={() => handleViewTenant(tenant._id)} sx={{ textTransform: 'none', color: theme.palette.primary.main, fontWeight: 500 }}>
                      View Details
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>

          {/* Quick Actions */}
          <Card sx={{ p: 0, borderRadius: 3, boxShadow: theme.shadows[1], backgroundColor: theme.palette.background.paper }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={3} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h6" fontWeight="600">Quick Actions</Typography>
              <IconButton size="small"><MoreIcon /></IconButton>
            </Box>
            <Grid container spacing={1} sx={{ p: 2 }}>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" startIcon={<AddIcon />} onClick={handleAddDialogOpen} sx={{ mb: 1, py: 1.5, borderRadius: 2, backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark }, boxShadow: theme.shadows[1] }}>
                  Add Tenant
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" startIcon={<FilterIcon />} sx={{ mb: 1, py: 1.5, borderRadius: 2, borderColor: theme.palette.divider, '&:hover': { backgroundColor: theme.palette.action.hover, borderColor: theme.palette.primary.main } }}>
                  Filter
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" startIcon={<SettingsIcon />} sx={{ py: 1.5, borderRadius: 2, borderColor: theme.palette.divider, '&:hover': { backgroundColor: theme.palette.action.hover, borderColor: theme.palette.primary.main } }}>
                  Settings
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" startIcon={<PeopleIcon />} sx={{ py: 1.5, borderRadius: 2, borderColor: theme.palette.divider, '&:hover': { backgroundColor: theme.palette.action.hover, borderColor: theme.palette.primary.main } }}>
                  Users
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      {/* Add Tenant Dialog */}
      <Dialog open={addDialogOpen} onClose={handleAddDialogClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700, p: 0, mb: 3 }}>Register New Company</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ p: 0 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField fullWidth label="Company Name" name="name" value={newTenant.name} onChange={handleInputChange} error={!!formErrors.name} helperText={formErrors.name} variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Domain" name="domain" value={newTenant.domain} onChange={handleInputChange} error={!!formErrors.domain} helperText={formErrors.domain} variant="outlined" InputProps={{ startAdornment: <InputAdornment position="start">https://</InputAdornment>, endAdornment: <InputAdornment position="end">.yourdomain.com</InputAdornment>, sx: { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Company Email" name="email" type="email" value={newTenant.email} onChange={handleInputChange} error={!!formErrors.email} helperText={formErrors.email} variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Admin Password" name="adminPassword" type="password" value={newTenant.adminPassword} onChange={handleInputChange} error={!!formErrors.adminPassword} helperText={formErrors.adminPassword} variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 0, mt: 3 }}>
            <Button onClick={handleAddDialogClose} variant="outlined" sx={{ borderRadius: 2, textTransform: 'none', px: 3, py: 1, borderColor: theme.palette.divider, '&:hover': { borderColor: theme.palette.primary.main } }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ borderRadius: 2, textTransform: 'none', px: 3, py: 1, backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}>
              Register Company
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Welcome Dialog with Login Link */}
      <Dialog open={showWelcomeDialog} onClose={() => setShowWelcomeDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, p: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700, p: 0, mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: theme.palette.success.main }}>
          <CheckCircleIcon color="success" />
          Tenant Created Successfully!
        </DialogTitle>
        <DialogContent sx={{ p: 0, mb: 3 }}>
          <Typography variant="body1" gutterBottom>A welcome email with login instructions has been sent to the admin's email address.</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>You can also share this direct login link if needed:</Typography>
          <Box sx={{ p: 2, mt: 2, backgroundColor: theme.palette.grey[100], borderRadius: 2, border: `1px solid ${theme.palette.divider}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mr: 1 }}>{newTenantLink}</Typography>
            <Tooltip title="Copy link">
              <IconButton size="small" onClick={() => copyToClipboard(newTenantLink)} sx={{ color: theme.palette.primary.main }}><LinkIcon /></IconButton>
            </Tooltip>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 0 }}>
          <Button onClick={() => setShowWelcomeDialog(false)} variant="contained" sx={{ borderRadius: 2, textTransform: 'none', px: 3, py: 1 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} PaperProps={{ sx: { borderRadius: 3, padding: 3, minWidth: 500 } }}>
        <DialogTitle sx={{ fontWeight: 700, p: 0, mb: 2 }}>Confirm Tenant Deletion</DialogTitle>
        <DialogContent sx={{ p: 0, mb: 3 }}>
          <Typography>Are you sure you want to permanently delete <strong>{tenantToDelete?.name}</strong>?</Typography>
          <Typography variant="body2" color="error" mt={2}><strong>Warning:</strong> This action cannot be undone and will remove all associated data.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 0 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined" sx={{ borderRadius: 2, textTransform: 'none', px: 3, py: 1, borderColor: theme.palette.divider, '&:hover': { borderColor: theme.palette.primary.main } }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteTenant} variant="contained" color="error" sx={{ borderRadius: 2, textTransform: 'none', px: 3, py: 1 }}>
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%', borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SuperAdminDashboard;