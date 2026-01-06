-- 6. ride_bookings
CREATE TABLE public.ride_bookings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  rider_id uuid NOT NULL,
  commute_session_id uuid,
  pickup text NOT NULL,
  destination text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status = ANY (ARRAY['pending','accepted','rider_on_way','arrived','active','completed','cancelled'])),
  price numeric NOT NULL CHECK (price > 0),
  eta_minutes integer CHECK (eta_minutes > 0),
  distance_km numeric CHECK (distance_km > 0),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ride_bookings_pkey PRIMARY KEY (id),
  CONSTRAINT ride_bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT ride_bookings_rider_id_fkey FOREIGN KEY (rider_id) REFERENCES public.user_profiles(id),
  CONSTRAINT ride_bookings_commute_session_id_fkey FOREIGN KEY (commute_session_id) REFERENCES public.commute_sessions(id)
);

-- 7. ratings
CREATE TABLE public.ratings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  booking_id uuid,
  commute_session_id uuid,
  app_rating integer CHECK (app_rating >= 1 AND app_rating <= 5),
  rider_rating integer CHECK (rider_rating >= 1 AND rider_rating <= 5),
  comment text CHECK (length(comment) <= 150),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ratings_pkey PRIMARY KEY (id),
  CONSTRAINT ratings_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.ride_bookings(id),
  CONSTRAINT ratings_commute_session_id_fkey FOREIGN KEY (commute_session_id) REFERENCES public.commute_sessions(id)
);
