import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDeatil: (state, actions) => {
            state.user = actions.payload
            console.log("user detail" + actions.payload);


        }
    },
})

// Action creators are generated for each case reducer function
export const { setUserDeatil } = userSlice.actions

export default userSlice.reducer