const { createSlice } = require("@reduxjs/toolkit");
import  Cookies from "js-cookie";


export let userSlice=createSlice(
    {
        name:"user",
        initialState:{
            user: typeof window !== 'undefined' && Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null,
            token: typeof window !== 'undefined' ? (Cookies.get("TOKEN") ?? '') : '',
        },
         reducers:{
       getuserData:function(state,reqData){
            let {payload}=reqData
            state.user=payload.user
            state.token=payload.token
            Cookies.set("USER",JSON.stringify(state.user),{expires:7})
            Cookies.set("TOKEN",state.token,{expires:7})
            console.log(payload)
            // console.log(Cookies.get("TOKEN"))
        },
        logoutData:function(state){
        state.user=null
        state.token=""
        Cookies.remove("USER")
        Cookies.remove("TOKEN")
               
        }
    }
}
)
export default userSlice.reducer;
export const {getuserData,logoutData}=userSlice.actions