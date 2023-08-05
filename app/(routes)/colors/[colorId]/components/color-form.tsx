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
import { Color } from "@prisma/client";
import Heading from "@/components/Heading";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  colorName: z.string().min(2, {
    message: "categry name must be at least 2 characters.",
  }),
  colorValue: z.string().min(4).max(9).regex(/^#/, {
    message: "String must be a valid hex code",
  }),
});

interface ColorFormProps {
  initialData: Color | null;
}

type ColorFormValues = z.infer<typeof formSchema>;

export default function ColorForm({ initialData }: ColorFormProps) {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit color" : "Create color";
  const description = initialData ? "Edit a color." : "Add a new color";
  const toastMessage = initialData ? "Color updated!" : "Color created!";
  const action = initialData ? "Save changes" : "Create";
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      colorName: "",
      colorValue: "",
    },
  });

  async function onSubmit(values: ColorFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/colors/${params.colorId}`, values);
      } else {
        await axios.post("/api/colors", values);
      }
      router.refresh();
      router.push("/colors");
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
        {/* {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )} */}
      </div>
      {/* <div>Hello</div> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid md:grid-cols-3 gap-8 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="colorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input placeholder="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
