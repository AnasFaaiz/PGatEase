import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@mui/material';
import { LocalLaundryService, Schedule } from '@mui/icons-material';

const LAUNDRY_SLOTS = {
  morning: ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'],
  afternoon: ['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'],
  evening: ['04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'],
};

const SERVICES = [
  { id: 'wash', name: 'Wash & Fold', price: '$15/load' },
  { id: 'dry', name: 'Dry Cleaning', price: '$25/item' },
  { id: 'iron', name: 'Ironing', price: '$5/item' },
  { id: 'express', name: 'Express Service', price: '+$10' },
];

function LaundryService() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  return (
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 2, height: '100%', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalLaundryService sx={{ mr: 1 }} color="primary" />
            <Typography variant="h6">Laundry Services</Typography>
            </Box>
            <Button
            variant="contained"
            startIcon={<Schedule />}
            onClick={() => setDialogOpen(true)}
            >
            Schedule Service
            </Button>
        </Box>
        <Card variant="outlined" sx={{ width: '100%' }}>
          <CardContent>
            <Grid container spacing={2}>
              {SERVICES.map((service) => (
                <Grid item xs={12} sm={6} key={service.id}>
                  <Box sx={{ 
                    p: 2, 
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    '&:hover': {
                      boxShadow: 1,
                      borderColor: 'primary.main',
                    }
                  }}>
                    <Typography variant="subtitle1">{service.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.price}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Paper>

      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Schedule Laundry Service</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Available Time Slots
            </Typography>
            {Object.entries(LAUNDRY_SLOTS).map(([period, slots]) => (
              <Box key={period} sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, textTransform: 'capitalize' }}>
                  {period}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {slots.map((slot) => (
                    <Chip
                      key={slot}
                      label={slot}
                      clickable
                      color={selectedSlot === slot ? 'primary' : 'default'}
                      onClick={() => setSelectedSlot(slot)}
                    />
                  ))}
                </Box>
              </Box>
            ))}
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Select Services
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {SERVICES.map((service) => (
                <Chip
                  key={service.id}
                  label={`${service.name} (${service.price})`}
                  clickable
                  color={selectedServices.includes(service.id) ? 'primary' : 'default'}
                  onClick={() => {
                    setSelectedServices(prev => 
                      prev.includes(service.id)
                        ? prev.filter(id => id !== service.id)
                        : [...prev, service.id]
                    );
                  }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!selectedSlot || selectedServices.length === 0}
            onClick={() => {
              console.log('Scheduled:', { slot: selectedSlot, services: selectedServices });
              setDialogOpen(false);
            }}
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default LaundryService;