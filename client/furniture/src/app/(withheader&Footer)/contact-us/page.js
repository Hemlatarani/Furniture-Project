import React from 'react'

import Breadcrumb from '@/app/common/Breadcrumb'
import MapLocation from './Maplocation'

export default function ContactUs() {
    let pageName = 'Contact us'
  return (
    <div>
        <Breadcrumb pageName={pageName} />
        <MapLocation/>
    </div>
  )
}