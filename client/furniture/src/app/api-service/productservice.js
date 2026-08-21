import axios from "axios";

// let getporduct=()=>{
//   return  axios.get('https://dummyjson.com/products')
// .then(res => res.data)
// .then((finalRes)=>finalRes.products);
// }
 let apibaseurl=process.env.NEXT_PUBLIC_APIBASEURL
let singleProduct = (slug) =>{
  console.log("slug received:", slug)
  return axios.get(`${apibaseurl}product/product-details/${slug}`)
  
.then(res => res.data)
.then((finalRes)=> finalRes);
    
}

export {singleProduct}