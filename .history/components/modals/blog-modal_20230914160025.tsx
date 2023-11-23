"use client";

import * as z from "zod"

import { Modal } from "@/components/ui/modal";
import { useBlogModal } from "@/hooks/use-store-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Permet d'avoir des notifications 

const formSchema = z.object({
  name: z.string().min(1),
});

export const BlogModal =()=> {

    const [loading,setLoading] = useState (false);
    const blogModal =  useBlogModal();

     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/blogs', values);
      window.location.assign(`/${response.data.id}`); //Cela fait un refresh total et load le bon magasin dans la page voulue
      console.log(response.data)
    } catch (error) {
      toast.error('Something went wrong'); //pour utiliser toast ne pas oublier de l'installer avec npm et initialiser un provider que l'on place dans le layout 
    } finally {
      setLoading(false);
    }
  };



    return (
        <Modal
        title="Create Blog"
        description="Add pictures to share your new aventure ?"
        isOpen={blogModal.isOpen} 
        onClose={blogModal.onClose}
      >
        <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                         disabled={loading} 
                         placeholder="Blog" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                  disabled={loading} 
                  variant="outline" onClick={blogModal.onClose}>
                    Cancel
                  </Button>
                  <Button 
                  disabled={loading}
                   type="submit">Continue</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      </Modal>
    );

}