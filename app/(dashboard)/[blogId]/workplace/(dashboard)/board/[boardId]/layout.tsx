import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";
import prismadb from "@/lib/prismadb";


export async function generateMetadata({ 
  params
 }: {
  params: { boardId: string,blogId:string };
 }) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await prismadb.board.findUnique({
    where: {
      id: params.boardId,
      orgId
    }
  });

  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string,blogId:string };
}) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect(`${params.blogId}/workplace/select-org`);
  }

  const board = await prismadb.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} blogId={params.blogId} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">
        {children}
      </main>
    </div>
  );
};

export default BoardIdLayout;