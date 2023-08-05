"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function LogIn() {
  const formSchema = z.object({
    email: z
      .string()
      .nonempty("This is required")
      .email({ message: "Must be a valid email" }),
    password: z
      .string()
      .nonempty("This is required")
      .min(8, { message: "Too short" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("credentials", { ...values, redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
      }
      if (callback?.ok && !callback.error) {
        window.location.assign("/");
        toast.success("Logged in successfully!");
      }
    });
  }
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="text-3xl font-medium">Sign In</div>
        <div>to continue to ecommerce-admin</div>
      </div>
      <div className="mx-auto mb-0 mt-8 max-w-md space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <p className="text-sm">
                No account?
                <Link className="underline" href="/auth/register">
                  Sign up
                </Link>
              </p>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
