import React from 'react'
import Breadcrumb from '../common/Breadcrumb'
import DorianContent from './DorianContent'
import DorianProduct from './DorianProduct'
import DorianUpsells from './DorianUpsells'

export default function DorianShoe() {
    let pageName="Dorian Shoe Rack"
  return (
    <>
    <Breadcrumb pageName={pageName}/>
    <DorianContent/>
  <DorianProduct/>
    <DorianUpsells/>
   
    </>
  )
}
