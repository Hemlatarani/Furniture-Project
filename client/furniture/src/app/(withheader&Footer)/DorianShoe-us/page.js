import React from 'react'
import DorianContent from './DorianContent'
import DorianProduct from './DorianProduct'
import DorianUpsells from './DorianUpsells'
import Breadcrumb from '@/app/common/Breadcrumb'

export default function DorianShoe() {
  let pageName = "Dorian Shoe Rack"
  return (
    <>
      {/* <Breadcrumb  /> */}
      <Breadcrumb pageName={pageName}/>
      <DorianContent />
      <DorianProduct />
      <DorianUpsells />

    </>
  )
}
