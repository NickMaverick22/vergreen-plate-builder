
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check, Plus, Minus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import CustomerNavbar from "@/components/CustomerNavbar";

const PlateBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    base: null,
    proteins: [],
    vegetables: [],
    extras: [],
    sauces: [],
    notes: ""
  });

  const steps = [
    { number: 1, title: "Choose Base", description: "Select your foundation" },
    { number: 2, title: "Add Ingredients", description: "Build your perfect meal" },
    { number: 3, title: "Review & Order", description: "Confirm your selection" }
  ];

  const bases = [
    { id: 'quinoa', name: 'Quinoa', price: 3.50, icon: '🌾' },
    { id: 'rice', name: 'Brown Rice', price: 3.00, icon: '🍚' },
    { id: 'pasta', name: 'Whole Wheat Pasta', price: 3.50, icon: '🍝' },
    { id: 'salad', name: 'Mixed Greens', price: 4.00, icon: '🥗' }
  ];

  const ingredients = {
    proteins: [
      { id: 'chicken', name: 'Grilled Chicken', price: 4.50, icon: '🍗' },
      { id: 'salmon', name: 'Grilled Salmon', price: 6.00, icon: '🐟' },
      { id: 'tofu', name: 'Marinated Tofu', price: 3.50, icon: '🧈' },
      { id: 'beans', name: 'Black Beans', price: 2.50, icon: '🫘' }
    ],
    vegetables: [
      { id: 'broccoli', name: 'Steamed Broccoli', price: 1.50, icon: '🥦' },
      { id: 'carrots', name: 'Roasted Carrots', price: 1.50, icon: '🥕' },
      { id: 'peppers', name: 'Bell Peppers', price: 1.50, icon: '🫑' },
      { id: 'tomatoes', name: 'Cherry Tomatoes', price: 2.00, icon: '🍅' }
    ],
    extras: [
      { id: 'avocado', name: 'Fresh Avocado', price: 2.50, icon: '🥑' },
      { id: 'feta', name: 'Feta Cheese', price: 2.00, icon: '🧀' },
      { id: 'nuts', name: 'Mixed Nuts', price: 1.50, icon: '🥜' },
      { id: 'seeds', name: 'Pumpkin Seeds', price: 1.00, icon: '🌱' }
    ],
    sauces: [
      { id: 'tahini', name: 'Tahini Dressing', price: 0.50, icon: '🥄' },
      { id: 'olive', name: 'Olive Oil & Lemon', price: 0.50, icon: '🫒' },
      { id: 'balsamic', name: 'Balsamic Glaze', price: 0.50, icon: '🍯' },
      { id: 'pesto', name: 'Basil Pesto', price: 0.75, icon: '🌿' }
    ]
  };

  const handleItemToggle = (category, item) => {
    if (category === 'base') {
      setSelections(prev => ({ ...prev, base: item }));
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
    ['proteins', 'vegetables', 'extras', 'sauces'].forEach(category => {
      total += selections[category].reduce((sum, item) => sum + item.price, 0);
    });
    return total.toFixed(2);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Place order
      toast({
        title: "Order placed successfully! 🎉",
        description: `Your plate is being prepared. Total: $${calculateTotal()}`,
      });
      navigate('/tracking');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-vergreen-800 mb-4">
              Choose Your Base
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {bases.map(base => (
                <Card
                  key={base.id}
                  className={`p-4 border-2 cursor-pointer transition-all duration-300 rounded-2xl ${
                    selections.base?.id === base.id
                      ? 'border-vergreen-500 bg-vergreen-50'
                      : 'border-vergreen-200 bg-white hover:border-vergreen-300'
                  }`}
                  onClick={() => handleItemToggle('base', base)}
                >
                  <div className="text-center space-y-2">
                    <div className="text-3xl">{base.icon}</div>
                    <h4 className="font-medium text-vergreen-800">{base.name}</h4>
                    <p className="text-sm font-semibold text-vergreen-600">
                      ${base.price}
                    </p>
                    {selections.base?.id === base.id && (
                      <div className="w-6 h-6 bg-vergreen-500 rounded-full mx-auto flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
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
          <div className="space-y-6">
            {Object.entries(ingredients).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-lg font-semibold text-vergreen-800 capitalize">
                  {category}
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {items.map(item => {
                    const isSelected = selections[category].find(i => i.id === item.id);
                    return (
                      <Card
                        key={item.id}
                        className={`p-3 border cursor-pointer transition-all duration-300 rounded-2xl ${
                          isSelected
                            ? 'border-vergreen-500 bg-vergreen-50'
                            : 'border-vergreen-200 bg-white hover:border-vergreen-300'
                        }`}
                        onClick={() => handleItemToggle(category, item)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <h4 className="font-medium text-vergreen-800">{item.name}</h4>
                              <p className="text-sm text-vergreen-600">${item.price}</p>
                            </div>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? 'bg-vergreen-500 border-vergreen-500'
                              : 'border-vergreen-300'
                          }`}>
                            {isSelected && <Check className="w-4 h-4 text-white" />}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-vergreen-800">
              Review Your Order
            </h3>
            
            {/* Order Summary */}
            <div className="bg-vergreen-50 rounded-2xl p-4 space-y-3">
              {selections.base && (
                <div className="flex justify-between items-center">
                  <span className="text-vergreen-800">Base: {selections.base.name}</span>
                  <span className="font-medium text-vergreen-800">${selections.base.price}</span>
                </div>
              )}
              
              {Object.entries(selections).map(([category, items]) => {
                if (category === 'base' || category === 'notes' || !items.length) return null;
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
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate('/dashboard')}
            className="text-vergreen-600 hover:text-vergreen-700"
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
        <div className="flex items-center justify-between mb-8 px-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                currentStep >= step.number
                  ? 'bg-vergreen-500 text-white'
                  : 'bg-vergreen-200 text-vergreen-600'
              }`}>
                {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
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
        <div className="bg-white rounded-3xl neumorphic p-6 mb-6">
          {renderStepContent()}
        </div>

        {/* Bottom Actions */}
        <div className="space-y-4">
          {currentStep > 1 && (
            <div className="bg-white rounded-2xl neumorphic p-4 flex justify-between items-center">
              <span className="text-vergreen-700 font-medium">Current Total</span>
              <span className="text-xl font-bold text-vergreen-800">${calculateTotal()}</span>
            </div>
          )}
          
          <Button
            onClick={handleNext}
            disabled={currentStep === 1 && !selections.base}
            className="w-full bg-vergreen-600 hover:bg-vergreen-700 text-white font-medium py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:opacity-50"
          >
            {currentStep === 3 ? `Place Order - $${calculateTotal()}` : 'Continue'}
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <CustomerNavbar />
    </div>
  );
};

export default PlateBuilder;
