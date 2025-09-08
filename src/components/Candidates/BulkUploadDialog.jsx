// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Box,
//   Typography,
//   Stepper,
//   Step,
//   StepLabel,
//   CircularProgress,
//   Alert,
//   Paper,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Chip,
//   Collapse
// } from '@mui/material';
// import {
//   CloudUpload as CloudUploadIcon,
//   Download as DownloadIcon,
//   CheckCircle as CheckCircleIcon,
//   Error as ErrorIcon,
//   Close as CloseIcon,
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon
// } from '@mui/icons-material';
// import { downloadTemplate, bulkUploadCandidates } from '../../services/Candidates/bulkUploadService';

// const steps = ['Download Template', 'Upload File', 'Review Results'];

// const BulkUploadDialog = ({ open, onClose, jobId }) => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadResults, setUploadResults] = useState(null);
//   const [error, setError] = useState(null);
//   const [showErrorDetails, setShowErrorDetails] = useState(false);

//   const handleDownloadTemplate = async () => {
//     try {
//       setError(null);
//       await downloadTemplate();
//       setActiveStep(1);
//     } catch (err) {
//       setError(err.message || 'Failed to download template');
//     }
//   };

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // Validate file type
//       const allowedExtensions = ['.xlsx', '.xls'];
//       const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      
//       if (!allowedExtensions.includes(fileExtension)) {
//         setError('Please select an Excel file (.xlsx or .xls)');
//         setSelectedFile(null);
//         return;
//       }
      
//       setSelectedFile(file);
//       setError(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError('Please select a file first');
//       return;
//     }

//     setIsUploading(true);
//     setError(null);

//     try {
//       const results = await bulkUploadCandidates(selectedFile, jobId);
//       setUploadResults(results);
//       setActiveStep(2);
//     } catch (err) {
//       setError(err.message || 'Failed to upload candidates');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleClose = () => {
//     setActiveStep(0);
//     setSelectedFile(null);
//     setUploadResults(null);
//     setError(null);
//     setShowErrorDetails(false);
//     onClose();
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     setSelectedFile(null);
//     setUploadResults(null);
//     setError(null);
//     setShowErrorDetails(false);
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//       <DialogTitle>
//         <Box display="flex" alignItems="center" justifyContent="space-between">
//           <Typography variant="h6">Bulk Upload Candidates</Typography>
//           <IconButton onClick={handleClose} size="small">
//             <CloseIcon />
//           </IconButton>
//         </Box>
//       </DialogTitle>

//       <DialogContent>
//         <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
//             {error}
//           </Alert>
//         )}

//         {activeStep === 0 && (
//           <Box>
//             <Typography variant="body1" paragraph>
//               Download the Excel template to add multiple candidates at once. Fill in the required information and upload the completed file.
//             </Typography>
            
//             <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
//               <Typography variant="subtitle2" gutterBottom>
//                 Template Instructions:
//               </Typography>
//               <Typography variant="body2" component="div">
//                 <ul>
//                   <li>Required fields: <strong>First Name, Last Name, Email</strong></li>
//                   <li>Email must be in valid format</li>
//                   <li>Mobile must be 10-15 digits</li>
//                   <li>Locations and Sources must match existing values in your system</li>
//                   <li>Do not modify the header row</li>
//                 </ul>
//               </Typography>
//             </Box>
            
//             <Button
//               variant="contained"
//               startIcon={<DownloadIcon />}
//               onClick={handleDownloadTemplate}
//               fullWidth
//               size="large"
//             >
//               Download Excel Template
//             </Button>
//           </Box>
//         )}

//         {activeStep === 1 && (
//           <Box>
//             <Typography variant="body1" paragraph>
//               Upload your completed Excel file with candidate information.
//             </Typography>
            
//             <input
//               accept=".xlsx,.xls"
//               style={{ display: 'none' }}
//               id="bulk-upload-file"
//               type="file"
//               onChange={handleFileSelect}
//             />
            
//             <label htmlFor="bulk-upload-file">
//               <Button
//                 variant="outlined"
//                 component="span"
//                 startIcon={<CloudUploadIcon />}
//                 fullWidth
//                 sx={{ py: 2, mb: 2 }}
//               >
//                 {selectedFile ? selectedFile.name : 'Select Excel File (.xlsx, .xls)'}
//               </Button>
//             </label>

//             {selectedFile && (
//               <Button
//                 variant="contained"
//                 onClick={handleUpload}
//                 disabled={isUploading}
//                 fullWidth
//                 size="large"
//               >
//                 {isUploading ? <CircularProgress size={24} /> : 'Upload Candidates'}
//               </Button>
//             )}
//           </Box>
//         )}

//         {activeStep === 2 && uploadResults && (
//           <Box>
//             <Alert 
//               severity={uploadResults.results.failed === 0 ? 'success' : 'warning'} 
//               sx={{ mb: 2 }}
//             >
//               {uploadResults.message}
//             </Alert>

//             <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
//               <Box display="flex" justifyContent="space-around" alignItems="center">
//                 <Box textAlign="center">
//                   <Typography variant="h4" color="text.primary">
//                     {uploadResults.results.total}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Total Candidates
//                   </Typography>
//                 </Box>
                
//                 <Box textAlign="center">
//                   <Typography variant="h4" color="success.main">
//                     {uploadResults.results.successful}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Successful
//                   </Typography>
//                 </Box>
                
//                 <Box textAlign="center">
//                   <Typography variant="h4" color="error.main">
//                     {uploadResults.results.failed}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Failed
//                   </Typography>
//                 </Box>
//               </Box>
//             </Paper>

//             {uploadResults.results.errors.length > 0 && (
//               <Paper variant="outlined" sx={{ p: 2 }}>
//                 <Box 
//                   display="flex" 
//                   justifyContent="space-between" 
//                   alignItems="center"
//                   sx={{ cursor: 'pointer' }}
//                   onClick={() => setShowErrorDetails(!showErrorDetails)}
//                 >
//                   <Typography variant="subtitle1">
//                     Error Details ({uploadResults.results.errors.length} errors)
//                   </Typography>
//                   {showErrorDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                 </Box>
                
//                 <Collapse in={showErrorDetails}>
//                   <List dense sx={{ maxHeight: 200, overflow: 'auto', mt: 1 }}>
//                     {uploadResults.results.errors.map((error, index) => (
//                       <ListItem key={index} divider>
//                         <ListItemIcon>
//                           <ErrorIcon color="error" fontSize="small" />
//                         </ListItemIcon>
//                         <ListItemText 
//                           primary={error} 
//                           primaryTypographyProps={{ variant: 'body2' }}
//                         />
//                       </ListItem>
//                     ))}
//                   </List>
//                 </Collapse>
//               </Paper>
//             )}
//           </Box>
//         )}
//       </DialogContent>

//       <DialogActions>
//         {activeStep === 2 ? (
//           <>
//             <Button onClick={handleReset} color="primary">
//               Upload Another File
//             </Button>
//             <Button onClick={handleClose} variant="contained">
//               Done
//             </Button>
//           </>
//         ) : (
//           <Button onClick={handleClose}>
//             Cancel
//           </Button>
//         )}
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default BulkUploadDialog;


import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Alert,
    CircularProgress,
    Stepper,
    Step,
    StepLabel
} from '@mui/material';
import { CloudUpload, Download, CheckCircle } from '@mui/icons-material';
// import { downloadTemplate, bulkUploadCandidates } from '../../services/Candidates/candidateService';
import {downloadTemplate,bulkUploadCandidates} from '../../services/Candidates/bulkUploadService'

const BulkUploadDialog = ({ open, onClose, jobId, onUploadComplete }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [uploadResults, setUploadResults] = useState(null);
    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Download Template', 'Upload File', 'Results'];

    const downloadTemplateHandler = async () => {
        try {
            setLoading(true);
            setError('');
            
            // Call backend API to download template
            await downloadTemplate();
            
            setActiveStep(1); // Move to next step
            setError(''); // Clear any previous errors
        } catch (err) {
            console.error('Error downloading template:', err);
            setError(err.message || 'Failed to download template. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        const validExtensions = ['.xlsx', '.xls'];
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        
        if (!validExtensions.includes(fileExtension)) {
            setError('Please upload a valid Excel file (.xlsx, .xls)');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('File size too large. Please upload a file smaller than 10MB.');
            return;
        }

        // Process the file
        await processUploadedFile(file);
    };

    const processUploadedFile = async (file) => {
        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            
            if (jobId) {
                formData.append('jobId', jobId);
            }

            // Call the bulk upload API
            const response = await bulkUploadCandidates(formData);
            
            if (response.success) {
                setUploadResults(response.results);
                setSuccess(true);
                setActiveStep(2); // Move to results step
                onUploadComplete();
            } else {
                throw new Error(response.error || 'Upload failed');
            }
        } catch (err) {
            console.error('Error uploading file:', err);
            setError(err.message || 'Failed to upload file. Please check the format and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setActiveStep(0);
        setError('');
        setSuccess(false);
        setUploadResults(null);
        onClose();
    };

    const handleReset = () => {
        setActiveStep(0);
        setError('');
        setSuccess(false);
        setUploadResults(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
            fileInput.value = '';
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Bulk Upload Candidates
                {jobId && ` for Job #${jobId}`}
            </DialogTitle>
            
            <DialogContent>
                <Box sx={{ p: 2 }}>
                    <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    
                    {activeStep === 0 && (
                        <>
                            <Typography variant="body1" gutterBottom>
                                Download the Excel template to ensure your file has the correct format.
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Required fields are marked with *. The template includes data validation and formatting guidelines.
                            </Typography>
                            
                            <Button
                                variant="contained"
                                onClick={downloadTemplateHandler}
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={16} /> : <Download />}
                            >
                                Download Template
                            </Button>
                        </>
                    )}
                    
                    {activeStep === 1 && (
                        <>
                            <Typography variant="body1" gutterBottom>
                                Fill in the template with candidate information and upload it here.
                            </Typography>
                            
                            <Box sx={{ mt: 3, p: 2, border: '2px dashed #ccc', borderRadius: 2, textAlign: 'center' }}>
                                <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                                <Typography variant="body2" gutterBottom>
                                    Drag and drop your Excel file here, or click to browse
                                </Typography>
                                
                                <Button
                                    variant="outlined"
                                    component="label"
                                    disabled={loading}
                                    sx={{ mt: 1 }}
                                >
                                    Select File
                                    <input
                                        type="file"
                                        hidden
                                        accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                                        onChange={handleFileUpload}
                                    />
                                </Button>
                                
                                <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                                    Maximum file size: 10MB
                                </Typography>
                            </Box>
                        </>
                    )}
                    
                    {activeStep === 2 && uploadResults && (
                        <>
                            {success ? (
                                <Alert severity="success" sx={{ mb: 2 }} icon={<CheckCircle />}>
                                    Upload completed successfully!
                                </Alert>
                            ) : (
                                <Alert severity="warning" sx={{ mb: 2 }}>
                                    Upload completed with some errors.
                                </Alert>
                            )}
                            
                            <Typography variant="body1" gutterBottom>
                                Processed {uploadResults.total} candidate(s)
                            </Typography>
                            
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-around', 
                                textAlign: 'center',
                                my: 2 
                            }}>
                                <Box>
                                    <Typography variant="h6" color="success.main">
                                        {uploadResults.successful}
                                    </Typography>
                                    <Typography variant="body2">Successful</Typography>
                                </Box>
                                
                                <Box>
                                    <Typography variant="h6" color="error.main">
                                        {uploadResults.failed}
                                    </Typography>
                                    <Typography variant="body2">Failed</Typography>
                                </Box>
                            </Box>
                            
                            {uploadResults.errors && uploadResults.errors.length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" gutterBottom>
                                        Error Details:
                                    </Typography>
                                    
                                    <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                                        {uploadResults.errors.map((error, index) => (
                                            <Typography 
                                                key={index} 
                                                variant="body2" 
                                                color="error.main"
                                                sx={{ fontSize: '0.8rem', mb: 0.5 }}
                                            >
                                                • {error}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </>
                    )}
                    
                    {loading && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <CircularProgress size={20} sx={{ mr: 2 }} />
                            <Typography variant="body2">
                                {activeStep === 0 ? 'Preparing template...' : 'Processing file...'}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </DialogContent>
            
            <DialogActions>
                {activeStep === 2 ? (
                    <>
                        <Button onClick={handleReset}>
                            Upload Another File
                        </Button>
                        <Button onClick={handleClose} variant="contained">
                            Done
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default BulkUploadDialog;