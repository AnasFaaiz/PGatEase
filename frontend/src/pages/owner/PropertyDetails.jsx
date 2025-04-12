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
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

function PropertyDetails() {
  const { id } = useParams();

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
    description: 'A modern PG accommodation with all facilities...'
  };

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
        </Grid>
      </Paper>
    </Container>
  );
}

export default PropertyDetails;