"use client";

import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "@bprogress/next";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, signInSchema } from "@/form-schemas/sign-in-schema";
import googleSvg from "@/assets/icons/Google.svg";
import facebookSvg from "@/assets/icons/Facebook.svg";
import Link from "next/link";
import Image from "next/image";

const SignInForm = () => {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const handleSubmit: SubmitHandler<SignInSchema> = (data) => {
    // [TODO] Handle Supabase sign up logic here
    console.log({ data });

    router.push("/dashboard");
  };

  return (
    <div className="space-y-4 w-full max-w-100 sm:max-w-125">
      <h1 className="font-bold text-4xl text-center">NexTranspo</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Email"
                  type="email"
                  className="text-sm"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Password"
                  type="password"
                  className="text-sm"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={() => console.log(form.formState.errors)}>
            Sign in
          </Button>
          <p className="text-muted-foreground text-sm text-center">
            Or continue with
          </p>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              <Image className="size-4" src={googleSvg} alt="" />
              <span>Google</span>
            </Button>
            <Button variant="outline" className="flex-1">
              <Image className="size-4" src={facebookSvg} alt="" />
              <span>Facebook</span>
            </Button>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            Don't have an account yet?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
