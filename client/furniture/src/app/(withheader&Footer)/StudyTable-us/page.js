import React from 'react'
import TableContent from './TableContent'
import TableProduct from './TableProduct'
import TableUpsells from './TableUpsells'
import Breadcrumb from '@/app/common/Breadcrumb'

export default function StudyTable() {
    let pageName="Caronline Study Table"
  return (
    <>
    
  <Breadcrumb pageName={pageName}/>
    <TableContent/>
    <TableProduct/>
    <TableUpsells/>
    
    </>
  )
}
