import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { 
  Leaf, 
  Brain, 
  Target, 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Heart,
  Utensils,
  Activity,
  Home,
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientAssessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState({
    constitution: {
      digestion: "",
      energy: "",
      sleep: "",
      bodyType: "",
      temperament: ""
    },
    healthGoals: {} as Record<string, boolean>,
    dietaryPreferences: {}
  });
  const [constitutionScores, setConstitutionScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
  const [prakriti, setPrakriti] = useState("");
  const [showResults, setShowResults] = useState(false);

  const steps = [
    { id: 1, title: "Ayurvedic Assessment", icon: Brain, description: "Discover your unique constitution" },
    { id: 2, title: "Health Goals", icon: Target, description: "Set your wellness objectives" },
    { id: 3, title: "Diet Preferences", icon: Utensils, description: "Share your food preferences" },
    { id: 4, title: "AI Diet Plan", icon: Sparkles, description: "Get your personalized plan" }
  ];

  const constitutionQuestions = [
    {
      id: "digestion",
      question: "How is your digestion typically?",
      options: [
        { value: "vata", label: "Irregular, sometimes bloated, gas", description: "Variable appetite, tends to be anxious about food" },
        { value: "pitta", label: "Strong, regular, efficient", description: "Good appetite, gets hungry easily" },
        { value: "kapha", label: "Slow but steady, heavy feeling", description: "Moderate appetite, takes time to digest" }
      ]
    },
    {
      id: "energy",
      question: "What best describes your energy levels?",
      options: [
        { value: "vata", label: "Bursts of energy, then exhaustion", description: "Creative bursts followed by fatigue" },
        { value: "pitta", label: "Consistent, focused, driven", description: "Sustained energy throughout the day" },
        { value: "kapha", label: "Steady, enduring, slow to start", description: "Takes time to get going but maintains well" }
      ]
    },
    {
      id: "sleep",
      question: "How do you typically sleep?",
      options: [
        { value: "vata", label: "Light sleeper, restless, racing thoughts", description: "Often wake up during night" },
        { value: "pitta", label: "Moderate sleep, vivid dreams", description: "Generally good sleep quality" },
        { value: "kapha", label: "Deep, long sleep, hard to wake up", description: "Love sleeping in, feel groggy when woken" }
      ]
    }
  ];

  const healthGoals = [
    { id: "weight-loss", label: "Weight Management", icon: Activity, description: "Achieve healthy weight balance" },
    { id: "diabetes", label: "Blood Sugar Control", icon: Heart, description: "Manage diabetes naturally" },
    { id: "digestion", label: "Digestive Health", icon: Utensils, description: "Improve digestion and gut health" },
    { id: "energy", label: "Boost Energy", icon: Sparkles, description: "Increase vitality and stamina" },
    { id: "stress", label: "Stress Management", icon: Brain, description: "Reduce stress and anxiety" },
    { id: "immunity", label: "Build Immunity", icon: CheckCircle, description: "Strengthen natural defenses" }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === 1) {
      calculatePrakriti();
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculatePrakriti = () => {
    const answers = Object.values(assessmentData.constitution);
    const counts = { vata: 0, pitta: 0, kapha: 0 };
    
    answers.forEach(answer => {
      if (answer) counts[answer as keyof typeof counts]++;
    });

    setConstitutionScores(counts);
    
    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    
    if (dominant[0][1] === dominant[1][1]) {
      setPrakriti(`${dominant[0][0]}-${dominant[1][0]}`.replace(/^./, c => c.toUpperCase()));
    } else {
      setPrakriti(dominant[0][0].charAt(0).toUpperCase() + dominant[0][0].slice(1));
    }
  };

  const handleConstitutionAnswer = (questionId: string, value: string) => {
    setAssessmentData(prev => ({
      ...prev,
      constitution: {
        ...prev.constitution,
        [questionId]: value
      }
    }));
  };

  const handleGoalToggle = (goalId: string) => {
    setAssessmentData(prev => ({
      ...prev,
      healthGoals: {
        ...prev.healthGoals,
        [goalId]: !prev.healthGoals[goalId]
      }
    }));
  };

  const handleComplete = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: updateError } = await supabase
          .from('patient_profiles')
          .update({
            assessment_completed: true,
            prakriti_type: prakriti,
            constitution_scores: constitutionScores,
            health_goals: Object.keys(assessmentData.healthGoals).filter(key => assessmentData.healthGoals[key]),
            dietary_preferences: assessmentData.dietaryPreferences || {}
          })
          .eq('user_id', user.id);

        if (updateError) {
          console.error('Error saving assessment:', updateError);
        }
      }
      setShowResults(true);
    } catch (error) {
      console.error('Error completing assessment:', error);
      setShowResults(true);
    }
  };

  const handleRetakeAssessment = () => {
    setCurrentStep(1);
    setAssessmentData({
      constitution: { digestion: "", energy: "", sleep: "", bodyType: "", temperament: "" },
      healthGoals: {},
      dietaryPreferences: {}
    });
    setPrakriti('');
    setShowResults(false);
  };

  useEffect(() => {
    const checkAssessmentStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('patient_profiles')
          .select('assessment_completed, prakriti_type, constitution_scores, health_goals')
          .eq('user_id', user.id)
          .single();
        
        if (profile?.assessment_completed) {
          setPrakriti(profile.prakriti_type || '');
          setShowResults(true);
        }
      }
    };
    
    checkAssessmentStatus();
  }, []);

  if (showResults && prakriti) {
    return (
      <div className="min-h-screen bg-gradient-sage p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="flex items-center justify-center">
                <div className="bg-gradient-primary rounded-full p-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <div>
                <CardTitle className="text-3xl font-bold text-sage-800 mb-2">
                  Assessment Complete!
                </CardTitle>
                <CardDescription className="text-lg">
                  Welcome back! Your Ayurvedic constitution is <strong>{prakriti}</strong>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={() => navigate('/patient/dashboard')} className="w-full">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Button>
                <Button variant="outline" onClick={handleRetakeAssessment} className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retake Assessment
                </Button>
              </div>
              <Button variant="ghost" onClick={() => navigate('/')} className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">AyurVeda AI</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Discover Your Ayurvedic Profile</h1>
          <p className="text-lg text-muted-foreground">Personalized wellness starts with understanding your unique constitution</p>
        </div>

        {!showResults && (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-smooth ${
                      currentStep >= step.id 
                        ? "bg-primary border-primary text-primary-foreground" 
                        : "border-muted-foreground text-muted-foreground"
                    }`}>
                      {currentStep > step.id ? <CheckCircle className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
                    </div>
                    <span className="text-sm text-center mt-2 font-medium">{step.title}</span>
                  </div>
                ))}
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card className="bg-gradient-to-br from-background to-muted/20 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription className="text-center text-lg">
                  {steps[currentStep - 1].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <div className="space-y-8">
                    {constitutionQuestions.map((question, index) => (
                      <div key={question.id} className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">{question.question}</h3>
                        <RadioGroup
                          value={assessmentData.constitution[question.id as keyof typeof assessmentData.constitution]}
                          onValueChange={(value) => handleConstitutionAnswer(question.id, value)}
                        >
                          {question.options.map((option) => (
                            <div key={option.value} className="flex items-start space-x-2 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                              <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} className="mt-1" />
                              <div className="flex-1">
                                <Label htmlFor={`${question.id}-${option.value}`} className="font-medium cursor-pointer">
                                  {option.label}
                                </Label>
                                <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <p className="text-muted-foreground">Select all health goals that apply to you</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {healthGoals.map((goal) => (
                        <Card 
                          key={goal.id}
                          className={`cursor-pointer transition-all duration-200 ${
                            assessmentData.healthGoals[goal.id]
                              ? "border-primary bg-primary/5" 
                              : "border-muted hover:border-primary/50"
                          }`}
                          onClick={() => handleGoalToggle(goal.id)}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className={`p-3 rounded-lg ${
                                assessmentData.healthGoals[goal.id] 
                                  ? "bg-primary text-primary-foreground" 
                                  : "bg-muted"
                              }`}>
                                <goal.icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">{goal.label}</h4>
                                <p className="text-sm text-muted-foreground">{goal.description}</p>
                                {assessmentData.healthGoals[goal.id] && (
                                  <Badge variant="secondary" className="mt-2">Selected</Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={currentStep === 1 && Object.values(assessmentData.constitution).filter(Boolean).length < 3 || 
                             currentStep === 2 && !Object.values(assessmentData.healthGoals).some(Boolean)}
                  >
                    {currentStep === steps.length ? 'Complete Assessment' : 'Next'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientAssessment;