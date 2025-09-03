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
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Divider
// } from '@mui/material';
// import {
//   Send as SendIcon,
//   Close as CloseIcon,
//   SmartToy as BotIcon,
//   Person as UserIcon,
//   Chat as ChatIcon,
//   Work as WorkIcon,
//   Assignment as AssignmentIcon,
//   Person as PersonIcon,
//   Schedule as ScheduleIcon,
//   Help as HelpIcon,
//   LocationOn as LocationIcon,
//   Business as BusinessIcon,
//   AttachMoney as MoneyIcon
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
//   const messagesEndRef = useRef(null);

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
//       const token=localStorage.getItem('token');
//       const response = await axios.get('https://1a9a0cdf7ba0.ngrok-free.app/api/v1/job',{
//         headers:{
//             Authorization:`Bearer ${token}`
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
// const fetchCandidates = async () => {
//   try {
//     setIsLoading(true);
//     const token = localStorage.getItem('token');
//     const response = await axios.get('https://1a9a0cdf7ba0.ngrok-free.app/api/v1/candidates', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     if (response.data && response.data.candidates) {
//       return response.data.candidates;
//     }
//     return [];
//   } catch (error) {
//     console.error('Error fetching candidates:', error);
//     return [];
//   } finally {
//     setIsLoading(false);
//   }
// };


//   // Fetch interviews data
//   // Fetch online interviews data
// const fetchOnlineInterviews = async () => {
//   try {
//     setIsLoading(true);
//     const token = localStorage.getItem('token');
//     const response = await axios.get('https://1a9a0cdf7ba0.ngrok-free.app/api/v1/interviews/interviews/schedule', {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     if (response.data && response.data.data) {
//       return response.data.data;
//     }
//     return [];
//   } catch (error) {
//     console.error('Error fetching online interviews:', error);
//     return [];
//   } finally {
//     setIsLoading(false);
//   }
// };


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
//       } else if (message.includes('job') || message.includes('opening') || message.includes('position') || message.includes('role')) {
//         const jobsData = await fetchJobs();
//         if (jobsData.length > 0) {
//           reply = `We currently have ${jobsData.length} open positions. Here are some of our available roles:`;
//           richContent = (
//             <Box sx={{ mt: 1 }}>
//               <Typography variant="subtitle2" gutterBottom>
//                 Available Positions:
//               </Typography>
//               <List dense sx={{ maxHeight: 150, overflow: 'auto' }}>
//                 {jobsData.slice(0, 5).map((job, index) => (
//                   <ListItem key={index} divider>
//                     <ListItemIcon>
//                       <WorkIcon color="primary" fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText 
//                       primary={job.jobTitle} 
//                       secondary={`${job.department} • ${job.experience}`}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//               {jobsData.length > 5 && (
//                 <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
//                   ...and {jobsData.length - 5} more positions
//                 </Typography>
//               )}
//             </Box>
//           );
//         } else {
//           reply = "Currently, we don't have any open positions. Please check back later.";
//         }
//         intent = 'job.openings';
//       } else if (message.includes('interview') || message.includes('schedule')) {
//         const interviewsData = await fetchOnlineInterviews();
//         if (interviewsData.length > 0) {
//           reply = `You have ${interviewsData.length} scheduled interview(s). Here are the details:`;
//           richContent = (
//             <Box sx={{ mt: 1 }}>
//               {interviewsData.map((interview, index) => (
//                 <Box key={index} sx={{ mb: 2 }}>
//                   <Typography variant="subtitle2">
//                     Interview with {interview.candidate.name}
//                   </Typography>
//                   <Typography variant="body2">
//                     Date: {new Date(interview.date).toLocaleDateString()} at {interview.startTime}
//                   </Typography>
//                   <Typography variant="body2">
//                     Platform: {interview.platform}
//                   </Typography>
//                   {interview.meetingLink && (
//                     <Typography variant="body2">
//                       <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
//                         Join Meeting
//                       </a>
//                     </Typography>
//                   )}
//                   {index < interviewsData.length - 1 && <Divider sx={{ my: 1 }} />}
//                 </Box>
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
//   const candidatesData = await fetchCandidates();
//   if (candidatesData.length > 0) {
//     reply = `We currently have ${candidatesData.length} candidate(s) in the system. Here are a few of them:`;
//     richContent = (
//       <Box sx={{ mt: 1 }}>
//         <List dense sx={{ maxHeight: 150, overflow: 'auto' }}>
//           {candidatesData.slice(0, 5).map((candidate, index) => (
//             <ListItem key={index} divider>
//               <ListItemIcon>
//                 <PersonIcon color="primary" fontSize="small" />
//               </ListItemIcon>
//               <ListItemText 
//                 primary={candidate.name} 
//                 secondary={`Skills: ${candidate.skills?.join(', ') || 'N/A'}`}
//               />
//             </ListItem>
//           ))}
//         </List>
//         {candidatesData.length > 5 && (
//           <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
//             ...and {candidatesData.length - 5} more candidates
//           </Typography>
//         )}
//       </Box>
//     );
//   } else {
//     reply = "Currently, there are no candidates in the system.";
//   }
//   intent = 'candidate.list';
// }
// else if (message.includes('list') && message.includes('job')) {
//         const jobsData = await fetchJobs();
//         if (jobsData.length > 0) {
//           reply = `We have ${jobsData.length} open positions. Here are the details:`;
//           richContent = (
//             <Box sx={{ mt: 1 }}>
//               {jobsData.slice(0, 3).map((job, index) => (
//                 <Paper key={index} elevation={1} sx={{ p: 1.5, mb: 1 }}>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {job.jobTitle}
//                   </Typography>
//                   <Typography variant="body2">
//                     {job.department} • {job.experience}
//                   </Typography>
//                   {job.jobFormId && (
//                     <>
//                       <Typography variant="body2" display="flex" alignItems="center">
//                         <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
//                         {job.jobFormId.locations.map(loc => loc.name).join(', ')}
//                       </Typography>
//                       <Typography variant="body2" display="flex" alignItems="center">
//                         <MoneyIcon fontSize="small" sx={{ mr: 0.5 }} />
//                         {job.jobFormId.currency} {job.jobFormId.amount}
//                       </Typography>
//                     </>
//                   )}
//                 </Paper>
//               ))}
//               {jobsData.length > 3 && (
//                 <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
//                   ...and {jobsData.length - 3} more positions. Type "job details" for more information.
//                 </Typography>
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
//     // { text: 'What is my application status?', icon: <AssignmentIcon />, intent: 'application.status' },
//     { text: 'What job openings are available?', icon: <WorkIcon />, intent: 'job.openings' },
//     { text: 'List all jobs with details', icon: <WorkIcon />, intent: 'job.details' },
//     { text: 'Total Online Interviews Scheduled', icon: <ScheduleIcon />, intent: 'interview.schedule' },
//     { text: 'How can I update my profile?', icon: <HelpIcon />, intent: 'profile.update' },
//     { text: 'How many candidates are there?', icon: <PersonIcon />, intent: 'candidate.list' }, 
//   ];

//   const handleSuggestionClick = (question) => {
//     setInputMessage(question);
//     // Auto-send the question if chat is open
//     if (isOpen) {
//       setTimeout(() => {
//         handleSendMessage();
//       }, 100);
//     }
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
//             width: 400,
//             height: 500,
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
//                 Wrocus ATS Assistant
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
//                       bgcolor: message.sender === 'user' ? 'primary.light' : 'background.paper',
//                       color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
//                       borderRadius: message.sender === 'user' 
//                         ? '18px 18px 4px 18px' 
//                         : '18px 18px 18px 4px',
//                     }}
//                   >
//                     <Typography variant="body2">{message.text}</Typography>
//                     {message.richContent && message.richContent}
//                     <Typography
//                       variant="caption"
//                       sx={{
//                         display: 'block',
//                         textAlign: 'right',
//                         mt: 0.5,
//                         opacity: 0.7,
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
//                   <CircularProgress size={16} />
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
//                   onClick={() => handleSuggestionClick(question.text)}
//                   variant="outlined"
//                   sx={{ mb: 0.5 }}
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
//     </Box>
//   );
// };

// export default AtsChatbot;

//-----


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
  Divider,
  Grid
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
  AttachMoney as MoneyIcon,
  Videocam as OnlineIcon,
  MeetingRoom as OfflineIcon,
  CalendarToday as DateIcon,
  AccessTime as TimeIcon,
  People as InterviewersIcon
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

  // Format location object to string
  const formatLocation = (location) => {
    if (!location) return 'Location not specified';
    
    // Handle case where location might be a string
    if (typeof location === 'string') return location;
    
    // Handle case where location is an object
    const { address, building, floor } = location;
    let locationString = address || '';
    
    if (building) {
      locationString += locationString ? `, ${building}` : building;
    }
    
    if (floor) {
      locationString += locationString ? `, ${floor}` : floor;
    }
    
    return locationString || 'Location not specified';
  };

  // Fetch jobs data
  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('https://1a9a0cdf7ba0.ngrok-free.app/api/v1/job', {
        headers: {
          Authorization: `Bearer ${token}`
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
      const response = await axios.get('https://1a9a0cdf7ba0.ngrok-free.app/api/v1/candidates', {
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

  // Fetch online interviews data
  const fetchOnlineInterviews = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('https://1a9a0cdf7ba0.ngrok-free.app/api/v1/interviews/interviews/schedule', {
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

  // Fetch offline interviews data
  const fetchOfflineInterviews = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('https://1a9a0cdf7ba0.ngrok-free.app/api/v1/offline/interviews', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data && response.data.data) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching offline interviews:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all interviews (online + offline)
  const fetchAllInterviews = async () => {
    const onlineInterviews = await fetchOnlineInterviews();
    const offlineInterviews = await fetchOfflineInterviews();
    return {
      online: onlineInterviews,
      offline: offlineInterviews,
      total: onlineInterviews.length + offlineInterviews.length
    };
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
        if (message.includes('online')) {
          // Online interviews only
          const interviewsData = await fetchOnlineInterviews();
          if (interviewsData.length > 0) {
            reply = `You have ${interviewsData.length} scheduled online interview(s). Here are the details:`;
            richContent = (
              <Box sx={{ mt: 1 }}>
                {interviewsData.map((interview, index) => (
                  <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, bgcolor: '#e8f5e9', borderRadius: 2 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <OnlineIcon color="success" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Online Interview with {interview.candidate?.name || 'Candidate'}
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={1} sx={{ mb: 1 }}>
                      <Grid item xs={12} display="flex" alignItems="center">
                        <DateIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          Date: {new Date(interview.date).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} display="flex" alignItems="center">
                        <TimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          Time: {interview.startTime} ({interview.timezone})
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} display="flex" alignItems="center">
                        <Typography variant="body2">
                          Duration: {interview.duration} minutes
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} display="flex" alignItems="center">
                        <Typography variant="body2">
                          Platform: {interview.platform}
                        </Typography>
                      </Grid>
                    </Grid>
                    
                    {interview.meetingLink && (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" component="a" href={interview.meetingLink} target="_blank" rel="noopener noreferrer"
                          sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                          Join Meeting
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                ))}
              </Box>
            );
          } else {
            reply = "You don't have any scheduled online interviews at the moment.";
          }
          intent = 'interview.online';
        } else if (message.includes('offline') || message.includes('physical') || message.includes('in-person')) {
          // Offline interviews only
          const interviewsData = await fetchOfflineInterviews();
          if (interviewsData.length > 0) {
            reply = `You have ${interviewsData.length} scheduled offline interview(s). Here are the details:`;
            richContent = (
              <Box sx={{ mt: 1 }}>
                {interviewsData.map((interview, index) => (
                  <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, bgcolor: '#fff3e0', borderRadius: 2 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <OfflineIcon color="warning" sx={{ mr: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Offline Interview with {interview.candidate?.name || 'Candidate'}
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={1} sx={{ mb: 1 }}>
                      <Grid item xs={12} display="flex" alignItems="center">
                        <DateIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          Date: {new Date(interview.date).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} display="flex" alignItems="center">
                        <TimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">
                          Time: {interview.startTime} ({interview.timezone})
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} display="flex" alignItems="center">
                        <Typography variant="body2">
                          Duration: {interview.duration} minutes
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} display="flex" alignItems="flex-start">
                        <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary', mt: 0.5 }} />
                        <Typography variant="body2">
                          Location: {formatLocation(interview.location)}
                        </Typography>
                      </Grid>
                      
                      {interview.interviewers && interview.interviewers.length > 0 && (
                        <Grid item xs={12} display="flex" alignItems="flex-start">
                          <InterviewersIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary', mt: 0.5 }} />
                          <Box>
                            <Typography variant="body2" gutterBottom>
                              Interviewers:
                            </Typography>
                            {interview.interviewers.map((interviewer, idx) => (
                              <Typography key={idx} variant="body2" sx={{ ml: 1 }}>
                                • {interviewer.name} ({interviewer.email})
                              </Typography>
                            ))}
                          </Box>
                        </Grid>
                      )}
                      
                      {interview.jobId && (
                        <Grid item xs={12} display="flex" alignItems="center">
                          <WorkIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            Position: {interview.jobId.jobTitle} ({interview.jobId.jobName})
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                    
                    {interview.notes && (
                      <Box sx={{ mt: 1, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="body2" fontStyle="italic">
                          Notes: {interview.notes}
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                ))}
              </Box>
            );
          } else {
            reply = "You don't have any scheduled offline interviews at the moment.";
          }
          intent = 'interview.offline';
        } else {
          // All interviews (online + offline)
          const interviewsData = await fetchAllInterviews();
          if (interviewsData.total > 0) {
            reply = `You have ${interviewsData.total} scheduled interview(s) in total: ${interviewsData.online.length} online and ${interviewsData.offline.length} offline.`;
            richContent = (
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Interview Summary:
                </Typography>
                <Box display="flex" justifyContent="space-around" mb={2}>
                  <Box textAlign="center">
                    <OnlineIcon color="success" fontSize="large" />
                    <Typography variant="h6">{interviewsData.online.length}</Typography>
                    <Typography variant="body2">Online</Typography>
                  </Box>
                  <Box textAlign="center">
                    <OfflineIcon color="warning" fontSize="large" />
                    <Typography variant="h6">{interviewsData.offline.length}</Typography>
                    <Typography variant="body2">Offline</Typography>
                  </Box>
                </Box>
                
                {interviewsData.online.length > 0 && (
                  <>
                    <Typography variant="subtitle2" gutterBottom>
                      Online Interviews:
                    </Typography>
                    {interviewsData.online.slice(0, 2).map((interview, index) => (
                      <Paper key={`online-${index}`} elevation={1} sx={{ p: 1.5, mb: 1, bgcolor: '#e8f5e9', borderRadius: 1 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {interview.candidate?.name || 'Candidate'} - {new Date(interview.date).toLocaleDateString()} at {interview.startTime}
                        </Typography>
                        <Typography variant="caption" display="block">
                          Platform: {interview.platform}
                        </Typography>
                      </Paper>
                    ))}
                    {interviewsData.online.length > 2 && (
                      <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                        ...and {interviewsData.online.length - 2} more online interviews
                      </Typography>
                    )}
                  </>
                )}
                
                {interviewsData.offline.length > 0 && (
                  <>
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
                      Offline Interviews:
                    </Typography>
                    {interviewsData.offline.slice(0, 2).map((interview, index) => (
                      <Paper key={`offline-${index}`} elevation={1} sx={{ p: 1.5, mb: 1, bgcolor: '#fff3e0', borderRadius: 1 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {interview.candidate?.name || 'Candidate'} - {new Date(interview.date).toLocaleDateString()} at {interview.startTime}
                        </Typography>
                        <Typography variant="caption" display="block">
                          Location: {formatLocation(interview.location)}
                        </Typography>
                      </Paper>
                    ))}
                    {interviewsData.offline.length > 2 && (
                      <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                        ...and {interviewsData.offline.length - 2} more offline interviews
                      </Typography>
                    )}
                  </>
                )}
              </Box>
            );
          } else {
            reply = "You don't have any scheduled interviews at the moment.";
          }
          intent = 'interview.all';
        }
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
      } else if (message.includes('list') && message.includes('job')) {
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
                        {job.jobFormId.locations && job.jobFormId.locations.map(loc => loc.name).join(', ')}
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
    { text: 'What job openings are available?', icon: <WorkIcon />, intent: 'job.openings' },
    { text: 'List all jobs with details', icon: <WorkIcon />, intent: 'job.details' },
    { text: 'Total interviews scheduled', icon: <ScheduleIcon />, intent: 'interview.all' },
    { text: 'Online interviews', icon: <OnlineIcon />, intent: 'interview.online' },
    { text: 'Offline interviews', icon: <OfflineIcon />, intent: 'interview.offline' },
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
            width: 450,
            height: 550,
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