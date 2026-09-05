// import axios from "axios";
// let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL


// let categoryapi = () => {
//   return axios.get(`${apiBaseUrl}home/category`)
//     .then(res => res.data)
//     .then((finalRes) => finalRes.categoryData.slice(0, 3));
//   }
//   // console.log("category",finalRes.categoryData)


// let productApi = (catId) => {
//   // console.log(productApi)
//   return axios.get(`${apiBaseUrl}home/product/${catId}`)
//     .then(res => res.data)
//     .then((finalRes) => finalRes)

// }

// let homeSellingapi = () => {
//   return axios.get('https://dummyjson.com/products')
//     .then(res => res.data)
//     .then((finalRes) => finalRes.products.slice(0, 15));
// }


// let bannerapi = () => {
//   return axios.get('https://dummyjson.com/products')
//     .then(res => res.data)
//     .then((finalRes) => finalRes.products.slice(0, 4));
// }

// let homeFeaturedProduct = (catId) => {
//   return axios.get(`${apiBaseUrl}home/product/${catId}`)
//     .then(res => res.data)
//     .then((finalRes) => {
//       // console.log("Featured Product Response:", finalRes);
//       return finalRes;
//     })
//     .catch(err => {
//       // console.error("Error fetching products:", err);
//       return {productid: [], staticPath: ''};
//     });
// }

// let productViewApi = () => {
//   return axios.get(`http://localhost:8000/admin/product/view`)
//     .then((res) => res.data)
//     .then((finalRes) => finalRes)
//     .catch((err) => {
//       // console.error("productViewApi error:", err.message)
//       return []
//     })
// }
// let orderapi=()=>{
//   return axios.get(`http://localhost:8000/admin/product/view`)
//     .then((res) => res.data)
//     .then((finalRes) => finalRes)

// }

// let topRatedApi = () => {
//   return axios.get(`${apiBaseUrl}home/top-rated`)
//     .then(res => res.data)
//     .then((finalRes) => finalRes)
// }

// export { bannerapi, homeFeaturedProduct, categoryapi, homeSellingapi, productApi, productViewApi,orderapi }


import axios from "axios";

// const apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
const apiBaseUrl =
  process.env.NEXT_PUBLIC_APIBASEURL ||
  "https://furniture-project-orcin.vercel.app/";

const api = axios.create({
  baseURL: apiBaseUrl,
});


// ================= CATEGORY =================

const categoryapi = async () => {
  try {
    const res = await api.get("home/category");

    return res.data.categoryData.slice(0, 3);
  } catch (error) {
    console.error("Category API Error:", error);
    return [];
  }
};


// ================= PRODUCT =================

const productApi = async (catId) => {
  try {
    const res = await api.get(`home/product/${catId}`);

    return res.data;
  } catch (error) {
    console.error("Product API Error:", error);
    return [];
  }
};


// ================= HOME SELLING PRODUCTS =================

const homeSellingapi = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products");

    return res.data.products.slice(0, 15);
  } catch (error) {
    console.error("Home Selling API Error:", error);
    return [];
  }
};


// ================= BANNER =================

const bannerapi = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/products");

    return res.data.products.slice(0, 4);
  } catch (error) {
    console.error("Banner API Error:", error);
    return [];
  }
};


// ================= FEATURED PRODUCTS =================

const homeFeaturedProduct = async (catId) => {
  try {
    const res = await api.get(`home/product/${catId}`);

    return res.data;
  } catch (error) {
    console.error("Featured Product API Error:", error);

    return {
      productid: [],
      staticPath: "",
    };
  }
};


// ================= PRODUCT VIEW =================

const productViewApi = async () => {
  try {
    const res = await api.get("admin/product/view");

    return res.data;
  } catch (error) {
    console.error("Product View API Error:", error);
    return [];
  }
};


// ================= ORDER =================

const orderapi = async () => {
  try {
    const res = await api.get("admin/product/view");

    return res.data;
  } catch (error) {
    console.error("Order API Error:", error);
    return [];
  }
};


// ================= TOP RATED =================

const topRatedApi = async () => {
  try {
    const res = await api.get("home/top-rated");

    return res.data;
  } catch (error) {
    console.error("Top Rated API Error:", error);
    return [];
  }
};


export {
  bannerapi,
  homeFeaturedProduct,
  categoryapi,
  homeSellingapi,
  productApi,
  productViewApi,
  orderapi,
  topRatedApi,
};