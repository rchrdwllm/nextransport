"use client";

import { SignUpSchema, signUpSchema } from "@/form-schemas/sign-up-schema";
import { useRouter } from "@bprogress/next";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

const SignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      contactNo: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const handleSubmit: SubmitHandler<SignUpSchema> = (data) => {
    // [TODO] Handle Supabase sign up logic here
    console.log({ data });

    router.push("/dashboard");
  };

  return (
    <div className="space-y-4 w-full max-w-100 sm:max-w-125">
      <h1 className="font-bold text-4xl text-center">NexTransport</h1>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
          <div>
            <input
              type="text"
              placeholder="First name"
              className="block p-3 border border-teal-900/10 rounded-lg w-full"
              {...form.register("firstName")}
            />
            {form.formState.errors.firstName && (
              <p className="mt-1 text-red-600 text-sm">
                {form.formState.errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Last name"
              className="block p-3 border border-teal-900/10 rounded-lg w-full"
              {...form.register("lastName")}
            />
            {form.formState.errors.lastName && (
              <p className="mt-1 text-red-600 text-sm">
                {form.formState.errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <div className="block p-3 px-2 border border-teal-900/10 rounded-lg">
            <select
              className="block w-full"
              id="gender"
              defaultValue="gender"
              {...form.register("gender")}
            >
              <option value="gender" className="text-muted" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {form.formState.errors.gender && (
            <p className="mt-1 text-red-600 text-sm">
              {form.formState.errors.gender.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Contact no."
            className="block p-3 border border-teal-900/10 rounded-lg w-full"
            {...form.register("contactNo")}
          />
          {form.formState.errors.contactNo && (
            <p className="mt-1 text-red-600 text-sm">
              {form.formState.errors.contactNo.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            className="block p-3 border border-teal-900/10 rounded-lg w-full"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-red-600 text-sm">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="block p-3 border border-teal-900/10 rounded-lg w-full"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="mt-1 text-red-600 text-sm">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            className="block p-3 border border-teal-900/10 rounded-lg w-full"
            {...form.register("confirmPassword")}
          />
          {form.formState.errors.confirmPassword && (
            <p className="mt-1 text-red-600 text-sm">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="block bg-primary p-3 rounded-lg text-primary-foreground cursor-pointer"
        >
          Sign up
        </button>
        <p className="text-muted text-sm text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
