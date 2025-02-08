
import { useState } from "react";
import { Card } from "@/components/ui/card";
import MatchFilters from "@/components/MatchFilters";
import MatchSuggestions from "@/components/MatchSuggestions";
import { toast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";

export type MatchFiltersType = {
  skillToLearn: string;
  industry: string;
  experienceLevel: string;
  availability: string;
};

const SkillMatching = () => {
  const [filters, setFilters] = useState<MatchFiltersType>({
    skillToLearn: "",
    industry: "",
    experienceLevel: "",
    availability: "weekdays",
  });

  const handleFilterChange = (newFilters: MatchFiltersType) => {
    setFilters(newFilters);
    toast({
      title: "Filters updated",
      description: "Match suggestions have been refreshed.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          Find Your Perfect Learning Match
        </h1>
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-4">
            <Card className="p-6">
              <MatchFilters filters={filters} onFilterChange={handleFilterChange} />
            </Card>
          </div>
          <div className="md:col-span-8">
            <MatchSuggestions filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMatching;
