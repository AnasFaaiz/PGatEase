// import { ReactNode } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//   AppBar,
//   Box,
//   Container,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { RootState } from '../../store';

// interface LayoutProps {
//   children: ReactNode;
// }

// const Layout = ({ children }: LayoutProps) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const navigate = useNavigate();
//   const { isAuthenticated, userType } = useSelector((state: RootState) => state.auth);

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <AppBar position="static">
//         <Toolbar>
//           {isMobile && (
//             <IconButton
//               size="large"
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               sx={{ mr: 2 }}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}
          
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, cursor: 'pointer' }}
//             onClick={() => navigate('/')}
//           >
//             PGatEase
//           </Typography>

//           {!isAuthenticated ? (
//             <Box>
//               <Button color="inherit" onClick={() => navigate('/login')}>
//                 Login
//               </Button>
//               <Button color="inherit" onClick={() => navigate('/register')}>
//                 Register
//               </Button>
//             </Box>
//           ) : (
//             <Box>
//               <Button 
//                 color="inherit" 
//                 onClick={() => navigate(`/${userType}/dashboard`)}
//               >
//                 Dashboard
//               </Button>
//               <Button color="inherit">Logout</Button>
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Container 
//         component="main" 
//         sx={{ 
//           flexGrow: 1, 
//           py: 4,
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         {children}
//       </Container>

//       <Box
//         component="footer"
//         sx={{
//           py: 3,
//           px: 2,
//           mt: 'auto',
//           backgroundColor: (theme) => theme.palette.grey[200],
//         }}
//       >
//         <Container maxWidth="sm">
//           <Typography variant="body2" color="text.secondary" align="center">
//             © {new Date().getFullYear()} PGatEase. All rights reserved.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Layout; 