// import { NextResponse } from 'next/server'

 
// export function middleware(request) {
//   if (! request.cookies.get('USER')) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
//   else{
//      if (request.nextUrl.pathname.startsWith('/login')) {
//     return NextResponse.rewrite(new URL('/my-dashboard', request.url))
//    }
//   }
//   return NextResponse.next();
//  }
//  export const config={
//     matcher:['/contact-us','/wishlist']
//  }
import { NextResponse } from 'next/server'

 
export function middleware(request) {
  if (! request.cookies.get('USER')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  else{
     if (request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.rewrite(new URL('/my-dashboard', request.url))
   }
  }
  return NextResponse.next();
 }
 export const config={
    matcher:["/my-dashboard",'/contact-us','/wishlist']
 }