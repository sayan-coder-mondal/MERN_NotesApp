import {createSlice} from "@reduxjs/toolkit"

const loadingSlice = createSlice({
    name:"loader",
    initialState:{
        loading:false
    },
    reducers:{
        // actions
        setLoading:(state,action) => {
            state.loading = action.payload;
        },
    }
});
export const {setLoading} = loadingSlice.actions;
export default loadingSlice.reducer;