"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { Project } from "@/models/project";
import ProjectTable from "@/components/ProjectTable/ProjectTable";
import Modal from "@/components/Modal/Modal";
import ProjectForm from "@/components/ProjectForm/ProjectForm";
import slugify from "slugify";
import { toast } from "react-hot-toast";
import { redirect, useParams, useRouter } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { Blog } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";


export default function Home() {

  
  interface FormData {
    name: string;
    description: string;
    id?: string;
  }

  const [projects, setProjects] = useState<null | Project[]>(null);
  const [showForm, setShowForm] = useState(false);
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isEditProject, setisEditProject] = useState(false);
  const [blog, setBlog] = useState<Blog>();

  const [formData, setFormData] = useState<FormData>({
    description: "",
    name: "",
    
  });

  const { blogId } = useParams();

  const href2 = `/${blogId}/todo`

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get(`/api/${blogId}/todo/projects`);
      setProjects(data);
    };

    fetchProjects();
  }, [blogId]);

  let BId: string = blogId as string;

  useEffect(() => {
    const fetchBlog = async () => {
      const blogByUserId = await prismadb.blog.findUnique({
        where: {
          id: BId,
        },
      });

      if (!blogByUserId) {
        return new NextResponse("Unauthorized", { status: 405 });
      }

      setBlog(blogByUserId);
    };
    fetchBlog();
  }, [BId, blogId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEditProject) {
      return handleUpdate();
    }

    setIsCreateProject(true);

    const slug = slugify(formData.name);

    try {
      const { statusText } = await axios.post(`/api/${blogId}/todo/projects`, {
        description: formData.description,
        name: formData.name,
        slug,
        blogId: blogId,
      });

      toast.success(statusText);
      router.refresh();
      router.push(href2);
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setFormData({ description: "", name: "" });
      setShowForm(false);
      setIsCreateProject(false);
    }
  };

  const handleUpdate = async () => {
    const slug = slugify(formData.name);

    try {
      const { statusText } = await axios.patch(`/api/${blogId}/todo/projects`, {
        id: formData.id,
        description: formData.description,
        name: formData.name,
        slug,
        blogId: blogId,
      });

      toast.success(statusText);
      router.refresh();
      router.push(href2);
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setShowForm(false);
    }
  };

  const router = useRouter();

  const toggleProjectForm = () => setShowForm((prevState) => !prevState);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="m-5 py-4">
        <Modal isVisible={showForm} />
        <ProjectForm
          formData={formData}
          isVisible={showForm}
          toggleProjectForm={toggleProjectForm}
          handleSubmit={handleSubmit}
          isCreateProject={isCreateProject}
          onChange={handleInputChange}
          isEditProject={isEditProject}
        />
        <button
          onClick={() => {
            setFormData({ description: "", name: "" });
            toggleProjectForm();
          }}
          className="relative outline-none inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 hover:text-white focus:ring-blue-300"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Create Project
          </span>
        </button>
        {projects && (
          <ProjectTable
            projects={projects}
            setisEditProject={setisEditProject}
            setFormData={setFormData}
            setShowForm={setShowForm}
          />
        )}
      </div>
      <Separator />
      <Heading title="API" description="API Calls for Projects" />
      <Separator />
      <ApiList entityName="todo" entityIdName="" />
    </>
  );
}
