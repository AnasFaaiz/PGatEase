// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
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
//   Alert,
// } from '@mui/material';
// import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';

// const validationSchema = yup.object({
//   email: yup
//     .string()
//     .email('Enter a valid email')
//     .required('Email is required'),
//   password: yup
//     .string()
//     .min(8, 'Password should be of minimum 8 characters length')
//     .required('Password is required'),
// });

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [userType, setUserType] = useState<'owner' | 'resident'>('resident');

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: async (values) => {
//       try {
//         dispatch(loginStart());
//         // TODO: Replace with actual API call
//         const response = await fetch('/api/auth/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ ...values, userType }),
//         });

//         if (!response.ok) {
//           throw new Error('Login failed');
//         }

//         const data = await response.json();
//         dispatch(loginSuccess({ token: data.token, userType }));
//         navigate(`/${userType}/dashboard`);
//       } catch (error) {
//         dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
//       }
//     },
//   });

//   return (
//     <Container component="main" maxWidth="xs">
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
//           Sign in to PGatEase
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

//         <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             fullWidth
//             id="email"
//             name="email"
//             label="Email Address"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             error={formik.touched.email && Boolean(formik.errors.email)}
//             helperText={formik.touched.email && formik.errors.email}
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             id="password"
//             name="password"
//             label="Password"
//             type="password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             error={formik.touched.password && Boolean(formik.errors.password)}
//             helperText={formik.touched.password && formik.errors.password}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Sign In
//           </Button>
//           <Button
//             fullWidth
//             variant="text"
//             onClick={() => navigate('/register')}
//           >
//             Don't have an account? Sign Up
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default Login; 