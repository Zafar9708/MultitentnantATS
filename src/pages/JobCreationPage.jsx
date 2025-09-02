

// import React, { useState, useEffect } from "react";
// import { Box, Typography, CircularProgress } from "@mui/material";
// import StepIndicator from "../components/Jobs/StepIndicator";
// import JobDescriptionForm from "../components/Jobs/JobDescriptionForm";
// import JobDetailsForm from "../components/Jobs/JobDetailsForm";
// import PublishOptionsForm from "../components/Jobs/PublishOptionsForm";
// import { createJob, updateJob, fetchJobDetails } from "../services/Jobs/jobCreationService";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import MainLayout from "../layout/MainLayout";
// import adminService from "../services/adminService";
// import { getCurrentUser } from "../services/authService";

// const JobCreationPage = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [step, setStep] = useState(0);
//   const [completedSteps, setCompletedSteps] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [loading, setLoading] = useState(true); // Start with loading true
//   const [recruiters, setRecruiters] = useState([]);
//   const [selectedRecruiters, setSelectedRecruiters] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
  
//   const [formData, setFormData] = useState({
//     jobTitle: '',
//     department: '',
//     experience: '',
//     jobDesc: '',
//     BusinessUnit: '',
//     Client: '',
//     jobType: '',
//     location: '',
//     openings: '',
//     targetHireDate: null,
//     currency: '',
//     amount: '',
//     allowReapply: false,
//     reapplyDate: null,
//     markPriority: false,
//     hiringFlow: ["Technical Round", "Manager Interview", "HR Round"],
//     careerSite: false,
//     internalEmployees: false,
//     referToEmployees: false,
//     SalesPerson: '',
//     recruitingPerson: '',
//     assignedRecruiters: []
//   });

//   useEffect(() => {
//     const initializePage = async () => {
//       try {
//         // Get current user from API
//         const user = await getCurrentUser();
//         console.log('Fetched user:', user);
//         setCurrentUser(user);
        
//         // Fetch recruiters only if user is admin
//         if (user && user.role === 'admin') {
//           await fetchRecruiters();
//         }
        
//         // Load job data if in edit mode
//         if (id) {
//           await loadJobData();
//         }
//       } catch (error) {
//         console.error('Error initializing page:', error);
//         alert('Failed to load page data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializePage();
//   }, [id]);

//   const fetchRecruiters = async () => {
//     try {
//       const response = await adminService.getRecruiters();
//       if (response.recruiters && Array.isArray(response.recruiters)) {
//         setRecruiters(response.recruiters);
//       } else if (response.recuiter && Array.isArray(response.recuiter)) {
//         setRecruiters(response.recuiter);
//       } else {
//         setRecruiters([]);
//       }
//     } catch (err) {
//       console.error('Error fetching recruiters:', err);
//       setRecruiters([]);
//     }
//   };

//   const loadJobData = async () => {
//     try {
//       let jobData;
//       if (location.state?.job) {
//         jobData = location.state.job;
//       } else {
//         const response = await fetchJobDetails(id);
//         jobData = response.job;
//       }
      
//       setFormData({
//         jobTitle: jobData.jobTitle || '',
//         department: jobData.department || '',
//         experience: jobData.experience || '',
//         jobDesc: jobData.jobDesc || '',
//         BusinessUnit: jobData.jobFormId?.BusinessUnit || '',
//         Client: jobData.jobFormId?.Client || '',
//         jobType: jobData.jobFormId?.jobType || '',
//         location: jobData.jobFormId?.location || '',
//         openings: jobData.jobFormId?.openings || '',
//         targetHireDate: jobData.jobFormId?.targetHireDate || null,
//         currency: jobData.jobFormId?.currency || '',
//         amount: jobData.jobFormId?.amount || '',
//         allowReapply: jobData.jobFormId?.allowReapply || false,
//         reapplyDate: jobData.jobFormId?.reapplyDate || null,
//         markPriority: jobData.jobFormId?.markPriority || false,
//         hiringFlow: jobData.jobFormId?.hiringFlow || ["Technical Round", "Manager Interview", "HR Round"],
//         careerSite: jobData.careerSite || false,
//         internalEmployees: jobData.internalEmployees || false,
//         referToEmployees: jobData.referToEmployees || false,
//         SalesPerson: jobData.jobFormId?.SalesPerson || '',
//         recruitingPerson: jobData.jobFormId?.recruitingPerson || '',
//         assignedRecruiters: jobData.assignedRecruiters || []
//       });

//       // Set selected recruiters if editing and user is admin
//       if (jobData.assignedRecruiters && Array.isArray(jobData.assignedRecruiters) && currentUser?.role === 'admin') {
//         // Convert IDs to recruiter objects
//         const assignedRecruiters = recruiters.filter(recruiter => 
//           jobData.assignedRecruiters.includes(recruiter._id)
//         );
//         setSelectedRecruiters(assignedRecruiters);
//       }
      
//       setIsEditMode(true);
//     } catch (error) {
//       console.error("Error loading job data:", error);
//       alert("Failed to load job data");
//     }
//   };

//   const handleJobDescriptionSubmit = (data) => {
//     setFormData(prev => ({
//       ...prev,
//       ...data
//     }));
//     setCompletedSteps((prev) => [...new Set([...prev, 0])]);
//     setStep(1);
//   };

//   const handleJobDetailsSubmit = (data, action) => {
//     if (action === "back") {
//       setStep(0);
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         ...data
//       }));
//       setCompletedSteps((prev) => [...new Set([...prev, 1])]);
//       setStep(2);
//     }
//   };

//   const handlePublishBack = () => {
//     setStep(1);
//   };

//   const handlePublish = async (options) => {
//     const finalData = {
//       ...formData,
//       ...options,
//       // Only include assignedRecruiters if user is admin
//       ...(currentUser?.role === 'admin' && {
//         assignedRecruiters: selectedRecruiters.map(recruiter => recruiter._id)
//       })
//     };
    
//     try {
//       setLoading(true);
//       if (isEditMode) {
//         await updateJob(id, finalData);
//         alert("Job Updated Successfully ✅");
//       } else {
//         await createJob(finalData);
//         alert("Job Published Successfully ✅");
//       }
//       navigate("/jobs");
//     } catch (error) {
//       console.error("Error submitting job:", error);
//       alert(error.response?.data?.error || "Failed to publish job. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
//         <CircularProgress size={60} thickness={4} />
//         <Typography sx={{ ml: 2 }}>Loading...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <MainLayout>
//     <Box sx={{ padding: 3, minHeight: "100vh" ,ml:4 }}>
//       {/* <Box sx={{ position: 'absolute', top: 70, right: 20, bgcolor: 'info.main', color: 'white', p: 1, borderRadius: 1 }}>
//         <Typography variant="caption">
//           User: {currentUser?.email} | Role: {currentUser?.role} | Is Admin: {currentUser?.role === 'admin' ? 'YES' : 'NO'}
//         </Typography>
//       </Box> */}

//       <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: "bold" }} align="center">
//         {isEditMode ? "Update Job Posting" : "Create a New Job"}
//       </Typography>

//       <StepIndicator activeStep={step} completedSteps={completedSteps} />

//       {step === 0 && (
//         <JobDescriptionForm 
//           onContinue={handleJobDescriptionSubmit} 
//           initialData={{
//             jobTitle: formData.jobTitle,
//             department: formData.department,
//             experience: formData.experience,
//             jobDesc: formData.jobDesc
//           }}
//         />
//       )}

//       {step === 1 && (
//         <JobDetailsForm 
//           onContinue={handleJobDetailsSubmit} 
//           initialData={{
//             BusinessUnit: formData.BusinessUnit,
//             Client: formData.Client,
//             jobType: formData.jobType,
//             location: formData.location,
//             openings: formData.openings,
//             targetHireDate: formData.targetHireDate,
//             currency: formData.currency,
//             amount: formData.amount,
//             allowReapply: formData.allowReapply,
//             reapplyDate: formData.reapplyDate,
//             markPriority: formData.markPriority,
//             hiringFlow: formData.hiringFlow,
//             SalesPerson: formData.SalesPerson,
//             recruitingPerson: formData.recruitingPerson,
//           }}
//         />
//       )}

//       {step === 2 && currentUser && (
//         <PublishOptionsForm
//           onBack={handlePublishBack}
//           onPublish={handlePublish}
//           initialOptions={{
//             careerSite: formData.careerSite,
//             internalEmployees: formData.internalEmployees,
//             referToEmployees: formData.referToEmployees
//           }}
//           isEditMode={isEditMode}
//           recruiters={currentUser.role === 'admin' ? recruiters : []}
//           selectedRecruiters={currentUser.role === 'admin' ? selectedRecruiters : []}
//           setSelectedRecruiters={currentUser.role === 'admin' ? setSelectedRecruiters : () => {}}
//           isAdmin={currentUser.role === 'admin'}
//         />
//       )}
//     </Box>
//     </MainLayout>
//   );
// };

// export default JobCreationPage;

//-----

// src/pages/JobCreationPage.jsx
// src/pages/JobCreationPage.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Backdrop,
  Snackbar,
  Alert,
} from "@mui/material";
import StepIndicator from "../components/Jobs/StepIndicator";
import JobDescriptionForm from "../components/Jobs/JobDescriptionForm";
import JobDetailsForm from "../components/Jobs/JobDetailsForm";
import PublishOptionsForm from "../components/Jobs/PublishOptionsForm";
import {
  createJob,
  updateJob,
  fetchJobDetails,
} from "../services/Jobs/jobCreationService";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import adminService from "../services/adminService";
import { useUser } from "../contexts/UserContext"; // ✅ use context instead of API

const JobCreationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user: currentUser } = useUser(); // ✅ get user from context

  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true); // only for initial page data
  const [submitting, setSubmitting] = useState(false); // ✅ loader while saving
  const [successMessage, setSuccessMessage] = useState(""); // ✅ success snackbar
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiters, setSelectedRecruiters] = useState([]);

  const [formData, setFormData] = useState({
    jobTitle: "",
    department: "",
    experience: "",
    jobDesc: "",
    BusinessUnit: "",
    Client: "",
    jobType: "",
    location: "",
    openings: "",
    targetHireDate: null,
    currency: "",
    amount: "",
    allowReapply: false,
    reapplyDate: null,
    markPriority: false,
    hiringFlow: ["Technical Round", "Manager Interview", "HR Round"],
    careerSite: false,
    internalEmployees: false,
    referToEmployees: false,
    SalesPerson: "",
    recruitingPerson: "",
    assignedRecruiters: [],
  });

  useEffect(() => {
    const initializePage = async () => {
      try {
        if (currentUser?.role === "admin") {
          await fetchRecruiters();
        }
        if (id) {
          await loadJobData();
        }
      } catch (error) {
        console.error("Error initializing page:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      initializePage();
    }
  }, [id, currentUser]);

  const fetchRecruiters = async () => {
    try {
      const response = await adminService.getRecruiters();
      if (response.recruiters && Array.isArray(response.recruiters)) {
        setRecruiters(response.recruiters);
      } else if (response.recuiter && Array.isArray(response.recuiter)) {
        setRecruiters(response.recuiter);
      } else {
        setRecruiters([]);
      }
    } catch (err) {
      console.error("Error fetching recruiters:", err);
      setRecruiters([]);
    }
  };

  const loadJobData = async () => {
    try {
      let jobData;
      if (location.state?.job) {
        jobData = location.state.job;
      } else {
        const response = await fetchJobDetails(id);
        jobData = response.job;
      }

      setFormData({
        jobTitle: jobData.jobTitle || "",
        department: jobData.department || "",
        experience: jobData.experience || "",
        jobDesc: jobData.jobDesc || "",
        BusinessUnit: jobData.jobFormId?.BusinessUnit || "",
        Client: jobData.jobFormId?.Client || "",
        jobType: jobData.jobFormId?.jobType || "",
        location: jobData.jobFormId?.location || "",
        openings: jobData.jobFormId?.openings || "",
        targetHireDate: jobData.jobFormId?.targetHireDate || null,
        currency: jobData.jobFormId?.currency || "",
        amount: jobData.jobFormId?.amount || "",
        allowReapply: jobData.jobFormId?.allowReapply || false,
        reapplyDate: jobData.jobFormId?.reapplyDate || null,
        markPriority: jobData.jobFormId?.markPriority || false,
        hiringFlow: jobData.jobFormId?.hiringFlow || [
          "Technical Round",
          "Manager Interview",
          "HR Round",
        ],
        careerSite: jobData.careerSite || false,
        internalEmployees: jobData.internalEmployees || false,
        referToEmployees: jobData.referToEmployees || false,
        SalesPerson: jobData.jobFormId?.SalesPerson || "",
        recruitingPerson: jobData.jobFormId?.recruitingPerson || "",
        assignedRecruiters: jobData.assignedRecruiters || [],
      });

      if (
        jobData.assignedRecruiters &&
        Array.isArray(jobData.assignedRecruiters) &&
        currentUser?.role === "admin"
      ) {
        const assignedRecruiters = recruiters.filter((r) =>
          jobData.assignedRecruiters.includes(r._id)
        );
        setSelectedRecruiters(assignedRecruiters);
      }

      setIsEditMode(true);
    } catch (error) {
      console.error("Error loading job data:", error);
    }
  };

  const handleJobDescriptionSubmit = (data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
    setCompletedSteps((prev) => [...new Set([...prev, 0])]);
    setStep(1);
  };

  const handleJobDetailsSubmit = (data, action) => {
    if (action === "back") {
      setStep(0);
    } else {
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
      setCompletedSteps((prev) => [...new Set([...prev, 1])]);
      setStep(2);
    }
  };

  const handlePublishBack = () => {
    setStep(1);
  };

  const handlePublish = async (options) => {
    const finalData = {
      ...formData,
      ...options,
      ...(currentUser?.role === "admin" && {
        assignedRecruiters: selectedRecruiters.map((r) => r._id),
      }),
    };

    try {
      setSubmitting(true);
      if (isEditMode) {
        await updateJob(id, finalData);
        setSuccessMessage("Job updated successfully!");
      } else {
        await createJob(finalData);
        setSuccessMessage("Job created successfully!");
      }

      // redirect after 2s
      setTimeout(() => {
        navigate("/jobs");
      }, 2000);
    } catch (error) {
      console.error("Error submitting job:", error);
      setSubmitting(false);
    }
  };

  if (loading) {
    // ✅ show ONLY one loader (initial page load)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        flexDirection="column"
      >
        <CircularProgress size={60} thickness={4} />
        <Typography sx={{ mt: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <MainLayout>
      <Box sx={{ padding: 3, minHeight: "100vh" }}>
        <Typography
          variant="h4"
          sx={{ color: "#1976d2", fontWeight: "bold" }}
          align="center"
        >
          {isEditMode ? "Update Job Posting" : "Create a New Job"}
        </Typography>

        <StepIndicator activeStep={step} completedSteps={completedSteps} />

        {step === 0 && (
          <JobDescriptionForm
            onContinue={handleJobDescriptionSubmit}
            initialData={{
              jobTitle: formData.jobTitle,
              department: formData.department,
              experience: formData.experience,
              jobDesc: formData.jobDesc,
            }}
          />
        )}

        {step === 1 && (
          <JobDetailsForm
            onContinue={handleJobDetailsSubmit}
            initialData={{
              BusinessUnit: formData.BusinessUnit,
              Client: formData.Client,
              jobType: formData.jobType,
              location: formData.location,
              openings: formData.openings,
              targetHireDate: formData.targetHireDate,
              currency: formData.currency,
              amount: formData.amount,
              allowReapply: formData.allowReapply,
              reapplyDate: formData.reapplyDate,
              markPriority: formData.markPriority,
              hiringFlow: formData.hiringFlow,
              SalesPerson: formData.SalesPerson,
              recruitingPerson: formData.recruitingPerson,
            }}
          />
        )}

        {step === 2 && currentUser && (
          <PublishOptionsForm
            onBack={handlePublishBack}
            onPublish={handlePublish}
            initialOptions={{
              careerSite: formData.careerSite,
              internalEmployees: formData.internalEmployees,
              referToEmployees: formData.referToEmployees,
            }}
            isEditMode={isEditMode}
            recruiters={currentUser.role === "admin" ? recruiters : []}
            selectedRecruiters={
              currentUser.role === "admin" ? selectedRecruiters : []
            }
            setSelectedRecruiters={
              currentUser.role === "admin" ? setSelectedRecruiters : () => {}
            }
            isAdmin={currentUser.role === "admin"}
          />
        )}
      </Box>

      {/* ✅ Fullscreen loader only while submitting */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: "column",
        }}
        open={submitting && !successMessage} // hide loader when success shown
      >
        <CircularProgress color="inherit" size={70} />
        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
          {isEditMode ? "Updating Job..." : "Publishing Job..."}
        </Typography>
      </Backdrop>

      {/* ✅ Beautiful success snackbar */}
      <Snackbar
        open={Boolean(successMessage)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default JobCreationPage;
