"use client";

import { format } from "date-fns";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import { Project } from "@/models/project";
import { useParams, useRouter } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
// import prismadb from "@/lib/prismadb";
import { Blog } from "@prisma/client";
import { ConfirmModal } from "../modals/confirm-modal";
import { Button } from "../ui/button";
import { Trash, PenIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  description: string;
  id?: string;
}

type Props = {
  projects: Project[];
  setisEditProject: Dispatch<SetStateAction<boolean>>;
  setFormData: Dispatch<SetStateAction<FormData>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
};

const ProjectTable: FC<Props> = (props) => {
  const { projects, setisEditProject, setFormData, setShowForm } = props;

  // const [blog, setBlog] = useState<Blog>();

  const editHandler = (project: Project) => {
    setisEditProject(true);
    setFormData({
      id: project.id,
      description: project.description,
      name: project.name,
    });
    setShowForm(true);
  };

  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const href = `/${params.blogId}/todo`;

  const onDelete = async (projectSlug: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.blogId}/todo/projects/${projectSlug}`);
      toast.success("Board deleted");
      router.refresh();
      router.push(`/${params.blogId}/todo`);
    } catch {
      toast.error("Something in Board went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // const submit = (project: Project) => {
  //   if(!params)
  //   { return new NextResponse('Please params are required', { status: 400 });}
  //   const fetchBlog = async () => {
  //    await router.push(`todo/projects/${project.slug}`)
  //   }
  //   fetchBlog();
  // };

  // let BId:string = blogId as string;

  // useEffect(() => {
  //   const fetchBlog = async () => {

  //     const blogByUserId = await prismadb.blog.findFirst({
  //       where: {
  //         id: BId,

  //       },
  //     });

  //     if (!blogByUserId) {
  //       return new NextResponse("Unauthorized", { status: 405 });
  //     }

  //     setBlog(blogByUserId);
  //   };
  //   fetchBlog();
  // }, [BId, blogId]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            const formattedDate = format(
              new Date(project.createdAt),
              "dd/MM/yyyy"
            );
            return (
              <tr
                key={project.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer underline"
                >
                  <Link href={`todo/projects/${project.slug}`}>
                    {project.name}
                  </Link>
                </th>
                <td className="px-6 py-4">
                  <Link href={`todo/projects/${project.slug}`}>
                    {project.description}
                  </Link>
                </td>
                <td className="px-6 py-4">{formattedDate}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex flex-row justify-end">
                    <button
                      onClick={() => editHandler(project)}
                      className="font-medium text-black-500 hover:underline mx-5 "
                    >
                      <PenIcon className="h-4 w-4" />
                    </button>

                    <div className="mx-5">
                      <ConfirmModal onConfirm={() => onDelete(project.slug)}>
                        <Button size="sm" disabled={isLoading}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </ConfirmModal>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
