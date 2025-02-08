
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface StepProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator = ({ currentStep, steps }: StepProps) => {
  return (
    <div className="flex justify-center items-center mb-8">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`step-item ${currentStep === i + 1 ? "active" : ""} ${
            i + 1 < currentStep ? "complete" : ""
          }`}
        >
          <div className="step">
            {i + 1 < currentStep ? (
              <Check className="w-6 h-6" />
            ) : (
              i + 1
            )}
          </div>
          <p className="text-xs mt-2">{step}</p>
        </div>
      ))}
    </div>
  );
};

const SignUpSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    skillsToLearn: [],
    skillsToTeach: [],
    industry: "",
    experienceLevel: "",
  });
  const { toast } = useToast();
  
  const steps = ["Account", "Skills", "Profile", "Finish"];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "Your profile has been created.",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <StepIndicator currentStep={currentStep} steps={steps} />
      
      <Card className="p-6 animate-slide-up backdrop-blur-sm bg-white/80">
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1"
                  required
                />
              </div>
            </div>
          )}

          {/* Add more steps here */}
          
          <div className="flex justify-between pt-4">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="w-24"
              >
                Back
              </Button>
            )}
            <div className="flex-1" />
            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={handleNext}
                className="w-24"
              >
                Next
              </Button>
            ) : (
              <Button type="submit" className="w-24">
                Finish
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignUpSteps;
