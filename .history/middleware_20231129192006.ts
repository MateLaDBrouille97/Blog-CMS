import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { NextResponse,NextRequest } from "next/server";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth,req){
    if(auth.userId && auth.isPublicRoute){
      const locale = getLocaleOrDefault(req)
      let path ="/select-org";
      if(auth.orgId){
        path=`/${locale}/`
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
 

function getLocaleOrDefault(req: NextRequest & { experimental_clerkUrl: import("next/dist/server/web/next-url").NextURL; }) {
  throw new Error("Function not implemented.");
}
 