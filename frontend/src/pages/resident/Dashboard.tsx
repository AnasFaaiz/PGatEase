// import React from 'react';
// import {
//   Box,
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   CardActions,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   Chip,
//   Divider,
// } from '@mui/material';
// import RestaurantIcon from '@mui/icons-material/Restaurant';
// import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
// import PaymentIcon from '@mui/icons-material/Payment';
// import ReportProblemIcon from '@mui/icons-material/ReportProblem';

// const mockData = {
//   room: '101',
//   rent: 8000,
//   dueDate: '2024-04-15',
//   menu: {
//     breakfast: 'Poha, Tea, Fruits',
//     lunch: 'Rice, Dal, Vegetables',
//     dinner: 'Roti, Curry, Salad',
//   },
//   laundryStatus: [
//     { id: 1, date: '2024-03-28', status: 'ready', items: 5 },
//     { id: 2, date: '2024-03-25', status: 'completed', items: 3 },
//   ],
//   complaints: [
//     { id: 1, issue: 'AC not working', status: 'pending', date: '2024-03-27' },
//     { id: 2, issue: 'Water leakage', status: 'resolved', date: '2024-03-20' },
//   ],
// };

// const ResidentDashboard: React.FC = () => {
//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Grid container spacing={3}>
//         {/* Room and Payment Info */}
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
//               Room Information
//             </Typography>
//             <Typography component="p" variant="h4">
//               Room {mockData.room}
//             </Typography>
//             <Typography color="text.secondary" sx={{ flex: 1 }}>
//               Next Payment: ₹{mockData.rent} (Due: {mockData.dueDate})
//             </Typography>
//             <Button
//               startIcon={<PaymentIcon />}
//               variant="contained"
//               color="primary"
//               sx={{ alignSelf: 'flex-start' }}
//             >
//               Pay Rent
//             </Button>
//           </Paper>
//         </Grid>

//         {/* Today's Menu */}
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//               <Typography component="h2" variant="h6" color="primary">
//                 Today's Menu
//               </Typography>
//               <Button
//                 startIcon={<RestaurantIcon />}
//                 color="primary"
//               >
//                 Customize Menu
//               </Button>
//             </Box>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={4}>
//                 <Card>
//                   <CardContent>
//                     <Typography color="text.secondary" gutterBottom>
//                       Breakfast
//                     </Typography>
//                     <Typography variant="body1">
//                       {mockData.menu.breakfast}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Card>
//                   <CardContent>
//                     <Typography color="text.secondary" gutterBottom>
//                       Lunch
//                     </Typography>
//                     <Typography variant="body1">
//                       {mockData.menu.lunch}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Card>
//                   <CardContent>
//                     <Typography color="text.secondary" gutterBottom>
//                       Dinner
//                     </Typography>
//                     <Typography variant="body1">
//                       {mockData.menu.dinner}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>

//         {/* Laundry Status */}
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//               <Typography component="h2" variant="h6" color="primary">
//                 Laundry Status
//               </Typography>
//               <Button
//                 startIcon={<LocalLaundryServiceIcon />}
//                 color="primary"
//               >
//                 Schedule Pickup
//               </Button>
//             </Box>
//             <List>
//               {mockData.laundryStatus.map((item) => (
//                 <React.Fragment key={item.id}>
//                   <ListItem>
//                     <ListItemText
//                       primary={`${item.items} items`}
//                       secondary={`Date: ${item.date}`}
//                     />
//                     <ListItemSecondaryAction>
//                       <Chip
//                         label={item.status}
//                         color={item.status === 'ready' ? 'success' : 'default'}
//                         size="small"
//                       />
//                     </ListItemSecondaryAction>
//                   </ListItem>
//                   <Divider />
//                 </React.Fragment>
//               ))}
//             </List>
//           </Paper>
//         </Grid>

//         {/* Complaints */}
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//               <Typography component="h2" variant="h6" color="primary">
//                 My Complaints
//               </Typography>
//               <Button
//                 startIcon={<ReportProblemIcon />}
//                 color="primary"
//               >
//                 Raise Complaint
//               </Button>
//             </Box>
//             <List>
//               {mockData.complaints.map((complaint) => (
//                 <React.Fragment key={complaint.id}>
//                   <ListItem>
//                     <ListItemText
//                       primary={complaint.issue}
//                       secondary={`Date: ${complaint.date}`}
//                     />
//                     <ListItemSecondaryAction>
//                       <Chip
//                         label={complaint.status}
//                         color={complaint.status === 'pending' ? 'warning' : 'success'}
//                         size="small"
//                       />
//                     </ListItemSecondaryAction>
//                   </ListItem>
//                   <Divider />
//                 </React.Fragment>
//               ))}
//             </List>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ResidentDashboard; 