import {createSlice} from "@reduxjs/toolkit"

const noteSlice = createSlice({
    name:"note",
    initialState:{
        allNotes:[],
        filteredNotes:[],
    },
    reducers:{
        // actions
        setAllNotes:(state,action) => {
            state.allNotes = action.payload;
        },
        setFilteredNotes:(state,action) => {
            state.filteredNotes = action.payload;
        },
    }
});
export const {setAllNotes,setFilteredNotes} = noteSlice.actions;
export default noteSlice.reducer;