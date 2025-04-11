import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
    Restaurant as RestaurantIcon,
    Info as InfoIcon,
    NotificationsActive as NotificationsIcon,
  } from '@mui/icons-material';

const MEAL_PLANS = {
    standard: {
        name: 'Standard Plan',
        price: '$150/week',
        description: 'Balanced nutrition with variety',
        calories: '2000-2500/day',
        icon: '🍽️',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        features: ['Fresh Ingredients', 'Chef Prepared', 'Balanced Nutrition'],
        currentMenu: [
            { day: 'Monday', breakfast: 'Oatmeal & Fruits', lunch: 'Grilled Chicken Salad', dinner: 'Pasta Primavera' },
            { day: 'Tuesday', breakfast: 'Eggs Benedict', lunch: 'Vegetable Wrap', dinner: 'Grilled Salmon' },
            { day: 'Wednesday', breakfast: 'Pancakes', lunch: 'Caesar Salad', dinner: 'Beef Stir Fry' },
            { day: 'Thursday', breakfast: 'Yogurt Parfait', lunch: 'Turkey Sandwich', dinner: 'Chicken Curry' },
            { day: 'Friday', breakfast: 'French Toast', lunch: 'Tuna Salad', dinner: 'Fish Tacos' },
        ],
  },
  vegetarian: {
    name: 'Vegetarian Plan',
    price: '$130/week',
    description: 'Plant-based wholesome meals',
    calories: '1800-2200/day',
    icon: '🥗',
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    features: ['100% Vegetarian', 'Organic Produce', 'High Protein'],
    currentMenu: [
      { day: 'Monday', breakfast: 'Fruit Smoothie Bowl', lunch: 'Quinoa Buddha Bowl', dinner: 'Vegetable Curry' },
      { day: 'Tuesday', breakfast: 'Avocado Toast', lunch: 'Mediterranean Salad', dinner: 'Mushroom Risotto' },
      { day: 'Wednesday', breakfast: 'Chia Pudding', lunch: 'Veggie Wrap', dinner: 'Eggplant Parmesan' },
      { day: 'Thursday', breakfast: 'Overnight Oats', lunch: 'Falafel Plate', dinner: 'Stir-Fried Tofu' },
      { day: 'Friday', breakfast: 'Granola Bowl', lunch: 'Hummus Platter', dinner: 'Vegetable Lasagna' },
    ],
  },
  premium: {
    name: 'Premium Plan',
    price: '$200/week',
    description: 'Gourmet dining experience',
    calories: '2200-2700/day',
    icon: '👨‍🍳',
    features: ['Premium Ingredients', 'Gourmet Menu', 'Special Requests'],
    meals: ['Breakfast', 'Lunch', 'Dinner'],
    currentMenu: [
      { day: 'Monday', breakfast: 'Eggs Florentine', lunch: 'Grilled Salmon Nicoise', dinner: 'Filet Mignon' },
      { day: 'Tuesday', breakfast: 'Belgian Waffles', lunch: 'Lobster Roll', dinner: 'Duck Confit' },
      // ...add more days
    ],
  },
};

const DIETARY_PREFERENCES = ['No Nuts', 'No Dairy', 'No Gluten', 'Low Spice', 'Vegan', 'Halal'];

function MealPlan() {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [mealPreferences, setMealPreferences] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSavePreferences = async () => {
    setLoading(true);
        try {
        // TODO: Implement API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Saving preferences:', {
            plan: selectedPlan,
            preferences: mealPreferences
        });
        setDialogOpen(false);
        } catch (error) {
        console.error('Error saving preferences:', error);
        } finally {
        setLoading(false);
        }
  };

  return (
    <Grid item xs={12}>
        <Paper sx={{ 
        p: 2, 
        background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
        position: 'relative',
        overflow: 'hidden',
        }}>
        {/* Watermark Icon */}
        <Box sx={{ 
            position: 'absolute', 
            top: 20, 
            right: 20, 
            opacity: 0.1,
            fontSize: '120px',
            zIndex: 0,
        }}>
            {MEAL_PLANS[selectedPlan].icon}
        </Box>

        {/* Header */}
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            borderBottom: '1px solid',
            borderColor: 'divider',
            pb: 2,
            position: 'relative',
            zIndex: 1,
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RestaurantIcon sx={{ mr: 1, fontSize: 32 }} color="primary" />
            <Typography variant="h5" fontWeight="500">Weekly Meal Plan</Typography>
            </Box>
            <Box>
            <Tooltip title="Get notifications for menu changes">
                <IconButton size="small" sx={{ mr: 1 }}>
                <NotificationsIcon />
                </IconButton>
            </Tooltip>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setDialogOpen(true)}
                startIcon={<RestaurantIcon />}
                disabled={loading}
            >
                Customize Plan
            </Button>
            </Box>
        </Box>

        {/* Current Plan Info */}
        <Grid container spacing={2} sx={{ mb: 4, position: 'relative', zIndex: 1 }}>
            <Grid item xs={12} md={6}>
            <Card elevation={2}>
                <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="primary" sx={{ flex: 1 }}>
                    {MEAL_PLANS[selectedPlan].name}
                    </Typography>
                    <Typography variant="h5" color="primary.main">
                    {MEAL_PLANS[selectedPlan].price}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                    {MEAL_PLANS[selectedPlan].description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Calories: {MEAL_PLANS[selectedPlan].calories}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    {MEAL_PLANS[selectedPlan].features.map((feature) => (
                    <Chip
                        key={feature}
                        label={feature}
                        size="small"
                        sx={{ m: 0.5 }}
                        color="primary"
                        variant="outlined"
                    />
                    ))}
                </Box>
                </CardContent>
            </Card>
            </Grid>

            {/* Preferences Card */}
            <Grid item xs={12} md={6}>
            <Card elevation={2}>
                <CardContent>
                <Typography variant="h6" gutterBottom>
                    Your Preferences
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {mealPreferences.length > 0 ? (
                    mealPreferences.map((pref) => (
                        <Chip
                        key={pref}
                        label={pref}
                        color="secondary"
                        variant="outlined"
                        size="small"
                        />
                    ))
                    ) : (
                    <Typography color="text.secondary">
                        No dietary preferences set
                    </Typography>
                    )}
                </Box>
                </CardContent>
            </Card>
            </Grid>
        </Grid>

        {/* Weekly Menu */}
        <Card elevation={3} sx={{ position: 'relative', zIndex: 1 }}>
            <CardContent>
            <Typography variant="h6" gutterBottom sx={{ pl: 2 }}>
                This Week's Menu
            </Typography>
            <TableContainer sx={{ 
                maxHeight: 400,
                '& .MuiTableCell-root': {
                borderBottom: '1px solid rgba(224, 224, 224, 0.4)',
                padding: '16px',
                },
            }}>
                <Table stickyHeader>
                <TableHead>
                    <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Day</TableCell>
                    {MEAL_PLANS[selectedPlan].meals.map((meal) => (
                        <TableCell key={meal} sx={{ fontWeight: 'bold' }}>{meal}</TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {MEAL_PLANS[selectedPlan].currentMenu.map((day) => (
                    <TableRow 
                        key={day.day} 
                        hover
                        sx={{
                        '&:hover': {
                            backgroundColor: 'action.hover',
                            cursor: 'pointer',
                        }
                        }}
                    >
                        <TableCell sx={{ fontWeight: '500' }}>{day.day}</TableCell>
                        <TableCell>{day.breakfast}</TableCell>
                        <TableCell>{day.lunch}</TableCell>
                        <TableCell>{day.dinner}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            </CardContent>
        </Card>
        </Paper>


      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Customize Your Meal Plan</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Plan Type</InputLabel>
              <Select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                label="Select Plan Type"
              >
                {Object.entries(MEAL_PLANS).map(([key, plan]) => (
                  <MenuItem key={key} value={key}>
                    {plan.name} - {plan.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="subtitle1" gutterBottom>
              Dietary Preferences
            </Typography>
            <FormGroup sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
              {DIETARY_PREFERENCES.map((pref) => (
                <FormControlLabel
                  key={pref}
                  control={
                    <Checkbox
                      checked={mealPreferences.includes(pref)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setMealPreferences([...mealPreferences, pref]);
                        } else {
                          setMealPreferences(mealPreferences.filter(p => p !== pref));
                        }
                      }}
                    />
                  }
                  label={pref}
                />
              ))}
            </FormGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSavePreferences}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default MealPlan;