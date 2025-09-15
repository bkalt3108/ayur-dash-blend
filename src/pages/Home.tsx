import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Database, MessageSquare, BarChart3, Calendar, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/ayurvedic-hero.jpg";
import mandalaPattern from "@/assets/mandala-pattern.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-gradient mandala-bg min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroImage} 
            alt="Ayurvedic herbs and wellness" 
            className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-30 animate-leaf-float"
          />
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/10 backdrop-blur-sm border border-primary-foreground/20">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-primary-foreground/90 text-sm font-medium">AI-Powered Ayurvedic Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Holistic Ayurvedic Diet Management, 
              <span className="block text-accent animate-gentle-bounce">Powered by AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Blend tradition with science. Smarter diet plans, better patient outcomes.
              Transform your practice with 8,000+ foods and ancient wisdom.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/dietitian/onboarding">
                <Button variant="hero" size="lg" className="px-8 py-4 text-lg shadow-warm hover:shadow-glow transition-bounce">
                  <Users className="mr-2 h-5 w-5" />
                  For Dietitians → Start Onboarding
                </Button>
              </Link>
              
              <Link to="/patient/assessment">
                <Button variant="ghost-light" size="lg" className="px-8 py-4 text-lg">
                  <Leaf className="mr-2 h-5 w-5" />
                  For Patients → Begin Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ancient Wisdom Meets <span className="text-primary">Modern Technology</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools for Ayurvedic practitioners to manage patients, create personalized diet plans, and track progress with AI assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="shadow-soft hover:shadow-warm transition-smooth border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">AI-Assisted Diet Planning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Generate personalized Ayurvedic diet plans using AI that considers Prakriti, Rasa, and modern nutrition science.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-warm transition-smooth border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">8,000+ Food Database</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive database with Ayurvedic properties: Hot/Cold, Heavy/Light, Rasa classifications, plus complete nutrition data.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-warm transition-smooth border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-warm/10 rounded-2xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-warm" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Patient Management</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track patient progress, Prakriti assessments, appointment scheduling, and comprehensive health analytics.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-warm transition-smooth border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-sage/10 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-sage-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Premium Chat & Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Real-time chat with dietitians, personalized consultations, and priority support for premium patients.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Previews */}
      <section className="py-20 px-4 earth-gradient">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Beautiful, Intuitive Dashboards
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed for both practitioners and patients, our interfaces make complex Ayurvedic principles accessible and actionable.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">For Dietitians</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-lg text-foreground">Comprehensive analytics and insights</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-lg text-foreground">Integrated appointment scheduling</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-warm/10 rounded-lg flex items-center justify-center">
                    <Database className="h-5 w-5 text-warm" />
                  </div>
                  <span className="text-lg text-foreground">Powerful food database management</span>
                </div>
              </div>
            </div>
            
            <Card className="shadow-warm border-0 bg-card">
              <CardContent className="p-8">
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <span className="text-muted-foreground text-lg">Dietitian Dashboard Preview</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trusted by Ayurvedic Practitioners
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Priya Sharma",
                role: "Senior Ayurvedic Practitioner",
                content: "This platform has transformed how I create diet plans. The AI suggestions align perfectly with traditional Ayurvedic principles while providing modern nutritional insights.",
                rating: 5
              },
              {
                name: "Dr. Rajesh Kumar",
                role: "Wellness Consultant",
                content: "The comprehensive food database with Rasa classifications saves me hours of research. My patients love the personalized approach to their dietary needs.",
                rating: 5
              },
              {
                name: "Dr. Meera Patel",
                role: "Holistic Health Expert",
                content: "Patient management has never been easier. The integration of Prakriti assessment with modern tracking tools is exactly what our field needed.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-foreground/5">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-primary">AyurVeda AI</span>
              </div>
              <p className="text-muted-foreground">
                Bridging ancient Ayurvedic wisdom with modern technology for better health outcomes.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-smooth">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Integrations</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-smooth">About</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-smooth">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AyurVeda AI. All rights reserved. Made with 🌿 for holistic wellness.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;