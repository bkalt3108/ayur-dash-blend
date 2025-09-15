import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Database,
  Leaf,
  Thermometer,
  Weight,
  Zap,
  Filter
} from "lucide-react";

const FoodDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock food database
  const foodDatabase = [
    {
      name: "Basmati Rice",
      category: "grains",
      rasa: ["Sweet"],
      thermal: "Cooling",
      weight: "Light",
      nutrition: { protein: 3.5, carbs: 78, fat: 0.9, fiber: 1.3 },
      ayurvedicProperties: {
        dosha: "Balances all doshas",
        effects: "Easy to digest, nourishing"
      }
    },
    {
      name: "Spinach",
      category: "vegetables",
      rasa: ["Sweet", "Astringent"],
      thermal: "Cooling",
      weight: "Light",
      nutrition: { protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
      ayurvedicProperties: {
        dosha: "Pacifies Pitta",
        effects: "Detoxifying, iron-rich"
      }
    },
    {
      name: "Turmeric",
      category: "spices",
      rasa: ["Bitter", "Pungent"],
      thermal: "Heating",
      weight: "Light",
      nutrition: { protein: 7.8, carbs: 65, fat: 9.9, fiber: 21 },
      ayurvedicProperties: {
        dosha: "Balances Kapha and Vata",
        effects: "Anti-inflammatory, immunity booster"
      }
    },
    {
      name: "Mango",
      category: "fruits",
      rasa: ["Sweet", "Sour"],
      thermal: "Cooling",
      weight: "Heavy",
      nutrition: { protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6 },
      ayurvedicProperties: {
        dosha: "May increase Kapha",
        effects: "Nourishing, strengthening"
      }
    },
    {
      name: "Ginger",
      category: "spices",
      rasa: ["Pungent", "Sweet"],
      thermal: "Heating",
      weight: "Light",
      nutrition: { protein: 1.8, carbs: 18, fat: 0.8, fiber: 2 },
      ayurvedicProperties: {
        dosha: "Pacifies Vata and Kapha",
        effects: "Digestive aid, warming"
      }
    },
    {
      name: "Almonds",
      category: "nuts",
      rasa: ["Sweet"],
      thermal: "Heating",
      weight: "Heavy",
      nutrition: { protein: 21, carbs: 22, fat: 50, fiber: 12 },
      ayurvedicProperties: {
        dosha: "May increase Pitta and Kapha",
        effects: "Nourishing, strengthening"
      }
    }
  ];

  const categories = [
    { id: "all", label: "All Foods", count: foodDatabase.length },
    { id: "grains", label: "Grains", count: foodDatabase.filter(f => f.category === "grains").length },
    { id: "vegetables", label: "Vegetables", count: foodDatabase.filter(f => f.category === "vegetables").length },
    { id: "fruits", label: "Fruits", count: foodDatabase.filter(f => f.category === "fruits").length },
    { id: "spices", label: "Spices", count: foodDatabase.filter(f => f.category === "spices").length },
    { id: "nuts", label: "Nuts & Seeds", count: foodDatabase.filter(f => f.category === "nuts").length }
  ];

  const filteredFoods = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getRasaColor = (rasa: string) => {
    const colors = {
      "Sweet": "bg-accent/10 text-accent",
      "Sour": "bg-warm/10 text-warm",
      "Salty": "bg-blue-100 text-blue-700",
      "Bitter": "bg-green-100 text-green-700",
      "Pungent": "bg-red-100 text-red-700",
      "Astringent": "bg-purple-100 text-purple-700"
    };
    return colors[rasa as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Database className="h-8 w-8 text-primary" />
              Ayurvedic Food Database
            </h1>
            <p className="text-muted-foreground">
              Explore 8,000+ foods with complete nutritional and Ayurvedic properties
            </p>
          </div>
          
          <Button variant="hero">
            <Leaf className="h-4 w-4 mr-2" />
            Add Custom Food
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search foods (e.g., rice, spinach, turmeric)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="default">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.label}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFoods.map((food, index) => (
            <Card key={index} className="shadow-soft border-0 bg-card/50 backdrop-blur-sm hover:shadow-warm transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {food.name}
                    </CardTitle>
                    <Badge variant="outline" className="mt-2 capitalize">
                      {food.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Thermometer className="h-4 w-4" />
                    <span className="text-xs">{food.thermal}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Rasa (Tastes) */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Rasa (Tastes)</p>
                  <div className="flex flex-wrap gap-2">
                    {food.rasa.map((taste) => (
                      <Badge key={taste} className={`text-xs ${getRasaColor(taste)}`}>
                        {taste}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Properties */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{food.thermal}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Weight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{food.weight}</span>
                  </div>
                </div>

                {/* Nutrition */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Nutrition (per 100g)</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Protein:</span>
                      <span className="font-medium">{food.nutrition.protein}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Carbs:</span>
                      <span className="font-medium">{food.nutrition.carbs}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fat:</span>
                      <span className="font-medium">{food.nutrition.fat}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fiber:</span>
                      <span className="font-medium">{food.nutrition.fiber}g</span>
                    </div>
                  </div>
                </div>

                {/* Ayurvedic Properties */}
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-primary" />
                    Ayurvedic Properties
                  </p>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Dosha Effect:</span>
                      <p className="font-medium text-foreground">{food.ayurvedicProperties.dosha}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Therapeutic Effects:</span>
                      <p className="font-medium text-foreground">{food.ayurvedicProperties.effects}</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Add to Diet Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="text-center py-12">
            <Database className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No foods found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or category filters
            </p>
            <Button variant="outline">
              Reset Filters
            </Button>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{foodDatabase.length}</p>
              <p className="text-sm text-muted-foreground">Foods Catalogued</p>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">6</p>
              <p className="text-sm text-muted-foreground">Rasa Types</p>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warm">100%</p>
              <p className="text-sm text-muted-foreground">Ayurveda Verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDatabase;