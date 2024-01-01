"use client";

import { toast } from "sonner";
import { MoreHorizontal, X } from "lucide-react";

import { deleteCard } from "@/actions/delete-card";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BoardOptionsProps {
  id: string;
  boardId:string;
  blogId:string;
};

export const CardOptions = ({ id ,boardId,blogId}: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteCard, {
    onError: (error) => {
      toast.error(error);
    }
  });

  const onDelete = () => {
    execute({
      id,
      boardId: boardId,
      blogId: blogId,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="px-0 pt-3 pb-3" 
        side="bottom" 
        align="start"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button 
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          onClick={onDelete}
          disabled={isLoading}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Delete this Card
        </Button>
      </PopoverContent>
    </Popover>
  );
};