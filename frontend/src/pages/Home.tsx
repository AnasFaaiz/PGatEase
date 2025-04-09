// import React from 'react';
// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   Typography,
//   Card,
//   CardContent,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import PaymentIcon from '@mui/icons-material/Payment';
// import RestaurantIcon from '@mui/icons-material/Restaurant';
// import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

// const features = [
//   {
//     title: 'Easy PG Management',
//     description: 'Streamline your PG operations with our comprehensive management tools.',
//     icon: <ApartmentIcon sx={{ fontSize: 40 }} />,
//   },
//   {
//     title: 'Seamless Payments',
//     description: 'Handle rent payments and additional services with our integrated payment system.',
//     icon: <PaymentIcon sx={{ fontSize: 40 }} />,
//   },
//   {
//     title: 'Menu Customization',
//     description: 'Customize your daily and weekly menu preferences with ease.',
//     icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
//   },
//   {
//     title: 'Laundry Service',
//     description: 'Schedule and track your laundry service directly through the platform.',
//     icon: <LocalLaundryServiceIcon sx={{ fontSize: 40 }} />,
//   },
// ];

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <Box>
//       {/* Hero Section */}
//       <Box
//         sx={{
//           bgcolor: 'primary.main',
//           color: 'white',
//           py: 8,
//           mb: 6,
//         }}
//       >
//         <Container maxWidth="lg">
//           <Grid container spacing={4} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <Typography
//                 component="h1"
//                 variant="h2"
//                 sx={{
//                   fontWeight: 'bold',
//                   mb: 2,
//                 }}
//               >
//                 Welcome to PGatEase
//               </Typography>
//               <Typography variant="h5" sx={{ mb: 4 }}>
//                 The smart way to manage and experience PG living
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 size="large"
//                 onClick={() => navigate('/register')}
//                 sx={{ mr: 2 }}
//               >
//                 Get Started
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="inherit"
//                 size="large"
//                 onClick={() => navigate('/login')}
//               >
//                 Sign In
//               </Button>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Box
//                 component="img"
//                 src="/hero-image.png"
//                 alt="PG Living"
//                 sx={{
//                   width: '100%',
//                   maxWidth: 500,
//                   height: 'auto',
//                   display: 'block',
//                   margin: 'auto',
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Features Section */}
//       <Container maxWidth="lg" sx={{ py: 6 }}>
//         <Typography
//           component="h2"
//           variant="h3"
//           align="center"
//           sx={{ mb: 6 }}
//         >
//           Features that make us special
//         </Typography>
//         <Grid container spacing={4}>
//           {features.map((feature, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card
//                 sx={{
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   textAlign: 'center',
//                   p: 3,
//                 }}
//               >
//                 <Box sx={{ color: 'primary.main', mb: 2 }}>
//                   {feature.icon}
//                 </Box>
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="h3">
//                     {feature.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {feature.description}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Home; 