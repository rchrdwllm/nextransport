-- 5. commute_sessions
CREATE TABLE public.commute_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  pickup text NOT NULL,
  destination text NOT NULL,
  ride_type text NOT NULL DEFAULT 'Jeepney' CHECK (ride_type = ANY (ARRAY['Jeepney','Bus','Motor (Angkas)','Taxi','Grab'])),
  preferred_arrival timestamp with time zone,
  recommendation text CHECK (recommendation = ANY (ARRAY['WAIT','GO'])),
  confidence text CHECK (confidence = ANY (ARRAY['High','Medium','Low'])),
  wait_estimate text,
  cost_comparison text,
  reason text,
  outcome text,
  created_at timestamp with time zone DEFAULT now(),
  corridor text,s
  predicted_wait_minutes integer,
  actual_wait_minutes integer,
  user_followed_recommendation boolean,
  feedback_helpful boolean,
  CONSTRAINT commute_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT commute_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
