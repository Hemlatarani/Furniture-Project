import React from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import FaqContact from './FaqContact'


export default function Faqpage() {
    let pageName="Frequently Questions"
  return (
   <>
   <Breadcrumb pageName={pageName}/>
   <FaqContact/>
   
   </>
  )
}
