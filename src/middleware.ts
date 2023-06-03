import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware(
  {
    publicRoutes: ["/workspaces","/workspaces/(.*)","/api", "/api/(.*)"], 

    afterAuth(auth, req, evt) {
      // handle users who aren't authenticated
      console.log("auth.user", auth.user);
      
      if (!auth.userId) {
        if(req.url.includes("/api")){
          if(req.method === "POST"){
            return new Response("Unauthorized", { status: 401 });
          }
        }
      }
      
    },
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};