// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import {
//   Box,
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   ToggleButton,
//   ToggleButtonGroup,
//   Grid,
// } from '@mui/material';

// const validationSchema = yup.object({
//   name: yup
//     .string()
//     .required('Name is required'),
//   email: yup
//     .string()
//     .email('Enter a valid email')
//     .required('Email is required'),
//   phone: yup
//     .string()
//     .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
//     .required('Phone number is required'),
//   password: yup
//     .string()
//     .min(8, 'Password should be of minimum 8 characters length')
//     .required('Password is required'),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref('password')], 'Passwords must match')
//     .required('Confirm password is required'),
// });

// const Register = () => {
//   const navigate = useNavigate();
//   const [userType, setUserType] = useState<'owner' | 'resident'>('resident');

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       email: '',
//       phone: '',
//       password: '',
//       confirmPassword: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       try {
//         // TODO: Replace with actual API call
//         const response = await fetch('/api/auth/register', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             name: values.name,
//             email: values.email,
//             phone: values.phone,
//             password: values.password,
//             userType,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error('Registration failed');
//         }

//         // Registration successful, redirect to login
//         navigate('/login');
//       } catch (error) {
//         console.error('Registration error:', error);
//         // TODO: Handle error state
//       }
//     },
//   });

//   return (
//     <Container component="main" maxWidth="sm">
//       <Paper
//         elevation={3}
//         sx={{
//           p: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           mt: 8,
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           Create your PGatEase Account
//         </Typography>

//         <ToggleButtonGroup
//           color="primary"
//           value={userType}
//           exclusive
//           onChange={(_, newValue) => {
//             if (newValue !== null) {
//               setUserType(newValue);
//             }
//           }}
//           sx={{ my: 3 }}
//         >
//           <ToggleButton value="resident">Resident</ToggleButton>
//           <ToggleButton value="owner">Owner</ToggleButton>
//         </ToggleButtonGroup>

//         <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1, width: '100%' }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 id="name"
//                 name="name"
//                 label="Full Name"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 error={formik.touched.name && Boolean(formik.errors.name)}
//                 helperText={formik.touched.name && formik.errors.name}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 id="email"
//                 name="email"
//                 label="Email Address"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 error={formik.touched.email && Boolean(formik.errors.email)}
//                 helperText={formik.touched.email && formik.errors.email}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 id="phone"
//                 name="phone"
//                 label="Phone Number"
//                 value={formik.values.phone}
//                 onChange={formik.handleChange}
//                 error={formik.touched.phone && Boolean(formik.errors.phone)}
//                 helperText={formik.touched.phone && formik.errors.phone}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 id="password"
//                 name="password"
//                 label="Password"
//                 type="password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 error={formik.touched.password && Boolean(formik.errors.password)}
//                 helperText={formik.touched.password && formik.errors.password}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 label="Confirm Password"
//                 type="password"
//                 value={formik.values.confirmPassword}
//                 onChange={formik.handleChange}
//                 error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
//                 helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Sign Up
//           </Button>
//           <Button
//             fullWidth
//             variant="text"
//             onClick={() => navigate('/login')}
//           >
//             Already have an account? Sign In
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default Register; 