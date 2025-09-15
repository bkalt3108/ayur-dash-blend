import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import DietitianOnboarding from "./pages/DietitianOnboarding";
import DietitianDashboard from "./pages/DietitianDashboard";
import PatientAssessment from "./pages/PatientAssessment";
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
          <Route path="/dietitian/onboarding" element={<DietitianOnboarding />} />
          <Route path="/dietitian/dashboard" element={<DietitianDashboard />} />
          <Route path="/patient/assessment" element={<PatientAssessment />} />
          <Route path="/food-database" element={<FoodDatabase />} />
          <Route path="/old" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
