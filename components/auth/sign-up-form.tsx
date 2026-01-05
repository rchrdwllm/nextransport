"use client";

import { SignUpSchema, signUpSchema } from "@/form-schemas/sign-up-schema";
import { useRouter } from "@bprogress/next";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { signUp } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import googleSvg from "@/assets/icons/Google.svg";
import facebookSvg from "@/assets/icons/Facebook.svg";
import { useState } from "react";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      age: undefined,
      contactNo: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const handleSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      await signUp(data.email, data.password, {
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        age: data.age,
        contactNo: data.contactNo,
      });
      
      // Show success message and redirect
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to sign up. Please try again.");
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
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
            <FormField
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <Input
                    className="text-sm"
                    placeholder="First name"
                    disabled={isLoading}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <Input
                    className="text-sm"
                    placeholder="Last name"
                    disabled={isLoading}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="gender"
            render={({ field }) => (
              <FormItem>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="age"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Age"
                  className="text-sm"
                  type="number"
                  min={0}
                  disabled={isLoading}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="contactNo"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Contact no."
                  className="text-sm"
                  disabled={isLoading}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <Input
                  placeholder="Confirm Password"
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
            {isLoading ? "Signing up..." : "Sign up"}
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
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
