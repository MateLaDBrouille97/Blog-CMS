import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse,NextRequest } from "next/server";
import { useParams } from "next/navigation";
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth,req){
    
    
    if(auth.userId && auth.isPublicRoute){
      
      let path ="/select-org";
      if(auth.orgId){
        path="/d45ceacd-3997-4051-b3e7-6113e7bed31b/"
      }
      const orgSelection =new URL(path,req.url);
      return NextResponse.redirect(orgSelection);
    }
    if (!auth.userId && !auth.isPublicRoute){
      return redirectToSignIn({returnBackUrl:req.url})
    }
    if(auth.userId && !auth.orgId && req.nextUrl.pathname!=="/select-org"){
      const orgSelection =new URL("/select-org",req.url)
      return NextResponse.redirect('orgSelection')
    }
  }
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  
};
 

 