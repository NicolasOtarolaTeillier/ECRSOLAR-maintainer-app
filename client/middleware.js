
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request) {
  const jwt = request.cookies.get('appEcrsolarToken')
  
  if (request.nextUrl.pathname.includes('operations') || request.nextUrl.pathname.includes('comercial')){
    if (jwt === undefined) {

        return NextResponse.redirect(new URL('/authentication/sign-in/cover', request.url))
      }
  }
  return NextResponse.next()
}