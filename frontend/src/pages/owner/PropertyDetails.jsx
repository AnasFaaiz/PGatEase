import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  ImageList,
  ImageListItem,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Home as HomeIcon,
    Person as PersonIcon,
    ArrowBack as ArrowBackIcon,
 } from '@mui/icons-material';
 import PropTypes from 'prop-types';

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  

  // Mock data - replace with actual data fetching
  const property = {
    id: 1,
    name: 'Sunset Apartments',
    address: '123 Sunset Blvd, Los Angeles, CA 90001',
    units: 24,
    occupancyRate: '92%',
    monthlyRevenue: '$45,000',
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    amenities: ['Parking', 'Security', 'Power Backup'],
    description: 'A modern PG accommodation with all facilities...',
    residents: [
        {
          id: 1,
          name: 'John Doe',
          unit: '101',
          contact: '+1 234-567-8900',
          joinDate: '2024-01-15',
          status: 'Active',
          rentDue: '$800',
        },
        {
          id: 2,
          name: 'Jane Smith',
          unit: '102',
          contact: '+1 234-567-8901',
          joinDate: '2024-02-01',
          status: 'Active',
          rentDue: '$750',
        },
      ],
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error">{error}</Typography>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mt: 2 }}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    );
  }

  // Check if property exists
  if (!property) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Loading...</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>        
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <HomeIcon color="primary" />
          <Typography variant="h4">{property.name}</Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Details</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography>
                <strong>Location:</strong> {property.address}
              </Typography>
              <Typography>
                <strong>Total Units:</strong> {property.units}
              </Typography>
              <Typography>
                <strong>Occupancy:</strong> {property.occupancyRate}
              </Typography>
              <Typography>
                <strong>Monthly Revenue:</strong> {property.monthlyRevenue}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Amenities</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {property.amenities.map((amenity) => (
                <Chip key={amenity} label={amenity} />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Description</Typography>
            <Typography>{property.description}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Images</Typography>
            <ImageList cols={3} gap={8}>
              {property.images.map((image, index) => (
                <ImageListItem key={index}>
                  <img src={image} alt={`Property view ${index + 1}`} />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <PersonIcon color="primary" />
              <Typography variant="h6">Residents</Typography>
            </Box>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Join Date</TableCell>
                    <TableCell>Rent Due</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {property.residents.map((resident) => (
                    <TableRow key={resident.id}>
                      <TableCell>{resident.name}</TableCell>
                      <TableCell>{resident.unit}</TableCell>
                      <TableCell>{resident.contact}</TableCell>
                      <TableCell>{resident.joinDate}</TableCell>
                      <TableCell>{resident.rentDue}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={resident.status}
                          color={resident.status === 'Active' ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          onClick={() => {
                            // TODO: Implement view resident details
                          }}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
            
        </Grid>
      </Paper>
    </Container>
  );
}
PropertyDetails.propTypes = {
    property: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      units: PropTypes.number.isRequired,
      occupancyRate: PropTypes.string.isRequired,
      monthlyRevenue: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
      description: PropTypes.string.isRequired,
      residents: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          unit: PropTypes.string.isRequired,
          contact: PropTypes.string.isRequired,
          joinDate: PropTypes.string.isRequired,
          status: PropTypes.string.isRequired,
          rentDue: PropTypes.string.isRequired,
        })
      ).isRequired,
    }),
  };
export default PropertyDetails;