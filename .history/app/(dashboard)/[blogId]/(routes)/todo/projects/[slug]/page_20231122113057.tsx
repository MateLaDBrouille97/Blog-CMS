"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";

import { Feature, Project } from "@/models/project";
import AddBoardForm from "@/components/AddBoardForm/AddBoardForm";
import Modal from "@/components/Modal/Modal";
import slugify from "slugify";
import { toast } from "react-hot-toast";
import ProjectBoard from "@/components/ProjectBoard/ProjectBoard";
import AddFeatureForm from "@/components/AddFeatureForm/AddFeatureForm";
import FeatureCard from "@/components/FeatureCard/FeatureCard";
import { ArrowLeft, Trash } from "lucide-react";
import Link from "next/link";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import { Feature } from "@prisma/client";
import { Priority } from "@prisma/client";
import { parseISO } from "date-fns";


const ProjectItem = () => {

  type FeatureFormData = {
    name: string;
    description: string;
    finishDate: string;
    priority: Priority;
    id?:string;
  };
  
  interface boardData {
    status: string;
    id?: string;
  }
  
  const [project, setProject] = useState<null | Project>(null);
  const [isAddBoardFormVisible, setIsAddBoardFormVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddFeatureFormVisible, setIsAddFeatureFormVisible] = useState(false);
  const [boardData, setBoardData] = useState<boardData>({ status: " " });
  const [features, setFeatures] = useState<Feature[]>();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState("");
  const [featureFormData, setFeatureFormData] = useState<FeatureFormData>({
    name: "",
    description: "",
    finishDate: "",
    priority:Priority.LOW,
  });

  
  const [formData, setFormData] = useState<boardData>({
    status: "",  
  });


  const [isLoading, setIsLoading] = useState(false);
  const { blogId, slug } = useParams();
  const router = useRouter();

  const href2 = `/${blogId}/todo/projects/${slug}`

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await axios.get(`/api/${blogId}/todo/projects/${slug}`);
      setProject(data);
    };

    fetchProject();
  }, [slug, blogId]);

  if (!project) return <></>;

  const toggleAddBoardForm = () =>
    setIsAddBoardFormVisible((prevState) => !prevState);

  const updateBoardHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    setBoardData((prevState) => ({
      ...prevState,
      [name]: value,
    })

    );
  };

  const handleUpdate = async () => {
    const slug = slugify(boardData.status);
    try {
      const { statusText } = await axios.patch(`/api/${blogId}/todo/project-board/update`, {
        status: boardData.status,
        id:boardData.id,
        slug,
        projectId: project.id,       
      }
    );
      toast.success(statusText);
      router.push(href2);
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsAddBoardFormVisible(false);
    }
  };


  const handleBoardSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    if(isUpdating){
      return handleUpdate();
    }

    const slug = slugify(boardData.status);

    try {
      const { statusText } = await axios.post(
        `/api/${blogId}/todo/project-board`,
        {
          status: boardData.status,
          projectId: project.id,
          slug,
        }
      );

      toast.success(statusText);
      router.refresh();
      router.push(href2);
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setBoardData({ status: "" });
      setIsSubmitting(false);
      setIsAddBoardFormVisible(false);
    }
  };

  const handleFeatureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFeatureFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeatureChange2 = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedPriority = event.target.value as Priority;

    console.log(selectedPriority)

    setFeatureFormData((prevData) => ({
      ...prevData,
      priority: selectedPriority,
    }));
  };


  const handleUpdate2 = async () => {
    const slug = slugify(featureFormData.name.toLowerCase());
    try {
      const { statusText } = await axios.patch(`/api/${blogId}/todo/features/update`, {
        name: featureFormData.name,
        id:featureFormData.id,
        slug,
        description:featureFormData.description,
        finishDate:parseISO(featureFormData.finishDate),
        priority:featureFormData.priority   
      }
    );
      toast.success(statusText);
      router.refresh();
      router.push(href2);
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setIsAddBoardFormVisible(false);
    }
  };



  const handleFeatureSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(isUpdating){
      return handleUpdate2();
    }

    const slug = slugify(featureFormData.name.toLowerCase());
    const priority=featureFormData.priority
    try {
      const { statusText } = await axios.post(`/api/${blogId}/todo/features`, {
        ...featureFormData,
        slug,
        priority,
        projectBoardId: selectedBoardId,
      });

      toast.success(statusText);
      router.refresh();
      router.push(href2);
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setFeatureFormData({
        description: "",
        finishDate: "",
        name: "",
        priority: Priority.LOW,
      });
      setIsAddFeatureFormVisible(false);
    }
  };


  const editHandler = (board: ProjectBoard) => {
    setIsUpdating(true);
    setBoardData({
      id:board.id,
      status: board.status,
    });
    setIsAddBoardFormVisible(true);
  };


  const editHandler2 = (feature: Feature) => {
    setIsUpdating(true);
    setFeatureFormData({
      id:feature.id,
      name:feature.name,
      description:feature.description,
      finishDate:feature.finishDate.toString(),
      priority:feature.priority,
    });
    setIsAddFeatureFormVisible(true);
  };


  const toggleAddFeatureForm = () =>
    setIsAddFeatureFormVisible((prevState) => !prevState);



  const onDragEnd = async (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "status") {
      const movedBoard = project.projectBoards[source.index];
      const updatedProjectBoards = Array.from(project.projectBoards);

      updatedProjectBoards.splice(source.index, 1);
      updatedProjectBoards.splice(destination.index, 0, movedBoard);

      setProject({
        ...project,
        projectBoards: updatedProjectBoards.map((board, idx: number) => ({
          ...board,
          order: idx + 1,
        })),
      });

      try {
        const { statusText } = await axios.patch(
          `/api/${blogId}/todo/project-board`,
          {
            projectId: project.id,
            sourceIndex: source.index,
            destinationIndex: destination.index,
            type,
          }
        );

        toast.success(statusText);
        router.refresh();
      } catch (error) {
        setProject({
          ...project,
          projectBoards: project.projectBoards,
        });
        toast.error("Update in Project not successful");
      }
    } else if (type === "feature") {
      const { index: sourceIndex, droppableId: sourceBoardId } = source;
      const destinationBoardId = destination.droppableId;

      // const updatedProjectBoards = project.projectBoards.map((board) => {
      //   if (board.id === sourceBoardId) {
      //     const movedFeature = board.features.splice(sourceIndex, 1)[0];

      //     const destinationBoard = project.projectBoards.find(
      //       (board) => board.id === destinationBoardId
      //     );

      //     //   if (!destinationBoard) return;

      //     destinationBoard!.features.splice(destination.index, 0, movedFeature);

      //     return board;
      //   } else if (board.id === destinationBoardId) {
      //     return board;
      //   } else {
      //     return board;
      //   }
      // });

      // const updatedProject = {
      //   ...project,
      //   projectBoards: updatedProjectBoards,
      // };

      //NEW
      const sourceBoard = project.projectBoards.find(
        (board) => board.id === sourceBoardId
      );
      const destinationBoard = project.projectBoards.find(
        (board) => board.id === destinationBoardId
      );

      if (!sourceBoard || !destinationBoard) {
        // Handle the case where source or destination boards are not found
        console.error("Source or destination board not found.");
        return;
      }

      if (sourceBoardId === destinationBoardId) {
        if (!result.destination) return;

        const items = Array.from(sourceBoard.features);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const startIndex = Math.min(
          result.source.index,
          result.destination.index
        );
        const endIndex = Math.max(
          result.source.index,
          result.destination.index
        );

        const updatedFeatures = items.slice(startIndex, endIndex + 1);

        setFeatures(items);

        const bulkUpdateData = updatedFeatures.map((feature) => ({
          id: feature.id,
          order: items.findIndex((item) => item.id === feature.id),
        }));

        onReorder(bulkUpdateData);

      }
      const movedFeature = sourceBoard.features[sourceIndex];
      sourceBoard.features.splice(sourceIndex, 1);
      destinationBoard.features.splice(destination.index, 0, movedFeature);

      // Update the project with the new board features
      const updatedProject = {
        ...project,
        projectBoards: project.projectBoards.map((board) =>
          board.id === sourceBoardId || board.id === destinationBoardId
            ? board
            : { ...board }
        ),
      };

      ///END NEW
      setProject(updatedProject);

      

      try {
        const { statusText } = await axios.patch(
          `/api/${blogId}/todo/project-board`,
          {
            type: "feature",
            projectId: project.id,
            sourceIndex,
            destinationIndex: destination.index,
            sourceBoardId,
            destinationBoardId,
          }
        );

        toast.success(statusText);
        router.refresh();
      } catch (error) {
        toast.error("update in board not successful");
      }
    }
  };

  const onReorder = async (updateData: { id: string; order: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/${blogId}/todo/project-board/reorder`, {
        list: updateData
      });
      toast.success("Chapters reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  }

  

  const href = `/${blogId}/todo`;

  const onDelete = async (slug: string) => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/${blogId}/todo/projects/${slug}`);

      toast.success("Project deleted");
      router.refresh();
      router.push(`/${blogId}/todo`);
    } catch {
      toast.error("Something in Project went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal isVisible={isAddBoardFormVisible || isAddFeatureFormVisible} />
      <AddFeatureForm
        featureFormData={featureFormData}
        handleFeatureChange={handleFeatureChange}
        handleFeatureChange2={handleFeatureChange2}
        handleFeatureSubmit={handleFeatureSubmit}
        isVisible={isAddFeatureFormVisible}
        toggleAddFeatureForm={toggleAddFeatureForm}
      />
      <AddBoardForm
        isVisible={isAddBoardFormVisible}
        toggleAddBoardForm={toggleAddBoardForm}
        boardData={boardData}
        handleBoardSubmit={handleBoardSubmit}
        isSubmitting={isSubmitting}
        updateBoardHandler={updateBoardHandler}
        isUpdating={isUpdating}
      />
      <div className="m-5 py-4">
        <div className="flex justify-between">
          <Link
            href={href}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Project page
          </Link>
          <ConfirmModal onConfirm={() => onDelete(project.slug)}>
            <Button size="sm" disabled={isLoading}>
              <Trash className="h-4 w-4" />
            </Button>
          </ConfirmModal>
        </div>

        <div className="mb-6">
          <h4 className="text-2xl font-bold">{project.name}</h4>
          <p className="text-base text-gray-600">{project.description}</p>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="board-items"
            direction="horizontal"
            type="status"
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex gap-6 items-start"
              >
                {project.projectBoards
                  .sort((a: any, b: any) => a.order - b.order)
                  .map((projectBoard, idx) => (
                    <Draggable
                      key={projectBoard.id}
                      draggableId={projectBoard.id}
                      index={idx}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-[#f5f5f5] flex-shrink-0 w-[354px] rounded-2xl py-3 px-6"
                        >
                          <ProjectBoard
                            blogId={project.blogId}
                            slug={project.slug}
                            boardHeading={projectBoard.status}
                            boardId={projectBoard.id}
                            board={projectBoard}
                            numFeatures={projectBoard.features.length}
                            setSelectedBoardId={setSelectedBoardId}
                            toggleAddFeature={toggleAddFeatureForm}
                            editHandler={()=>editHandler(projectBoard)}
                          />

                          <Droppable
                            droppableId={projectBoard.id}
                            type="feature"
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {projectBoard.features.map((feature, idx) => (
                                  <Draggable
                                    key={feature.id}
                                    draggableId={feature.id}
                                    index={idx}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                      >
                                        <FeatureCard 
                                        feature={feature}
                                        feature2={feature}
                                        editHandler2={()=>editHandler2(feature)}
                                         />
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      )}
                    </Draggable>
                  ))}

                <div
                  onClick={toggleAddBoardForm}
                  className="grid place-content-center hover:bg-[#f5f5f5] cursor-pointer rounded-2xl border-4 border-dotted flex-none w-[354px] h-20 py-7 "
                >
                  <AiFillPlusCircle className="text-6xl" />
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default ProjectItem;
