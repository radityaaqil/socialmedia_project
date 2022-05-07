import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.token;
  console.log(token, "askdajskdjds");
  
  if(req.nextUrl.pathname === "/home" && !token){
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if(req.nextUrl.pathname === "/userprofile" && !token){
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log(req.nextUrl.pathname);
  if (req.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (req.nextUrl.pathname === "/register" && token) {
    return NextResponse.redirect(new URL("/userprofile", req.url));
  }

}