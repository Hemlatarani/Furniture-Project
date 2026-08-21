import { Profiler, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'react-responsive-pagination/themes/classic-light-dark.css';

import Login from './components/pages/Login/Login';
import Layout from './components/pages/Layout';
import User from './components/pages/User/User';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Contact from './components/pages/Enquiry/ContactEnquiry';
import Newsletter from './components/pages/Enquiry/Newsletter';

import Addmaterial from './components/pages/Material/Addmaterial';
import Viewmaterial from './components/pages/Material/Viewmaterial';
import Viewcategory from './components/pages/Category/Viewcategroy';
import Addsubcategory from './components/pages/SubCategory/Addsubcategory';
import Viewsubcategory from './components/pages/SubCategory/Viewsubcategory';
import Addsubsubcategory from './components/pages/SubSubcategory/Addsubsubcategory';
import Viewsubsubcategory from './components/pages/SubSubcategory/Viewsubsubcategory';
import ViewProduct from './components/pages/Products/ViewProduct';
import AddProduct from './components/pages/Products/AddProduct';
import Addchoose from './components/pages/why choose us/Addchoose';
import Viewchoose from './components/pages/why choose us/Viewchoose'
import Orderlist from './components/pages/Order/Orderlist';
import OrderDetail from './components/pages/Order/OrderDetail'; // mene OrderDetail import kiya
import Viewslider from './components/pages/Slider/Viewslider';
import Addslider from './components/pages/Slider/Addslider';
import Addcountry from './components/pages/Country/Addcountry';
import ViewCountry from './components/pages/Country/Viewcountry';
import AddTtestimonials from './components/pages/Testimonials/AddTtestimonials';
import ViewTestimonials from './components/pages/Testimonials/ViewTestimonials';
import AddFaq from './components/pages/faq/AddFaq';
import AddColor from './components/pages/Color/Addcolor';
import Viewcolor from './components/pages/Color/Viewcolor';
import ViewFaq from './components/pages/Faq/ViewFaq';
import Maincontext from './context/Maincontext';
import Profile from './components/pages/Profile';
import CompanyProfile from './components/pages/compaynprofile';
import Addcategory from './components/pages/Category/Addcategory';








createRoot(document.getElementById('root')).render(
  <Maincontext>
    <StrictMode>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Login/>}/>
          <Route element={<Layout />}>
           
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/user' element={<User />} />
            <Route path='/enquiry/contact' element={<Contact />} />
            <Route path='/enquiry/newsletter' element={<Newsletter />} />
            {/*color route  */}
            <Route path='/color/add' element={<AddColor />} />
            <Route path='/color/edit/:id' element={<AddColor />} />
            <Route path='/color/view' element={<Viewcolor />} />
            {/*material route  */}
            <Route path='/material/addmaterial' element={<Addmaterial />} />
            <Route path='/material/edit/:id' element={<Addmaterial />} />
            <Route path='/material/viewmaterial' element={<Viewmaterial />} />
            {/* category route */}
            <Route path='/category/addcategory' element={<Addcategory />} />
            <Route path='/category/edit/:id' element={<Addcategory />} />
            <Route path='/category/viewcategory' element={<Viewcategory />} />
            {/* subcategory */}
            <Route path='/subcategory/addsubcategory' element={<Addsubcategory />} />
            <Route path='/subcategory/edit/:id' element={<Addsubcategory />} />
            <Route path='/subcategory/viewsubcategory' element={<Viewsubcategory />} />
            {/*subsubcategory  */}
            <Route path='/subsubcategory/addsubsubcategory' element={<Addsubsubcategory />} />
            <Route path='/subsubcategory/edit/:id' element={<Addsubsubcategory />} />
            <Route path='/subsubcategory/viewsubsubcategory' element={<Viewsubsubcategory />} />
            {/* product */}
            <Route path='/product/addproduct' element={<AddProduct />} />
            <Route path='/product/edit/:id' element={<AddProduct />} />
            <Route path='/product/viewproduct' element={<ViewProduct />} />
            {/* why choose us */}
            <Route path='/wchoose/addchoose' element={<Addchoose />} />
            <Route path='/wchoose/edit/:id' element={<Addchoose />} />
            <Route path='/wchoose/viewchoose' element={<Viewchoose />} />
            {/* order */}
            <Route path='/order/orderlist' element={<Orderlist />} />
            <Route path='/order/detail/:id' element={<OrderDetail />} /> {/* mene detail route add kiya params ke saath */}
            {/*slider  */}
            <Route path='/slider/addslider' element={<Addslider />} />
            <Route path='/slider/edit/:id' element={<Addslider />} />
            <Route path='/slider/viewslider' element={<Viewslider />} />
            {/* country route */}
            <Route path='/Country/addcountry' element={<Addcountry />} />
            <Route path='/Country/edit/:id' element={<Addcountry />} />
            <Route path='/Country/viewcountry' element={<ViewCountry />} />
            {/* testimonials */}
            <Route path='/testimonials/addtestimonials' element={<AddTtestimonials />} />
            <Route path='/testimonials/edit/:id' element={<AddTtestimonials />} />
            <Route path='/testimonials/viewtestimonials' element={<ViewTestimonials />} />
            {/* Faq route */}
            <Route path='/faq/addfaq' element={<AddFaq />} />
            <Route path='/faq/edit/:id' element={<AddFaq />} />
            <Route path='/faq/viewfaq' element={<ViewFaq />} />

            {/* {profile route} */}
            <Route path='/profile' element={<Profile />} />
            <Route path='/company-profile' element={<CompanyProfile />} />

          </Route>
          
        </Routes>
      </BrowserRouter>

    </StrictMode>
  </Maincontext>
)