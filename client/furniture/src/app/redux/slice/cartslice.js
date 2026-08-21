import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL;

// Async thunk - backend se cart data fetch karta hai
export let fetchCartData = createAsyncThunk("cart/fetchCartData", async (token) => {
    let res = await axios.post(`${apiBaseurl}cart/cart-view`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.data;
});

export let cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
    },
    reducers: {
        addTocart: (state, reqData) => {
            let { payload } = reqData;
            state.cart.push(payload);
        },

        DeleteCart: (state, reqData) => {
            let { payload } = reqData;
            let id = payload.id;
            state.cart = state.cart.filter((item) => item.id !== id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartData.fulfilled, (state, action) => 
            {
            state.cart = action.payload;
        });
    }
});

export default cartSlice.reducer;
export const { addTocart, DeleteCart } = cartSlice.actions;
