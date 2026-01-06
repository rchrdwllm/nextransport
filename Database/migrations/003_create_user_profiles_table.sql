-- 4. user_profiles (references public.users)
CREATE TABLE public.user_profiles (
  id uuid NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE,
  mobile_number text NOT NULL UNIQUE,
  gender text NOT NULL CHECK (gender = ANY (ARRAY['Male','Female','Prefer not to say'])),
  age integer NOT NULL CHECK (age >= 13 AND age <= 100),
  enable_location boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT user_profiles_id_fkey FOREIGN KEY (id) REFERENCES public.users(id)
);
