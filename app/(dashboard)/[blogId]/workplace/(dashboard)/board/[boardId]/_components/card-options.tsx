"use client";

import { toast } from "sonner";
import { Card } from "@prisma/client";
import { ElementRef, useRef } from "react";
import { MoreHorizontal, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";

interface CardOptionsProps {
  data: Card;
//   onAddCard: () => void;
  blogId:string;
};

export const CardOptions = ({
  data,
//   onAddCard,
  blogId
}: CardOptionsProps) => {

  const closeRef = useRef<ElementRef<"button">>(null);//when you delete something the popover can stay to prevent that we create a ref to avoid that 

  const { execute: executeDelete } = useAction(deleteCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" deleted`);
      closeRef.current?.click();//closeRef is associated with popoverClose
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const { execute: executeCopy } = useAction(copyCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" copied`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId,blogId });
  };

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId ,blogId});
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Card actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        {/* <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card...
        </Button> */}
        <form action={onCopy}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="listId" id="listId" value={data.listId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy card...
          </FormSubmit>
        </form>
        <Separator />
        <form
          action={onDelete}
        >
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="listId" id="listId" value={data.listId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this Card
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};