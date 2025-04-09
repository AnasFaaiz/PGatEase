// import React from 'react';
// import {
//   Box,
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   IconButton,
//   Button,
//   Chip,
//   Divider,
// } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PaymentIcon from '@mui/icons-material/Payment';
// import WarningIcon from '@mui/icons-material/Warning';

// const mockComplaints = [
//   { id: 1, resident: 'John Doe', room: '101', issue: 'AC not working', status: 'pending' },
//   { id: 2, resident: 'Jane Smith', room: '202', issue: 'Water leakage', status: 'resolved' },
// ];

// const mockResidents = [
//   { id: 1, name: 'John Doe', room: '101', dueAmount: 5000 },
//   { id: 2, name: 'Jane Smith', room: '202', dueAmount: 0 },
//   { id: 3, name: 'Mike Johnson', room: '303', dueAmount: 2500 },
// ];

// const OwnerDashboard: React.FC = () => {
//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Grid container spacing={3}>
//         {/* Summary Cards */}
//         <Grid item xs={12} md={4}>
//           <Paper
//             sx={{
//               p: 2,
//               display: 'flex',
//               flexDirection: 'column',
//               height: 140,
//             }}
//           >
//             <Typography component="h2" variant="h6" color="primary" gutterBottom>
//               Total Residents
//             </Typography>
//             <Typography component="p" variant="h3">
//               {mockResidents.length}
//             </Typography>
//             <Button
//               startIcon={<PersonAddIcon />}
//               sx={{ mt: 'auto', alignSelf: 'flex-start' }}
//             >
//               Add Resident
//             </Button>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper
//             sx={{
//               p: 2,
//               display: 'flex',
//               flexDirection: 'column',
//               height: 140,
//             }}
//           >
//             <Typography component="h2" variant="h6" color="primary" gutterBottom>
//               Pending Complaints
//             </Typography>
//             <Typography component="p" variant="h3">
//               {mockComplaints.filter(c => c.status === 'pending').length}
//             </Typography>
//             <Typography color="text.secondary" sx={{ flex: 1 }}>
//               Requires attention
//             </Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper
//             sx={{
//               p: 2,
//               display: 'flex',
//               flexDirection: 'column',
//               height: 140,
//             }}
//           >
//             <Typography component="h2" variant="h6" color="primary" gutterBottom>
//               Total Due Amount
//             </Typography>
//             <Typography component="p" variant="h3">
//               ₹{mockResidents.reduce((sum, resident) => sum + resident.dueAmount, 0)}
//             </Typography>
//             <Button
//               startIcon={<PaymentIcon />}
//               sx={{ mt: 'auto', alignSelf: 'flex-start' }}
//             >
//               View Details
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Complaints List */}
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2 }}>
//             <Typography component="h2" variant="h6" color="primary" gutterBottom>
//               Recent Complaints
//             </Typography>
//             <List>
//               {mockComplaints.map((complaint) => (
//                 <React.Fragment key={complaint.id}>
//                   <ListItem>
//                     <ListItemText
//                       primary={complaint.issue}
//                       secondary={`${complaint.resident} - Room ${complaint.room}`}
//                     />
//                     <ListItemSecondaryAction>
//                       <Chip
//                         label={complaint.status}
//                         color={complaint.status === 'pending' ? 'warning' : 'success'}
//                         size="small"
//                       />
//                       <IconButton edge="end" aria-label="resolve">
//                         {complaint.status === 'pending' ? (
//                           <WarningIcon color="warning" />
//                         ) : (
//                           <CheckCircleIcon color="success" />
//                         )}
//                       </IconButton>
//                     </ListItemSecondaryAction>
//                   </ListItem>
//                   <Divider />
//                 </React.Fragment>
//               ))}
//             </List>
//             <Button
//               color="primary"
//               sx={{ mt: 2 }}
//             >
//               View All Complaints
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Residents List */}
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2 }}>
//             <Typography component="h2" variant="h6" color="primary" gutterBottom>
//               Residents
//             </Typography>
//             <List>
//               {mockResidents.map((resident) => (
//                 <React.Fragment key={resident.id}>
//                   <ListItem>
//                     <ListItemText
//                       primary={resident.name}
//                       secondary={`Room ${resident.room}`}
//                     />
//                     <ListItemSecondaryAction>
//                       <Typography
//                         component="span"
//                         variant="body2"
//                         color={resident.dueAmount > 0 ? 'error' : 'success'}
//                         sx={{ mr: 2 }}
//                       >
//                         {resident.dueAmount > 0
//                           ? `Due: ₹${resident.dueAmount}`
//                           : 'Paid'}
//                       </Typography>
//                       <IconButton edge="end" aria-label="details">
//                         {resident.dueAmount > 0 ? (
//                           <PaymentIcon color="error" />
//                         ) : (
//                           <CheckCircleIcon color="success" />
//                         )}
//                       </IconButton>
//                     </ListItemSecondaryAction>
//                   </ListItem>
//                   <Divider />
//                 </React.Fragment>
//               ))}
//             </List>
//             <Button
//               color="primary"
//               sx={{ mt: 2 }}
//             >
//               Manage Residents
//             </Button>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default OwnerDashboard; 