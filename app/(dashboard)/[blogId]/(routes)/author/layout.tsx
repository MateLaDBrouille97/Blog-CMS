// import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AuthorLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/author");
  }

  return <>{children}</>
}
 
export default AuthorLayout;