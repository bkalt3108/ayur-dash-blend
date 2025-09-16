import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Leaf, Mail, Lock, User as UserIcon, Phone, MapPin, GraduationCap, Award, ArrowLeft } from 'lucide-react';
import type { User, Session } from '@supabase/supabase-js';

interface LoginForm {
  email: string;
  password: string;
}

interface DietitianSignupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  licenseNumber: string;
  qualification: string;
  specializationAreas: string[];
  yearsExperience: string;
  clinicName: string;
  location: string;
  contactNumber: string;
  preferredLanguages: string[];
  practiceType: string;
}

const DietitianAuth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState<LoginForm>({ email: '', password: '' });
  const [dietitianForm, setDietitianForm] = useState<DietitianSignupForm>({
    fullName: '', email: '', password: '', confirmPassword: '', licenseNumber: '', qualification: '',
    specializationAreas: [], yearsExperience: '', clinicName: '', location: '', contactNumber: '',
    preferredLanguages: [], practiceType: ''
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            const userType = session.user.user_metadata?.user_type;
            if (userType === 'dietitian') {
              navigate('/dietitian/dashboard');
            } else if (userType === 'patient') {
              navigate('/patient/dashboard');
            } else {
              navigate('/dietitian/dashboard');
            }
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const userType = session.user.user_metadata?.user_type;
        if (userType === 'dietitian') {
          navigate('/dietitian/dashboard');
        } else if (userType === 'patient') {
          navigate('/patient/dashboard');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDietitianSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (dietitianForm.password !== dietitianForm.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: dietitianForm.email,
        password: dietitianForm.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            user_type: 'dietitian',
            full_name: dietitianForm.fullName,
            license_number: dietitianForm.licenseNumber,
            qualification: dietitianForm.qualification,
            specialization_areas: dietitianForm.specializationAreas,
            years_experience: dietitianForm.yearsExperience,
            clinic_name: dietitianForm.clinicName,
            location: dietitianForm.location,
            contact_number: dietitianForm.contactNumber,
            preferred_languages: dietitianForm.preferredLanguages,
            practice_type: dietitianForm.practiceType,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSpecializationToggle = (specialization: string) => {
    setDietitianForm(prev => ({
      ...prev,
      specializationAreas: prev.specializationAreas.includes(specialization)
        ? prev.specializationAreas.filter(s => s !== specialization)
        : [...prev.specializationAreas, specialization]
    }));
  };

  const handleLanguageToggle = (language: string) => {
    setDietitianForm(prev => ({
      ...prev,
      preferredLanguages: prev.preferredLanguages.includes(language)
        ? prev.preferredLanguages.filter(l => l !== language)
        : [...prev.preferredLanguages, language]
    }));
  };

  const specializationOptions = [
    'Weight Management', 'Diabetes Care', 'Heart Health', 'Digestive Health',
    'Ayurvedic Nutrition', 'Sports Nutrition', 'Pediatric Nutrition', 'Geriatric Care'
  ];

  const languageOptions = [
    'English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Kannada'
  ];

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-white" />
            <h1 className="text-3xl font-bold text-white">AyurDiet</h1>
          </div>
          <p className="text-sage-100 mb-4">Dietitian Portal</p>
          <p className="text-sage-200 text-sm">Empower patients with personalized Ayurvedic nutrition</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-sage-800">Dietitian Access</CardTitle>
            <CardDescription>Login or register as a certified dietitian</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleDietitianSignup} className="space-y-6 max-h-96 overflow-y-auto pr-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dietitian-name">Full Name</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="dietitian-name"
                          placeholder="Dr. Jane Smith"
                          className="pl-10"
                          value={dietitianForm.fullName}
                          onChange={(e) => setDietitianForm(prev => ({ ...prev, fullName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dietitian-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="dietitian-email"
                          type="email"
                          placeholder="dr.smith@example.com"
                          className="pl-10"
                          value={dietitianForm.email}
                          onChange={(e) => setDietitianForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dietitian-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="dietitian-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={dietitianForm.password}
                          onChange={(e) => setDietitianForm(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dietitian-confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="dietitian-confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={dietitianForm.confirmPassword}
                          onChange={(e) => setDietitianForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="license-number">License Number</Label>
                      <div className="relative">
                        <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="license-number"
                          placeholder="RD123456"
                          className="pl-10"
                          value={dietitianForm.licenseNumber}
                          onChange={(e) => setDietitianForm(prev => ({ ...prev, licenseNumber: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="years-experience">Years of Experience</Label>
                      <Input
                        id="years-experience"
                        type="number"
                        placeholder="5"
                        value={dietitianForm.yearsExperience}
                        onChange={(e) => setDietitianForm(prev => ({ ...prev, yearsExperience: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualification">Highest Qualification</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="qualification"
                        placeholder="M.Sc. Clinical Nutrition"
                        className="pl-10"
                        value={dietitianForm.qualification}
                        onChange={(e) => setDietitianForm(prev => ({ ...prev, qualification: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Specialization Areas</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {specializationOptions.map((specialization) => (
                        <div key={specialization} className="flex items-center space-x-2">
                          <Checkbox
                            id={`spec-${specialization}`}
                            checked={dietitianForm.specializationAreas.includes(specialization)}
                            onCheckedChange={() => handleSpecializationToggle(specialization)}
                          />
                          <Label htmlFor={`spec-${specialization}`} className="text-sm">
                            {specialization}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clinic-name">Clinic/Hospital Name</Label>
                      <Input
                        id="clinic-name"
                        placeholder="Wellness Clinic"
                        value={dietitianForm.clinicName}
                        onChange={(e) => setDietitianForm(prev => ({ ...prev, clinicName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="practice-type">Practice Type</Label>
                      <Select value={dietitianForm.practiceType} onValueChange={(value) => setDietitianForm(prev => ({ ...prev, practiceType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select practice type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private">Private Practice</SelectItem>
                          <SelectItem value="hospital">Hospital</SelectItem>
                          <SelectItem value="clinic">Clinic</SelectItem>
                          <SelectItem value="online">Online Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dietitian-location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="dietitian-location"
                          placeholder="City, State"
                          className="pl-10"
                          value={dietitianForm.location}
                          onChange={(e) => setDietitianForm(prev => ({ ...prev, location: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dietitian-contact">Contact Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="dietitian-contact"
                          placeholder="+91 98765 43210"
                          className="pl-10"
                          value={dietitianForm.contactNumber}
                          onChange={(e) => setDietitianForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Languages</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {languageOptions.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={`lang-${language}`}
                            checked={dietitianForm.preferredLanguages.includes(language)}
                            onCheckedChange={() => handleLanguageToggle(language)}
                          />
                          <Label htmlFor={`lang-${language}`} className="text-sm">
                            {language}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Dietitian Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center space-y-2">
              <Link to="/patient-auth" className="text-sm text-primary hover:underline">
                Are you a patient? Click here
              </Link>
              <div className="flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <Link to="/" className="text-sm text-muted-foreground hover:underline">
                  Back to Home
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DietitianAuth;