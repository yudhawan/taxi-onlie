import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  current:null,
  timeInformation:null,
  description:null
}

export const locationSlice = createSlice({
  name: 'locationSlice',
  initialState,
  reducers: {
    setCurrent:(state,action)=>{
        state.current=action.payload
    },
    setDestination:(state,action)=>{
        state.destination=action.payload
    },
    setTimeInformation:(state,action)=>{
        state.timeInformation=action.payload
    }
  },
})

export const { setCurrent, setDestination, setTimeInformation } = locationSlice.actions

export default locationSlice.reducer