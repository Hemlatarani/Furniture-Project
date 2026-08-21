import axios from "axios";
let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL


let categoryapi = () => {
  return axios.get(`${apiBaseUrl}home/category`)
    .then(res => res.data)
    .then((finalRes) => finalRes.categoryData.slice(0, 3));
  }
  // console.log("category",finalRes.categoryData)


let productApi = (catId) => {
  // console.log(productApi)
  return axios.get(`${apiBaseUrl}home/product/${catId}`)
    .then(res => res.data)
    .then((finalRes) => finalRes)

}

let homeSellingapi = () => {
  return axios.get('https://dummyjson.com/products')
    .then(res => res.data)
    .then((finalRes) => finalRes.products.slice(0, 15));
}


let bannerapi = () => {
  return axios.get('https://dummyjson.com/products')
    .then(res => res.data)
    .then((finalRes) => finalRes.products.slice(0, 4));
}

let homeFeaturedProduct = (catId) => {
  return axios.get(`${apiBaseUrl}home/product/${catId}`)
    .then(res => res.data)
    .then((finalRes) => {
      // console.log("Featured Product Response:", finalRes);
      return finalRes;
    })
    .catch(err => {
      // console.error("Error fetching products:", err);
      return {productid: [], staticPath: ''};
    });
}

let productViewApi = () => {
  return axios.get(`http://localhost:8000/admin/product/view`)
    .then((res) => res.data)
    .then((finalRes) => finalRes)
    .catch((err) => {
      // console.error("productViewApi error:", err.message)
      return []
    })
}
let orderapi=()=>{
  return axios.get(`http://localhost:8000/admin/product/view`)
    .then((res) => res.data)
    .then((finalRes) => finalRes)

}

let topRatedApi = () => {
  return axios.get(`${apiBaseUrl}home/top-rated`)
    .then(res => res.data)
    .then((finalRes) => finalRes)
}

export { bannerapi, homeFeaturedProduct, categoryapi, homeSellingapi, productApi, productViewApi,orderapi }
