"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreatePage = () => {
  const params = useParams();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/${params.blogId}/blogarticles`, values);
      router.push(`/${params.blogId}/author/blogarticles/${response.data.id}`);
      toast.success("Course created");
    } catch {
      toast.error("Something went wrong");
    }
  }

  return ( 
    <div className="max-w-7xl mx-auto flex md:items-center md:justify-start h-full p-6">
      <div>
        <h1 className="text-2xl">
          Name your Article
        </h1>
        <p className="text-sm text-slate-600">
          What would you like to name your article? Don&apos;t worry, you can change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Article title
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Geopol'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you talk about ?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/blogarticles">
                <Button
                  type="button"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
   );
}
 
export default CreatePage;