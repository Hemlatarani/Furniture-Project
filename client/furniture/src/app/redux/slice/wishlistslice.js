const { createSlice } = require("@reduxjs/toolkit");

let savedItems = [];
if (typeof window !== 'undefined') {
    try { savedItems = JSON.parse(localStorage.getItem('wishlist')) || [] } catch { savedItems = [] }
}

export let wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: savedItems
    },
    reducers: {
        addWishlist: function (state, action) {
            state.items.push(action.payload)
            localStorage.setItem('wishlist', JSON.stringify(state.items))
        },
        removeWishlist: function (state, action) {
            state.items = state.items.filter((item) => item._id !== action.payload)
            localStorage.setItem('wishlist', JSON.stringify(state.items))
        }
    }
})
export default wishlistSlice.reducer;
export let { addWishlist, removeWishlist } = wishlistSlice.actions