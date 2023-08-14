import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profile: 
    {
      firstName: '',
      lastName: '',
      age: 18,
      email: '',
      password: '',
      profile_pic: 'default'
    },
    formSubmitted: false,
    isLoggedIn: false
}

export const user_info = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add_user: (state, action) => {
        state.profile = action.payload
    },
    isLoggedInOrNot: (state, action) => {
        state.isLoggedIn = action.payload
    }
  },
})

export const { add_user, isLoggedInOrNot } = user_info.actions
export default user_info.reducer