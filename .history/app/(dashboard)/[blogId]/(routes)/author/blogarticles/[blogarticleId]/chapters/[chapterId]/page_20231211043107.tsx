import { auth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  LayoutDashboard,
  Video,
  ImageIcon,
} from "lucide-react";

import prismadb from "@/lib/prismadb";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { ChapterActions } from "./_components/chapter-actions";
import { ChapterImageForm } from "./_components/chapter-image-form";
import { ChapterHrefForm } from "./_components/chapter-href-form";
import { ChapterYoutubeAccessForm } from "./_components/chapter-youtube-access-form";
import { ChapterYoutubeHrefForm } from "./_components/chapter-youtube-form";
import { Button } from "@/components/ui/button";

const ChapterIdPage = async ({
  params,
}: {
  params: { blogarticleId: string; chapterId: string; blogId:string};
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/blogarticles");
  }

  const chapter = await prismadb.chapter.findUnique({
    where: {
      id: params.chapterId,
      blogarticleId: params.blogarticleId,
    },
    include: {
      muxData: true,
    },
  });

  // const blog = await prismadb.blog.findUnique({
  //   where: {
  //     id: params.blogId, 
  //   },
  // });

  if (!chapter) {
    return redirect("/blogarticles");
  }

  const requiredFields = [chapter.title, chapter.description];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  const href = `/${params.blogId}/author/blogarticles/${params.blogarticleId}`


  

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={href}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                blogarticleId={params.blogarticleId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                blogarticleId={params.blogarticleId}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                blogarticleId={params.blogarticleId}
                chapterId={params.chapterId}
              />
              <ChapterHrefForm
                initialData={chapter}
                blogarticleId={params.blogarticleId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                blogarticleId={params.blogarticleId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ImageIcon} />
                <h2 className="text-xl">Add a Image</h2>
              </div>
              <ChapterImageForm
                initialData={chapter}
                chapterId={params.chapterId}
                blogarticleId={params.blogarticleId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} />
                <h2 className="text-xl">Add a video</h2>
              </div>
              <ChapterVideoForm
                initialData={chapter}
                chapterId={params.chapterId}
                blogarticleId={params.blogarticleId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;
