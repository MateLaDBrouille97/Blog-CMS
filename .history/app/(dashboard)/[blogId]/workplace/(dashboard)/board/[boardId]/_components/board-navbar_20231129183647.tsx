import { Board } from "@prisma/client";

import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";

interface BoardNavbarProps {
  data: Board;
  blogId:string
};

export const BoardNavbar = async ({
  data, blogId
}: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 pt-26 gap-x-4 text-white">
      <BoardTitleForm data={data} blogId={blogId}/>
      <div className="ml-auto">
        <BoardOptions id={data.id} blogId={blogId} />
      </div>
    </div>
  );
};