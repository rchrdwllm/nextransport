import Link from "next/link";

const SignInForm = () => {
  return (
    <div className="space-y-4 w-full max-w-100 sm:max-w-125">
      <h1 className="font-bold text-4xl text-center">NexTransport</h1>
      <form className="flex flex-col gap-4 px-8">
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="block p-3 border border-teal-900/10 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="block p-3 border border-teal-900/10 rounded-lg"
        />
        <button
          type="submit"
          className="block bg-primary p-3 rounded-lg text-primary-foreground cursor-pointer"
        >
          Sign in
        </button>
        <p className="text-muted text-sm text-center">
          Don't have an account yet?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
