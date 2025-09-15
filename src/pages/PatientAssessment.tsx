import { useState } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Brain, 
  Target, 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Heart,
  Moon,
  Utensils,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

const PatientAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState({
    constitution: {
      digestion: "",
      energy: "",
      sleep: "",
      bodyType: "",
      temperament: ""
    },
    goals: [],
    preferences: {
      spicyFoods: "",
      mealTiming: "",
      cookingStyle: ""
    }
  });

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
      setShowResults(true);
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
      goals: prev.goals.includes(goalId) 
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const getDietPlanPreview = () => {
    const recommendations = {
      "Vata": {
        foods: ["Warm, cooked foods", "Sweet fruits like dates", "Ghee and healthy oils", "Warm spices like ginger"],
        avoid: ["Cold, raw foods", "Dry foods", "Excessive caffeine"],
        lifestyle: ["Regular meal times", "Warm beverages", "Calming activities"]
      },
      "Pitta": {
        foods: ["Cooling foods", "Sweet, bitter tastes", "Coconut water", "Fresh herbs like cilantro"],
        avoid: ["Spicy foods", "Excessive heat", "Sour foods"],
        lifestyle: ["Moderate meal portions", "Cool beverages", "Relaxing activities"]
      },
      "Kapha": {
        foods: ["Light, warm foods", "Pungent spices", "Herbal teas", "Fresh vegetables"],
        avoid: ["Heavy, oily foods", "Excessive sweets", "Cold drinks"],
        lifestyle: ["Lighter meals", "Warm drinks", "Active lifestyle"]
      }
    };

    return recommendations[prakriti as keyof typeof recommendations] || recommendations["Vata"];
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
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
            {/* Progress */}
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

            {/* Step Content */}
            <Card className="shadow-warm border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  {React.createElement(steps[currentStep - 1].icon, { className: "h-6 w-6 text-primary" })}
                  {steps[currentStep - 1].title}
                </CardTitle>
                <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
              </CardHeader>
              
              <CardContent className="space-y-8">
                {currentStep === 1 && (
                  <div className="space-y-8">
                    {constitutionQuestions.map((question) => (
                      <div key={question.id} className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">{question.question}</h3>
                        <RadioGroup 
                          value={assessmentData.constitution[question.id as keyof typeof assessmentData.constitution]}
                          onValueChange={(value) => handleConstitutionAnswer(question.id, value)}
                          className="space-y-3"
                        >
                          {question.options.map((option) => (
                            <div key={option.value} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth">
                              <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} className="mt-1" />
                              <div className="flex-1">
                                <Label htmlFor={`${question.id}-${option.value}`} className="text-base font-medium cursor-pointer">
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
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Select your primary health goals (choose multiple):</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {healthGoals.map((goal) => (
                        <Card 
                          key={goal.id}
                          className={`cursor-pointer transition-smooth hover:shadow-soft ${
                            assessmentData.goals.includes(goal.id) 
                              ? "border-primary bg-primary/5 shadow-soft" 
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => handleGoalToggle(goal.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                assessmentData.goals.includes(goal.id)
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}>
                                <goal.icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground">{goal.label}</h4>
                                <p className="text-sm text-muted-foreground">{goal.description}</p>
                              </div>
                              {assessmentData.goals.includes(goal.id) && (
                                <CheckCircle className="h-5 w-5 text-primary" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">How do you prefer your foods?</h3>
                      <RadioGroup className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                          <RadioGroupItem value="mild" id="mild" />
                          <Label htmlFor="mild" className="flex-1 cursor-pointer">
                            <div>
                              <p className="font-medium">Mild & Cooling</p>
                              <p className="text-sm text-muted-foreground">Prefer less spicy, cooling foods</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                          <RadioGroupItem value="moderate" id="moderate" />
                          <Label htmlFor="moderate" className="flex-1 cursor-pointer">
                            <div>
                              <p className="font-medium">Balanced & Moderate</p>
                              <p className="text-sm text-muted-foreground">Enjoy variety in flavors and temperatures</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                          <RadioGroupItem value="warm-spicy" id="warm-spicy" />
                          <Label htmlFor="warm-spicy" className="flex-1 cursor-pointer">
                            <div>
                              <p className="font-medium">Warm & Spicy</p>
                              <p className="text-sm text-muted-foreground">Love warming spices and cooked foods</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {currentStep === 4 && prakriti && (
                  <div className="text-center space-y-6">
                    <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 mb-6">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-primary font-semibold">Your Ayurvedic Profile</span>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-foreground mb-2">
                        Your Prakriti: <span className="text-primary">{prakriti}</span>
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Based on your responses, we've identified your unique Ayurvedic constitution and created a personalized diet plan.
                      </p>

                      <div className="grid md:grid-cols-3 gap-4 text-left">
                        <Card className="shadow-soft">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-accent mb-2">✓ Recommended Foods</h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                              {getDietPlanPreview().foods.map((food, index) => (
                                <li key={index}>• {food}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="shadow-soft">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-warm mb-2">⚠ Foods to Limit</h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                              {getDietPlanPreview().avoid.map((food, index) => (
                                <li key={index}>• {food}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="shadow-soft">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-sage-foreground mb-2">🌿 Lifestyle Tips</h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                              {getDietPlanPreview().lifestyle.map((tip, index) => (
                                <li key={index}>• {tip}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Premium Upgrade */}
                    <div className="bg-gradient-to-r from-accent/5 to-warm/5 rounded-lg p-6 border border-accent/20">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-accent" />
                        <span className="font-semibold text-accent">Upgrade to Premium</span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Get unlimited access to detailed meal plans, nutrient tracking, and direct consultation with certified Ayurvedic dietitians.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button variant="accent">
                          Upgrade to Premium - ₹999/month
                        </Button>
                        <Button variant="outline">
                          Continue with Free Plan
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t border-border">
                  <Button 
                    variant="outline" 
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Step {currentStep} of {steps.length}
                    </p>
                  </div>

                  <Button 
                    variant="default" 
                    onClick={handleNext}
                    disabled={currentStep === 1 && Object.values(assessmentData.constitution).filter(Boolean).length < 3}
                    className="flex items-center gap-2"
                  >
                    {currentStep === steps.length ? "Generate Plan" : "Next"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Results View */}
        {showResults && (
          <div className="text-center space-y-8">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-12">
              <CheckCircle className="h-16 w-16 mx-auto mb-6 text-primary animate-gentle-bounce" />
              <h2 className="text-4xl font-bold text-foreground mb-4">Your Personalized Diet Plan is Ready!</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Based on your {prakriti} constitution and health goals, we've created a custom Ayurvedic nutrition plan.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg">
                  <Sparkles className="h-5 w-5 mr-2" />
                  View Complete Plan
                </Button>
                <Link to="/">
                  <Button variant="outline" size="lg">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAssessment;