
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Stack,
  CircularProgress
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Refresh as ReconsiderIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const RejectedInterviews = ({ searchTerm, statusFilter, selectedDate }) => {
  // Mock data for rejected interviews
  const rejectedInterviews = [
    {
      id: 1,
      candidateName: 'John Doe',
      candidateEmail: 'john.doe@email.com',
      jobTitle: 'Senior React Developer',
      jobName: 'WR001',
      interviewer: 'Sarah Wilson',
      rejectionDate: '2024-01-15',
      rejectionReason: 'Technical skills mismatch',
      interviewDate: '2024-01-10',
      status: 'rejected'
    },
    {
      id: 2,
      candidateName: 'Jane Smith',
      candidateEmail: 'jane.smith@email.com',
      jobTitle: 'Frontend Developer',
      jobName: 'WR002',
      interviewer: 'Mike Johnson',
      rejectionDate: '2024-01-12',
      rejectionReason: 'Cultural fit issues',
      interviewDate: '2024-01-08',
      status: 'rejected'
    },
    {
      id: 3,
      candidateName: 'Robert Brown',
      candidateEmail: 'robert.brown@email.com',
      jobTitle: 'Full Stack Developer',
      jobName: 'WR003',
      interviewer: 'Emily Davis',
      rejectionDate: '2024-01-18',
      rejectionReason: 'Experience level below requirements',
      interviewDate: '2024-01-14',
      status: 'rejected'
    }
  ];

  // Filter interviews based on search term and date
  const filteredInterviews = rejectedInterviews.filter(interview => {
    const matchesSearch = searchTerm === '' || 
      interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.jobName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.interviewer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !selectedDate || interview.rejectionDate === selectedDate;

    return matchesSearch && matchesDate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleViewDetails = (interviewId) => {
    console.log('View details for interview:', interviewId);
    // Implement view details logic
  };

  const handleReconsider = (interviewId) => {
    console.log('Reconsider interview:', interviewId);
    // Implement reconsider logic
  };

  const handleSendEmail = (candidateEmail) => {
    console.log('Send email to:', candidateEmail);
    // Implement email logic
  };

  if (filteredInterviews.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          No Rejected Interviews Found
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {searchTerm || selectedDate ? 
            'Try adjusting your search filters' : 
            'All interviews are currently approved or pending'
          }
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'text.secondary' }}>
        Rejected Interviews ({filteredInterviews.length})
      </Typography>

      <TableContainer component={Paper} elevation={2}>
        <Table sx={{ minWidth: 650 }} aria-label="rejected interviews table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              <TableCell><strong>Candidate</strong></TableCell>
              <TableCell><strong>Job Details</strong></TableCell>
              <TableCell><strong>Interviewer</strong></TableCell>
              <TableCell><strong>Interview Date</strong></TableCell>
              <TableCell><strong>Rejection Date</strong></TableCell>
              <TableCell><strong>Rejection Reason</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInterviews.map((interview) => (
              <TableRow key={interview.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      {interview.candidateName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">{interview.candidateName}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {interview.candidateEmail}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{interview.jobTitle}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {interview.jobName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{interview.interviewer}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(interview.interviewDate).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(interview.rejectionDate).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Tooltip title={interview.rejectionReason}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        maxWidth: 150, 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap' 
                      }}
                    >
                      {interview.rejectionReason}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip
                    label="Rejected"
                    color={getStatusColor(interview.status)}
                    size="small"
                    variant="filled"
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleViewDetails(interview.id)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Reconsider Candidate">
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => handleReconsider(interview.id)}
                      >
                        <ReconsiderIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Send Email">
                      <IconButton
                        size="small"
                        color="default"
                        onClick={() => handleSendEmail(interview.candidateEmail)}
                      >
                        <EmailIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RejectedInterviews;