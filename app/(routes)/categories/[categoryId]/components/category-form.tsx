"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Category } from "@prisma/client";
import Heading from "@/components/Heading";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Trash } from "lucide-react";

const formSchema = z.object({
  categoryName: z.string().min(2, {
    message: "categry name must be at least 2 characters.",
  }),
});

interface CategoryFormProps {
  initialData: Category | null;
}

type CategoryFormValues = z.infer<typeof formSchema>;

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category." : "Add a new category";
  const toastMessage = initialData ? "Category updated!" : "Category created!";
  const action = initialData ? "Save changes" : "Create";
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      categoryName: "",
    },
  });

  async function onSubmit(values: CategoryFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/categories/${params.categoryId}`, values);
      } else {
        await axios.post("/api/categories", values);
      }
      router.refresh();
      router.push("/categories");
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-3 gap-8 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
