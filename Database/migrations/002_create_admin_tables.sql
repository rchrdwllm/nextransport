-- 2. admin_users
CREATE TABLE public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'admin' CHECK (role = ANY (ARRAY['super_admin','admin','analyst'])),
  is_active boolean NOT NULL DEFAULT true,
  last_login timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT admin_users_pkey PRIMARY KEY (id)
);

-- 3. admin_activity_logs
CREATE TABLE public.admin_activity_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL,
  action text NOT NULL,
  entity_type text,
  entity_id uuid,
  details jsonb,
  ip_address text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT admin_activity_logs_pkey PRIMARY KEY (id),
  CONSTRAINT admin_activity_logs_admin_id_fkey FOREIGN KEY (admin_id) REFERENCES public.admin_users(id)
);
