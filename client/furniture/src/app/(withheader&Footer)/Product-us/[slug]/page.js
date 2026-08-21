
import { singleProduct } from '@/app/api-service/productservice';
import Breadcrumb from '@/app/common/Breadcrumb';
import React from 'react'
import ProductView from './ProductView';
export const methodName = {
  title: "AboutPage"
}

export default async function ProductDetails(data) {
  let { slug } = await data.params;
  console.log("slug from params:", slug)
  let apiRes = await singleProduct(slug)
  console.log(apiRes)
  let productData = apiRes?.cartProductdata
  let staticPath = apiRes?.staticPath
  return (
    <div>
      {productData && (
        <>
          <Breadcrumb pageName={productData.productName} />
          <ProductView data={productData} staticPath={staticPath} />
        </>
      )}
    </div>
  )
}

