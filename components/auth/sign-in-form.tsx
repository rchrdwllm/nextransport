"use client";

import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "@bprogress/next";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, signInSchema } from "@/form-schemas/sign-in-schema";
import { signIn } from "@/lib/supabase";
import googleSvg from "@/assets/icons/Google.svg";
import facebookSvg from "@/assets/icons/Facebook.svg";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const handleSubmit: SubmitHandler<SignInSchema> = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      await signIn(data.email, data.password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-100 sm:max-w-125">
      <h1 className="font-bold text-4xl text-center">NexTranspo</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Email"
                  type="email"
                  className="text-sm"
                  disabled={isLoading}
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
                  disabled={isLoading}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
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
