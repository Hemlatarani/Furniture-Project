import React from 'react'
import Breadcrumb from '@/app/common/Breadcrumb'
import WishlistView from './WishlistView'


export default function wishlistus() {
    let pageName="Wishlist Us"
  return (
   <>
   <Breadcrumb pageName={pageName}/>
<WishlistView/>
   
   </>
  )
}
