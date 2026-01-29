import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes:localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {

    // addToPastes: (state,action) => {
    //   const paste = action.payload;
    //   // if(paste.trim() === ""){
    //   //   alert("Please  your paste!")
    //   //   return
    //   // }
    //   //add a check - > that paste already exist
    //   state.pastes.push(paste);
    //   localStorage.setItem("pastes",
    //   JSON.stringify(state.pastes));
    //   toast.success("Paste created successfully!")
    // },


    addToPastes: (state, action) => {
  const { title, content } = action.payload;

  // validation
  if (!title?.trim() || !content?.trim()) {
    toast.error("Please complete your paste first!");
    return;
  }

  state.pastes.push(action.payload);

  localStorage.setItem(
    "pastes",
    JSON.stringify(state.pastes)
  );

  toast.success("Paste created successfully!");
},
    updateToPastes: (state,action) => {
      const paste = action.payload

      //finding index of the payload 
      const index = state.pastes.findIndex((item) =>
      item._id === paste._id)

      if (index >= 0){
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify (state.pastes));

        toast.success("Paste Updated successfully !")
      }
    },

    resetAllPastes: (state, action) => {
      state.pastes= [];

      localStorage.removeItem("pastes");
    },

    removeFromPastes : (state,action) => {
      const pasteId= action.payload;

      console.log(pasteId);

      //checking if such index even exist for paste
      const index = state.pastes.findIndex((item) =>
      item._id === pasteId);

      if(index >= 0 ){
        state.pastes.splice(index,1);

        localStorage.setItem("pastes", JSON.stringify (state.pastes));

        toast.success("Paste deleted Successfully!");
      }
    },
  },
})

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;

export default pasteSlice.reducer