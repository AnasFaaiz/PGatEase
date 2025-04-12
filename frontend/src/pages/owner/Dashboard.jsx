import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Link,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

function OwnerDashboard() {
  // Mock data - replace with actual data from API
  const properties = [
    {
      id: 1,
      name: 'Sunset Apartments',
      address: '123 Sunset Blvd, Los Angeles, CA 90001',
      units: 24,
      occupancyRate: '92%',
      monthlyRevenue: '$45,000',
    },
    {
      id: 2,
      name: 'Ocean View Complex',
      address: '456 Beach Road, Miami, FL 33101',
      units: 36,
      occupancyRate: '88%',
      monthlyRevenue: '$62,000',
    },
    {
      id: 3,
      name: 'KLH Hostel',
      address: 'Aziz Nagar X Roads, Moinabad road, Hyderabad, Telangana 500075',
      units: 50,
      occupancyRate: '80%',
      monthlyRevenue: '$25,000',
    },
    {
      id: 4,
      name: 'Orange County Apartments',
      address: 'mehdipatnam, Hyderabad, Telangana 500028',
      units: 30,
      occupancyRate: '100%',
      monthlyRevenue: '$35,000',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'Maintenance Request',
      property: 'Sunset Apartments',
      unit: '12B',
      date: '2024-03-15',
      status: 'Pending',
    },
    {
      id: 2,
      type: 'Rent Payment',
      property: 'Ocean View Complex',
      unit: '5A',
      date: '2024-03-14',
      status: 'Completed',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Owner Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            // TODO: Implement add property functionality
          }}
        >
          Add Property
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Properties Overview */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
          <Box sx = {{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HomeIcon color="primary" />
              <Typography variant="h6" gutterBottom>
                Properties Overview
              </Typography>
            </Box>
            <Button
              size="small"
              startIcon={<VisibilityIcon />}
              onClick={() => {
              // TODO: Implement view details functionality
              }}
            >
              List Properties
            </Button>
          </Box>
            <Grid container spacing={3}>
              {properties.map((property) => (
                <Grid item xs={12} md={6} key={property.id}>
                  <Card>
                    <CardContent>
                      <Link variant="h6" component="button" 
                       sx={{textDecoration: 'none',
                        color: 'text.primary',
                        border: 'none',
                        background: 'none',
                        font: 'inherit',
                        padding: 0,
                        '&:hover': {
                          color: 'primary.main',
                          transition: 'color 0.3s ease-in-out',
                        },
                       }} 
                      
                      >
                        {property.name}
                      </Link>
                      <Typography color="text.secondary" gutterBottom>
                        {property.address}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">
                          Units: {property.units}
                        </Typography>
                        <Typography variant="body2">
                          Occupancy Rate: {property.occupancyRate}
                        </Typography>
                        <Typography variant="body2">
                          Monthly Revenue: {property.monthlyRevenue}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => {
                          // TODO: Implement view details functionality
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => {
                          // TODO: Implement edit functionality
                        }}
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity) => (
                <ListItem key={activity.id}>
                  <ListItemText
                    primary={activity.type}
                    secondary={`${activity.property} - Unit ${activity.unit} | ${activity.date}`}
                  />
                  <ListItemSecondaryAction>
                    <Typography
                      variant="body2"
                      color={
                        activity.status === 'Completed' ? 'success.main' : 'warning.main'
                      }
                    >
                      {activity.status}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OwnerDashboard; 