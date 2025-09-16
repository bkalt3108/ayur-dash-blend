-- Add assessment completion tracking to patient profiles
ALTER TABLE public.patient_profiles 
ADD COLUMN assessment_completed BOOLEAN DEFAULT false;

-- Add assessment data storage
ALTER TABLE public.patient_profiles 
ADD COLUMN prakriti_type TEXT,
ADD COLUMN constitution_scores JSONB,
ADD COLUMN health_goals TEXT[],
ADD COLUMN dietary_preferences JSONB;