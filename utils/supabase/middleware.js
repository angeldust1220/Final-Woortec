import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

const protectedPaths = ['/protected', '/dashboard', '/']; // Example protected paths

export async function updateSession(request) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          response.cookies.set(name, value, options);
        },
        remove(name, options) {
          response.cookies.set(name, '', { ...options, maxAge: -1 });
        },
      },
    }
  );

  const { data: sessionData } = await supabase.auth.getSession();
  const url = new URL(request.url);

  if (sessionData.session) {
    // User is authenticated
    if (url.pathname === '/', '/dashboard') {
      // If authenticated user tries to access the login page, redirect them to the home page
      return NextResponse.redirect(new URL('/', request.url));
    }
    return response;
  } else {
    // User is not authenticated
    if (protectedPaths.includes(url.pathname)) {
      // If unauthenticated user tries to access a protected path, redirect them to the login page
      return NextResponse.redirect(new URL('/auth?next=' + url.pathname, request.url));
    }
    return response;
  }
}
