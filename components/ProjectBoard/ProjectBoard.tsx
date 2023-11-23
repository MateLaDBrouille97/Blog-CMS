"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ConfirmModal } from "../modals/confirm-modal";
import { Button } from "../ui/button";
import { PenIcon, Trash } from "lucide-react";
import prismadb from "@/lib/prismadb";
import { ProjectBoard } from "@/models/project";


interface FormData {
  status: string;
}

type Props = {
  boardHeading: string;
  toggleAddFeature: () => void;
  setSelectedBoardId: Dispatch<SetStateAction<string>>;
  boardId: string;
  numFeatures: number;
  blogId: string;
  slug: string;
  board:ProjectBoard,
  editHandler:Dispatch<SetStateAction<ProjectBoard>>;
};

const ProjectBoard: FC<Props> = (props) => {
  const {
    blogId,
    slug,
    boardHeading,
    boardId,
    numFeatures,
    board,
    setSelectedBoardId,
    toggleAddFeature,
    editHandler
  } = props;

  const router = useRouter();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [board2, setBoard] = useState<ProjectBoard| null>();

  useEffect(() => {
    const fetchBoards = async () => {
      const board = await prismadb.projectBoard.findUnique({
        where: {
          id: boardId,
        },
        include: {
          features: true,
        },
      });
      setBoard(board);
    };
    fetchBoards();
  }, [boardId]);





  const onDelete = async (boardId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.blogId}/todo/project-board/${boardId}`);
      toast.success("Board deleted");
      router.refresh();
      router.push(`/${params.blogId}/todo/projects/${slug}`);
    } catch {
      toast.error("Something in Board went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center pb-6 border-b-2 border-b-[#308be5]">
      <div className="flex items-center">
        <div className="w-2 h-2 bg-[#308be5] rounded-full mr-2" />
        <p className="font-medium mr-3">{boardHeading}</p>
        <p className="w-6 h-6 text-center flex items-center justify-center bg-[#e0e0e0] text-[#625f6d] rounded-full">
          {numFeatures}
        </p>
        <button
          onClick={() => editHandler(board)}
          className="font-medium text-black-500 hover:underline mx-5 "
        >
          <PenIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="flex justify-end ">
        <div className="mx-5">
          <ConfirmModal onConfirm={() => onDelete(boardId)}>
            <Button size="sm" disabled={isLoading}>
              <Trash className="h-4 w-4" />
            </Button>
          </ConfirmModal>
        </div>
        <button
          onClick={() => {
            toggleAddFeature();
            setSelectedBoardId(boardId);
          }}
          className="text-white bg-[#308be5] px-3 py-1 rounded-lg font-medium text-lg"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProjectBoard;
