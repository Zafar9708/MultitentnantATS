


import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

import StepIndicator from "../components/Jobs/StepIndicator";
import JobDescriptionForm from "../components/Jobs/JobDescriptionForm";
import JobDetailsForm from "../components/Jobs/JobDetailsForm";
import PublishOptionsForm from "../components/Jobs/PublishOptionsForm";
import { createJob } from "../services/Jobs/jobCreationService";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const JobCreationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(!!id); 
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    experience: '',
    jobDesc: '',
    BusinessUnit: '',
    Client: '',
    jobType: '',
    location: '',
    openings: '',
    targetHireDate: null,
    currency: '',
    amount: '',
    allowReapply: false,
    reapplyDate: null,
    markPriority: false,
    hiringFlow: ["Technical Round", "Manager Interview", "HR Round"],
    careerSite: false,
    internalEmployees: false,
    referToEmployees: false,
    SalesPerson: '',
    recruitingPerson: ''
  });

  useEffect(() => {
    if (id) {
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
            jobTitle: jobData.jobTitle || '',
            department: jobData.department || '',
            experience: jobData.experience || '',
            jobDesc: jobData.jobDesc || '',
            BusinessUnit: jobData.jobFormId?.BusinessUnit || '',
            Client: jobData.jobFormId?.Client || '',
            jobType: jobData.jobFormId?.jobType || '',
            location: jobData.jobFormId?.location || '',
            openings: jobData.jobFormId?.openings || '',
            targetHireDate: jobData.jobFormId?.targetHireDate || null,
            currency: jobData.jobFormId?.currency || '',
            amount: jobData.jobFormId?.amount || '',
            allowReapply: jobData.jobFormId?.allowReapply || false,
            reapplyDate: jobData.jobFormId?.reapplyDate || null,
            markPriority: jobData.jobFormId?.markPriority || false,
            hiringFlow: jobData.jobFormId?.hiringFlow || ["Technical Round", "Manager Interview", "HR Round"],
            careerSite: jobData.careerSite || false,
            internalEmployees: jobData.internalEmployees || false,
            referToEmployees: jobData.referToEmployees || false,
            SalesPerson: jobData.jobFormId?.SalesPerson || '',
            recruitingPerson: jobData.jobFormId?.recruitingPerson || ''
          });
          setIsEditMode(true);
        } catch (error) {
          console.error("Error loading job data:", error);
        } finally {
          setLoading(false);
        }
      };
      
      loadJobData();
    }
  }, [id, location.state]);

  const handleJobDescriptionSubmit = (data) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
    setCompletedSteps((prev) => [...new Set([...prev, 0])]);
    setStep(1);
  };

  const handleJobDetailsSubmit = (data, action) => {
    if (action === "back") {
      setStep(0);
    } else {
      setFormData(prev => ({
        ...prev,
        ...data
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
      ...options
    };
    
    try {
      setLoading(true);
      if (isEditMode) {
        await updateJob(id, finalData);
        alert("Job Updated Successfully ✅");
      } else {
        await createJob(finalData);
        alert("Job Published Successfully ✅");
      }
      navigate("/jobs");
    } catch (error) {
      console.error("Error submitting job:", error);
      alert(error.response?.data?.error || "Failed to publish job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <MainLayout>
    <Box sx={{ padding: 3,  minHeight: "100vh", ml:18 }}>
      <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: "bold" }} align="center">
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
            jobDesc: formData.jobDesc
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

      {step === 2 && (
        <PublishOptionsForm
          onBack={handlePublishBack}
          onPublish={handlePublish}
          initialOptions={{
            careerSite: formData.careerSite,
            internalEmployees: formData.internalEmployees,
            referToEmployees: formData.referToEmployees
          }}
          isEditMode={isEditMode}
        />
      )}
    </Box>
    </MainLayout>
  );
};

export default JobCreationPage;

