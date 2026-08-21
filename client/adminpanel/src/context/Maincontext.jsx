// import React, { createContext, use, useEffect, useState } from 'react'
// import Cookies from 'js-cookie';

// export let LoginContext=createContext()
// export default function Maincontext({children}) {

    
//     let [id,setid]=useState(Cookies.get("Id") ?? '')




//     useEffect(()=>{
// Cookies.set("Id",id)
//     },[id])

//     let obj={id,setid}
// return (
//     <LoginContext.Provider value={obj}>
//       {children}
//     </LoginContext.Provider>
//   )
// }
import React, { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export let LoginContext = createContext()

export default function Maincontext({ children }) {

  let [id, setid] = useState(() => Cookies.get("Id") || '')

  useEffect(() => {
    if (id) {
      Cookies.set("Id", id, { expires: 7 })
    } else {
      Cookies.remove("Id")
    }
  }, [id])

  return (
    <LoginContext.Provider value={{ id, setid }}>
      {children}
    </LoginContext.Provider>
  )
}
