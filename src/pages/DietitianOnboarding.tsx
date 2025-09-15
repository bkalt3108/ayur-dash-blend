import { useState } from "react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Building2, 
  UserPlus, 
  Database, 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Leaf
} from "lucide-react";
import { Link } from "react-router-dom";

const DietitianOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    clinic: {
      name: "",
      specialization: "",
      contact: "",
      address: ""
    },
    firstPatient: {
      name: "",
      age: "",
      gender: "",
      prakriti: "",
      condition: ""
    }
  });

  const steps = [
    { id: 1, title: "Clinic Details", icon: Building2, description: "Set up your practice profile" },
    { id: 2, title: "First Patient", icon: UserPlus, description: "Add your first patient" },
    { id: 3, title: "Food Database", icon: Database, description: "Explore our comprehensive database" },
    { id: 4, title: "AI Diet Plan", icon: Sparkles, description: "Generate your first AI-assisted plan" }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Welcome to Your Practice</h1>
          <p className="text-lg text-muted-foreground">Let's set up your Ayurvedic practice in just a few steps</p>
        </div>

        {/* Progress Bar */}
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
          
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic Name</Label>
                    <Input
                      id="clinicName"
                      placeholder="e.g., Holistic Wellness Center"
                      value={formData.clinic.name}
                      onChange={(e) => handleInputChange('clinic', 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select onValueChange={(value) => handleInputChange('clinic', 'specialization', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Ayurveda</SelectItem>
                        <SelectItem value="nutrition">Ayurvedic Nutrition</SelectItem>
                        <SelectItem value="panchakarma">Panchakarma</SelectItem>
                        <SelectItem value="diabetes">Diabetes Management</SelectItem>
                        <SelectItem value="weight">Weight Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Information</Label>
                  <Input
                    id="contact"
                    placeholder="Phone number or email"
                    value={formData.clinic.contact}
                    onChange={(e) => handleInputChange('clinic', 'contact', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Clinic Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Full clinic address"
                    value={formData.clinic.address}
                    onChange={(e) => handleInputChange('clinic', 'address', e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      placeholder="e.g., Priya Sharma"
                      value={formData.firstPatient.name}
                      onChange={(e) => handleInputChange('firstPatient', 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="28"
                      value={formData.firstPatient.age}
                      onChange={(e) => handleInputChange('firstPatient', 'age', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={(value) => handleInputChange('firstPatient', 'gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prakriti">Prakriti (Constitution)</Label>
                    <Select onValueChange={(value) => handleInputChange('firstPatient', 'prakriti', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Prakriti" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vata">Vata</SelectItem>
                        <SelectItem value="pitta">Pitta</SelectItem>
                        <SelectItem value="kapha">Kapha</SelectItem>
                        <SelectItem value="vata-pitta">Vata-Pitta</SelectItem>
                        <SelectItem value="pitta-kapha">Pitta-Kapha</SelectItem>
                        <SelectItem value="kapha-vata">Kapha-Vata</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition">Primary Condition</Label>
                    <Select onValueChange={(value) => handleInputChange('firstPatient', 'condition', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight-loss">Weight Management</SelectItem>
                        <SelectItem value="diabetes">Diabetes</SelectItem>
                        <SelectItem value="hypertension">Hypertension</SelectItem>
                        <SelectItem value="digestion">Digestive Issues</SelectItem>
                        <SelectItem value="general">General Wellness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <Database className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">8,000+ Foods</h3>
                      <p className="text-sm text-muted-foreground">Comprehensive nutritional and Ayurvedic properties</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-2xl flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Rasa Classifications</h3>
                      <p className="text-sm text-muted-foreground">Sweet, Sour, Salty, Bitter, Pungent, Astringent</p>
                    </CardContent>
                  </Card>
                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-warm/10 rounded-2xl flex items-center justify-center">
                        <Leaf className="h-8 w-8 text-warm" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Properties</h3>
                      <p className="text-sm text-muted-foreground">Hot/Cold, Heavy/Light thermal properties</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="bg-muted rounded-lg p-6">
                  <p className="text-muted-foreground mb-4">🔍 Try searching for foods like "rice", "spinach", or "turmeric" to see their complete Ayurvedic profiles</p>
                  <Input placeholder="Search foods in our database..." disabled className="mb-4" />
                  <p className="text-sm text-muted-foreground italic">Preview: Database exploration will be available after onboarding</p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8">
                  <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary animate-gentle-bounce" />
                  <h3 className="text-2xl font-bold mb-4">AI Diet Plan Generated!</h3>
                  <p className="text-muted-foreground mb-6">
                    Based on your patient's Prakriti ({formData.firstPatient.prakriti || "Vata-Pitta"}) and condition 
                    ({formData.firstPatient.condition || "Weight Management"}), our AI has created a personalized diet plan.
                  </p>
                  
                  <Card className="text-left shadow-soft">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4">Sample Diet Recommendations:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent"></div>
                          <span className="text-sm">Warm, cooked foods to balance Vata</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">Sweet and bitter Rasa to pacify Pitta</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-warm"></div>
                          <span className="text-sm">Light, easy-to-digest meals for weight management</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-sage/20 rounded-lg p-6">
                  <h4 className="font-semibold mb-2">🎉 Your Practice is Ready!</h4>
                  <p className="text-muted-foreground">
                    Congratulations! You've successfully set up your Ayurvedic practice. 
                    Start managing patients, creating diet plans, and growing your practice.
                  </p>
                </div>
              </div>
            )}

            <Separator />

            {/* Navigation */}
            <div className="flex justify-between items-center">
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

              {currentStep < steps.length ? (
                <Button 
                  variant="default" 
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Link to="/dietitian/dashboard">
                  <Button variant="hero" className="flex items-center gap-2">
                    Enter Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DietitianOnboarding;