import { configureStore } from '@reduxjs/toolkit';
import projectsDashboardReducer  from './dashboardSlice'

export const store = configureStore({
  reducer: {
    projectsDashboard: projectsDashboardReducer,
    
  }
});
