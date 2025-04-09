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
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  AttachMoney as PaymentIcon,
  Build as MaintenanceIcon,
  Message as MessageIcon,
} from '@mui/icons-material';

function ResidentDashboard() {
  // Mock data - replace with actual data from API
  const propertyInfo = {
    name: 'Sunset Apartments',
    unit: '12B',
    address: '123 Sunset Blvd, Los Angeles, CA 90001',
    rent: '$1,500',
    dueDate: '2024-04-01',
    leaseEnd: '2024-12-31',
  };

  const recentActivities = [
    {
      id: 1,
      type: 'Maintenance Request',
      description: 'Leaking faucet in bathroom',
      date: '2024-03-15',
      status: 'In Progress',
    },
    {
      id: 2,
      type: 'Rent Payment',
      description: 'March 2024 Rent',
      date: '2024-03-01',
      status: 'Completed',
    },
    {
      id: 3,
      type: 'Message',
      description: 'Building maintenance schedule update',
      date: '2024-02-28',
      status: 'Read',
    },
  ];

  const quickActions = [
    {
      icon: <PaymentIcon />,
      title: 'Pay Rent',
      action: () => {
        // TODO: Implement rent payment functionality
      },
    },
    {
      icon: <MaintenanceIcon />,
      title: 'Request Maintenance',
      action: () => {
        // TODO: Implement maintenance request functionality
      },
    },
    {
      icon: <MessageIcon />,
      title: 'Contact Manager',
      action: () => {
        // TODO: Implement contact manager functionality
      },
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Resident Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Property Information */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Property Information
            </Typography>
            <Card>
              <CardContent>
                <Typography variant="h6">{propertyInfo.name}</Typography>
                <Typography color="text.secondary" gutterBottom>
                  Unit {propertyInfo.unit}
                </Typography>
                <Typography variant="body2" paragraph>
                  {propertyInfo.address}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Monthly Rent: {propertyInfo.rent}
                  </Typography>
                  <Typography variant="body2">
                    Next Due Date: {propertyInfo.dueDate}
                  </Typography>
                  <Typography variant="body2">
                    Lease Ends: {propertyInfo.leaseEnd}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Button
                    variant="outlined"
                    startIcon={action.icon}
                    onClick={action.action}
                    fullWidth
                    sx={{ height: '100%' }}
                  >
                    {action.title}
                  </Button>
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
                    secondary={`${activity.description} | ${activity.date}`}
                  />
                  <ListItemSecondaryAction>
                    <Chip
                      label={activity.status}
                      color={
                        activity.status === 'Completed'
                          ? 'success'
                          : activity.status === 'In Progress'
                          ? 'warning'
                          : 'default'
                      }
                      size="small"
                    />
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

export default ResidentDashboard; 