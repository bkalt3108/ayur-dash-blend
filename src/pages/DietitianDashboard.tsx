import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  Database, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  MessageCircle,
  Clock,
  Star,
  IndianRupee,
  Activity,
  Leaf,
  Settings,
  BarChart3,
  UserPlus,
  Sparkles,
  LogOut
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const DietitianDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { signOut } = useAuth();
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

  // Mock data
  const stats = {
    totalPatients: { value: 247, change: 12, trend: "up" },
    activePlans: { value: 156, change: 8, trend: "up" },
    foodsInDb: { value: 1247, change: 25, trend: "up" },
    monthlyRevenue: { value: 245000, change: 15, trend: "up" }
  };

  const recentPatients = [
    { name: "Priya Sharma", age: 28, prakriti: "Vata-Pitta", status: "Active", lastSeen: "2 days ago", premium: true },
    { name: "Rajesh Kumar", age: 45, prakriti: "Kapha-Vata", status: "Follow-up", lastSeen: "1 week ago", premium: false },
    { name: "Meera Patel", age: 35, prakriti: "Pitta", status: "Active", lastSeen: "3 days ago", premium: true },
    { name: "Arjun Singh", age: 52, prakriti: "Kapha", status: "Pending", lastSeen: "5 days ago", premium: false }
  ];

  const todayAppointments = [
    { name: "Anita Reddy", type: "Diet Review", prakriti: "Vata-Pitta", time: "10:00 AM", status: "upcoming" },
    { name: "Suresh Gupta", type: "New Consultation", prakriti: "Unknown", time: "11:30 AM", status: "upcoming" },
    { name: "Lakshmi Iyer", type: "Follow-Up", prakriti: "Pitta-Kapha", time: "1:00 PM", status: "upcoming" }
  ];

  const sidebarItems = [
    { id: "overview", label: "Dashboard", icon: BarChart3, active: true },
    { id: "patients", label: "Patients", icon: Users },
    { id: "database", label: "Food Database", icon: Database },
    { id: "plans", label: "Diet Plans", icon: FileText },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "appointments", label: "Appointments", icon: Calendar },
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
              <p className="text-xs text-muted-foreground">Practitioner Portal</p>
            </div>
          </div>
          
          <nav className="space-y-2 mb-8">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-smooth ${
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground shadow-soft" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
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
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Good morning, Dr. Kumar 👋</h1>
            <p className="text-muted-foreground">Here's what's happening with your practice today.</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Today's Schedule
            </Button>
            <Button variant="hero" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Patients</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalPatients.value}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm">
                <TrendingUp className="h-4 w-4 text-accent mr-1" />
                <span className="text-accent font-medium">+{stats.totalPatients.change}%</span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Active Diet Plans</p>
                  <p className="text-2xl font-bold text-foreground">{stats.activePlans.value}</p>
                </div>
                <div className="w-12 h-12 bg-warm/10 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-warm" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm">
                <TrendingUp className="h-4 w-4 text-accent mr-1" />
                <span className="text-accent font-medium">+{stats.activePlans.change}%</span>
                <span className="text-muted-foreground ml-1">this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Foods in Database</p>
                  <p className="text-2xl font-bold text-foreground">{stats.foodsInDb.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Database className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm">
                <TrendingUp className="h-4 w-4 text-accent mr-1" />
                <span className="text-accent font-medium">+{stats.foodsInDb.change}</span>
                <span className="text-muted-foreground ml-1">new additions</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-foreground flex items-center">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    {(stats.monthlyRevenue.value / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center">
                  <IndianRupee className="h-6 w-6 text-sage-foreground" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-sm">
                <TrendingUp className="h-4 w-4 text-accent mr-1" />
                <span className="text-accent font-medium">+{stats.monthlyRevenue.change}%</span>
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Patients */}
          <div className="lg:col-span-2">
            <Card className="shadow-warm border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Recent Patients
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentPatients.map((patient, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-primary">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{patient.name}</p>
                          {patient.premium && (
                            <Badge variant="secondary" className="text-xs bg-accent/10 text-accent">
                              <Star className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Age {patient.age}</span>
                          <span>•</span>
                          <span>{patient.prakriti}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={patient.status === "Active" ? "default" : "secondary"}
                        className={
                          patient.status === "Active" 
                            ? "bg-accent/10 text-accent" 
                            : patient.status === "Pending" 
                              ? "bg-warm/10 text-warm" 
                              : ""
                        }
                      >
                        {patient.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{patient.lastSeen}</p>
                    </div>
                  </div>
                ))}
                
                {/* Premium Chat Integration */}
                <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-4 border border-accent/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium text-foreground">Premium Patient Chat</p>
                        <p className="text-sm text-muted-foreground">2 unread messages</p>
                      </div>
                    </div>
                    <Button variant="accent" size="sm">
                      Open Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Appointments */}
          <div>
            <Card className="shadow-warm border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Today's Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayAppointments.map((appointment, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{appointment.name}</p>
                      <p className="text-xs text-muted-foreground">{appointment.type}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" size="sm" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Full Schedule
                </Button>
              </CardContent>
            </Card>

            {/* AI Assistant */}
            <Card className="shadow-warm border-0 bg-gradient-to-br from-primary/5 to-accent/5 mt-6">
              <CardContent className="p-6">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary animate-gentle-bounce" />
                  <h3 className="font-semibold text-foreground mb-2">AI Assistant Ready</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Once you add patient data, I can auto-generate personalized Ayurvedic diet plans!
                  </p>
                  <Button variant="hero" size="sm" className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Your First Patient
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietitianDashboard;