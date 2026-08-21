import React from 'react'
import Aboutcontent from './Aboutcontent'
import AboutChoose from './AboutChoose'
import AboutCustomer from './AboutCoustumer'
import Breadcrumb from '@/app/common/Breadcrumb'
export const metadata={
title:"About-Us",
description:"About page description"
}
export default function AboutUs() {
  let pageName="About Us"
  metadata
  return (
    <div>
      <Breadcrumb pageName={pageName}/>
  <Aboutcontent/>
  <AboutChoose/>
  <AboutCustomer/>
  
    </div>
  )
}
