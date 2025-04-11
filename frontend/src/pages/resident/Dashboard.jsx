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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  AttachMoney as PaymentIcon,
  Build as MaintenanceIcon,
  Message as MessageIcon,
  LocalLaundryService as LaundryIcon,
  RestaurantMenu as MealPlanIcon,
} from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import MealPlan from './MealPlan';
import LaundryService from './Laundry';



function ResidentDashboard() {
  const [reassignDialogOpen, setReassignDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [reassignReason, setReassignReason] = useState('');
  const [newStaffMember, setNewStaffMember] = useState('');

  // Mock data - replace with actual data from API
  const propertyInfo = {
    name: 'Sunset Apartments',
    unit: '12B',
    address: '123 Sunset Blvd, Los Angeles, CA 90001',
    rent: '$1,500',
    dueDate: '2024-04-01',
    leaseEnd: '2024-12-31',
  };

  const availableStaff = [
    { id: 1, name: 'John Smith', specialization: 'Plumbing' },
    { id: 2, name: 'Mike Johnson', specialization: 'HVAC' },
    { id: 3, name: 'Sarah Williams', specialization: 'Electrical' },
    { id: 4, name: 'David Brown', specialization: 'General Maintenance' },
  ];

  const handleReassignRequest = (request) => {
    setSelectedRequest(request);
    setReassignDialogOpen(true);
  };

  const handleReassignSubmit = () => {
    // TODO: Implement API call to submit reassignment request
    console.log('Reassignment requested for:', {
      requestId: selectedRequest?.id,
      currentStaff: selectedRequest?.assignedTo,
      newStaff: newStaffMember,
      reason: reassignReason
    });
    setReassignDialogOpen(false);
    setReassignReason('');
    setNewStaffMember('');
    setSelectedRequest(null);
  };

  const maintenanceRequests = [
    {
      id: 1,
      issue: 'Leaking faucet in bathroom',
      requestDate: '2024-03-15',
      status: 'In Progress',
      assignedTo: 'John Smith',
      lastUpdate: '2024-03-16',
      priority: 'Medium',
      notes: 'Plumber scheduled for tomorrow',
    },
    {
      id: 2,
      issue: 'AC not cooling',
      requestDate: '2024-03-10',
      status: 'Completed',
      assignedTo: 'Mike Johnson',
      lastUpdate: '2024-03-12',
      priority: 'High',
      notes: 'Replaced AC filter and serviced unit',
    },
  ];

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
    {
      icon: <LaundryIcon />,
      title: 'Laundry Service',
      action: () => {
        // Scroll to laundry section
        document.querySelector('#laundry-section')?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      icon: <MealPlanIcon />,
      title: 'Meal Plan',
      action: () => {
        // Scroll to meal plan section
        document.querySelector('#meal-plan-section')?.scrollIntoView({ behavior: 'smooth' });
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
                <Grid item xs={6} sm={4} key={index}>
                  <Button
                    variant="outlined"
                    startIcon={action.icon}
                    onClick={action.action}
                    fullWidth
                    sx={{ 
                      height: '100%',
                      minHeight: '48px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {action.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

          <Grid item xs={12}>
            <Grid container spacing={3}>        
            {/* Recent Activities */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
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
            {/* Laundry Services */}
            <Grid item xs={12} md={6} id="laundry-section">
              <LaundryService />
            </Grid>
          </Grid>
        </Grid>

        
        {/* Maintenance Tracking */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Maintenance Tracking
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              {maintenanceRequests.map((request) => (
                <Card key={request.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" gutterBottom>
                          {request.issue}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Requested: {request.requestDate}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Assigned to: {request.assignedTo}
                          {request.status !== 'Completed' && (
                            <Button
                              size="small"
                              color="secondary"
                              sx={{ ml: 1 }}
                              onClick={() => handleReassignRequest(request)}
                            >
                              Request Reassignment
                            </Button>
                          )}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip
                            label={request.status}
                            color={
                              request.status === 'Completed'
                                ? 'success'
                                : request.status === 'In Progress'
                                ? 'warning'
                                : 'default'
                            }
                          />
                          <Chip
                            label={`Priority: ${request.priority}`}
                            color={
                              request.priority === 'High'
                                ? 'error'
                                : request.priority === 'Medium'
                                ? 'warning'
                                : 'info'
                            }
                            sx={{ ml: 1 }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ mt: 2 }}
                        >
                          Last Update: {request.lastUpdate}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          {request.notes}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Reassignment Dialog */}
        <Dialog
          open={reassignDialogOpen}
          onClose={() => setReassignDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Request Maintenance Staff Reassignment</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Current Assignment: {selectedRequest?.assignedTo}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Issue: {selectedRequest?.issue}
              </Typography>
              <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                <InputLabel id="new-staff-label">Preferred Staff Member</InputLabel>
                <Select
                  labelId="new-staff-label"
                  value={newStaffMember}
                  onChange={(e) => setNewStaffMember(e.target.value)}
                  label="Preferred Staff Member"
                >
                  {availableStaff
                    .filter(staff => staff.name !== selectedRequest?.assignedTo)
                    .map((staff) => (
                      <MenuItem key={staff.id} value={staff.name}>
                        {staff.name} - {staff.specialization}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <TextField
                autoFocus
                margin="dense"
                label="Reason for Reassignment"
                fullWidth
                multiline
                rows={4}
                value={reassignReason}
                onChange={(e) => setReassignReason(e.target.value)}
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setReassignDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleReassignSubmit}
              variant="contained"
              color="primary"
              disabled={!reassignReason || !newStaffMember}
            >
              Submit Request
            </Button>
          </DialogActions>
        </Dialog>

        {/* Customized Meal plan */}
        <Grid item xs={12} id="meal-plan-section">
          <MealPlan />
        </Grid>

      </Grid>
    </Container>
  );
}

export default ResidentDashboard; 