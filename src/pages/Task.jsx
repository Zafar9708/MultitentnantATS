import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Badge,
  Divider,
  useTheme,
  useMediaQuery,
  alpha,
  InputAdornment,
  Fab,
  LinearProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterListIcon,
  TrendingUp as TrendingUpIcon,
  Dashboard as DashboardIcon,
  Task as TaskIcon,
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  CalendarMonth as CalendarMonthIcon,
  Star as StarIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';

// Mock data for tasks
const mockTasks = [
  {
    id: 1,
    title: 'Review candidate resumes',
    description: 'Review resumes for frontend developer position',
    assignee: { id: 2, name: 'Sarah Johnson', avatar: '/static/images/avatar/2.jpg' },
    assigner: { id: 1, name: 'Admin User' },
    dueDate: '2023-06-15',
    status: 'completed',
    priority: 'high',
    createdAt: '2023-06-10'
  },
  {
    id: 2,
    title: 'Schedule technical interviews',
    description: 'Schedule interviews for senior backend candidates',
    assignee: { id: 3, name: 'Michael Chen', avatar: '/static/images/avatar/3.jpg' },
    assigner: { id: 1, name: 'Admin User' },
    dueDate: '2023-06-18',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2023-06-12'
  },
  {
    id: 3,
    title: 'Prepare offer letters',
    description: 'Draft offer letters for selected candidates',
    assignee: { id: 4, name: 'Emily Rodriguez', avatar: '/static/images/avatar/4.jpg' },
    assigner: { id: 1, name: 'Admin User' },
    dueDate: '2023-06-20',
    status: 'pending',
    priority: 'high',
    createdAt: '2023-06-14'
  },
  {
    id: 4,
    title: 'Onboarding documentation',
    description: 'Prepare onboarding docs for new hires',
    assignee: { id: 2, name: 'Sarah Johnson', avatar: '/static/images/avatar/2.jpg' },
    assigner: { id: 1, name: 'Admin User' },
    dueDate: '2023-06-22',
    status: 'pending',
    priority: 'low',
    createdAt: '2023-06-15'
  }
];

// Mock data for recruiters
const mockRecruiters = [
  { id: 2, name: 'Sarah Johnson', completedTasks: 12, pendingTasks: 3, efficiency: 92 },
  { id: 3, name: 'Michael Chen', completedTasks: 8, pendingTasks: 5, efficiency: 78 },
  { id: 4, name: 'Emily Rodriguez', completedTasks: 15, pendingTasks: 2, efficiency: 96 }
];

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`task-tabpanel-${index}`}
      aria-labelledby={`task-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// TaskCard component
function TaskCard({ task, onEdit }) {
  const theme = useTheme();
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return theme.palette.error.main;
      case 'medium': return theme.palette.warning.main;
      case 'low': return theme.palette.success.main;
      default: return theme.palette.grey[500];
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon color="success" />;
      case 'in-progress': return <AccessTimeIcon color="warning" />;
      case 'pending': return <AccessTimeIcon color="disabled" />;
      default: return <AccessTimeIcon />;
    }
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderLeft: 4, 
        borderColor: getPriorityColor(task.priority),
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4]
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {task.description}
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => onEdit(task)}>
            <MoreVertIcon />
          </IconButton>
        </Box>
        
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar sx={{ width: 24, height: 24, mr: 1 }} src={task.assignee.avatar}>
            <PersonIcon fontSize="small" />
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            {task.assignee.name}
          </Typography>
        </Box>
        
        <Box display="flex" alignItems="center" mb={2}>
          <CalendarMonthIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </Typography>
        </Box>
        
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Chip
            icon={getStatusIcon(task.status)}
            label={task.status.replace('-', ' ')}
            size="small"
            color={getStatusColor(task.status)}
            variant="outlined"
          />
          <Chip
            label={task.priority}
            size="small"
            sx={{ 
              backgroundColor: alpha(getPriorityColor(task.priority), 0.1),
              color: getPriorityColor(task.priority),
              fontWeight: 'bold'
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

// TaskDialog component for adding/editing tasks
function TaskDialog({ open, onClose, task, recruiters }) {
  const isEdit = Boolean(task);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending'
  });

  React.useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        assignee: task.assignee.id,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status
      });
    } else {
      setFormData({
        title: '',
        description: '',
        assignee: '',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium',
        status: 'pending'
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Saving task:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        backgroundColor: 'primary.main', 
        color: 'white',
        display: 'flex',
        alignItems: 'center'
      }}>
        <AssignmentIcon sx={{ mr: 1 }} />
        {isEdit ? 'Edit Task' : 'Create New Task'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Task Title"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Assignee</InputLabel>
            <Select
              name="assignee"
              value={formData.assignee}
              label="Assignee"
              onChange={handleChange}
            >
              {recruiters.map((recruiter) => (
                <MenuItem key={recruiter.id} value={recruiter.id}>
                  {recruiter.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="dueDate"
            label="Due Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={formData.dueDate}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              label="Priority"
              onChange={handleChange}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {isEdit ? 'Update Task' : 'Create Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Main TaskPage component
export default function TaskPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [tasks, setTasks] = useState(mockTasks);
  const [recruiters] = useState(mockRecruiters);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Set filter based on tab selection
    if (newValue === 0) setFilterStatus('all');
    else if (newValue === 1) setFilterStatus('pending');
    else if (newValue === 2) setFilterStatus('in-progress');
    else if (newValue === 3) setFilterStatus('completed');
  };

  const handleOpenDialog = (task = null) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter(task => 
    (filterStatus === 'all' || task.status === filterStatus) &&
    (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const completedTasks = tasks.filter(task => task.status === 'completed');
  const pendingTasks = tasks.filter(task => task.status === 'pending' || task.status === 'in-progress');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');

  // Calculate stats
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f7f9', minHeight: '100vh' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          Task Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Create, assign, and track tasks for your recruitment team
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
            borderRadius: 2,
            boxShadow: theme.shadows[4],
            position: 'relative',
            overflow: 'hidden'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {totalTasks}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Tasks
                  </Typography>
                </Box>
                <Box sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  borderRadius: '50%', 
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TaskIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
            color: 'white',
            borderRadius: 2,
            boxShadow: theme.shadows[4]
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {completedTasks.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Completed
                  </Typography>
                </Box>
                <Box sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  borderRadius: '50%', 
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircleIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
            color: 'white',
            borderRadius: 2,
            boxShadow: theme.shadows[4]
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {pendingTasks.length}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Pending
                  </Typography>
                </Box>
                <Box sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  borderRadius: '50%', 
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AccessTimeIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
            color: 'white',
            borderRadius: 2,
            boxShadow: theme.shadows[4]
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {completionRate}%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Completion Rate
                  </Typography>
                </Box>
                <Box sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  borderRadius: '50%', 
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TrendingUpIcon />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ 
            width: '100%', 
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: theme.shadows[3]
          }}>
            <AppBar position="static" color="inherit" elevation={0}>
              <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="All Tasks" />
                  <Tab label="Pending" />
                  <Tab label="In Progress" />
                  <Tab label="Completed" />
                </Tabs>
                
                <TextField
                  size="small"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: isMobile ? '100%' : 250, mt: isMobile ? 1 : 0 }}
                />
              </Toolbar>
            </AppBar>
            
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ maxHeight: '60vh', overflow: 'auto', pr: 1 }}>
                {filteredTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleOpenDialog}
                  />
                ))}
              </Box>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ maxHeight: '60vh', overflow: 'auto', pr: 1 }}>
                {tasks.filter(t => t.status === 'pending').map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleOpenDialog}
                  />
                ))}
              </Box>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ maxHeight: '60vh', overflow: 'auto', pr: 1 }}>
                {inProgressTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleOpenDialog}
                  />
                ))}
              </Box>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <Box sx={{ maxHeight: '60vh', overflow: 'auto', pr: 1 }}>
                {completedTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleOpenDialog}
                  />
                ))}
              </Box>
            </TabPanel>
          </Paper>
        </Grid>

        {/* Recruiters Sidebar */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ 
            p: 2, 
            borderRadius: 2,
            boxShadow: theme.shadows[3]
          }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6" fontWeight="bold">
                Team Performance
              </Typography>
              <IconButton size="small">
                <FilterListIcon />
              </IconButton>
            </Box>
            
            <List>
              {recruiters.map(recruiter => (
                <ListItem key={recruiter.id} divider sx={{ py: 2 }}>
                  <ListItemAvatar>
                    <Avatar src={`/static/images/avatar/${recruiter.id}.jpg`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <Typography fontWeight="medium">{recruiter.name}</Typography>
                        {recruiter.efficiency > 90 && (
                          <StarIcon color="warning" sx={{ fontSize: 16, ml: 0.5 }} />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box mt={0.5}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="body2" color="text.secondary">
                            Efficiency: {recruiter.efficiency}%
                          </Typography>
                          <Chip 
                            label={`${recruiter.completedTasks}/${recruiter.completedTasks + recruiter.pendingTasks}`} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={recruiter.efficiency} 
                          color={recruiter.efficiency > 90 ? "success" : "primary"}
                          sx={{ borderRadius: 5 }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
            
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PeopleIcon />}
              sx={{ mt: 2 }}
            >
              View Team Analytics
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add task"
        onClick={() => handleOpenDialog()}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
      >
        <AddIcon />
      </Fab>

      {/* Task Dialog */}
      <TaskDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        task={selectedTask}
        recruiters={recruiters}
      />
    </Box>
  );
}