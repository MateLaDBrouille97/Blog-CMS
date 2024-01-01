import { Card } from "@prisma/client";

import { CardTitleForm } from "./card-title-form";
import { CardOptions } from "./card-options";

interface CardNavbarProps {
  data: Card;
  boardId:string;

};

export const CardNavbar = async ({
  data
}: CardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <CardTitleForm data={data} />
      <div className="ml-auto">
        {/* <CardOptions id={data.id} /> */}
      </div>
    </div>
  );
};