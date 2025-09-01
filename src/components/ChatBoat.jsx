import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  Chip,
  Avatar,
  Fab,
  Zoom,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Send as SendIcon,
  Close as CloseIcon,
  SmartToy as BotIcon,
  Person as UserIcon,
  Chat as ChatIcon,
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Help as HelpIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';
import axios from 'axios';

const AtsChatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your ATS assistant. I can help you with application status, job openings, interview schedules, and other questions about our hiring process.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch jobs data
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const token=localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/v1/job',{
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
      if (response.data && response.data.jobs) {
        setJobs(response.data.jobs);
        return response.data.jobs;
      }
      return [];
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch candidates data
const fetchCandidates = async () => {
  try {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/v1/candidates', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.data && response.data.candidates) {
      return response.data.candidates;
    }
    return [];
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return [];
  } finally {
    setIsLoading(false);
  }
};


  // Fetch interviews data
  // Fetch online interviews data
const fetchOnlineInterviews = async () => {
  try {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/v1/interviews/interviews/schedule', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching online interviews:', error);
    return [];
  } finally {
    setIsLoading(false);
  }
};


  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Add user message to chat
    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');

    // Process the message and generate response
    setIsLoading(true);
    
    try {
      let reply = "I'm not sure how to help with that. Please contact our support team for assistance.";
      let intent = 'unknown';
      let richContent = null;

      // Simple intent recognition
      const message = inputMessage.toLowerCase();

      
      
      if (message.includes('status') || message.includes('application') || message.includes('progress')) {
        reply = "Based on our records, your application is currently in review. You'll be notified once there's an update.";
        intent = 'application.status';
      } else if (message.includes('job') || message.includes('opening') || message.includes('position') || message.includes('role')) {
        const jobsData = await fetchJobs();
        if (jobsData.length > 0) {
          reply = `We currently have ${jobsData.length} open positions. Here are some of our available roles:`;
          richContent = (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Available Positions:
              </Typography>
              <List dense sx={{ maxHeight: 150, overflow: 'auto' }}>
                {jobsData.slice(0, 5).map((job, index) => (
                  <ListItem key={index} divider>
                    <ListItemIcon>
                      <WorkIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={job.jobTitle} 
                      secondary={`${job.department} • ${job.experience}`}
                    />
                  </ListItem>
                ))}
              </List>
              {jobsData.length > 5 && (
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  ...and {jobsData.length - 5} more positions
                </Typography>
              )}
            </Box>
          );
        } else {
          reply = "Currently, we don't have any open positions. Please check back later.";
        }
        intent = 'job.openings';
      } else if (message.includes('interview') || message.includes('schedule')) {
        const interviewsData = await fetchOnlineInterviews();
        if (interviewsData.length > 0) {
          reply = `You have ${interviewsData.length} scheduled interview(s). Here are the details:`;
          richContent = (
            <Box sx={{ mt: 1 }}>
              {interviewsData.map((interview, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">
                    Interview with {interview.candidate.name}
                  </Typography>
                  <Typography variant="body2">
                    Date: {new Date(interview.date).toLocaleDateString()} at {interview.startTime}
                  </Typography>
                  <Typography variant="body2">
                    Platform: {interview.platform}
                  </Typography>
                  {interview.meetingLink && (
                    <Typography variant="body2">
                      <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                        Join Meeting
                      </a>
                    </Typography>
                  )}
                  {index < interviewsData.length - 1 && <Divider sx={{ my: 1 }} />}
                </Box>
              ))}
            </Box>
          );
        } else {
          reply = "You don't have any scheduled interviews at the moment.";
        }
        intent = 'interview.schedule';
      } else if (message.includes('profile') || message.includes('update') || message.includes('change')) {
        reply = "You can update your profile information by logging into your candidate portal and navigating to 'Profile Settings'.";
        intent = 'profile.update';
      } else if (message.includes('help') || message.includes('support')) {
        reply = "I can help you with application status, job openings, profile updates, and interview information. What do you need help with?";
        intent = 'support.help';
      } else if (message.includes('candidate') || message.includes('candidates')) {
  const candidatesData = await fetchCandidates();
  if (candidatesData.length > 0) {
    reply = `We currently have ${candidatesData.length} candidate(s) in the system. Here are a few of them:`;
    richContent = (
      <Box sx={{ mt: 1 }}>
        <List dense sx={{ maxHeight: 150, overflow: 'auto' }}>
          {candidatesData.slice(0, 5).map((candidate, index) => (
            <ListItem key={index} divider>
              <ListItemIcon>
                <PersonIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={candidate.name} 
                secondary={`Skills: ${candidate.skills?.join(', ') || 'N/A'}`}
              />
            </ListItem>
          ))}
        </List>
        {candidatesData.length > 5 && (
          <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
            ...and {candidatesData.length - 5} more candidates
          </Typography>
        )}
      </Box>
    );
  } else {
    reply = "Currently, there are no candidates in the system.";
  }
  intent = 'candidate.list';
}
else if (message.includes('list') && message.includes('job')) {
        const jobsData = await fetchJobs();
        if (jobsData.length > 0) {
          reply = `We have ${jobsData.length} open positions. Here are the details:`;
          richContent = (
            <Box sx={{ mt: 1 }}>
              {jobsData.slice(0, 3).map((job, index) => (
                <Paper key={index} elevation={1} sx={{ p: 1.5, mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {job.jobTitle}
                  </Typography>
                  <Typography variant="body2">
                    {job.department} • {job.experience}
                  </Typography>
                  {job.jobFormId && (
                    <>
                      <Typography variant="body2" display="flex" alignItems="center">
                        <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {job.jobFormId.locations.map(loc => loc.name).join(', ')}
                      </Typography>
                      <Typography variant="body2" display="flex" alignItems="center">
                        <MoneyIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {job.jobFormId.currency} {job.jobFormId.amount}
                      </Typography>
                    </>
                  )}
                </Paper>
              ))}
              {jobsData.length > 3 && (
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  ...and {jobsData.length - 3} more positions. Type "job details" for more information.
                </Typography>
              )}
            </Box>
          );
        } else {
          reply = "Currently, we don't have any open positions. Please check back later.";
        }
        intent = 'job.details';
      }

      const botMessage = {
        text: reply,
        sender: 'bot',
        timestamp: new Date(),
        intent: intent,
        richContent: richContent
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = {
        text: "Sorry, I'm having trouble processing your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const suggestedQuestions = [
    // { text: 'What is my application status?', icon: <AssignmentIcon />, intent: 'application.status' },
    { text: 'What job openings are available?', icon: <WorkIcon />, intent: 'job.openings' },
    { text: 'List all jobs with details', icon: <WorkIcon />, intent: 'job.details' },
    { text: 'Total Online Interviews Scheduled', icon: <ScheduleIcon />, intent: 'interview.schedule' },
    { text: 'How can I update my profile?', icon: <HelpIcon />, intent: 'profile.update' },
    { text: 'How many candidates are there?', icon: <PersonIcon />, intent: 'candidate.list' }, 
  ];

  const handleSuggestionClick = (question) => {
    setInputMessage(question);
    // Auto-send the question if chat is open
    if (isOpen) {
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    }
  };

  return (
    <Box sx={{ 
      position: 'fixed', 
      bottom: 16, 
      right: 16, 
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    }}>
      {isOpen && (
        <Paper
          elevation={10}
          sx={{
            width: 400,
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 2,
            mb: 1
          }}
        >
          <AppBar position="static" color="primary">
            <Toolbar>
              <BotIcon sx={{ mr: 2 }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Wrocus ATS Assistant
              </Typography>
              <IconButton color="inherit" onClick={toggleChat}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2, bgcolor: '#f5f5f5' }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-start',
                    maxWidth: '90%',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
                      mx: 1,
                      width: 32,
                      height: 32
                    }}
                  >
                    {message.sender === 'user' ? <UserIcon /> : <BotIcon />}
                  </Avatar>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 1.5,
                      bgcolor: message.sender === 'user' ? 'primary.light' : 'background.paper',
                      color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                      borderRadius: message.sender === 'user' 
                        ? '18px 18px 4px 18px' 
                        : '18px 18px 18px 4px',
                    }}
                  >
                    <Typography variant="body2">{message.text}</Typography>
                    {message.richContent && message.richContent}
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        textAlign: 'right',
                        mt: 0.5,
                        opacity: 0.7,
                      }}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            ))}
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mx: 1, width: 32, height: 32 }}>
                  <BotIcon />
                </Avatar>
                <Paper elevation={1} sx={{ p: 1.5, borderRadius: '18px 18px 18px 4px' }}>
                  <CircularProgress size={16} />
                </Paper>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', mb: 1, gap: 0.5, flexWrap: 'wrap' }}>
              {suggestedQuestions.map((question, index) => (
                <Chip
                  key={index}
                  icon={question.icon}
                  label={question.text}
                  size="small"
                  onClick={() => handleSuggestionClick(question.text)}
                  variant="outlined"
                  sx={{ mb: 0.5 }}
                />
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type your message here..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                sx={{ mr: 1 }}
                disabled={isLoading}
              />
              <IconButton 
                color="primary" 
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === '' || isLoading}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      )}
      
      <Zoom in={true}>
        <Fab
          color="primary"
          aria-label="chat"
          onClick={toggleChat}
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
          }}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </Fab>
      </Zoom>
    </Box>
  );
};

export default AtsChatbot;

// import React, { useState, useRef, useEffect } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   IconButton,
//   AppBar,
//   Toolbar,
//   Chip,
//   Avatar,
//   Fab,
//   Zoom,
//   CircularProgress,
//   Card,
//   CardContent,
//   Button,
//   Grid,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Tabs,
//   Tab,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import {
//   Send as SendIcon,
//   Close as CloseIcon,
//   SmartToy as BotIcon,
//   Person as UserIcon,
//   Chat as ChatIcon,
//   Work as WorkIcon,
//   LocationOn as LocationIcon,
//   Business as BusinessIcon,
//   AttachMoney as MoneyIcon,
//   OpenInNew as OpenInNewIcon,
//   Group as GroupIcon,
//   Star as StarIcon,
//   CalendarToday as CalendarTodayIcon,
//   Description as DescriptionIcon,
//   CorporateFare as CorporateFareIcon,
//   ViewList as ViewListIcon,
//   GridView as GridViewIcon,
//   Person as PersonIcon,
//   KeyboardArrowDown as KeyboardArrowDownIcon,
//   KeyboardArrowUp as KeyboardArrowUpIcon
// } from '@mui/icons-material';
// import axios from 'axios';

// const AtsChatbot = () => {
//   const [messages, setMessages] = useState([
//     {
//       text: "Hello! I'm your ATS assistant. I can help you with application status, job openings, interview schedules, and other questions about our hiring process.",
//       sender: 'bot',
//       timestamp: new Date()
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [jobs, setJobs] = useState([]);
//   const [interviews, setInterviews] = useState([]);
//   const [viewMode, setViewMode] = useState('grid');
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [jobDialogOpen, setJobDialogOpen] = useState(false);
//   const [expandedJobs, setExpandedJobs] = useState({});
//   const messagesEndRef = useRef(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Fetch jobs data
//   const fetchJobs = async () => {
//     try {
//       setIsLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:5000/api/v1/job', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (response.data && response.data.jobs) {
//         setJobs(response.data.jobs);
//         return response.data.jobs;
//       }
//       return [];
//     } catch (error) {
//       console.error('Error fetching jobs:', error);
//       return [];
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch candidates data
//   const fetchCandidates = async () => {
//     try {
//       setIsLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:5000/api/v1/candidates', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (response.data && response.data.candidates) {
//         return response.data.candidates;
//       }
//       return [];
//     } catch (error) {
//       console.error('Error fetching candidates:', error);
//       return [];
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch online interviews data
//   const fetchOnlineInterviews = async () => {
//     try {
//       setIsLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:5000/api/v1/interviews/interviews/schedule', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (response.data && response.data.data) {
//         return response.data.data;
//       }
//       return [];
//     } catch (error) {
//       console.error('Error fetching online interviews:', error);
//       return [];
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleViewJobDetails = (job) => {
//     setSelectedJob(job);
//     setJobDialogOpen(true);
//   };

//   const handleJobDialogClose = () => {
//     setJobDialogOpen(false);
//     setSelectedJob(null);
//   };

//   const toggleJobExpansion = (jobId) => {
//     setExpandedJobs(prev => ({
//       ...prev,
//       [jobId]: !prev[jobId]
//     }));
//   };

//   const handleSendMessage = async () => {
//     if (inputMessage.trim() === '') return;

//     // Add user message to chat
//     const userMessage = {
//       text: inputMessage,
//       sender: 'user',
//       timestamp: new Date()
//     };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInputMessage('');

//     // Process the message and generate response
//     setIsLoading(true);
    
//     try {
//       let reply = "I'm not sure how to help with that. Please contact our support team for assistance.";
//       let intent = 'unknown';
//       let richContent = null;

//       // Simple intent recognition
//       const message = inputMessage.toLowerCase();

//       if (message.includes('status') || message.includes('application') || message.includes('progress')) {
//         reply = "Based on our records, your application is currently in review. You'll be notified once there's an update.";
//         intent = 'application.status';
//       } else if (message.includes('interview') || message.includes('schedule')) {
//         const interviewsData = await fetchOnlineInterviews();
//         if (interviewsData.length > 0) {
//           reply = `You have ${interviewsData.length} scheduled interview(s). Here are the details:`;
//           richContent = (
//             <Box sx={{ mt: 1 }}>
//               {interviewsData.map((interview, index) => (
//                 <Card key={index} sx={{ mb: 1.5, p: 1.5, backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0' }}>
//                   <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
//                     Interview with {interview.candidate?.name || 'Candidate'}
//                   </Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
//                     <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
//                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                       {new Date(interview.date).toLocaleDateString()} at {interview.startTime}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
//                     <BusinessIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
//                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                       Platform: {interview.platform}
//                     </Typography>
//                   </Box>
//                   {interview.meetingLink && (
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       startIcon={<OpenInNewIcon />}
//                       href={interview.meetingLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       sx={{ mt: 1 }}
//                     >
//                       Join Meeting
//                     </Button>
//                   )}
//                 </Card>
//               ))}
//             </Box>
//           );
//         } else {
//           reply = "You don't have any scheduled interviews at the moment.";
//         }
//         intent = 'interview.schedule';
//       } else if (message.includes('profile') || message.includes('update') || message.includes('change')) {
//         reply = "You can update your profile information by logging into your candidate portal and navigating to 'Profile Settings'.";
//         intent = 'profile.update';
//       } else if (message.includes('help') || message.includes('support')) {
//         reply = "I can help you with application status, job openings, profile updates, and interview information. What do you need help with?";
//         intent = 'support.help';
//       } else if (message.includes('candidate') || message.includes('candidates')) {
//         const candidatesData = await fetchCandidates();
//         if (candidatesData.length > 0) {
//           reply = `We currently have ${candidatesData.length} candidate(s) in the system.`;
//           richContent = (
//             <Box sx={{ mt: 1 }}>
//               <Grid container spacing={2}>
//                 {candidatesData.slice(0, 4).map((candidate, index) => (
//                   <Grid item xs={12} sm={6} key={index}>
//                     <Card sx={{ p: 2, bgcolor: '#f8f9fa' }}>
//                       <Typography variant="subtitle2" fontWeight="bold" color="primary">
//                         {candidate.name}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                         Skills: {candidate.skills?.join(', ') || 'N/A'}
//                       </Typography>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//               {candidatesData.length > 4 && (
//                 <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary', mt: 1, display: 'block' }}>
//                   ...and {candidatesData.length - 4} more candidates
//                 </Typography>
//               )}
//             </Box>
//           );
//         } else {
//           reply = "Currently, there are no candidates in the system.";
//         }
//         intent = 'candidate.list';
//       } else if (message.includes('job') || message.includes('opening') || message.includes('position') || message.includes('role') || message.includes('list')) {
//         const jobsData = await fetchJobs();
//         if (jobsData.length > 0) {
//           reply = `We have ${jobsData.length} open positions.`;
//           richContent = (
//             <Box sx={{ mt: 2 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="h6" fontWeight="bold" color="primary">
//                   🚀 Job Openings ({jobsData.length})
//                 </Typography>
//                 <Box>
//                   <IconButton 
//                     size="small" 
//                     color={viewMode === 'grid' ? 'primary' : 'default'}
//                     onClick={() => setViewMode('grid')}
//                   >
//                     <GridViewIcon />
//                   </IconButton>
//                   <IconButton 
//                     size="small" 
//                     color={viewMode === 'list' ? 'primary' : 'default'}
//                     onClick={() => setViewMode('list')}
//                   >
//                     <ViewListIcon />
//                   </IconButton>
//                 </Box>
//               </Box>

//               {viewMode === 'grid' ? (
//                 <Grid container spacing={2}>
//                   {jobsData.map((job, index) => (
//                     <Grid item xs={12} key={index}>
//                       <Card sx={{ 
//                         p: 2, 
//                         borderLeft: job.jobFormId?.markPriority ? '4px solid #FFD700' : '4px solid #1976d2',
//                         boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
//                         transition: 'transform 0.2s, box-shadow 0.2s',
//                         background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
//                         '&:hover': {
//                           transform: 'translateY(-2px)',
//                           boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
//                         }
//                       }}>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                           <Box>
//                             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                               <Typography variant="h6" fontWeight="bold" color="primary">
//                                 {job.jobTitle}
//                               </Typography>
//                               {job.jobFormId?.markPriority && (
//                                 <StarIcon sx={{ color: '#FFD700', ml: 1 }} />
//                               )}
//                             </Box>
//                             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
//                               <Chip 
//                                 label={job.department} 
//                                 size="small" 
//                                 color="secondary" 
//                                 variant="outlined"
//                               />
//                               <Chip 
//                                 label={job.experience} 
//                                 size="small" 
//                                 variant="outlined"
//                               />
//                               <Chip 
//                                 icon={<GroupIcon />}
//                                 label={`${job.jobFormId?.openings || 0} openings`} 
//                                 size="small" 
//                                 variant="outlined"
//                               />
//                             </Box>
//                           </Box>
//                           <Typography variant="caption" color="text.secondary" sx={{ bgcolor: '#f0f4ff', p: 0.5, borderRadius: 1 }}>
//                             {job.jobName}
//                           </Typography>
//                         </Box>

//                         {job.jobFormId && (
//                           <Box sx={{ mt: 1.5 }}>
//                             <Grid container spacing={2}>
//                               <Grid item xs={12} md={6}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
//                                   <LocationIcon sx={{ fontSize: 20, mr: 1.5, color: 'primary.main' }} />
//                                   <Box>
//                                     <Typography variant="caption" color="text.secondary">
//                                       Location
//                                     </Typography>
//                                     <Typography variant="body2" fontWeight="medium">
//                                       {job.jobFormId.locations.map(loc => loc.name).join(', ') || 'Remote'}
//                                     </Typography>
//                                   </Box>
//                                 </Box>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
//                                   <MoneyIcon sx={{ fontSize: 20, mr: 1.5, color: 'primary.main' }} />
//                                   <Box>
//                                     <Typography variant="caption" color="text.secondary">
//                                       Salary
//                                     </Typography>
//                                     <Typography variant="body2" fontWeight="medium">
//                                       {job.jobFormId.currency} {job.jobFormId.amount}
//                                     </Typography>
//                                   </Box>
//                                 </Box>
//                               </Grid>
//                               <Grid item xs={12} md={6}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
//                                   <CalendarTodayIcon sx={{ fontSize: 20, mr: 1.5, color: 'primary.main' }} />
//                                   <Box>
//                                     <Typography variant="caption" color="text.secondary">
//                                       Target Hire Date
//                                     </Typography>
//                                     <Typography variant="body2" fontWeight="medium">
//                                       {job.jobFormId.targetHireDate ? 
//                                         new Date(job.jobFormId.targetHireDate).toLocaleDateString() : 
//                                         'Not specified'}
//                                     </Typography>
//                                   </Box>
//                                 </Box>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
//                                   <BusinessIcon sx={{ fontSize: 20, mr: 1.5, color: 'primary.main' }} />
//                                   <Box>
//                                     <Typography variant="caption" color="text.secondary">
//                                       Business Unit
//                                     </Typography>
//                                     <Typography variant="body2" fontWeight="medium" textTransform="capitalize">
//                                       {job.jobFormId.BusinessUnit}
//                                     </Typography>
//                                   </Box>
//                                 </Box>
//                               </Grid>
//                             </Grid>

//                             {job.jobFormId.BusinessUnit === 'external' && job.jobFormId.Client && (
//                               <Box sx={{ 
//                                 mt: 1.5, 
//                                 p: 1.5, 
//                                 bgcolor: '#f0f4ff', 
//                                 borderRadius: 1,
//                                 border: '1px dashed #b3c8ff'
//                               }}>
//                                 <Typography variant="body2" sx={{ fontWeight: 'medium', display: 'flex', alignItems: 'center' }}>
//                                   <CorporateFareIcon sx={{ mr: 1, fontSize: 18 }} />
//                                   Client: 
//                                   <Typography component="span" variant="body2" sx={{ ml: 0.5, fontWeight: 'bold' }}>
//                                     {typeof job.jobFormId.Client === 'object' ? 
//                                       job.jobFormId.Client.name : 
//                                       job.jobFormId.Client}
//                                   </Typography>
//                                 </Typography>
//                               </Box>
//                             )}

//                             {job.jobDesc && (
//                               <Box sx={{ mt: 2 }}>
//                                 <Typography variant="body2" sx={{ 
//                                   display: '-webkit-box',
//                                   WebkitLineClamp: expandedJobs[job._id] ? 'unset' : 2,
//                                   WebkitBoxOrient: 'vertical',
//                                   overflow: 'hidden',
//                                   textOverflow: 'ellipsis',
//                                   color: 'text.secondary'
//                                 }}>
//                                   {job.jobDesc}
//                                 </Typography>
//                                 <Button
//                                   size="small"
//                                   onClick={() => toggleJobExpansion(job._id)}
//                                   endIcon={expandedJobs[job._id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//                                   sx={{ mt: 0.5 }}
//                                 >
//                                   {expandedJobs[job._id] ? 'Show less' : 'Read more'}
//                                 </Button>
//                               </Box>
//                             )}

//                             <Box sx={{ mt: 2, pt: 1, borderTop: '1px dashed #e0e0e0' }}>
//                               <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1, display: 'flex', alignItems: 'center' }}>
//                                 <GroupIcon sx={{ mr: 1, fontSize: 18 }} />
//                                 Recruiting Team:
//                               </Typography>
//                               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                                 {Array.isArray(job.jobFormId.recruitingPerson) ? 
//                                   job.jobFormId.recruitingPerson.map((person, i) => (
//                                     <Chip 
//                                       key={i}
//                                       label={person}
//                                       size="small"
//                                       variant="outlined"
//                                       color="primary"
//                                     />
//                                   )) : 
//                                   <Chip 
//                                     label={job.jobFormId.recruitingPerson || 'Not assigned'}
//                                     size="small"
//                                     variant="outlined"
//                                   />
//                                 }
//                               </Box>
//                             </Box>
//                           </Box>
//                         )}

//                         <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//                           <Button 
//                             variant="contained" 
//                             size="small"
//                             endIcon={<OpenInNewIcon />}
//                             sx={{ borderRadius: 2 }}
//                             onClick={() => handleViewJobDetails(job)}
//                           >
//                             View Full Details
//                           </Button>
//                         </Box>
//                       </Card>
//                     </Grid>
//                   ))}
//                 </Grid>
//               ) : (
//                 <Box>
//                   {jobsData.map((job, index) => (
//                     <Card key={index} sx={{ p: 2, mb: 2, borderLeft: job.jobFormId?.markPriority ? '4px solid #FFD700' : '4px solid #1976d2' }}>
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                         <Box>
//                           <Typography variant="h6" color="primary" fontWeight="bold">
//                             {job.jobTitle}
//                           </Typography>
//                           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1, mb: 1.5 }}>
//                             <Chip label={job.department} size="small" color="secondary" />
//                             <Chip label={job.experience} size="small" variant="outlined" />
//                             <Chip label={`${job.jobFormId?.openings || 0} openings`} size="small" variant="outlined" />
//                           </Box>
//                         </Box>
//                         <Typography variant="caption" color="text.secondary">
//                           {job.jobName}
//                         </Typography>
//                       </Box>
                      
//                       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1.5 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
//                           <Typography variant="body2">
//                             {job.jobFormId?.locations.map(loc => loc.name).join(', ') || 'Remote'}
//                           </Typography>
//                         </Box>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <MoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
//                           <Typography variant="body2">
//                             {job.jobFormId?.currency} {job.jobFormId?.amount}
//                           </Typography>
//                         </Box>
//                       </Box>

//                       <Button 
//                         variant="outlined" 
//                         size="small"
//                         endIcon={<OpenInNewIcon />}
//                         onClick={() => handleViewJobDetails(job)}
//                         sx={{ mt: 1.5 }}
//                       >
//                         View Details
//                       </Button>
//                     </Card>
//                   ))}
//                 </Box>
//               )}
//             </Box>
//           );
//         } else {
//           reply = "Currently, we don't have any open positions. Please check back later.";
//         }
//         intent = 'job.details';
//       }

//       const botMessage = {
//         text: reply,
//         sender: 'bot',
//         timestamp: new Date(),
//         intent: intent,
//         richContent: richContent
//       };
//       setMessages(prevMessages => [...prevMessages, botMessage]);
//     } catch (error) {
//       console.error('Error processing message:', error);
//       const errorMessage = {
//         text: "Sorry, I'm having trouble processing your request. Please try again later.",
//         sender: 'bot',
//         timestamp: new Date()
//       };
//       setMessages(prevMessages => [...prevMessages, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//   };

//   const suggestedQuestions = [
//     { text: 'Show job openings', icon: <WorkIcon />, intent: 'job.details' },
//     { text: 'Interview schedule', icon: <CalendarTodayIcon />, intent: 'interview.schedule' },
//     { text: 'Candidate list', icon: <PersonIcon />, intent: 'candidate.list' }, 
//   ];

//   const handleSuggestionClick = (question) => {
//     setInputMessage(question.text);
//     // Auto-send the question if chat is open
//     if (isOpen) {
//       setTimeout(() => {
//         handleSendMessage();
//       }, 100);
//     }
//   };

//   // Job Detail Dialog
//   const JobDetailDialog = ({ job, open, onClose }) => {
//     if (!job) return null;

//     return (
//       <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ 
//           bgcolor: 'primary.main', 
//           color: 'white', 
//           display: 'flex', 
//           alignItems: 'center',
//           justifyContent: 'space-between'
//         }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <WorkIcon sx={{ mr: 1 }} />
//             {job.jobTitle}
//             {job.jobFormId?.markPriority && (
//               <StarIcon sx={{ color: '#FFD700', ml: 1 }} />
//             )}
//           </Box>
//           <IconButton onClick={onClose} sx={{ color: 'white' }}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent sx={{ p: 3 }}>
//           <Box sx={{ mb: 3 }}>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
//               <Chip label={job.department} color="primary" variant="outlined" />
//               <Chip label={job.experience} variant="outlined" />
//               <Chip label={job.jobName} variant="outlined" />
//               <Chip 
//                 icon={<GroupIcon />}
//                 label={`${job.jobFormId?.openings || 0} openings`} 
//                 variant="outlined" 
//               />
//             </Box>

//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
//                   <Typography variant="h6" gutterBottom color="primary">
//                     Job Details
//                   </Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
//                     <LocationIcon sx={{ mr: 1.5, color: 'primary.main' }} />
//                     <Box>
//                       <Typography variant="caption" color="text.secondary">
//                         Location
//                       </Typography>
//                       <Typography variant="body2">
//                         {job.jobFormId?.locations?.map(loc => loc.name).join(', ') || 'Remote'}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
//                     <MoneyIcon sx={{ mr: 1.5, color: 'primary.main' }} />
//                     <Box>
//                       <Typography variant="caption" color="text.secondary">
//                         Salary
//                       </Typography>
//                       <Typography variant="body2">
//                         {job.jobFormId?.currency} {job.jobFormId?.amount}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
//                     <CalendarTodayIcon sx={{ mr: 1.5, color: 'primary.main' }} />
//                     <Box>
//                       <Typography variant="caption" color="text.secondary">
//                         Target Hire Date
//                       </Typography>
//                       <Typography variant="body2">
//                         {job.jobFormId?.targetHireDate ? 
//                           new Date(job.jobFormId.targetHireDate).toLocaleDateString() : 
//                           'Not specified'}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <BusinessIcon sx={{ mr: 1.5, color: 'primary.main' }} />
//                     <Box>
//                       <Typography variant="caption" color="text.secondary">
//                         Business Unit
//                       </Typography>
//                       <Typography variant="body2" textTransform="capitalize">
//                         {job.jobFormId?.BusinessUnit}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Card>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Card variant="outlined" sx={{ p: 2 }}>
//                   <Typography variant="h6" gutterBottom color="primary">
//                     Recruitment Info
//                   </Typography>
//                   <Box sx={{ mb: 2 }}>
//                     <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>
//                       Recruiting Team:
//                     </Typography>
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                       {Array.isArray(job.jobFormId?.recruitingPerson) ? 
//                         job.jobFormId.recruitingPerson.map((person, i) => (
//                           <Chip 
//                             key={i}
//                             label={person}
//                             size="small"
//                             color="primary"
//                             variant="outlined"
//                           />
//                         )) : 
//                         <Chip 
//                           label={job.jobFormId?.recruitingPerson || 'Not assigned'}
//                           size="small"
//                           variant="outlined"
//                         />
//                       }
//                     </Box>
//                   </Box>
//                   {job.jobFormId?.BusinessUnit === 'external' && job.jobFormId.Client && (
//                     <Box>
//                       <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 0.5 }}>
//                         Client:
//                       </Typography>
//                       <Typography variant="body2">
//                         {typeof job.jobFormId.Client === 'object' ? 
//                           job.jobFormId.Client.name : 
//                           job.jobFormId.Client}
//                       </Typography>
//                     </Box>
//                   )}
//                 </Card>
//               </Grid>
//             </Grid>

//             {job.jobDesc && (
//               <Card variant="outlined" sx={{ p: 2, mt: 2 }}>
//                 <Typography variant="h6" gutterBottom color="primary">
//                   Job Description
//                 </Typography>
//                 <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
//                   {job.jobDesc}
//                 </Typography>
//               </Card>
//             )}
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onClose}>Close</Button>
//           <Button variant="contained" color="primary">
//             Apply Now
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );
//   };

//   return (
//     <Box sx={{ 
//       position: 'fixed', 
//       bottom: 16, 
//       right: 16, 
//       zIndex: 1000,
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'flex-end'
//     }}>
//       {isOpen && (
//         <Paper
//           elevation={10}
//           sx={{
//             width: isMobile ? '90vw' : 500,
//             height: isMobile ? '80vh' : 600,
//             display: 'flex',
//             flexDirection: 'column',
//             overflow: 'hidden',
//             borderRadius: 2,
//             mb: 1
//           }}
//         >
//           <AppBar position="static" color="primary">
//             <Toolbar>
//               <BotIcon sx={{ mr: 2 }} />
//               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                 ATS Assistant
//               </Typography>
//               <IconButton color="inherit" onClick={toggleChat}>
//                 <CloseIcon />
//               </IconButton>
//             </Toolbar>
//           </AppBar>

//           <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2, bgcolor: '#f5f5f5' }}>
//             {messages.map((message, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: 'flex',
//                   justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
//                   mb: 2,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
//                     alignItems: 'flex-start',
//                     maxWidth: '90%',
//                   }}
//                 >
//                   <Avatar
//                     sx={{
//                       bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
//                       mx: 1,
//                       width: 32,
//                       height: 32
//                     }}
//                   >
//                     {message.sender === 'user' ? <UserIcon /> : <BotIcon />}
//                   </Avatar>
//                   <Paper
//                     elevation={1}
//                     sx={{
//                       p: 1.5,
//                       bgcolor: message.sender === 'user' ? 'primary.light' : 'white',
//                       color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
//                       borderRadius: message.sender === 'user' 
//                         ? '18px 18px 4px 18px' 
//                         : '18px 18px 18px 4px',
//                       border: message.sender === 'user' ? 'none' : '1px solid #e0e0e0',
//                       maxWidth: '100%'
//                     }}
//                   >
//                     <Typography variant="body2" sx={{ 
//                       lineHeight: 1.4,
//                       fontWeight: message.sender === 'user' ? 'medium' : 'regular'
//                     }}>
//                       {message.text}
//                     </Typography>
//                     {message.richContent && message.richContent}
//                     <Typography
//                       variant="caption"
//                       sx={{
//                         display: 'block',
//                         textAlign: 'right',
//                         mt: 0.5,
//                         opacity: 0.7,
//                         color: message.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'text.secondary'
//                       }}
//                     >
//                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </Typography>
//                   </Paper>
//                 </Box>
//               </Box>
//             ))}
//             {isLoading && (
//               <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
//                 <Avatar sx={{ bgcolor: 'secondary.main', mx: 1, width: 32, height: 32 }}>
//                   <BotIcon />
//                 </Avatar>
//                 <Paper elevation={1} sx={{ p: 1.5, borderRadius: '18px 18px 18px 4px' }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <CircularProgress size={16} sx={{ mr: 1 }} />
//                     <Typography variant="body2">Thinking...</Typography>
//                   </Box>
//                 </Paper>
//               </Box>
//             )}
//             <div ref={messagesEndRef} />
//           </Box>

//           <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
//             <Box sx={{ display: 'flex', mb: 1, gap: 0.5, flexWrap: 'wrap' }}>
//               {suggestedQuestions.map((question, index) => (
//                 <Chip
//                   key={index}
//                   icon={question.icon}
//                   label={question.text}
//                   size="small"
//                   onClick={() => handleSuggestionClick(question)}
//                   variant="outlined"
//                   sx={{ 
//                     mb: 0.5, 
//                     fontSize: '0.7rem',
//                     bgcolor: 'white',
//                     '&:hover': {
//                       bgcolor: 'primary.light',
//                       color: 'white'
//                     }
//                   }}
//                 />
//               ))}
//             </Box>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Type your message here..."
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 sx={{ mr: 1 }}
//                 disabled={isLoading}
//               />
//               <IconButton 
//                 color="primary" 
//                 onClick={handleSendMessage}
//                 disabled={inputMessage.trim() === '' || isLoading}
//                 sx={{ 
//                   bgcolor: 'primary.main',
//                   color: 'white',
//                   '&:hover': {
//                     bgcolor: 'primary.dark'
//                   },
//                   '&:disabled': {
//                     bgcolor: 'grey.300'
//                   }
//                 }}
//               >
//                 <SendIcon />
//               </IconButton>
//             </Box>
//           </Box>
//         </Paper>
//       )}
      
//       <Zoom in={true}>
//         <Fab
//           color="primary"
//           aria-label="chat"
//           onClick={toggleChat}
//           sx={{
//             background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
//             boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
//           }}
//         >
//           {isOpen ? <CloseIcon /> : <ChatIcon />}
//         </Fab>
//       </Zoom>

//       <JobDetailDialog 
//         job={selectedJob} 
//         open={jobDialogOpen} 
//         onClose={handleJobDialogClose} 
//       />
//     </Box>
//   );
// };

// export default AtsChatbot;