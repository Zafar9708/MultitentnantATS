

// import React from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Box,
//   Typography,
//   LinearProgress,
//   Chip,
//   Grid,
//   Card,
//   CardContent,
//   Divider,
//   useTheme,
//   Button,
//   DialogActions,
//   Paper,
//   CircularProgress,
//   Avatar,
//   Tooltip,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Badge
// } from '@mui/material';
// import {
//   Close as CloseIcon,
//   Assessment as AssessmentIcon,
//   Work as WorkIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Description as DescriptionIcon,
//   Star as StarIcon,
//   Warning as WarningIcon,
//   AccessTime as AccessTimeIcon,
//   Download as DownloadIcon,
//   Person as PersonIcon,
//   School as SchoolIcon,
//   Code as CodeIcon,
//   Build as BuildIcon,
//   ThumbUp as ThumbUpIcon,
//   ThumbDown as ThumbDownIcon,
//   Timeline as TimelineIcon,
//   Info as InfoIcon
// } from '@mui/icons-material';
// import candidateService from '../../services/Candidates/candidateService';

// const CandidateResumeAnalysis = ({ 
//   open, 
//   onClose, 
//   candidate, 
//   analysisData, 
//   loading = false 
// }) => {
//   const theme = useTheme();

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not available';
//     try {
//       const date = new Date(dateString);
//       return isNaN(date.getTime()) ? 'Not available' : date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return 'Not available';
//     }
//   };

//   const getMatchColor = (percentage) => {
//     if (percentage >= 75) return 'success';
//     if (percentage >= 50) return 'warning';
//     return 'error';
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Shortlisted':
//         return <ThumbUpIcon color="success" />;
//       case 'Rejected':
//         return <ThumbDownIcon color="error" />;
//       default:
//         return <InfoIcon color="info" />;
//     }
//   };

//   const handleDownloadResume = async () => {
//     try {
//       const response = await candidateService.downloadResume(analysisData.resumeAnalysis.resumeUrl);
//       const url = window.URL.createObjectURL(new Blob([response]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `${candidate.name}_resume.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error('Download failed:', error);
//     }
//   };

//   const handlePreviewResume=async()=>{
//     try {
//       const response = await candidateService.previewResume(analysisData.resumeAnalysis.resumeUrl);
//       const url = window.URL.createObjectURL(new Blob([response]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', `${candidate.name}_resume.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       console.error('Download failed:', error);
//     }

//   }

//   if (!analysisData) {
//     return (
//       <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//         <DialogTitle>
//           Resume Analysis
//           <IconButton
//             aria-label="close"
//             onClick={onClose}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'center', 
//             alignItems: 'center', 
//             height: '200px'
//           }}>
//             <Typography variant="body1" color="textSecondary">
//               No analysis data available
//             </Typography>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     );
//   }

//   // Safely get data with defaults
//   const { 
//     matchPercentage = 0,
//     matchingScore = 0,
//     status = 'Pending Review',
//     recommendation = 'Not available',
//     skills = { matching: [], missing: [] },
//     analysis = { overall: '', experience: '', education: '' },
//     resumeUrl,
//     parsedAt,
//     lastUpdated
//   } = analysisData.resumeAnalysis || {};

//   const { matching = [], missing = [] } = skills;
//   const { overall = '', experience = '', education = '' } = analysis;

//   return (
//     <Dialog 
//       open={open} 
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       sx={{
//         '& .MuiDialog-paper': {
//           borderRadius: 3,
//           maxHeight: '90vh'
//         }
//       }}
//     >
//       <DialogTitle sx={{ 
//         backgroundColor: theme.palette.primary.main,
//         color: 'white',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: '16px 24px'
//       }}>
//         <Box display="flex" alignItems="center">
//           <AssessmentIcon sx={{ mr: 1 }} />
//           <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
//             Resume Analysis - {analysisData.candidate.name}
//           </Typography>
//         </Box>
//         <IconButton 
//           edge="end" 
//           color="inherit" 
//           onClick={onClose}
//           aria-label="close"
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent dividers sx={{ p: 0 }}>
//         {loading ? (
//           <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'center', 
//             alignItems: 'center', 
//             height: '200px'
//           }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Box sx={{ p: 3 }}>
//             {/* Candidate and Job Header */}
//             <Grid container spacing={3} sx={{ mb: 3 }}>
//               <Grid item xs={12} md={6}>
//                 <Card sx={{ height: '100%' }}>
//                   <CardContent>
//                     <Box display="flex" alignItems="center" mb={2}>
//                       <Avatar sx={{ 
//                         bgcolor: theme.palette.secondary.main,
//                         mr: 2,
//                         width: 56,
//                         height: 56
//                       }}>
//                         <PersonIcon fontSize="large" />
//                       </Avatar>
//                       <Box>
//                         <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                           {analysisData.candidate.name}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           Current Stage: {analysisData.candidate.currentStage}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Divider sx={{ my: 2 }} />
//                     <List dense>
//                       <ListItem>
//                         <ListItemIcon>
//                           <TimelineIcon color="primary" />
//                         </ListItemIcon>
//                         <ListItemText 
//                           primary="Application Status" 
//                           secondary={
//                             <Chip 
//                               label={status}
//                               icon={getStatusIcon(status)}
//                               size="small"
//                               color={getMatchColor(matchPercentage)}
//                               sx={{ fontWeight: 600 }}
//                             />
//                           }
//                         />
//                       </ListItem>
//                     </List>
//                   </CardContent>
//                 </Card>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Card sx={{ height: '100%' }}>
//                   <CardContent>
//                     <Box display="flex" alignItems="center" mb={2}>
//                       <WorkIcon sx={{ 
//                         color: theme.palette.primary.main,
//                         mr: 2,
//                         fontSize: 40
//                       }} />
//                       <Box>
//                         <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                           {analysisData.candidate.jobTitle}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                           Position Details
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Divider sx={{ my: 2 }} />
//                     <Typography variant="body2" paragraph>
//                       {analysisData.candidate.jobDescription}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>

//             {/* Match Score Section */}
//             <Grid container spacing={3} sx={{ mb: 3 }}>
//               <Grid item xs={12} md={8}>
//                 <Card>
//                   <CardContent>
//                     <Typography variant="h6" sx={{ 
//                       fontWeight: 600, 
//                       mb: 2,
//                       display: 'flex',
//                       alignItems: 'center'
//                     }}>
//                       <StarIcon color="primary" sx={{ mr: 1 }} />
//                       Candidate Match Analysis
//                     </Typography>
                    
//                     <Box display="flex" alignItems="center" mb={3}>
//                       <Box width="100%" mr={2}>
//                         <LinearProgress 
//                           variant="determinate" 
//                           value={matchPercentage} 
//                           sx={{ 
//                             height: 12, 
//                             borderRadius: 6,
//                             backgroundColor: theme.palette.grey[200]
//                           }}
//                           color={getMatchColor(matchPercentage)}
//                         />
//                       </Box>
//                       <Typography variant="h4" sx={{ fontWeight: 700 }}>
//                         {matchPercentage}%
//                       </Typography>
//                     </Box>
                    
//                     <Grid container spacing={2}>
//                       <Grid item xs={12} md={6}>
//                         <Paper elevation={0} sx={{ 
//                           p: 2, 
//                           backgroundColor: theme.palette.grey[100],
//                           borderRadius: 2
//                         }}>
//                           <Typography variant="subtitle2" sx={{ mb: 1 }}>
//                             <CheckCircleIcon color="success" sx={{ mr: 1, fontSize: 18 }} />
//                             Recommendation
//                           </Typography>
//                           <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                             {recommendation}
//                           </Typography>
//                         </Paper>
//                       </Grid>
//                       <Grid item xs={12} md={6}>
//                         <Paper elevation={0} sx={{ 
//                           p: 2, 
//                           backgroundColor: theme.palette.grey[100],
//                           borderRadius: 2
//                         }}>
//                           <Typography variant="subtitle2" sx={{ mb: 1 }}>
//                             <AccessTimeIcon color="action" sx={{ mr: 1, fontSize: 18 }} />
//                             Last Analyzed
//                           </Typography>
//                           <Typography variant="body1" sx={{ fontWeight: 500 }}>
//                             {formatDate(parsedAt)}
//                           </Typography>
//                         </Paper>
//                       </Grid>
//                     </Grid>
//                   </CardContent>
//                 </Card>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Card sx={{ height: '100%' }}>
//                   <CardContent>
//                     <Typography variant="h6" sx={{ 
//                       fontWeight: 600, 
//                       mb: 2,
//                       display: 'flex',
//                       alignItems: 'center'
//                     }}>
//                       <DescriptionIcon color="primary" sx={{ mr: 1 }} />
//                       Resume Actions
//                     </Typography>
//                     <Button 
//                       variant="contained"
//                       color="primary"
//                       fullWidth
//                       startIcon={<DescriptionIcon />}
//                       href={resumeUrl} 
//                       target="_blank"
//                       onClick={handlePreviewResume}
//                       sx={{ mb: 2 }}
//                     >
//                       View Resume
//                     </Button>
//                     <Button 
//                       variant="outlined"
//                       color="primary"
//                       fullWidth
//                       startIcon={<DownloadIcon />}
//                       onClick={handleDownloadResume}
//                       sx={{ mb: 2 }}
//                     >
//                       Download Resume
//                     </Button>
//                     <Box sx={{ mt: 2 }}>
//                       <Typography variant="caption" color="textSecondary">
//                         Last updated: {formatDate(lastUpdated)}
//                       </Typography>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>

//             {/* Skills Analysis */}
//             <Grid container spacing={3} sx={{ mb: 3 }}>
//               <Grid item xs={12} md={6}>
//                 <Card sx={{ height: '100%' }}>
//                   <CardContent>
//                     <Box display="flex" alignItems="center" mb={2}>
//                       <Badge badgeContent={matching.length} color="success" sx={{ mr: 1 }}>
//                         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                           <CheckCircleIcon color="success" sx={{ mr: 1 }} />
//                           Matching Skills
//                         </Typography>
//                       </Badge>
//                     </Box>
//                     <Divider sx={{ mb: 2 }} />
//                     {matching.length > 0 ? (
//                       <Grid container spacing={1}>
//                         {matching.map((skill, index) => (
//                           <Grid item key={index} xs={6} sm={4}>
//                             <Tooltip title={`Confidence: ${Math.round(skill.confidence * 100)}%`}>
//                               <Chip
//                                 label={skill.skill}
//                                 size="medium"
//                                 color="success"
//                                 variant="outlined"
//                                 sx={{ 
//                                   fontWeight: 500,
//                                   width: '100%'
//                                 }}
//                               />
//                             </Tooltip>
//                           </Grid>
//                         ))}
//                       </Grid>
//                     ) : (
//                       <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
//                         No matching skills found
//                       </Typography>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Card sx={{ height: '100%' }}>
//                   <CardContent>
//                     <Box display="flex" alignItems="center" mb={2}>
//                       <Badge badgeContent={missing.length} color="error" sx={{ mr: 1 }}>
//                         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                           <WarningIcon color="error" sx={{ mr: 1 }} />
//                           Missing Skills
//                         </Typography>
//                       </Badge>
//                     </Box>
//                     <Divider sx={{ mb: 2 }} />
//                     {missing.length > 0 ? (
//                       <Grid container spacing={1}>
//                         {missing.map((skill, index) => (
//                           <Grid item key={index} xs={6} sm={4}>
//                             <Chip
//                               label={skill}
//                               size="medium"
//                               color="error"
//                               variant="outlined"
//                               sx={{ 
//                                 fontWeight: 500,
//                                 width: '100%'
//                               }}
//                             />
//                           </Grid>
//                         ))}
//                       </Grid>
//                     ) : (
//                       <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
//                         No missing skills identified
//                       </Typography>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>

//             {/* Detailed Analysis */}
//             <Card sx={{ mb: 3 }}>
//               <CardContent>
//                 <Typography variant="h6" sx={{ 
//                   fontWeight: 600, 
//                   mb: 2,
//                   display: 'flex',
//                   alignItems: 'center'
//                 }}>
//                   <AssessmentIcon color="primary" sx={{ mr: 1 }} />
//                   Detailed Analysis
//                 </Typography>
//                 <Divider sx={{ mb: 3 }} />
                
//                 <Paper elevation={0} sx={{ 
//                   p: 3, 
//                   mb: 3, 
//                   backgroundColor: theme.palette.grey[50],
//                   borderRadius: 2
//                 }}>
//                   <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
//                     Overall Assessment
//                   </Typography>
//                   <Typography variant="body1" paragraph>
//                     {overall || 'No overall assessment available.'}
//                   </Typography>
//                 </Paper>
                
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} md={6}>
//                     <Paper elevation={0} sx={{ 
//                       p: 3, 
//                       backgroundColor: theme.palette.grey[50],
//                       borderRadius: 2,
//                       height: '100%'
//                     }}>
//                       <Typography variant="subtitle1" sx={{ 
//                         fontWeight: 600, 
//                         mb: 1,
//                         display: 'flex',
//                         alignItems: 'center'
//                       }}>
//                         <BuildIcon color="primary" sx={{ mr: 1 }} />
//                         Experience Analysis
//                       </Typography>
//                       <Typography variant="body1" paragraph>
//                         {experience || 'No experience analysis available.'}
//                       </Typography>
//                     </Paper>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <Paper elevation={0} sx={{ 
//                       p: 3, 
//                       backgroundColor: theme.palette.grey[50],
//                       borderRadius: 2,
//                       height: '100%'
//                     }}>
//                       <Typography variant="subtitle1" sx={{ 
//                         fontWeight: 600, 
//                         mb: 1,
//                         display: 'flex',
//                         alignItems: 'center'
//                       }}>
//                         <SchoolIcon color="primary" sx={{ mr: 1 }} />
//                         Education Analysis
//                       </Typography>
//                       <Typography variant="body1">
//                         {education || 'No education analysis available.'}
//                       </Typography>
//                     </Paper>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Box>
//         )}
//       </DialogContent>
//       <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
//         <Button 
//           variant="outlined" 
//           onClick={onClose}
//           sx={{ mr: 1 }}
//         >
//           Close
//         </Button>
//         <Button 
//           variant="contained" 
//           color="primary"
//           onClick={() => {
//             // Add your action handler here
//             console.log('Take action on candidate');
//           }}
//         >
//           Take Action
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CandidateResumeAnalysis;


import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  LinearProgress,
  Chip,
  Grid,
  Card,
  CardContent,
  Divider,
  useTheme,
  Button,
  DialogActions,
  Paper,
  CircularProgress,
  Avatar,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Tabs,
  Tab,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Close as CloseIcon,
  Assessment as AssessmentIcon,
  Work as WorkIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Description as DescriptionIcon,
  Star as StarIcon,
  Warning as WarningIcon,
  AccessTime as AccessTimeIcon,
  Download as DownloadIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Build as BuildIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Timeline as TimelineIcon,
  Info as InfoIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import candidateService from '../../services/Candidates/candidateService';

const CandidateResumeAnalysis = ({ 
  open, 
  onClose, 
  candidate, 
  analysisData, 
  loading = false 
}) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Not available' : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Not available';
    }
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 75) return 'success';
    if (percentage >= 50) return 'warning';
    return 'error';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Shortlisted':
        return <ThumbUpIcon color="success" />;
      case 'Rejected':
        return <ThumbDownIcon color="error" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  const handleDownloadResume = async () => {
    try {
      const blob = await candidateService.downloadResume(candidate._id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `${candidate.firstName}_${candidate.lastName}_resume.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setSnackbar({
        open: true,
        message: 'Resume download started',
        severity: 'success'
      });
    } catch (error) {
      console.error('Download failed:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Failed to download resume',
        severity: 'error'
      });
    }
  };

  const handlePreviewResume = async () => {
    try {
      const blob = await candidateService.previewResume(candidate._id);
      const url = window.URL.createObjectURL(blob);
      
      // Open in new tab for preview
      window.open(url, '_blank');
      
      setSnackbar({
        open: true,
        message: 'Opening resume in new tab',
        severity: 'info'
      });
    } catch (error) {
      console.error('Preview failed:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Failed to preview resume',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!analysisData) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Resume Analysis
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px'
          }}>
            <Typography variant="body1" color="textSecondary">
              No analysis data available
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  // Safely get data with defaults
  const { 
    matchPercentage = 0,
    matchingScore = 0,
    status = 'Pending Review',
    recommendation = 'Not available',
    skills = { matching: [], missing: [] },
    analysis = { overall: '', experience: '', education: '' },
    resumeUrl,
    parsedAt,
    lastUpdated
  } = analysisData.resumeAnalysis || {};

  const { matching = [], missing = [] } = skills;
  const { overall = '', experience = '', education = '' } = analysis;

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px'
        }}>
          <Box display="flex" alignItems="center">
            <AssessmentIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Resume Analysis - {analysisData.candidate.name}
            </Typography>
          </Box>
          <IconButton 
            edge="end" 
            color="inherit" 
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            bgcolor: theme.palette.grey[100],
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        >
          <Tab label="Summary" icon={<AssessmentIcon />} />
          <Tab label="Skills Analysis" icon={<CodeIcon />} />
          <Tab label="Detailed Report" icon={<DescriptionIcon />} />
        </Tabs>

        <DialogContent dividers sx={{ p: 0, overflow: 'hidden' }}>
          {loading ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '200px'
            }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ p: 3, overflowY: 'auto', maxHeight: 'calc(90vh - 200px)' }}>
              {tabValue === 0 && (
                <Grid container spacing={3}>
                  {/* Candidate Info */}
                  <Grid item xs={12} md={5}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar sx={{ 
                            bgcolor: theme.palette.secondary.main,
                            mr: 2,
                            width: 56,
                            height: 56
                          }}>
                            <PersonIcon fontSize="large" />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                              {analysisData.candidate.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Current Stage: {analysisData.candidate.currentStage}
                            </Typography>
                          </Box>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <TimelineIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Application Status" 
                              secondary={
                                <Chip 
                                  label={status}
                                  icon={getStatusIcon(status)}
                                  size="small"
                                  color={getMatchColor(matchPercentage)}
                                  sx={{ fontWeight: 600 }}
                                />
                              }
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <AccessTimeIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Last Analyzed" 
                              secondary={formatDate(parsedAt)}
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Match Score */}
                  <Grid item xs={12} md={7}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600, 
                          mb: 2,
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <StarIcon color="primary" sx={{ mr: 1 }} />
                          Candidate Match Score
                        </Typography>
                        
                        <Box display="flex" alignItems="center" mb={3}>
                          <Box width="100%" mr={2}>
                            <LinearProgress 
                              variant="determinate" 
                              value={matchPercentage} 
                              sx={{ 
                                height: 12, 
                                borderRadius: 6,
                                backgroundColor: theme.palette.grey[200]
                              }}
                              color={getMatchColor(matchPercentage)}
                            />
                          </Box>
                          <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            {matchPercentage}%
                          </Typography>
                        </Box>
                        
                        <Paper elevation={0} sx={{ 
                          p: 2, 
                          backgroundColor: theme.palette.grey[50],
                          borderRadius: 2,
                          mb: 2
                        }}>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            <CheckCircleIcon color="success" sx={{ mr: 1, fontSize: 18 }} />
                            Recommendation
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {recommendation}
                          </Typography>
                        </Paper>

                        <Box display="flex" gap={2}>
                          <Button 
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<VisibilityIcon />}
                            onClick={handlePreviewResume}
                          >
                            Preview Resume
                          </Button>
                          <Button 
                            variant="outlined"
                            color="primary"
                            fullWidth
                            startIcon={<DownloadIcon />}
                            onClick={handleDownloadResume}
                          >
                            Download
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {tabValue === 1 && (
                <Grid container spacing={3}>
                  {/* Matching Skills */}
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Badge badgeContent={matching.length} color="success" sx={{ mr: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                              Matching Skills
                            </Typography>
                          </Badge>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        {matching.length > 0 ? (
                          <Grid container spacing={1}>
                            {matching.map((skill, index) => (
                              <Grid item key={index} xs={6} sm={4}>
                                <Tooltip title={`Confidence: ${Math.round(skill.confidence * 100)}%`}>
                                  <Chip
                                    label={skill.skill}
                                    size="medium"
                                    color="success"
                                    variant="outlined"
                                    sx={{ 
                                      fontWeight: 500,
                                      width: '100%'
                                    }}
                                  />
                                </Tooltip>
                              </Grid>
                            ))}
                          </Grid>
                        ) : (
                          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
                            No matching skills found
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Missing Skills */}
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Badge badgeContent={missing.length} color="error" sx={{ mr: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              <WarningIcon color="error" sx={{ mr: 1 }} />
                              Missing Skills
                            </Typography>
                          </Badge>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        {missing.length > 0 ? (
                          <Grid container spacing={1}>
                            {missing.map((skill, index) => (
                              <Grid item key={index} xs={6} sm={4}>
                                <Chip
                                  label={skill}
                                  size="medium"
                                  color="error"
                                  variant="outlined"
                                  sx={{ 
                                    fontWeight: 500,
                                    width: '100%'
                                  }}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        ) : (
                          <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
                            No missing skills identified
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )}

              {tabValue === 2 && (
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <AssessmentIcon color="primary" sx={{ mr: 1 }} />
                      Detailed Analysis Report
                    </Typography>
                    
                    <Paper elevation={0} sx={{ 
                      p: 3, 
                      mb: 3, 
                      backgroundColor: theme.palette.grey[50],
                      borderRadius: 2
                    }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Overall Assessment
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {overall || 'No overall assessment available.'}
                      </Typography>
                    </Paper>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={0} sx={{ 
                          p: 3, 
                          backgroundColor: theme.palette.grey[50],
                          borderRadius: 2,
                          height: '100%'
                        }}>
                          <Typography variant="subtitle1" sx={{ 
                            fontWeight: 600, 
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center'
                          }}>
                            <BuildIcon color="primary" sx={{ mr: 1 }} />
                            Experience Analysis
                          </Typography>
                          <Typography variant="body1" paragraph>
                            {experience || 'No experience analysis available.'}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper elevation={0} sx={{ 
                          p: 3, 
                          backgroundColor: theme.palette.grey[50],
                          borderRadius: 2,
                          height: '100%'
                        }}>
                          <Typography variant="subtitle1" sx={{ 
                            fontWeight: 600, 
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center'
                          }}>
                            <SchoolIcon color="primary" sx={{ mr: 1 }} />
                            Education Analysis
                          </Typography>
                          <Typography variant="body1">
                            {education || 'No education analysis available.'}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Button 
            variant="outlined" 
            onClick={onClose}
            sx={{ mr: 1 }}
          >
            Close
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              // Add your action handler here
              console.log('Take action on candidate');
            }}
          >
            Take Action
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CandidateResumeAnalysis;