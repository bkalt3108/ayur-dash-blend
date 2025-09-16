import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Leaf, Mail, Lock, User as UserIcon, Phone, MapPin, ArrowLeft } from 'lucide-react';
import type { User, Session } from '@supabase/supabase-js';

interface LoginForm {
  email: string;
  password: string;
}

interface PatientSignupForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  gender: string;
  location: string;
  contactNumber: string;
}

const PatientAuth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState<LoginForm>({ email: '', password: '' });
  const [patientForm, setPatientForm] = useState<PatientSignupForm>({
    fullName: '', email: '', password: '', confirmPassword: '', age: '', gender: '', location: '', contactNumber: ''
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
          setTimeout(async () => {
            const userType = session.user.user_metadata?.user_type;
            if (userType === 'patient') {
              // Check if patient has completed assessment
              const { data: profile } = await supabase
                .from('patient_profiles')
                .select('assessment_completed')
                .eq('user_id', session.user.id)
                .single();
              
              if (profile?.assessment_completed) {
                navigate('/patient/dashboard');
              } else {
                navigate('/patient/assessment');
              }
            } else if (userType === 'dietitian') {
              navigate('/dietitian/dashboard');
            } else {
              navigate('/patient/assessment');
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
        if (userType === 'patient') {
          navigate('/patient/dashboard');
        } else if (userType === 'dietitian') {
          navigate('/dietitian/dashboard');
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

  const handlePatientSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (patientForm.password !== patientForm.confirmPassword) {
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
        email: patientForm.email,
        password: patientForm.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            user_type: 'patient',
            full_name: patientForm.fullName,
            age: patientForm.age,
            gender: patientForm.gender,
            location: patientForm.location,
            contact_number: patientForm.contactNumber,
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

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-white" />
            <h1 className="text-3xl font-bold text-white">AyurDiet</h1>
          </div>
          <p className="text-sage-100 mb-4">Patient Portal</p>
          <p className="text-sage-200 text-sm">Start your personalized Ayurvedic wellness journey</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-sage-800">Patient Access</CardTitle>
            <CardDescription>Login or create your patient account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
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
                <form onSubmit={handlePatientSignup} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-name">Full Name</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="patient-name"
                          placeholder="John Doe"
                          className="pl-10"
                          value={patientForm.fullName}
                          onChange={(e) => setPatientForm(prev => ({ ...prev, fullName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="patient-email"
                          type="email"
                          placeholder="john@example.com"
                          className="pl-10"
                          value={patientForm.email}
                          onChange={(e) => setPatientForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="patient-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={patientForm.password}
                          onChange={(e) => setPatientForm(prev => ({ ...prev, password: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="patient-confirm-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          value={patientForm.confirmPassword}
                          onChange={(e) => setPatientForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-age">Age</Label>
                      <Input
                        id="patient-age"
                        type="number"
                        placeholder="25"
                        value={patientForm.age}
                        onChange={(e) => setPatientForm(prev => ({ ...prev, age: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-gender">Gender</Label>
                      <Select value={patientForm.gender} onValueChange={(value) => setPatientForm(prev => ({ ...prev, gender: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-contact">Contact Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="patient-contact"
                          placeholder="+91 98765 43210"
                          className="pl-10"
                          value={patientForm.contactNumber}
                          onChange={(e) => setPatientForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patient-location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="patient-location"
                        placeholder="City, State"
                        className="pl-10"
                        value={patientForm.location}
                        onChange={(e) => setPatientForm(prev => ({ ...prev, location: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Patient Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center space-y-2">
              <Link to="/dietitian-auth" className="text-sm text-primary hover:underline">
                Are you a dietitian? Click here
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

export default PatientAuth;