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

    // Store user profile with generated ID in the users table
    if (data.user) {
      const { error: profileError } = await supabase
        .from("users")
        .insert({
          auth_id: data.user.id,
          user_id: userId,
          email: email,
          first_name: metadata.firstName,
          last_name: metadata.lastName,
          gender: metadata.gender,
          age: parseInt(metadata.age),
          contact_no: metadata.contactNo,
          created_at: new Date().toISOString(),
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
