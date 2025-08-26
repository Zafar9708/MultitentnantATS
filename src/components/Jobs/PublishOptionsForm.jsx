


import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  Avatar,
  CircularProgress,
  Fade
} from "@mui/material";

const jobBoards = [
  {
    name: "Naukri",
    logo: "/logos/naukri.png",
    url: "https://www.naukri.com/",
  },
  {
    name: "Glassdoor",
    logo: "/logos/glassdoor.png",
    url: "https://www.glassdoor.com/",
  },
  {
    name: "Foundit",
    logo: "/logos/foundit.jpg",
    url: "https://www.foundit.in/",
  },
];

const PublishOptionsForm = ({ onBack, onPublish, initialOptions, isEditMode }) => {
  const [publishOptions, setPublishOptions] = useState({
    careerSite: initialOptions.careerSite || false,
    internalEmployees: initialOptions.internalEmployees || false,
    referToEmployees: initialOptions.referToEmployees || false
  });
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    setLoading(true);
    try {
      await onPublish(publishOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 600, 
      mx: "auto", 
      mt: 5,
      p: 3,
      position: "relative",
      overflow: "hidden",
      minHeight: "400px",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Loading Overlay */}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            flexDirection: "column",
            gap: 2
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" color="primary">
            {isEditMode ? "Updating Job..." : "Publishing Job..."}
          </Typography>
        </Box>
      )}

      <Typography variant="h6" gutterBottom>
        {isEditMode ? "Update Options" : "Step 3: Publish Options"}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={publishOptions.careerSite}
              onChange={(e) =>
                setPublishOptions({ ...publishOptions, careerSite: e.target.checked })
              }
              disabled={loading}
            />
          }
          label="Publish this job on career site"
        />

        <FormControlLabel
          control={
            <Switch
              checked={publishOptions.internalEmployees}
              onChange={(e) =>
                setPublishOptions({ ...publishOptions, internalEmployees: e.target.checked })
              }
              disabled={loading}
            />
          }
          label="Post this job for internal employees"
        />

        <FormControlLabel
          control={
            <Switch
              checked={publishOptions.referToEmployees}
              onChange={(e) =>
                setPublishOptions({ ...publishOptions, referToEmployees: e.target.checked })
              }
              disabled={loading}
            />
          }
          label="Refer this job to employees"
        />

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Share this job on:
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
            {jobBoards.map((board) => (
              <a
                key={board.name}
                href={board.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", transition: "transform 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Avatar
                  alt={board.name}
                  src={board.logo}
                  sx={{ width: 64, height: 64 }}
                />
              </a>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: "auto", pt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={onBack} disabled={loading}>
            Back
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handlePublish}
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            {isEditMode ? "Update Changes" : "Publish"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PublishOptionsForm;