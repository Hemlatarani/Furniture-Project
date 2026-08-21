import { configureStore }from"@reduxjs/toolkit";
import  counterReducer  from "../slice/counterslice";
import  cartReducer  from "../slice/cartslice";
import  userReducer from "../slice/userslice";
import  wishlistReducer from "../slice/wishlistslice";







export const store=configureStore( {
reducer:{
    myCounter:counterReducer,
    myCart:cartReducer,
    user:userReducer,
    mywishlist:wishlistReducer
}
}
)