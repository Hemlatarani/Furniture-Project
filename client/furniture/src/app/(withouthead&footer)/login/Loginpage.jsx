// "use client"
// import { getuserData } from '@/app/redux/slice/userslice'
// import { store } from '@/app/redux/store/store'
// import axios from 'axios'
// import { redirect } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { GoogleAuthProvider, signInWithPopup ,getAuth } from "firebase/auth";
// import { app } from '@/config/fireconfig'



// export default function Loginpage() {


//   let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

//   let loginuser = useSelector((store) => store.user.user)

//   let dispatch = useDispatch()
//   let getlogout = () => {
//     dispatch(getuserData(null))
//   }


//   let [userData, setuserData] = useState({
//     userEmail: "",
//     userPassword: ""
//   });

//   // input handle
//   let getValOrSetVal = (e) => {
//     let obj = { ...userData };
//     obj[e.target.name] = e.target.value;
//     setuserData(obj);
//   };

//   // login submit
//   let saveLogin = (e) => {
//     e.preventDefault();

//     axios.post(`${apiBaseUrl}/web/user/login`, userData)
//       .then((res) => res.data)
//       .then((finalRes) => {
//         console.log("hemlata",finalRes)
//         if (finalRes.status)
//            {
//           let userObj = {
//             id: finalRes.user_id,
//             userName: finalRes.user.userName
//           }

//           dispatch(getuserData(userObj))
//         }
//       });

//   };
//   useEffect(() => {

//     if (loginuser) {
//       ('/my-dashboard')
//     }
//   }, [loginuser])
//   const provider = new GoogleAuthProvider();
//   const auth = getAuth(app);

//   let googlelogin =  (e) => {
//     signInWithPopup(auth, provider)
//       .then(async(result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         // console.log("user",user)
//         let googleuserData={
//           userEmail:user.email,
//           userName:user.displayName,
//         };
//         let res= await axios.post(`${apiBaseUrl}/web/user/google-login`,googleuserData)

//         // IdP data available using getAdditionalUserInfo(result)
//         // ...
//       }).catch((error) => {
//         console.log("error",error)
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//   }



//   return (
//     <div className="antialiased bg-gray-500 text-gray-900 font-sans">
//       <div className="flex items-center h-screen w-full bg-gray-400">
//         <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto animate-slide-up">

//           <span className="w-full text-xl uppercase font-bold mb-4">Login</span>

//           <form className="mb-4" onSubmit={saveLogin}>
//             <div className="mb-4 md:w-full">
//               <label htmlFor="email" className="block text-xs mb-1">
//                 Username or Email
//               </label>
//               <input
//                 onChange={getValOrSetVal}
//                 name="userEmail"
//                 className="w-full border rounded p-2 outline-none focus:shadow-outline"
//                 type="email"
//                 id="email"
//                 placeholder="Username or Email"
//               />
//             </div>

//             <div className="mb-6 md:w-full">
//               <label htmlFor="password" className="block text-xs mb-1">
//                 Password
//               </label>
//               <input
//                 name="userPassword"
//                 onChange={getValOrSetVal}
//                 className="w-full border rounded p-2 outline-none focus:shadow-outline"
//                 type="password"
//                 id="password"
//                 placeholder="Password"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-green-500 text-white py-2 rounded transition-all duration-500 
//               hover:bg-blue-500 hover:scale-110 active:scale-95">
//               Login
//             </button>
//           </form>

//           <a className="text-blue-700 text-center text-sm" href="/login">
//             Forgot password?
//           </a>
//           <button
//             onClick={googlelogin}
//             type="button"
//             className="w-full bg-blue-500 text-white py-2 rounded transition-all duration-500 
//               hover:bg-blue-500 hover:scale-110 active:scale-95">
//             Google login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { getuserData } from '@/app/redux/slice/userslice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from '@/config/fireconfig';
import Link from 'next/link';

export default function Loginpage() {

  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;

  console.log(apiBaseUrl);


  let router = useRouter()
  let loginuser = useSelector((store) => store.user.user);
  let dispatch = useDispatch();

  let [userData, setuserData] = useState({
    userEmail: '',
    userPassword: ''
  });

  // input handle
  let getValOrSetVal = (e) => {
    let obj = { ...userData };
    obj[e.target.name] = e.target.value;
    setuserData(obj);
  };

  // normal login
  let saveLogin = (e) => {
    e.preventDefault();

    axios.post(`${apiBaseUrl}user/login`, userData)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes);

        if (finalRes.status === 1) {

          let userObj = {
            id: finalRes.user._id,
            userName: finalRes.user.userName
          };
          dispatch(getuserData({ user: userObj, token: finalRes.token }));
          router.push('/my-dashboard');
        }
      })
      .catch(err => console.error('Login Error:', err));
  };

  // Google Login
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  let googlelogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        let googleUserData = {
          userName: user.displayName,
          userEmail: user.email,
        };

        let res = await axios.post(`${apiBaseUrl}user/google-login`, googleUserData);
        let finalRes = res.data;

        if (finalRes.status) {
          let userObj = {
            id: finalRes.user._id,
            userName: finalRes.user.userName
          };
          dispatch(getuserData({ user: userObj, token: finalRes.token }));
          window.location.href = '/my-dashboard';
        }
      })
      .catch((error) => {
        // console.log("Google login error", error);
      });
  };

  return (
    <div className="antialiased bg-gray-500 text-gray-900 font-sans">
      <div className="flex items-center h-screen w-full bg-gray-400">
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">

          {/* <h1>WEBSITE</h1> */}

          <span className="w-full text-xl uppercase font-bold mb-4">Login</span>

          <form className="mb-4" onSubmit={saveLogin}>
            <div className="mb-4 md:w-full">
              <label className="block text-xs mb-1">Email</label>
              <input
                onChange={getValOrSetVal}
                name="userEmail"
                className="w-full border rounded p-2 outline-none"
                type="email"
                placeholder="Enter email"
              />
            </div>

            <div className="mb-6 md:w-full">
              <label className="block text-xs mb-1">Password</label>
              <input
                name="userPassword"
                onChange={getValOrSetVal}
                className="w-full border rounded p-2 outline-none"
                type="password"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded">
              Login
            </button>
          </form>

          <button
            onClick={googlelogin}
            className="w-full bg-blue-500 text-white py-2 rounded">
            Login With Google
          </button>

          <p className='text-center mt-3'>Don't have a Account? <Link href='Register-us' className='text-blue-700'>Register</Link> </p>

        </div>
      </div>
    </div>
  );
}
