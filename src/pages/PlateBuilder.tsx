
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check, Plus, Minus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CustomerNavbar from "@/components/CustomerNavbar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const PlateBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    barType: null,
    base: null,
    proteins: [],
    fibers: [],
    cheese: [],
    sauces: [],
    notes: ""
  });

  const steps = [
    { number: 1, title: "Choose Bar Type", description: "Select your meal style" },
    { number: 2, title: "Choose Base", description: "Select your foundation" },
    { number: 3, title: "Add Ingredients", description: "Build your perfect meal" },
    { number: 4, title: "Review & Order", description: "Confirm your selection" }
  ];

  const barTypes = [
    { id: 'salad', name: '🥗 Salad Bar', description: 'Fresh and healthy greens' },
    { id: 'pasta', name: '🍝 Pasta Bar', description: 'Warm and satisfying pasta' }
  ];

  // Auto-progress when bar type is selected
  useEffect(() => {
    if (currentStep === 1 && selections.barType) {
      const timer = setTimeout(() => {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [selections.barType, currentStep]);

  // Reset base and sauces when bar type changes
  useEffect(() => {
    setSelections(prev => ({ ...prev, base: null, sauces: [] }));
  }, [selections.barType]);

  // Auto-progress when base is selected
  useEffect(() => {
    if (currentStep === 2 && selections.base) {
      const timer = setTimeout(() => {
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [selections.base, currentStep]);

  const getBasesForBarType = () => {
    if (selections.barType?.id === 'salad') {
      return [
        { id: 'rice', name: 'Rice', price: 3.00, icon: '🍚' },
        { id: 'lentils', name: 'Lentils', price: 3.50, icon: '🌾' },
        { id: 'lettuce', name: 'Lettuce', price: 2.50, icon: '🥬' },
        { id: 'quinoa', name: 'Quinoa', price: 4.00, icon: '🌾' },
        { id: 'pasta', name: 'Pasta', price: 3.50, icon: '🍝' }
      ];
    } else if (selections.barType?.id === 'pasta') {
      return [
        { id: 'penne', name: 'Penne', price: 3.50, icon: '🍝' },
        { id: 'fusilli', name: 'Fusilli', price: 3.50, icon: '🍝' },
        { id: 'spaghetti', name: 'Spaghetti', price: 3.50, icon: '🍝' },
        { id: 'farfalle', name: 'Farfalle', price: 3.50, icon: '🍝' }
      ];
    }
    return [];
  };

  const getSaucesForBarType = () => {
    if (selections.barType?.id === 'salad') {
      return [
        { id: 'pesto', name: 'Pesto', price: 0.75, icon: '🌿' },
        { id: 'classic', name: 'Classic', price: 0.50, icon: '🥄' },
        { id: 'caesar', name: 'Caesar', price: 0.75, icon: '🥄' },
        { id: 'green', name: 'Green', price: 0.50, icon: '🥄' },
        { id: 'miel-moutarde', name: 'Miel Moutarde', price: 0.75, icon: '🍯' },
        { id: 'moutarde', name: 'Moutarde', price: 0.50, icon: '🥄' },
        { id: 'basilic', name: 'Basilic', price: 0.75, icon: '🌿' }
      ];
    } else if (selections.barType?.id === 'pasta') {
      return [
        { id: 'tomato', name: 'Tomato Sauce', price: 0.75, icon: '🍅' },
        { id: 'hot-tomato', name: 'Hot Tomato', price: 1.00, icon: '🌶️' },
        { id: 'white-sauce', name: 'White Sauce', price: 1.00, icon: '🥛' }
      ];
    }
    return [];
  };

  const proteins = [
    { id: 'chicken', name: 'Chicken', price: 4.50, icon: '🍗' },
    { id: 'tuna', name: 'Tuna', price: 5.00, icon: '🐟' },
    { id: 'boiled-egg', name: 'Boiled Egg', price: 2.00, icon: '🥚' },
    { id: 'jambon', name: 'Jambon', price: 4.00, icon: '🥓' },
    { id: 'meatballs', name: 'Meatballs', price: 4.50, icon: '🍖' },
    { id: 'shrimp', name: 'Shrimp', price: 6.00, icon: '🦐' }
  ];

  const fibers = [
    { id: 'chickpeas', name: 'Chickpeas', price: 1.50, icon: '🫘' },
    { id: 'kidney-beans', name: 'Kidney Beans', price: 1.50, icon: '🫘' },
    { id: 'carrots', name: 'Carrots', price: 1.00, icon: '🥕' },
    { id: 'corn', name: 'Corn', price: 1.50, icon: '🌽' },
    { id: 'onion', name: 'Onion', price: 0.75, icon: '🧅' },
    { id: 'spinach', name: 'Spinach', price: 1.50, icon: '🥬' },
    { id: 'cucumber', name: 'Cucumber', price: 1.00, icon: '🥒' },
    { id: 'tomato', name: 'Tomato', price: 1.50, icon: '🍅' },
    { id: 'mushrooms', name: 'Mushrooms', price: 2.00, icon: '🍄' },
    { id: 'green-peas', name: 'Green Peas', price: 1.50, icon: '🟢' },
    { id: 'courgette', name: 'Courgette', price: 1.50, icon: '🥒' }
  ];

  const cheese = [
    { id: 'mozzarella', name: 'Mozzarella', price: 2.50, icon: '🧀' },
    { id: 'sicilian', name: 'Sicilian Cheese', price: 3.00, icon: '🧀' }
  ];

  const handleItemToggle = (category, item) => {
    if (category === 'base' || category === 'barType') {
      setSelections(prev => ({ ...prev, [category]: item }));
    } else {
      setSelections(prev => ({
        ...prev,
        [category]: prev[category].find(i => i.id === item.id)
          ? prev[category].filter(i => i.id !== item.id)
          : [...prev[category], item]
      }));
    }
  };

  const calculateTotal = () => {
    let total = 0;
    if (selections.base) total += selections.base.price;
    ['proteins', 'fibers', 'cheese', 'sauces'].forEach(category => {
      total += selections[category].reduce((sum, item) => sum + item.price, 0);
    });
    return total.toFixed(2);
  };

  const { user } = useAuth();

  const handleContinue = async () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const orderTime = new Date().toLocaleString();
      const ingredients = [
        selections.base?.id,
        ...selections.proteins.map(i => i.id),
        ...selections.fibers.map(i => i.id),
        ...selections.cheese.map(i => i.id),
        ...selections.sauces.map(i => i.id)
      ].filter(Boolean);
      await supabase.from('orders').insert({
        user_id: user?.id,
        customer: user?.email,
        ingredients,
        total: Number(calculateTotal()),
        status: 'Submitted'
      });
      toast({
        title: "Order placed successfully! 🎉",
        description: `Your ${selections.barType?.name} plate is being prepared. Total: $${calculateTotal()}`,
      });
      navigate('/receipt', {
        state: {
          selections,
          total: calculateTotal(),
          orderTime,
          code: 'VG24'
        }
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/dashboard');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 fade-in">
            <h3 className="text-lg font-semibold text-vergreen-800 mb-6 text-center">
              Choose Your Bar Type
            </h3>
            <div className="space-y-4">
              {barTypes.map(barType => (
                <Card
                  key={barType.id}
                  className={`p-6 border-2 cursor-pointer transition-all duration-500 rounded-2xl transform hover:scale-105 active:scale-95 ${
                    selections.barType?.id === barType.id
                      ? 'border-vergreen-500 bg-vergreen-50 scale-105 shadow-lg'
                      : 'border-vergreen-200 bg-white hover:border-vergreen-300 hover:bg-vergreen-25 hover:shadow-md'
                  }`}
                  onClick={() => handleItemToggle('barType', barType)}
                >
                  <div className="text-center space-y-3">
                    <h4 className="text-xl font-medium text-vergreen-800">{barType.name}</h4>
                    <p className="text-sm text-vergreen-600">{barType.description}</p>
                    {selections.barType?.id === barType.id && (
                      <div className="w-8 h-8 bg-vergreen-500 rounded-full mx-auto flex items-center justify-center animate-scale-in">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 fade-in">
            <h3 className="text-lg font-semibold text-vergreen-800 mb-6 text-center">
              Choose Your Base
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {getBasesForBarType().map(base => (
                <Card
                  key={base.id}
                  className={`p-4 border-2 cursor-pointer transition-all duration-500 rounded-2xl transform hover:scale-105 active:scale-95 ${
                    selections.base?.id === base.id
                      ? 'border-vergreen-500 bg-vergreen-50 scale-105 shadow-lg'
                      : 'border-vergreen-200 bg-white hover:border-vergreen-300 hover:shadow-md'
                  }`}
                  onClick={() => handleItemToggle('base', base)}
                >
                  <div className="text-center space-y-2">
                    <div className="text-3xl">{base.icon}</div>
                    <h4 className="font-medium text-vergreen-800 text-sm">{base.name}</h4>
                    <p className="text-xs font-semibold text-vergreen-600">
                      ${base.price}
                    </p>
                    {selections.base?.id === base.id && (
                      <div className="w-6 h-6 bg-vergreen-500 rounded-full mx-auto flex items-center justify-center animate-scale-in">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 fade-in">
            <h3 className="text-lg font-semibold text-vergreen-800 text-center mb-6">
              Add Your Ingredients
            </h3>
            
            {/* Proteins */}
            <div className="space-y-3">
              <h4 className="text-md font-semibold text-vergreen-800 flex items-center">
                <span className="text-lg mr-2">🍗</span> Proteins
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {proteins.map(item => {
                  const isSelected = selections.proteins.find(i => i.id === item.id);
                  return (
                    <Card
                      key={item.id}
                      className={`p-3 border cursor-pointer transition-all duration-300 rounded-2xl transform hover:scale-105 active:scale-95 ${
                        isSelected
                          ? 'border-vergreen-500 bg-vergreen-50 scale-105 shadow-md'
                          : 'border-vergreen-200 bg-white hover:border-vergreen-300 hover:shadow-sm'
                      }`}
                      onClick={() => handleItemToggle('proteins', item)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h5 className="font-medium text-vergreen-800 text-sm">{item.name}</h5>
                            <p className="text-xs text-vergreen-600">${item.price}</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-vergreen-500 border-vergreen-500 scale-110'
                            : 'border-vergreen-300 hover:border-vergreen-400'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Fibers & Vegetables */}
            <div className="space-y-3">
              <h4 className="text-md font-semibold text-vergreen-800 flex items-center">
                <span className="text-lg mr-2">🥬</span> Fibers & Vegetables
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {fibers.map(item => {
                  const isSelected = selections.fibers.find(i => i.id === item.id);
                  return (
                    <Card
                      key={item.id}
                      className={`p-3 border cursor-pointer transition-all duration-300 rounded-2xl transform hover:scale-105 active:scale-95 ${
                        isSelected
                          ? 'border-vergreen-500 bg-vergreen-50 scale-105 shadow-md'
                          : 'border-vergreen-200 bg-white hover:border-vergreen-300 hover:shadow-sm'
                      }`}
                      onClick={() => handleItemToggle('fibers', item)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h5 className="font-medium text-vergreen-800 text-sm">{item.name}</h5>
                            <p className="text-xs text-vergreen-600">${item.price}</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-vergreen-500 border-vergreen-500 scale-110'
                            : 'border-vergreen-300 hover:border-vergreen-400'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Cheese */}
            <div className="space-y-3">
              <h4 className="text-md font-semibold text-vergreen-800 flex items-center">
                <span className="text-lg mr-2">🧀</span> Cheese
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {cheese.map(item => {
                  const isSelected = selections.cheese.find(i => i.id === item.id);
                  return (
                    <Card
                      key={item.id}
                      className={`p-3 border cursor-pointer transition-all duration-300 rounded-2xl transform hover:scale-105 active:scale-95 ${
                        isSelected
                          ? 'border-vergreen-500 bg-vergreen-50 scale-105 shadow-md'
                          : 'border-vergreen-200 bg-white hover:border-vergreen-300 hover:shadow-sm'
                      }`}
                      onClick={() => handleItemToggle('cheese', item)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h5 className="font-medium text-vergreen-800 text-sm">{item.name}</h5>
                            <p className="text-xs text-vergreen-600">${item.price}</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-vergreen-500 border-vergreen-500 scale-110'
                            : 'border-vergreen-300 hover:border-vergreen-400'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Sauces */}
            <div className="space-y-3">
              <h4 className="text-md font-semibold text-vergreen-800 flex items-center">
                <span className="text-lg mr-2">🥄</span> Sauces
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {getSaucesForBarType().map(item => {
                  const isSelected = selections.sauces.find(i => i.id === item.id);
                  return (
                    <Card
                      key={item.id}
                      className={`p-3 border cursor-pointer transition-all duration-300 rounded-2xl transform hover:scale-105 active:scale-95 ${
                        isSelected
                          ? 'border-vergreen-500 bg-vergreen-50 scale-105 shadow-md'
                          : 'border-vergreen-200 bg-white hover:border-vergreen-300 hover:shadow-sm'
                      }`}
                      onClick={() => handleItemToggle('sauces', item)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h5 className="font-medium text-vergreen-800 text-sm">{item.name}</h5>
                            <p className="text-xs text-vergreen-600">${item.price}</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-vergreen-500 border-vergreen-500 scale-110'
                            : 'border-vergreen-300 hover:border-vergreen-400'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Continue Button for Step 3 */}
            <div className="pt-4">
              <Button
                onClick={handleContinue}
                className="w-full bg-vergreen-600 hover:bg-vergreen-700 text-white font-medium py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Review Your Plate
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 fade-in">
            <h3 className="text-lg font-semibold text-vergreen-800 text-center">
              Review Your Order
            </h3>
            
            {/* Order Summary */}
            <div className="bg-vergreen-50 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center border-b border-vergreen-200 pb-2">
                <span className="font-medium text-vergreen-800">
                  {selections.barType?.name}
                </span>
              </div>
              
              {selections.base && (
                <div className="flex justify-between items-center">
                  <span className="text-vergreen-800">Base: {selections.base.name}</span>
                  <span className="font-medium text-vergreen-800">${selections.base.price}</span>
                </div>
              )}
              
              {Object.entries(selections).map(([category, items]) => {
                if (category === 'base' || category === 'barType' || category === 'notes' || !items.length) return null;
                return items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-vergreen-800">{item.name}</span>
                    <span className="font-medium text-vergreen-800">${item.price}</span>
                  </div>
                ));
              })}
              
              <div className="border-t border-vergreen-200 pt-3 flex justify-between items-center">
                <span className="font-bold text-vergreen-800">Total</span>
                <span className="font-bold text-xl text-vergreen-800">${calculateTotal()}</span>
              </div>
            </div>

            {/* Special Notes */}
            <div className="space-y-2">
              <label className="text-vergreen-700 font-medium">Special Instructions (Optional)</label>
              <Textarea
                placeholder="Any special requests or allergies?"
                value={selections.notes}
                onChange={(e) => setSelections(prev => ({ ...prev, notes: e.target.value }))}
                className="bg-white border-vergreen-200 rounded-2xl focus:ring-vergreen-500 focus:border-vergreen-500"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vergreen-50 to-emerald-50 pb-20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-vergreen-100 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-vergreen-600 hover:text-vergreen-700 hover:bg-vergreen-50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-bold text-vergreen-800">Build Your Plate</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-2">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-500 transform ${
                currentStep >= step.number
                  ? 'bg-vergreen-500 text-white scale-110 shadow-lg'
                  : 'bg-vergreen-200 text-vergreen-600'
              }`}>
                {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-1 mx-2 transition-all duration-500 rounded-full ${
                  currentStep > step.number ? 'bg-vergreen-500' : 'bg-vergreen-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Current Step Info */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-vergreen-800 mb-1">
            {steps[currentStep - 1].title}
          </h2>
          <p className="text-vergreen-600">
            {steps[currentStep - 1].description}
          </p>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-3xl neumorphic p-6 mb-6 min-h-[400px]">
          {renderStepContent()}
        </div>

        {/* Bottom Actions */}
        <div className="space-y-4">
          {currentStep > 2 && (
            <div className="bg-white rounded-2xl neumorphic p-4 flex justify-between items-center">
              <span className="text-vergreen-700 font-medium">Current Total</span>
              <span className="text-xl font-bold text-vergreen-800">${calculateTotal()}</span>
            </div>
          )}
          
          {currentStep === 4 && (
            <Button
              onClick={handleContinue}
              className="w-full bg-vergreen-600 hover:bg-vergreen-700 text-white font-medium py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Place Order - ${calculateTotal()}
            </Button>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <CustomerNavbar />
    </div>
  );
};

export default PlateBuilder;
