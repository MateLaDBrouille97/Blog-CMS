import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";

import prismadb from "@/lib/prismadb";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";
import { AuthorForm } from "./_components/author-form";
import { SubCategoryForm } from "./_components/subcategory-form";

const BlogarticleIdPage = async ({
  params
}: {
  params: { blogarticleId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/blogarticles");
  }

  const article = await prismadb.blogarticle.findUnique({
    where: {
      id: params.blogarticleId,
      userId
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await prismadb.categoryBlog.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const subcategories = await prismadb.subCategoryBlog.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const authors = await prismadb.author.findMany({
    orderBy: {
      firstName: "asc",
    },
  });

  if (!article) {
    return redirect("/blogarticles");
  }

  const requiredFields = [
    article.title,
    article.description,
    article.imageUrl,
    article.categoryId,
    article.authorId,
    article.chapters.some(chapter => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!article.isPublished && (
        <Banner
          label="This article is unpublished. It will not be visible to readers."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              article setup
            </h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            blogarticleId={params.blogarticleId}
            isPublished={article.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Customize your article
              </h2>
            </div>
            <TitleForm
              initialData={article}
              blogarticleId={article.id}
            />
            <DescriptionForm
              initialData={article}
              blogarticleId={article.id}
            />
            <ImageForm
              initialData={article}
              blogarticleId={article.id}
            />
            <CategoryForm
              initialData={article}
              blogarticleId={article.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
             <SubCategoryForm
              initialData={article}
              blogarticleId={article.id}
              options={subcategories.map((subcategory) => ({
                label: subcategory.name,
                value: subcategory.id,
              }))}
            />
             <AuthorForm
              initialData={article}
              blogarticleId={article.id}
              options={authors.map((author) => ({
                label: author.firstName,
                value: author.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">
                  article chapters
                </h2>
              </div>
              <ChaptersForm
                initialData={article}
                blogarticleId={article.id}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">
                  Sell your article
                </h2>
              </div>
              <PriceForm
                initialData={article}
                blogarticleId={article.id}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">
                  Resources & Attachments
                </h2>
              </div>
              <AttachmentForm
                initialData={article}
                blogarticleId={article.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default BlogarticleIdPage;