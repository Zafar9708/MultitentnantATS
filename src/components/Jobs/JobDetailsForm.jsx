

// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     TextField,
//     Select,
//     MenuItem,
//     InputLabel,
//     FormControl,
//     Button,
//     Typography,
//     IconButton,
//     InputAdornment,
//     Checkbox,
//     FormControlLabel,
//     Divider,
//     Paper,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Chip,
//     Autocomplete,
//     Snackbar,
//     Alert
// } from "@mui/material";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AddIcon from "@mui/icons-material/Add";
// import AddLocationIcon from "@mui/icons-material/AddLocation";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { fetchJobFormOptions } from "../../services/Jobs/fetchJobFormOptions";
// import { fetchLocations, addNewLocation } from "../../services/Jobs/locationService";
// import { fetchEmployees, createEmployee } from "../../services/Jobs/employeeService";
// import { fetchClients, createClient, deleteClient } from "../../services/Jobs/clientService";

// const JobDetailsForm = ({ onContinue, initialData = {} }) => {
//     // State initialization
//     const [allUsers, setAllUsers] = useState([]);
//     const [jobType, setJobType] = useState(initialData.jobType || "");
//     const [selectedLocations, setSelectedLocations] = useState(initialData.locations || []);
//     const [openings, setOpenings] = useState(initialData.openings || "");
//     const [targetHireDate, setTargetHireDate] = useState(initialData.targetHireDate ? new Date(initialData.targetHireDate) : null);
//     const [currency, setCurrency] = useState(initialData.currency || "");
//     const [amount, setAmount] = useState(initialData.amount || "");
//     const [allowReapply, setAllowReapply] = useState(initialData.allowReapply || false);
//     const [reapplyDate, setReapplyDate] = useState(initialData.reapplyDate || null);
//     const [markPriority, setMarkPriority] = useState(initialData.markPriority || false);
//     const [BusinessUnit, setBusinessUnit] = useState(initialData.BusinessUnit || "");
//     const [Client, setClient] = useState(initialData.Client || "");
//     const [SalesPerson, setSalesPerson] = useState(initialData.salesPerson || null);
//     const [recruitingPerson, setRecruitingPerson] = useState(initialData.recruitingPerson || "");
//     const [jobTypes, setJobTypes] = useState([]);
//     const [locations, setLocations] = useState([]);
//     const [currencies, setCurrencies] = useState([]);
//     const [newLocation, setNewLocation] = useState("");
//     const [openAddLocation, setOpenAddLocation] = useState(false);
//     const [openAddSalesPerson, setOpenAddSalesPerson] = useState(false);
//     const [openAddRecruiter, setOpenAddRecruiter] = useState(false);
//     const [newSalesPerson, setNewSalesPerson] = useState({
//         name: "",
//         email: "",
//         role: "SalesPerson"
//     });
//     const [newRecruiter, setNewRecruiter] = useState({
//         name: "",
//         email: "",
//         role: "HR/Recruiter"
//     });
//     const [clients, setClients] = useState([]);
//     const [newClientName, setNewClientName] = useState("");
//     const [openAddClient, setOpenAddClient] = useState(false);
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: "",
//         severity: "success"
//     });

//     const hiringFlowSteps = initialData.hiringFlow || [
//         "Technical Round",
//         "Manager Interview",
//         "HR Round"
//     ];

//     // Load all initial data
//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 const [options, locationList, employeesList, clientsList] = await Promise.all([
//                     fetchJobFormOptions(),
//                     fetchLocations(),
//                     fetchEmployees(),
//                     fetchClients()
//                 ]);

//                 setJobTypes(options.jobTypes || []);
//                 setLocations(locationList || []);
//                 setCurrencies(options.currencies || []);
//                 setAllUsers(Array.isArray(employeesList) ? employeesList : []); // Ensure this is always an array
//                 setClients(clientsList || []);

//             } catch (error) {
//                 console.error("Failed to load data:", error);
//                 showSnackbar("Failed to load initial data", "error");
//                 setAllUsers([]); // Fallback to empty array on error
//             }
//         };

//         loadData();
//     }, []);

//     // Handle form submission
//     const handleSubmit = (action) => {
//         const jobData = {
//             jobType,
//             locations: selectedLocations,
//             openings: Number(openings) || 0,
//             targetHireDate,
//             currency,
//             amount: Number(amount) || 0,
//             allowReapply,
//             reapplyDate: allowReapply ? Number(reapplyDate) || 0 : null,
//             markPriority,
//             hiringFlow: hiringFlowSteps,
//             BusinessUnit: BusinessUnit.toLowerCase(),
//             Client: BusinessUnit === "external" ? Client : undefined,
//             salesPerson: BusinessUnit === "external" ? SalesPerson : undefined,
//             recruitingPerson
//         };

//         onContinue(jobData, action);
//     };

//     // Handle adding a new location
//     const handleAddLocation = async () => {
//         try {
//             if (!newLocation.trim()) {
//                 showSnackbar("Location name is required", "error");
//                 return;
//             }

//             // Check if location already exists
//             const exists = locations.some(
//                 loc => loc.name.toLowerCase() === newLocation.trim().toLowerCase()
//             );

//             if (exists) {
//                 showSnackbar("Location already exists", "error");
//                 return;
//             }

//             // Add new location via API
//             const response = await addNewLocation(newLocation.trim());

//             // Update state
//             setLocations(prev => [...prev, response.data]);
//             setSelectedLocations(prev => [...prev, response.data._id]);
//             setNewLocation("");
//             setOpenAddLocation(false);
//             showSnackbar("Location added successfully", "success");

//         } catch (error) {
//             console.error("Failed to add location:", error);
//             showSnackbar(error.message || "Failed to add location", "error");
//         }
//     };

//     // Handle adding a new client
//     const handleSaveNewClient = async () => {
//         try {
//             if (!newClientName.trim()) {
//                 showSnackbar("Client name is required", "error");
//                 return;
//             }

//             const response = await createClient(newClientName.trim());

//             if (response.success && response.client) {
//                 setClients(prev => [...prev, response.client]);
//                 setClient(response.client._id);
//                 setNewClientName("");
//                 setOpenAddClient(false);
//                 showSnackbar("Client added successfully", "success");
//             }
//         } catch (error) {
//             console.error("Error creating client:", error);
//             showSnackbar(error.message || "Failed to add client", "error");
//         }
//     };

//     // Handle deleting a client
//     const handleDeleteClient = async (clientId) => {
//         try {
//             await deleteClient(clientId);

//             setClients(prev => prev.filter(client => client._id !== clientId));
//             if (Client === clientId) {
//                 setClient("");
//             }
//             showSnackbar("Client deleted successfully", "success");
//         } catch (error) {
//             console.error("Error deleting client:", error);
//             showSnackbar(error.message || "Failed to delete client", "error");
//         }
//     };

//     // Handle adding a new sales person
//     const handleAddSalesPerson = () => {
//         setOpenAddSalesPerson(true);
//     };

//     const handleCloseAddSalesPerson = () => {
//         setOpenAddSalesPerson(false);
//         setNewSalesPerson({ name: "", email: "", role: "SalesPerson" });
//     };

//     const handleNewSalesPersonChange = (e) => {
//         const { name, value } = e.target;
//         setNewSalesPerson(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSaveNewSalesPerson = async () => {
//         try {
//             const createdUser = await createEmployee(newSalesPerson);
//             const newUserObj = {
//                 _id: createdUser._id,
//                 name: createdUser.name,
//                 email: createdUser.email,
//                 role: createdUser.role
//             };

//             setAllUsers(prev => [...prev, newUserObj]);
//             setSalesPerson(newUserObj._id);

//             try {
//                 // This email service call can be moved to a separate service if used frequently
//                 await axios.post("https://hire-onboardbackend-production.up.railway.app/api/send-welcome-email", {
//                     email: newUserObj.email,
//                     name: newUserObj.name,
//                     role: newUserObj.role
//                 });
//             } catch (emailError) {
//                 console.error("Error sending welcome email:", emailError);
//             }

//             handleCloseAddSalesPerson();
//             showSnackbar("Sales person added successfully", "success");
//         } catch (err) {
//             console.error("Error creating salesperson:", err);
//             showSnackbar(err.message || "Failed to add sales person", "error");
//         }
//     };

//     // Handle adding a new recruiter
//     const handleAddRecruiter = () => {
//         setOpenAddRecruiter(true);
//     };

//     const handleCloseAddRecruiter = () => {
//         setOpenAddRecruiter(false);
//         setNewRecruiter({ name: "", email: "", role: "HR/Recruiter" });
//     };

//     const handleNewRecruiterChange = (e) => {
//         const { name, value } = e.target;
//         setNewRecruiter(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSaveNewRecruiter = async () => {
//         try {
//             const createdUser = await createEmployee(newRecruiter);
//             const newUserObj = {
//                 _id: createdUser._id,
//                 name: createdUser.name,
//                 email: createdUser.email,
//                 role: createdUser.role
//             };

//             setAllUsers(prev => [...prev, newUserObj]);
//             setRecruitingPerson(newUserObj.name);
//             handleCloseAddRecruiter();
//             showSnackbar("Recruiter added successfully", "success");
//         } catch (err) {
//             console.error("Error creating recruiter:", err);
//             showSnackbar(err.message || "Failed to add recruiter", "error");
//         }
//     };

//     // Snackbar helper functions
//     const showSnackbar = (message, severity) => {
//         setSnackbar({ open: true, message, severity });
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };

//     // Helper to close add client dialog
//     const handleCloseAddClient = () => {
//         setOpenAddClient(false);
//         setNewClientName("");
//     };

//     // Get selected locations for Autocomplete
//     const getSelectedLocations = () => {
//         return locations.filter(loc => selectedLocations.includes(loc._id));
//     };

//     return (
//         <Paper elevation={4} sx={{
//             maxWidth: { xs: '100%', md: 1000 },
//             width: { xs: '95%', md: 900 },
//             mx: "auto",
//             p: { xs: 2, md: 4 },
//             borderRadius: 3,
//             marginTop: 2
//         }}>
//             <Typography variant="h5" fontWeight={600} gutterBottom align="left">Job Details</Typography>
//             <Divider sx={{ mb: 3 }} />

//             {/* Business Unit and Client Section */}
//             <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
//                 <FormControl fullWidth>
//                     <InputLabel>Business Unit</InputLabel>
//                     <Select
//                         value={BusinessUnit}
//                         onChange={(e) => setBusinessUnit(e.target.value)}
//                         label="Business Unit"
//                         required
//                     >
//                         <MenuItem value="internal">Internal</MenuItem>
//                         <MenuItem value="external">External</MenuItem>
//                     </Select>
//                 </FormControl>

//                 {BusinessUnit === "external" && (
//                     <FormControl fullWidth>
//                         <InputLabel>Client</InputLabel>
//                         <Select
//                             value={Client}
//                             onChange={(e) => setClient(e.target.value)}
//                             label="Client"
//                             required
//                             endAdornment={
//                                 <InputAdornment position="end">
//                                     <IconButton onClick={() => setOpenAddClient(true)}>
//                                         <AddIcon />
//                                     </IconButton>
//                                 </InputAdornment>
//                             }
//                         >
//                             {clients.map((client) => (
//                                 <MenuItem key={client._id} value={client._id}>
//                                     <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
//                                         <span>{client.name}</span>
//                                         <IconButton
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 handleDeleteClient(client._id);
//                                             }}
//                                             size="small"
//                                         >
//                                             <DeleteIcon fontSize="small" />
//                                         </IconButton>
//                                     </Box>
//                                 </MenuItem>
//                             ))}
//                             <MenuItem onClick={() => setOpenAddClient(true)} sx={{ justifyContent: "center" }}>
//                                 <Button startIcon={<AddIcon />}>Add New Client</Button>
//                             </MenuItem>
//                         </Select>
//                     </FormControl>
//                 )}
//             </Box>

//             {/* Job Type and Locations Section */}
//             <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
//                 <FormControl fullWidth>
//                     <InputLabel>Job Type</InputLabel>
//                     <Select
//                         value={jobType}
//                         onChange={(e) => setJobType(e.target.value)}
//                         label="Job Type"
//                         required
//                     >
//                         {jobTypes.map((type) => (
//                             <MenuItem key={type} value={type}>{type}</MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>

//                 <FormControl fullWidth>
//                     <Autocomplete
//                         multiple
//                         options={locations}
//                         value={getSelectedLocations()}
//                         onChange={(event, newValue) => {
//                             setSelectedLocations(newValue.map(v => v._id));
//                         }}
//                         getOptionLabel={(option) => option.name}
//                         renderTags={(value, getTagProps) =>
//                             value.map((option, index) => (
//                                 <Chip
//                                     label={option.name}
//                                     {...getTagProps({ index })}
//                                     key={option._id}
//                                     sx={{ m: 0.5 }}
//                                 />
//                             ))
//                         }
//                         renderInput={(params) => (
//                             <TextField
//                                 {...params}
//                                 label="Locations"
//                                 placeholder="Select locations"
//                                 required
//                             />
//                         )}
//                     />
//                     <Button
//                         startIcon={<AddLocationIcon />}
//                         onClick={() => setOpenAddLocation(true)}
//                         sx={{ mt: 1 }}
//                     >
//                         Add New Location
//                     </Button>
//                 </FormControl>
//             </Box>

//             {/* Employment Details Section */}
//             <Typography variant="h6" fontWeight={500} gutterBottom align="left">Employment Details</Typography>
//             <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
//                 <TextField
//                     label="No. of Openings"
//                     value={openings}
//                     onChange={(e) => setOpenings(e.target.value)}
//                     type="number"
//                     fullWidth
//                     required
//                     inputProps={{ min: 1 }}
//                 />
//                 <FormControl fullWidth>
//                     <DatePicker
//                         selected={targetHireDate}
//                         onChange={(date) => setTargetHireDate(date)}
//                         customInput={
//                             <TextField
//                                 label="Target Hire Date"
//                                 fullWidth
//                                 required
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <IconButton><CalendarTodayIcon /></IconButton>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                         }
//                     />
//                 </FormControl>
//             </Box>

//             {/* Compensation Details Section */}
//             <Typography variant="h6" fontWeight={500} gutterBottom align="left">Compensation Details</Typography>
//             <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
//                 <FormControl fullWidth>
//                     <InputLabel>Currency</InputLabel>
//                     <Select
//                         value={currency}
//                         onChange={(e) => setCurrency(e.target.value)}
//                         label="Currency"
//                         required
//                         sx={{
//                             "& .MuiSelect-select": {
//                                 display: "flex",
//                                 alignItems: "center"
//                             }
//                         }}
//                     >
//                         {currencies.map(({ code, symbol }) => (
//                             <MenuItem key={code} value={code}>
//                                 {code} ({symbol})
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//                 <TextField
//                     label={`Amount (${currency || ""})`}
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     type="number"
//                     fullWidth
//                     required
//                     inputProps={{ min: 0 }}
//                 />
//             </Box>

//             {/* Team Details Section */}
//             <Typography variant="h6" fontWeight={500} gutterBottom align="left">Team Details</Typography>
//             <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
//                 <FormControl fullWidth>
//                     <InputLabel shrink={!!SalesPerson} sx={{
//                         backgroundColor: 'background.paper',
//                         px: 1,
//                         transform: 'translate(14px, -9px) scale(0.75)',
//                         "&.MuiInputLabel-shrink": {
//                             transform: 'translate(14px, -9px) scale(0.75)'
//                         }
//                     }}>
//                         Sales Person
//                     </InputLabel>
//                     <Select
//                         value={SalesPerson || ''}
//                         onChange={(e) => setSalesPerson(e.target.value || null)}
//                         label="Sales Person"
//                         required={BusinessUnit === "external"}
//                         displayEmpty
//                         sx={{
//                             "& .MuiSelect-select": {
//                                 display: "flex",
//                                 alignItems: "center",
//                                 paddingTop: "12px",
//                                 paddingBottom: "12px"
//                             }
//                         }}
//                         MenuProps={{
//                             PaperProps: {
//                                 style: {
//                                     maxHeight: 300
//                                 }
//                             }
//                         }}
//                     >
//                         <MenuItem value="" disabled>
//                             <em>Select Sales Person</em>
//                         </MenuItem>
//                         {Array.isArray(allUsers) && allUsers
//                             .filter((user) => user.role === "SalesPerson")
//                             .map((user) => (
//                                 <MenuItem key={user._id} value={user._id}>
//                                     {user.name} ({user.email})
//                                 </MenuItem>
//                             ))
//                         }
//                         <MenuItem onClick={handleAddSalesPerson} sx={{ justifyContent: "center" }}>
//                             <Button startIcon={<AddIcon />}>Add New Sales Person</Button>
//                         </MenuItem>
//                     </Select>
//                 </FormControl>

//                 <FormControl fullWidth>
//                     <InputLabel shrink={!!recruitingPerson} sx={{
//                         backgroundColor: 'background.paper',
//                         px: 1,
//                         transform: 'translate(14px, -9px) scale(0.75)',
//                         "&.MuiInputLabel-shrink": {
//                             transform: 'translate(14px, -9px) scale(0.75)'
//                         }
//                     }}>
//                         Recruiting Member
//                     </InputLabel>
//                     <Select
//                         value={recruitingPerson}
//                         onChange={(e) => setRecruitingPerson(e.target.value)}
//                         label="Recruiting Member"
//                         required
//                         displayEmpty
//                         sx={{
//                             "& .MuiSelect-select": {
//                                 display: "flex",
//                                 alignItems: "center",
//                                 paddingTop: "12px",
//                                 paddingBottom: "12px"
//                             }
//                         }}
//                         MenuProps={{
//                             PaperProps: {
//                                 style: {
//                                     maxHeight: 300
//                                 }
//                             }
//                         }}
//                     >
//                         <MenuItem value="" disabled>
//                             <em>Select Recruiting Member</em>
//                         </MenuItem>
//                         {Array.isArray(allUsers) && allUsers
//                             .filter((user) => user.role === "HR/Recruiter")
//                             .map((user) => (
//                                 <MenuItem key={user._id} value={user.name}>
//                                     {user.name}
//                                 </MenuItem>
//                             ))
//                         }
//                         <MenuItem onClick={handleAddRecruiter} sx={{ justifyContent: "center" }}>
//                             <Button startIcon={<AddIcon />}>Add New Recruiter</Button>
//                         </MenuItem>
//                     </Select>
//                 </FormControl>
//             </Box>

//             {/* Additional Options Section */}
//             <Typography variant="h6" fontWeight={500} gutterBottom align="left">Additional Options</Typography>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3, alignItems: "flex-start" }}>
//                 <Box sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, gap: 2 }}>
//                     <FormControlLabel
//                         control={<Checkbox checked={allowReapply} onChange={(e) => setAllowReapply(e.target.checked)} />}
//                         label="Allow applicant to apply again after"
//                     />
//                     {allowReapply && (
//                         <TextField
//                             placeholder="Days"
//                             type="number"
//                             value={reapplyDate || ""}
//                             onChange={(e) => setReapplyDate(e.target.value)}
//                             sx={{ width: 100 }}
//                             inputProps={{ min: 1 }}
//                         />
//                     )}
//                 </Box>
//                 <FormControlLabel
//                     control={<Checkbox checked={markPriority} onChange={(e) => setMarkPriority(e.target.checked)} />}
//                     label="Mark this job as priority"
//                 />
//             </Box>

//             {/* Form Actions */}
//             <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//                 <Button variant="outlined" onClick={() => handleSubmit("back")}>Back</Button>
//                 <Button
//                     variant="contained"
//                     onClick={() => handleSubmit("continue")}
//                     disabled={
//                         !jobType ||
//                         !selectedLocations.length ||
//                         !openings ||
//                         !targetHireDate ||
//                         !BusinessUnit ||
//                         (BusinessUnit === "external" && (!Client || !SalesPerson))
//                     }
//                 >
//                     Continue
//                 </Button>
//             </Box>

//             {/* Add Location Dialog */}
//             <Dialog open={openAddLocation} onClose={() => setOpenAddLocation(false)}>
//                 <DialogTitle>Add New Location</DialogTitle>
//                 <DialogContent sx={{ p: 3, minWidth: { xs: 'auto', sm: 400 } }}>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Location Name"
//                         fullWidth
//                         value={newLocation}
//                         onChange={(e) => setNewLocation(e.target.value)}
//                         onKeyPress={(e) => {
//                             if (e.key === 'Enter' && newLocation.trim()) {
//                                 handleAddLocation();
//                             }
//                         }}
//                         error={!newLocation.trim()}
//                         helperText={!newLocation.trim() ? "Location name is required" : ""}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenAddLocation(false)}>Cancel</Button>
//                     <Button
//                         onClick={handleAddLocation}
//                         disabled={!newLocation.trim()}
//                         variant="contained"
//                     >
//                         Add Location
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Add Sales Person Dialog */}
//             <Dialog open={openAddSalesPerson} onClose={handleCloseAddSalesPerson}>
//                 <DialogTitle>Add New Sales Person</DialogTitle>
//                 <DialogContent sx={{ p: 3, minWidth: { xs: 'auto', sm: 400 } }}>
//                     <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//                         <TextField
//                             label="Name"
//                             name="name"
//                             value={newSalesPerson.name}
//                             onChange={handleNewSalesPersonChange}
//                             fullWidth
//                             required
//                         />
//                         <TextField
//                             label="Email"
//                             name="email"
//                             type="email"
//                             value={newSalesPerson.email}
//                             onChange={handleNewSalesPersonChange}
//                             fullWidth
//                             required
//                         />
//                         <TextField
//                             label="Role"
//                             name="role"
//                             value={newSalesPerson.role}
//                             fullWidth
//                             disabled
//                         />
//                     </Box>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseAddSalesPerson}>Cancel</Button>
//                     <Button
//                         onClick={handleSaveNewSalesPerson}
//                         variant="contained"
//                         disabled={!newSalesPerson.name || !newSalesPerson.email}
//                     >
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Add Recruiter Dialog */}
//             <Dialog open={openAddRecruiter} onClose={handleCloseAddRecruiter}>
//                 <DialogTitle>Add New Recruiter</DialogTitle>
//                 <DialogContent sx={{ p: 3, minWidth: { xs: 'auto', sm: 400 } }}>
//                     <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//                         <TextField
//                             label="Name"
//                             name="name"
//                             value={newRecruiter.name}
//                             onChange={handleNewRecruiterChange}
//                             fullWidth
//                             required
//                         />
//                         <TextField
//                             label="Email"
//                             name="email"
//                             type="email"
//                             value={newRecruiter.email}
//                             onChange={handleNewRecruiterChange}
//                             fullWidth
//                             required
//                         />
//                         <TextField
//                             label="Role"
//                             name="role"
//                             value={newRecruiter.role}
//                             fullWidth
//                             disabled
//                         />
//                     </Box>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseAddRecruiter}>Cancel</Button>
//                     <Button
//                         onClick={handleSaveNewRecruiter}
//                         variant="contained"
//                         disabled={!newRecruiter.name || !newRecruiter.email}
//                     >
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Add Client Dialog */}
//             <Dialog open={openAddClient} onClose={handleCloseAddClient}>
//                 <DialogTitle>Add New Client</DialogTitle>
//                 <DialogContent sx={{ p: 3, minWidth: { xs: 'auto', sm: 400 } }}>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Client Name"
//                         fullWidth
//                         value={newClientName}
//                         onChange={(e) => setNewClientName(e.target.value)}
//                         onKeyPress={(e) => {
//                             if (e.key === 'Enter' && newClientName.trim()) {
//                                 handleSaveNewClient();
//                             }
//                         }}
//                         error={!newClientName.trim()}
//                         helperText={!newClientName.trim() ? "Client name is required" : ""}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseAddClient}>Cancel</Button>
//                     <Button
//                         onClick={handleSaveNewClient}
//                         disabled={!newClientName.trim()}
//                         variant="contained"
//                     >
//                         Add Client
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Snackbar for notifications */}
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             >
//                 <Alert
//                     onClose={handleCloseSnackbar}
//                     severity={snackbar.severity}
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Paper>
//     );
// };

// export default JobDetailsForm;


import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Autocomplete,
  Snackbar,
  Alert
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchJobFormOptions } from "../../services/Jobs/fetchJobFormOptions";
import { fetchLocations, addNewLocation } from "../../services/Jobs/locationService";
import { fetchEmployees, createEmployee } from "../../services/Jobs/employeeService";
import { fetchClients, createClient, deleteClient } from "../../services/Jobs/clientService";

const JobDetailsForm = ({ onContinue, initialData = {} }) => {
  // State initialization with proper array defaults
  const [allUsers, setAllUsers] = useState([]);
  const [jobType, setJobType] = useState(initialData.jobType || "");
  const [selectedLocations, setSelectedLocations] = useState(Array.isArray(initialData.locations) ? initialData.locations : []);
  const [openings, setOpenings] = useState(initialData.openings || "");
  const [targetHireDate, setTargetHireDate] = useState(initialData.targetHireDate ? new Date(initialData.targetHireDate) : null);
  const [currency, setCurrency] = useState(initialData.currency || "");
  const [amount, setAmount] = useState(initialData.amount || "");
  const [allowReapply, setAllowReapply] = useState(initialData.allowReapply || false);
  const [reapplyDate, setReapplyDate] = useState(initialData.reapplyDate || null);
  const [markPriority, setMarkPriority] = useState(initialData.markPriority || false);
  const [BusinessUnit, setBusinessUnit] = useState(initialData.BusinessUnit || "");
  const [Client, setClient] = useState(initialData.Client || "");
  const [SalesPerson, setSalesPerson] = useState(initialData.salesPerson || null);
  const [recruitingPerson, setRecruitingPerson] = useState(initialData.recruitingPerson || "");
  const [jobTypes, setJobTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [openAddLocation, setOpenAddLocation] = useState(false);
  const [openAddSalesPerson, setOpenAddSalesPerson] = useState(false);
  const [openAddRecruiter, setOpenAddRecruiter] = useState(false);
  const [newSalesPerson, setNewSalesPerson] = useState({
    name: "",
    email: "",
    role: "SalesPerson"
  });
  const [newRecruiter, setNewRecruiter] = useState({
    name: "",
    email: "",
    role: "HR/Recruiter"
  });
  const [clients, setClients] = useState([]);
  const [newClientName, setNewClientName] = useState("");
  const [openAddClient, setOpenAddClient] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const hiringFlowSteps = Array.isArray(initialData.hiringFlow) 
    ? initialData.hiringFlow 
    : ["Technical Round", "Manager Interview", "HR Round"];

  // Load all initial data with proper error handling
  useEffect(() => {
    const loadData = async () => {
      try {
        const [options, locationList, employeesList, clientsList] = await Promise.all([
          fetchJobFormOptions(),
          fetchLocations(),
          fetchEmployees(),
          fetchClients()
        ]);
        
        // Ensure all state is set with proper array defaults
        setJobTypes(Array.isArray(options?.jobTypes) ? options.jobTypes : []);
        setLocations(Array.isArray(locationList) ? locationList : []);
        setCurrencies(Array.isArray(options?.currencies) ? options.currencies : []);
        setAllUsers(Array.isArray(employeesList) ? employeesList : []);
        setClients(Array.isArray(clientsList) ? clientsList : []);

      } catch (error) {
        console.error("Failed to load data:", error);
        showSnackbar("Failed to load initial data", "error");
        // Reset to empty arrays on error
        setJobTypes([]);
        setLocations([]);
        setCurrencies([]);
        setAllUsers([]);
        setClients([]);
      }
    };

    loadData();
  }, []);

  // Handle form submission
  const handleSubmit = (action) => {
    const jobData = {
      jobType,
      locations: Array.isArray(selectedLocations) ? selectedLocations : [],
      openings: Number(openings) || 0,
      targetHireDate,
      currency,
      amount: Number(amount) || 0,
      allowReapply,
      reapplyDate: allowReapply ? Number(reapplyDate) || 0 : null,
      markPriority,
      hiringFlow: hiringFlowSteps,
      BusinessUnit: BusinessUnit.toLowerCase(),
      Client: BusinessUnit === "external" ? Client : undefined,
      salesPerson: BusinessUnit === "external" ? SalesPerson : undefined,
      recruitingPerson
    };

    onContinue(jobData, action);
  };

  // Handle adding a new location
  const handleAddLocation = async () => {
    try {
      if (!newLocation.trim()) {
        showSnackbar("Location name is required", "error");
        return;
      }

      // Check if location already exists
      const exists = locations.some(
        loc => loc.name.toLowerCase() === newLocation.trim().toLowerCase()
      );

      if (exists) {
        showSnackbar("Location already exists", "error");
        return;
      }

      // Add new location via API
      const response = await addNewLocation(newLocation.trim());

      // Update state with proper array checks
      setLocations(prev => Array.isArray(prev) ? [...prev, response.data] : [response.data]);
      setSelectedLocations(prev => Array.isArray(prev) ? [...prev, response.data._id] : [response.data._id]);
      setNewLocation("");
      setOpenAddLocation(false);
      showSnackbar("Location added successfully", "success");

    } catch (error) {
      console.error("Failed to add location:", error);
      showSnackbar(error.message || "Failed to add location", "error");
    }
  };

  // Handle adding a new client
  const handleSaveNewClient = async () => {
    try {
      if (!newClientName.trim()) {
        showSnackbar("Client name is required", "error");
        return;
      }

      const response = await createClient(newClientName.trim());
      
      if (response.success && response.client) {
        setClients(prev => Array.isArray(prev) ? [...prev, response.client] : [response.client]);
        setClient(response.client._id);
        setNewClientName("");
        setOpenAddClient(false);
        showSnackbar("Client added successfully", "success");
      }
    } catch (error) {
      console.error("Error creating client:", error);
      showSnackbar(error.message || "Failed to add client", "error");
    }
  };

  // Handle deleting a client
  const handleDeleteClient = async (clientId) => {
    try {
      await deleteClient(clientId);
      
      setClients(prev => Array.isArray(prev) ? prev.filter(client => client._id !== clientId) : []);
      if (Client === clientId) {
        setClient("");
      }
      showSnackbar("Client deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting client:", error);
      showSnackbar(error.message || "Failed to delete client", "error");
    }
  };

  // Handle adding a new sales person
  const handleAddSalesPerson = () => {
    setOpenAddSalesPerson(true);
  };

  const handleCloseAddSalesPerson = () => {
    setOpenAddSalesPerson(false);
    setNewSalesPerson({ name: "", email: "", role: "SalesPerson" });
  };

  const handleNewSalesPersonChange = (e) => {
    const { name, value } = e.target;
    setNewSalesPerson(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveNewSalesPerson = async () => {
    try {
      const createdUser = await createEmployee(newSalesPerson);
      const newUserObj = {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role
      };

      setAllUsers(prev => Array.isArray(prev) ? [...prev, newUserObj] : [newUserObj]);
      setSalesPerson(newUserObj._id);

      try {
        await axios.post("https://hire-onboardbackend-production.up.railway.app/api/send-welcome-email", {
          email: newUserObj.email,
          name: newUserObj.name,
          role: newUserObj.role
        });
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
      }

      handleCloseAddSalesPerson();
      showSnackbar("Sales person added successfully", "success");
    } catch (err) {
      console.error("Error creating salesperson:", err);
      showSnackbar(err.message || "Failed to add sales person", "error");
    }
  };

  // Handle adding a new recruiter
  const handleAddRecruiter = () => {
    setOpenAddRecruiter(true);
  };

  const handleCloseAddRecruiter = () => {
    setOpenAddRecruiter(false);
    setNewRecruiter({ name: "", email: "", role: "HR/Recruiter" });
  };

  const handleNewRecruiterChange = (e) => {
    const { name, value } = e.target;
    setNewRecruiter(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveNewRecruiter = async () => {
    try {
      const createdUser = await createEmployee(newRecruiter);
      const newUserObj = {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role
      };

      setAllUsers(prev => Array.isArray(prev) ? [...prev, newUserObj] : [newUserObj]);
      setRecruitingPerson(newUserObj.name);
      handleCloseAddRecruiter();
      showSnackbar("Recruiter added successfully", "success");
    } catch (err) {
      console.error("Error creating recruiter:", err);
      showSnackbar(err.message || "Failed to add recruiter", "error");
    }
  };

  // Snackbar helper functions
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Helper to close add client dialog
  const handleCloseAddClient = () => {
    setOpenAddClient(false);
    setNewClientName("");
  };

  // Get selected locations for Autocomplete
  const getSelectedLocations = () => {
    return Array.isArray(locations) && Array.isArray(selectedLocations)
      ? locations.filter(loc => selectedLocations.includes(loc._id))
      : [];
  };

  return (
    <Paper elevation={4} sx={{ 
      maxWidth: { xs: '100%', md: 1000 }, 
      width: { xs: '95%', md: 900 }, 
      mx: "auto", 
      p: { xs: 2, md: 4 }, 
      borderRadius: 3, 
      marginTop: 2 
    }}>
      <Typography variant="h5" fontWeight={600} gutterBottom align="left">Job Details</Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Business Unit and Client Section */}
      <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Business Unit</InputLabel>
          <Select
            value={BusinessUnit}
            onChange={(e) => setBusinessUnit(e.target.value)}
            label="Business Unit"
            required
          >
            <MenuItem value="internal">Internal</MenuItem>
            <MenuItem value="external">External</MenuItem>
          </Select>
        </FormControl>

        {BusinessUnit === "external" && (
          <FormControl fullWidth>
            <InputLabel>Client</InputLabel>
            <Select
              value={Client}
              onChange={(e) => setClient(e.target.value)}
              label="Client"
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setOpenAddClient(true)}>
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }
            >
              {Array.isArray(clients) && clients.map((client) => (
                <MenuItem key={client._id} value={client._id}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <span>{client.name}</span>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClient(client._id);
                      }}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </MenuItem>
              ))}
              <MenuItem onClick={() => setOpenAddClient(true)} sx={{ justifyContent: "center" }}>
                <Button startIcon={<AddIcon />}>Add New Client</Button>
              </MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Job Type and Locations Section */}
      <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Job Type</InputLabel>
          <Select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            label="Job Type"
            required
          >
            {Array.isArray(jobTypes) && jobTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Autocomplete
            multiple
            options={Array.isArray(locations) ? locations : []}
            value={getSelectedLocations()}
            onChange={(event, newValue) => {
              setSelectedLocations(newValue.map(v => v._id));
            }}
            getOptionLabel={(option) => option.name || ''}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                  key={option._id}
                  sx={{ m: 0.5 }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Locations"
                placeholder="Select locations"
                required
              />
            )}
          />
          <Button
            startIcon={<AddLocationIcon />}
            onClick={() => setOpenAddLocation(true)}
            sx={{ mt: 1 }}
          >
            Add New Location
          </Button>
        </FormControl>
      </Box>

      {/* Employment Details Section */}
      <Typography variant="h6" fontWeight={500} gutterBottom align="left">Employment Details</Typography>
      <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
        <TextField
          label="No. of Openings"
          value={openings}
          onChange={(e) => setOpenings(e.target.value)}
          type="number"
          fullWidth
          required
          inputProps={{ min: 1 }}
        />
        <FormControl fullWidth>
          <DatePicker
            selected={targetHireDate}
            onChange={(date) => setTargetHireDate(date)}
            customInput={
              <TextField
                label="Target Hire Date"
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton><CalendarTodayIcon /></IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            }
          />
        </FormControl>
      </Box>

      {/* Compensation Details Section */}
      <Typography variant="h6" fontWeight={500} gutterBottom align="left">Compensation Details</Typography>
      <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Currency</InputLabel>
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            label="Currency"
            required
            sx={{
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center"
              }
            }}
          >
            {Array.isArray(currencies) && currencies.map(({ code, symbol }) => (
              <MenuItem key={code} value={code}>
                {code} ({symbol})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label={`Amount (${currency || ""})`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          fullWidth
          required
          inputProps={{ min: 0 }}
        />
      </Box>

      {/* Team Details Section */}
      <Typography variant="h6" fontWeight={500} gutterBottom align="left">Team Details</Typography>
      <Box sx={{ display: "flex", flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel shrink={!!SalesPerson} sx={{
            backgroundColor: 'background.paper',
            px: 1,
            transform: 'translate(14px, -9px) scale(0.75)',
            "&.MuiInputLabel-shrink": {
              transform: 'translate(14px, -9px) scale(0.75)'
            }
          }}>
            Sales Person
          </InputLabel>
          <Select
            value={SalesPerson || ''}
            onChange={(e) => setSalesPerson(e.target.value || null)}
            label="Sales Person"
            required={BusinessUnit === "external"}
            displayEmpty
            sx={{
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                paddingTop: "12px",
                paddingBottom: "12px"
              }
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300
                }
              }
            }}
          >
            <MenuItem value="" disabled>
              <em>Select Sales Person</em>
            </MenuItem>
            {Array.isArray(allUsers) && allUsers
              .filter((user) => user.role === "SalesPerson")
              .map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </MenuItem>
              ))}
            <MenuItem onClick={handleAddSalesPerson} sx={{ justifyContent: "center" }}>
              <Button startIcon={<AddIcon />}>Add New Sales Person</Button>
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel shrink={!!recruitingPerson} sx={{
            backgroundColor: 'background.paper',
            px: 1,
            transform: 'translate(14px, -9px) scale(0.75)',
            "&.MuiInputLabel-shrink": {
              transform: 'translate(14px, -9px) scale(0.75)'
            }
          }}>
            Recruiting Member
          </InputLabel>
          <Select
            value={recruitingPerson}
            onChange={(e) => setRecruitingPerson(e.target.value)}
            label="Recruiting Member"
            required
            displayEmpty
            sx={{
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                paddingTop: "12px",
                paddingBottom: "12px"
              }
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300
                }
              }
            }}
          >
            <MenuItem value="" disabled>
              <em>Select Recruiting Member</em>
            </MenuItem>
            {Array.isArray(allUsers) && allUsers
              .filter((user) => user.role === "HR/Recruiter")
              .map((user) => (
                <MenuItem key={user._id} value={user.name}>
                  {user.name}
                </MenuItem>
              ))}
            <MenuItem onClick={handleAddRecruiter} sx={{ justifyContent: "center" }}>
              <Button startIcon={<AddIcon />}>Add New Recruiter</Button>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Additional Options Section */}
      <Typography variant="h6" fontWeight={500} gutterBottom align="left">Additional Options</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3, alignItems: "flex-start" }}>
        <Box sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, gap: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={allowReapply} onChange={(e) => setAllowReapply(e.target.checked)} />}
            label="Allow applicant to apply again after"
          />
          {allowReapply && (
            <TextField
              placeholder="Days"
              type="number"
              value={reapplyDate || ""}
              onChange={(e) => setReapplyDate(e.target.value)}
              sx={{ width: 100 }}
              inputProps={{ min: 1 }}
            />
          )}
        </Box>
        <FormControlLabel
          control={<Checkbox checked={markPriority} onChange={(e) => setMarkPriority(e.target.checked)} />}
          label="Mark this job as priority"
        />
      </Box>

      {/* Form Actions */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button variant="outlined" onClick={() => handleSubmit("back")}>Back</Button>
        <Button
          variant="contained"
          onClick={() => handleSubmit("continue")}
          disabled={
            !jobType ||
            !selectedLocations.length ||
            !openings ||
            !targetHireDate ||
            !BusinessUnit ||
            (BusinessUnit === "external" && (!Client || !SalesPerson))
          }
        >
          Continue
        </Button>
      </Box>

      {/* Add Location Dialog */}
      <Dialog open={openAddLocation} onClose={() => setOpenAddLocation(false)}>
        <DialogTitle>Add New Location</DialogTitle>
        <DialogContent sx={{ p: 3, minWidth: { xs: 'auto', sm: 400 } }}>
          <TextField
            autoFocus
            margin="dense"
            label="Location Name"
            fullWidth
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && newLocation.trim()) {
                handleAddLocation();
              }
            }}
            error={!newLocation.trim()}
            helperText={!newLocation.trim() ? "Location name is required" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddLocation(false)}>Cancel</Button>
          <Button
            onClick={handleAddLocation}
            disabled={!newLocation.trim()}
            variant="contained"
          >
            Add Location
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Sales Person Dialog */}
      <Dialog open={openAddSalesPerson} onClose={handleCloseAddSalesPerson}>
        <DialogTitle>Add New Sales Person</DialogTitle>
        <DialogContent sx={{ p: 3, minWidth: { xs: 'auto', sm: 400 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Name"
              name="name"
              value={newSalesPerson.name}
              onChange={handleNewSalesPersonChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={newSalesPerson.email}
              onChange={handleNewSalesPersonChange}
              fullWidth
              required
            />
            <TextField
              label="Role"
              name="role"
              value={newSalesPerson.role}
              fullWidth
              disabled
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddSalesPerson}>Cancel</Button>
          <Button
            onClick={handleSaveNewSalesPerson}
            variant="contained"
            disabled={!newSalesPerson.name || !newSalesPerson.email}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Recruiter Dialog */}
      <Dialog open={openAddRecruiter} onClose={handleCloseAddRecruiter}>
        <DialogTitle>Add New Recruiter</DialogTitle>
        <DialogContent sx={{ p: 3, minWidth: { xs: 'auto', sm: 400 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Name"
              name="name"
              value={newRecruiter.name}
              onChange={handleNewRecruiterChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={newRecruiter.email}
              onChange={handleNewRecruiterChange}
              fullWidth
              required
            />
            <TextField
              label="Role"
              name="role"
              value={newRecruiter.role}
              fullWidth
              disabled
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddRecruiter}>Cancel</Button>
          <Button
            onClick={handleSaveNewRecruiter}
            variant="contained"
            disabled={!newRecruiter.name || !newRecruiter.email}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Client Dialog */}
      <Dialog open={openAddClient} onClose={handleCloseAddClient}>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent sx={{ p: 3, minWidth: { xs: 'auto', sm: 400 } }}>
          <TextField
            autoFocus
            margin="dense"
            label="Client Name"
            fullWidth
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && newClientName.trim()) {
                handleSaveNewClient();
              }
            }}
            error={!newClientName.trim()}
            helperText={!newClientName.trim() ? "Client name is required" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddClient}>Cancel</Button>
          <Button
            onClick={handleSaveNewClient}
            disabled={!newClientName.trim()}
            variant="contained"
          >
            Add Client
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default JobDetailsForm;