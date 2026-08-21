const { createSlice } = require("@reduxjs/toolkit");



export let counterSlice=createSlice({
    name:"counter",
    initialState:{
        count:1
    },
    reducers:{
        counterIncrement:function(state,reqData){

            state.count+=1
        },
        counterDecrement:function(state,reqData){
            state.count-=1
        }
    }
    
})
export default counterSlice.reducer;
export const {counterIncrement,counterDecrement}=counterSlice.actions;