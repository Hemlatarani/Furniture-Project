const { createSlice } = require("@reduxjs/toolkit");

export let wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: []
    },
    reducers: {
        addWishlist: function (state, action) {
            state.items.push(action.payload)
        },
        removeWishlist: function (state, action) {
            state.items.splice(action.payload, 1)
        }
    }
})
export default wishlistSlice.reducer;
export let { addWishlist, removeWishlist } = wishlistSlice.actions