import { createClient } from "@supabase/supabase-js";
import { generateUserId } from "@/Backend/API/Generator/UserIdGenerator";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sign in with email and password
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

// Sign up with email and password
export async function signUp(
  email: string,
  password: string,
  metadata: {
    firstName: string;
    lastName: string;
    gender: string;
    age: string;
    contactNo: string;
  }
) {
  try {
    // Generate unique user ID
    const userId = generateUserId();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          ...metadata,
          user_id: userId,
        },
      },
    });

    if (error) {
      throw error;
    }

    console.log({ data });

    // Store user in users table and user_profiles table
    if (data.user) {
      // First, create the user record
      const { error: userError } = await supabase.from("users").insert({
        id: data.user.id,
        email: email,
      });

      if (userError) {
        console.error("Error creating user:", userError);
        throw new Error(
          "User created but failed to save user record. Please contact support."
        );
      }

      // Then, create the user profile
      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert({
          id: data.user.id,
          first_name: metadata.firstName,
          last_name: metadata.lastName,
          email: email,
          mobile_number: metadata.contactNo,
          gender: metadata.gender.charAt(0).toUpperCase() + metadata.gender.slice(1).toLowerCase(),
          age: parseInt(metadata.age),
        });

      if (profileError) {
        console.error("Error creating user profile:", profileError);
        throw new Error(
          "User created but failed to save profile. Please contact support."
        );
      }
    }

    return { ...data, userId };
  } catch (error) {
    throw error;
  }
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

// Get current user
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return user;
}

// Get session
export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return session;
}
