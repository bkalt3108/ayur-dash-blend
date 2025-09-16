import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PatientAuth from "./pages/PatientAuth";
import DietitianAuth from "./pages/DietitianAuth";
import DietitianOnboarding from "./pages/DietitianOnboarding";
import DietitianDashboard from "./pages/DietitianDashboard";
import PatientAssessment from "./pages/PatientAssessment";
import PatientDashboard from "./pages/PatientDashboard";
import FoodDatabase from "./pages/FoodDatabase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/patient-auth" element={<PatientAuth />} />
          <Route path="/dietitian-auth" element={<DietitianAuth />} />
          
          {/* Dietitian Routes */}
          <Route 
            path="/dietitian/onboarding" 
            element={
              <ProtectedRoute userType="dietitian">
                <DietitianOnboarding />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dietitian/dashboard" 
            element={
              <ProtectedRoute userType="dietitian">
                <DietitianDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Patient Routes */}
          <Route 
            path="/patient/assessment" 
            element={
              <ProtectedRoute userType="patient">
                <PatientAssessment />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patient/dashboard" 
            element={
              <ProtectedRoute userType="patient">
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* General Protected Routes */}
          <Route 
            path="/food-database" 
            element={
              <ProtectedRoute>
                <FoodDatabase />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/old" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
