import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import PropTypes from 'prop-types';

function ListProperties({ open, onClose, properties }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <HomeIcon color="primary" />
          <Typography variant="h6">Properties Overview</Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <List>
          {properties.map((property, index) => (
            <React.Fragment key={property.id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" component="h3">
                      {property.name}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {property.address}
                      </Typography>
                      <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                        <Typography variant="body2">
                          Units: {property.units}
                        </Typography>
                        <Chip
                          label={property.occupancyRate}
                          size="small"
                          color={
                            parseInt(property.occupancyRate) > 90
                              ? 'success'
                              : parseInt(property.occupancyRate) > 70
                              ? 'warning'
                              : 'error'
                          }
                        />
                        <Typography variant="body2">
                          Revenue: {property.monthlyRevenue}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {
                      // TODO: Implement view details
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => {
                      // TODO: Implement edit
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < properties.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

ListProperties.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      units: PropTypes.number.isRequired,
      occupancyRate: PropTypes.string.isRequired,
      monthlyRevenue: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ListProperties;