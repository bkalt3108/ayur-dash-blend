import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Target,
  Droplets,
  TrendingUp,
  Plus,
  Coffee,
  Utensils,
  Moon,
  Activity,
  Smile,
  Star,
  CheckCircle,
  ArrowUpCircle,
  BarChart3,
  Calendar,
  Download,
  Share2,
  Sparkles,
  Lock,
  Database,
  FileText,
  Settings,
  LogOut,
  Leaf,
  MessageCircle,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");
  const [mealStatus, setMealStatus] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    snacks: false
  });

  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });
      navigate('/');
    }
  };

  // Mock data for demonstration
  const dailyGoals = {
    calories: { consumed: 1450, target: 2000 },
    protein: { consumed: 65, target: 120 },
    carbs: { consumed: 180, target: 250 },
    fat: { consumed: 45, target: 65 },
    water: { consumed: 6, target: 8 }
  };

  const doshaBalance = {
    vata: 35,
    pitta: 40,
    kapha: 25,
    dominant: "Pitta"
  };

  const todaysMeals = [
    {
      id: "breakfast",
      name: "Breakfast",
      icon: Coffee,
      time: "8:00 AM",
      foods: ["Oatmeal with almonds", "Herbal tea", "Fresh fruits"],
      calories: 420,
      ayurvedicTags: ["Pitta pacifying", "Kapha reducing"],
      macros: { protein: 12, carbs: 68, fat: 14 }
    },
    {
      id: "lunch", 
      name: "Lunch",
      icon: Utensils,
      time: "1:00 PM",
      foods: ["Quinoa salad", "Steamed vegetables", "Coconut water"],
      calories: 580,
      ayurvedicTags: ["Cooling", "Light"],
      macros: { protein: 22, carbs: 85, fat: 18 }
    },
    {
      id: "dinner",
      name: "Dinner", 
      icon: Moon,
      time: "7:00 PM",
      foods: ["Mung dal", "Brown rice", "Sautéed greens"],
      calories: 450,
      ayurvedicTags: ["Grounding", "Vata balancing"],
      macros: { protein: 18, carbs: 72, fat: 8 }
    },
    {
      id: "snacks",
      name: "Snacks",
      icon: Plus,
      time: "4:00 PM", 
      foods: ["Herbal tea", "Dates", "Nuts"],
      calories: 180,
      ayurvedicTags: ["Nourishing", "Sweet taste"],
      macros: { protein: 4, carbs: 28, fat: 8 }
    }
  ];

  const toggleMealStatus = (mealId: string) => {
    setMealStatus(prev => ({ ...prev, [mealId]: !prev[mealId] }));
  };

  const getMacroPercentage = (consumed: number, target: number) => {
    return Math.min((consumed / target) * 100, 100);
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "meal-plan", label: "My Meal Plan", icon: Utensils },
    { id: "food-database", label: "Food Database", icon: Database },
    { id: "progress", label: "Progress", icon: TrendingUp },
    { id: "chat", label: "Chat with Dietitian", icon: MessageCircle, premium: true },
    { id: "profile", label: "My Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border shadow-soft">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Leaf className="h-8 w-8 text-primary" />
            <div>
              <span className="text-xl font-bold text-primary">AyurVeda AI</span>
              <p className="text-xs text-muted-foreground">Patient Portal</p>
            </div>
          </div>
          
          {/* User Info */}
          <div className="bg-primary/5 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Welcome back!</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
          
          <nav className="space-y-2 mb-8">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSidebarItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-smooth relative ${
                  activeSidebarItem === item.id 
                    ? "bg-primary text-primary-foreground shadow-soft" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
                {item.premium && (
                  <Badge variant="secondary" className="ml-auto text-xs bg-accent/10 text-accent">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Pro
                  </Badge>
                )}
              </button>
            ))}
          </nav>
          
          <div className="border-t border-border pt-4">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {activeSidebarItem === "dashboard" && (
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Wellness Journey</h1>
                <p className="text-muted-foreground">Track your Ayurvedic nutrition and lifestyle balance</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Progress
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="meals" className="flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  Meal Plan
                </TabsTrigger>
                <TabsTrigger value="wellness" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Wellness Log
                </TabsTrigger>
                <TabsTrigger value="insights" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI Insights
                </TabsTrigger>
                <TabsTrigger value="progress" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Progress
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Today's Summary */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Today's Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Calories Card */}
                    <Card className="shadow-soft">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Target className="h-4 w-4 text-primary" />
                          Daily Calories
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">{dailyGoals.calories.consumed}</span>
                            <span className="text-sm text-muted-foreground">/ {dailyGoals.calories.target}</span>
                          </div>
                          <Progress value={getMacroPercentage(dailyGoals.calories.consumed, dailyGoals.calories.target)} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {dailyGoals.calories.target - dailyGoals.calories.consumed} remaining
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Macros Card */}
                    <Card className="shadow-soft">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-accent" />
                          Macros Balance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span>Protein</span>
                            <span>{dailyGoals.protein.consumed}g</span>
                          </div>
                          <Progress value={getMacroPercentage(dailyGoals.protein.consumed, dailyGoals.protein.target)} className="h-1" />
                          
                          <div className="flex justify-between items-center text-xs">
                            <span>Carbs</span>
                            <span>{dailyGoals.carbs.consumed}g</span>
                          </div>
                          <Progress value={getMacroPercentage(dailyGoals.carbs.consumed, dailyGoals.carbs.target)} className="h-1" />
                          
                          <div className="flex justify-between items-center text-xs">
                            <span>Fat</span>
                            <span>{dailyGoals.fat.consumed}g</span>
                          </div>
                          <Progress value={getMacroPercentage(dailyGoals.fat.consumed, dailyGoals.fat.target)} className="h-1" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Dosha Balance Card */}
                    <Card className="shadow-soft">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <ArrowUpCircle className="h-4 w-4 text-warm" />
                          Dosha Balance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-warm">{doshaBalance.dominant}</div>
                            <p className="text-xs text-muted-foreground">Dominant today</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Vata</span>
                              <span>{doshaBalance.vata}%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Pitta</span>
                              <span>{doshaBalance.pitta}%</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span>Kapha</span>
                              <span>{doshaBalance.kapha}%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Hydration Card */}
                    <Card className="shadow-soft">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-blue-500" />
                          Hydration
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">{dailyGoals.water.consumed}</span>
                            <span className="text-sm text-muted-foreground">/ {dailyGoals.water.target} glasses</span>
                          </div>
                          <Progress value={getMacroPercentage(dailyGoals.water.consumed, dailyGoals.water.target)} className="h-2" />
                          <div className="flex gap-1">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-6 rounded-sm ${i < dailyGoals.water.consumed ? 'bg-blue-500' : 'bg-muted'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Quick Actions */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowUpCircle className="h-5 w-5 text-primary" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-16 flex-col gap-2">
                        <Plus className="h-5 w-5" />
                        Log Meal
                      </Button>
                      <Button variant="outline" className="h-16 flex-col gap-2">
                        <Droplets className="h-5 w-5" />
                        Add Water
                      </Button>
                      <Button variant="outline" className="h-16 flex-col gap-2">
                        <Activity className="h-5 w-5" />
                        Log Exercise
                      </Button>
                      <Button variant="outline" className="h-16 flex-col gap-2">
                        <Smile className="h-5 w-5" />
                        Update Mood
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="meals" className="space-y-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-primary" />
                      Today's Ayurvedic Meal Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {todaysMeals.map((meal) => {
                        const MealIcon = meal.icon;
                        const isCompleted = mealStatus[meal.id as keyof typeof mealStatus];
                        
                        return (
                          <Card key={meal.id} className={`transition-smooth ${isCompleted ? 'bg-primary/5 border-primary/30' : 'hover:shadow-warm'}`}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex gap-3 flex-1">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    <MealIcon className="h-5 w-5" />
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-semibold">{meal.name}</h4>
                                      <span className="text-sm text-muted-foreground">{meal.time}</span>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <p className="text-sm text-muted-foreground">
                                        {meal.foods.join(" • ")}
                                      </p>
                                      
                                      <div className="flex flex-wrap gap-1">
                                        {meal.ayurvedicTags.map((tag) => (
                                          <Badge key={tag} variant="secondary" className="text-xs">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                      
                                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span>{meal.calories} cal</span>
                                        <span>P: {meal.macros.protein}g</span>
                                        <span>C: {meal.macros.carbs}g</span>
                                        <span>F: {meal.macros.fat}g</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col gap-2 ml-4">
                                  <Button
                                    size="sm"
                                    variant={isCompleted ? "default" : "outline"}
                                    onClick={() => toggleMealStatus(meal.id)}
                                    className="text-xs"
                                  >
                                    {isCompleted ? (
                                      <>
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Eaten
                                      </>
                                    ) : (
                                      "Mark Eaten"
                                    )}
                                  </Button>
                                  
                                  {!isCompleted && (
                                    <Button size="sm" variant="ghost" className="text-xs">
                                      Substitute
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      
                      <Button variant="outline" className="h-12 border-dashed">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Custom Food
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wellness" className="space-y-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-accent" />
                      Daily Wellness Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Mood & Energy Level</label>
                          <div className="flex gap-2">
                            {['😴', '😐', '😊', '😄', '🚀'].map((emoji, i) => (
                              <button key={i} className="w-12 h-12 rounded-full border hover:bg-muted transition-smooth text-lg">
                                {emoji}
                              </button>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">From sluggish to energetic</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-2 block">Digestion Quality</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="How was your digestion?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="heavy">Heavy & Sluggish</SelectItem>
                              <SelectItem value="normal">Normal & Comfortable</SelectItem>
                              <SelectItem value="light">Light & Energized</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-2 block">Sleep Quality (Last Night)</label>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-6 w-6 text-muted-foreground hover:text-accent cursor-pointer transition-smooth" />
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Rate your sleep quality</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Physical Activity</label>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" className="justify-start">
                              <Activity className="h-4 w-4 mr-2" />
                              Yoga
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start">
                              <Activity className="h-4 w-4 mr-2" />
                              Walk
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start">
                              <Activity className="h-4 w-4 mr-2" />
                              Gym
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start">
                              <Activity className="h-4 w-4 mr-2" />
                              Meditation
                            </Button>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Symptoms (if any)</label>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" className="justify-start text-xs">
                              Bloating
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start text-xs">
                              Fatigue
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start text-xs">
                              Headache
                            </Button>
                            <Button variant="outline" size="sm" className="justify-start text-xs">
                              Stress
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Daily Reflection</label>
                      <Textarea 
                        placeholder="How did you feel today? Any observations about food, mood, energy, or symptoms..." 
                        className="resize-none" 
                        rows={4} 
                      />
                    </div>

                    <Button className="w-full">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Save Today's Log
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Free AI Insights */}
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Basic Insights (Free)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm font-medium text-primary mb-1">Weekly Pattern</p>
                        <p className="text-xs text-muted-foreground">
                          You've been consistent with breakfast this week. Great job maintaining your morning routine!
                        </p>
                      </div>
                      
                      <div className="p-4 bg-sage/10 rounded-lg">
                        <p className="text-sm font-medium text-sage-foreground mb-1">Hydration Reminder</p>
                        <p className="text-xs text-muted-foreground">
                          Your water intake drops in the afternoon. Set a 3 PM reminder to stay hydrated.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-warm/5 rounded-lg">
                        <p className="text-sm font-medium text-warm mb-1">Dosha Balance</p>
                        <p className="text-xs text-muted-foreground">
                          Your Pitta is slightly elevated. Consider cooling foods and avoid spicy meals after 6 PM.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Premium AI Insights (Blurred) */}
                  <Card className="shadow-soft relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-warm/10 backdrop-blur-sm z-10 flex items-center justify-center">
                      <div className="text-center p-6">
                        <Lock className="h-12 w-12 text-accent mx-auto mb-4" />
                        <h3 className="font-semibold text-accent mb-2">Premium AI Insights</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Unlock personalized recommendations and predictive analytics
                        </p>
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Upgrade Now
                        </Button>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-accent" />
                        Advanced AI Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 blur-sm">
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm font-medium text-primary mb-1">Digestive Pattern Analysis</p>
                        <p className="text-xs text-muted-foreground">
                          Your digestion is 30% more balanced on plant-based dinners. Consider reducing dairy after 6 PM.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-warm/5 rounded-lg">
                        <p className="text-sm font-medium text-warm mb-1">Energy Optimization</p>
                        <p className="text-xs text-muted-foreground">
                          Peak energy at 2 PM correlates with warm, cooked breakfast. Maintain morning routine consistency.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-accent/5 rounded-lg">
                        <p className="text-sm font-medium text-accent mb-1">Predictive Craving Forecast</p>
                        <p className="text-xs text-muted-foreground">
                          82% likely to crave sweet foods tomorrow evening. Prepare healthy alternatives like dates.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                {/* Progress Time Tabs */}
                <Tabs defaultValue="weekly" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                  </TabsList>

                  <TabsContent value="weekly" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="shadow-soft">
                        <CardHeader>
                          <CardTitle className="text-lg">Weight & Energy Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-64 flex items-center justify-center text-muted-foreground">
                            <div className="text-center">
                              <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
                              <p>Weekly weight & energy chart</p>
                              <p className="text-sm">Track your progress over 7 days</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-soft">
                        <CardHeader>
                          <CardTitle className="text-lg">Dosha Balance History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-64 flex items-center justify-center text-muted-foreground">
                            <div className="text-center">
                              <ArrowUpCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                              <p>Weekly dosha balance trends</p>
                              <p className="text-sm">See how your constitution changes</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Weekly Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="shadow-soft">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-primary">92%</div>
                          <p className="text-sm text-muted-foreground">Meal Plan Adherence</p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-soft">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-accent">7.2</div>
                          <p className="text-sm text-muted-foreground">Avg Daily Water (glasses)</p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-soft">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-warm">4.2</div>
                          <p className="text-sm text-muted-foreground">Avg Energy Level</p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-soft">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-sage-foreground">6</div>
                          <p className="text-sm text-muted-foreground">Active Days</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="monthly" className="space-y-6">
                    <Card className="shadow-soft">
                      <CardHeader>
                        <CardTitle>Monthly Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 flex items-center justify-center text-muted-foreground">
                          <div className="text-center">
                            <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p>Monthly analytics view</p>
                            <p className="text-sm">Long-term patterns and achievements</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="quarterly" className="space-y-6">
                    <Card className="shadow-soft">
                      <CardHeader>
                        <CardTitle>Quarterly Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 flex items-center justify-center text-muted-foreground">
                          <div className="text-center">
                            <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p>3-month health journey</p>
                            <p className="text-sm">Track major health improvements</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSidebarItem === "meal-plan" && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Today's Meal Plan</h1>
                <p className="text-muted-foreground">Your personalized Ayurvedic nutrition plan</p>
              </div>
            </div>
            
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-primary" />
                  Today's Ayurvedic Meal Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {todaysMeals.map((meal) => {
                    const MealIcon = meal.icon;
                    const isCompleted = mealStatus[meal.id as keyof typeof mealStatus];
                    
                    return (
                      <Card key={meal.id} className={`transition-smooth ${isCompleted ? 'bg-primary/5 border-primary/30' : 'hover:shadow-warm'}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-3 flex-1">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                <MealIcon className="h-5 w-5" />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold">{meal.name}</h4>
                                  <span className="text-sm text-muted-foreground">{meal.time}</span>
                                </div>
                                
                                <div className="space-y-2">
                                  <p className="text-sm text-muted-foreground">
                                    {meal.foods.join(" • ")}
                                  </p>
                                  
                                  <div className="flex flex-wrap gap-1">
                                    {meal.ayurvedicTags.map((tag) => (
                                      <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                  
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>{meal.calories} cal</span>
                                    <span>P: {meal.macros.protein}g</span>
                                    <span>C: {meal.macros.carbs}g</span>
                                    <span>F: {meal.macros.fat}g</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 ml-4">
                              <Button
                                size="sm"
                                variant={isCompleted ? "default" : "outline"}
                                onClick={() => toggleMealStatus(meal.id)}
                                className="text-xs"
                              >
                                {isCompleted ? (
                                  <>
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Eaten
                                  </>
                                ) : (
                                  "Mark Eaten"
                                )}
                              </Button>
                              
                              {!isCompleted && (
                                <Button size="sm" variant="ghost" className="text-xs">
                                  Substitute
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  
                  <Button variant="outline" className="h-12 border-dashed">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Food
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSidebarItem === "food-database" && (
          <div className="p-6">
            <div className="h-96 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Database className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Food Database</p>
                <p className="text-sm">Browse nutritional and Ayurvedic properties of foods</p>
              </div>
            </div>
          </div>
        )}

        {activeSidebarItem === "progress" && (
          <div className="p-6">
            <div className="h-96 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Progress Tracking</p>
                <p className="text-sm">View your health journey over time</p>
              </div>
            </div>
          </div>
        )}

        {activeSidebarItem === "chat" && (
          <div className="p-6">
            <div className="h-96 flex items-center justify-center">
              <Card className="max-w-md w-full shadow-soft">
                <CardContent className="p-8 text-center">
                  <Lock className="h-16 w-16 mx-auto mb-4 text-accent opacity-50" />
                  <h3 className="font-semibold text-accent mb-2">Premium Feature</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat directly with certified Ayurvedic dietitians for personalized guidance
                  </p>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Upgrade to Premium
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSidebarItem === "profile" && (
          <div className="p-6">
            <div className="h-96 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <User className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>My Profile</p>
                <p className="text-sm">Manage your personal information and preferences</p>
              </div>
            </div>
          </div>
        )}

        {activeSidebarItem === "settings" && (
          <div className="p-6">
            <div className="h-96 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Settings</p>
                <p className="text-sm">Customize your app preferences and notifications</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;