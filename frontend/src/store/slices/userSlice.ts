// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface UserProfile {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   userType: 'owner' | 'resident';
// }

// interface UserState {
//   profile: UserProfile | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   profile: null,
//   loading: false,
//   error: null,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     fetchProfileStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchProfileSuccess: (state, action: PayloadAction<UserProfile>) => {
//       state.profile = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     fetchProfileFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
//       if (state.profile) {
//         state.profile = { ...state.profile, ...action.payload };
//       }
//     },
//     clearProfile: (state) => {
//       state.profile = null;
//       state.error = null;
//     },
//   },
// });

// export const {
//   fetchProfileStart,
//   fetchProfileSuccess,
//   fetchProfileFailure,
//   updateProfile,
//   clearProfile,
// } = userSlice.actions;

// export default userSlice.reducer; 