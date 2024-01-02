"use client";

import { toast } from "sonner";
import { Copy, Trash,BookMarked,ClipboardEdit } from "lucide-react";
import { useParams,useRouter } from "next/navigation";

import { CardWithList } from "@/types";
import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { Button } from "@/components/ui/button";
import { deleteCard } from "@/actions/delete-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modal";
import { createWhiteBoard } from "@/actions/create-whiteboard";


interface ActionsProps {
  data: CardWithList;
};

export const Actions = ({
  data,
}: ActionsProps) => {
  const params = useParams();
  const router = useRouter();
  const cardModal = useCardModal();

  const { 
    execute: executeCopyCard,
    isLoading: isLoadingCopy,
  } = useAction(copyCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" copied`);
      cardModal.onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { 
    execute: executeDeleteCard,
    isLoading: isLoadingDelete,
  } = useAction(deleteCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data.title}" deleted`);
      cardModal.onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onCopy = () => {
    const boardId = params.boardId as string;
    const blogId=params.blogId as string 
    executeCopyCard({
      id: data.id,
      boardId,
      blogId
    });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;
    const blogId=params.blogId as string
    executeDeleteCard({
      id: data.id,
      boardId,
      blogId
    });
  };

  

  const { 
    execute: executeCreateWhiteboard,
    isLoading: isLoadingWhiteboard,
  } = useAction(createWhiteBoard, {
    onSuccess: (data) => {
      toast.success(`Whiteboard of ${data.title} updated`);
      cardModal.onClose();
  
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  

  const onWhiteboard = async () => {
    const boardId = params.boardId as string;
    const blogId = params.blogId as string;
  
    try {
      // Execute the create whiteboard action
      await executeCreateWhiteboard({
        boardId,
        blogId,
        cardId: data.id,
      });
  
      // If the action is successful, navigate to the whiteboard route
      router.push(`/${params.blogId}/workplace/whiteboard/${data.id}`);
      
      // Close the card modal (if needed)
      cardModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  

 


  // const onWhiteboard = async () => {
  //   try {    
  //     router.push(`/${params.blogId}/workplace/whiteboard`);
  //     toast.success("");
    
  //   } catch {
  //     toast.error("Something went wrong");
  //   }
  // }


  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">
        Actions
      </p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="gray"
        className="w-full justify-start"
        size="inline"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant="destructive"
        className="w-full justify-start"
        size="inline"
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
      <Button
        onClick={onWhiteboard}
        disabled={isLoadingWhiteboard}
        variant="ghost"
        className="w-full justify-start"
        size="icon"
      >
        <ClipboardEdit className="h-2 w-2 " />
        Whiteboard
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};