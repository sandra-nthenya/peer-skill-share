
import { Card } from "@/components/ui/card";
import type { MatchFiltersType } from "@/pages/SkillMatching";
import { MatchCard } from "./matches/MatchCard";

// Mock data for demonstration
const mockMatches = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "",
    rating: 4.8,
    industry: "Technology",
    skillsToTeach: ["React", "Node.js", "TypeScript"],
    experienceLevel: "Expert",
    availability: "weekdays",
    availableTimeSlots: ["09:00", "10:00", "14:00", "15:00", "16:00"],
  },
  {
    id: 2,
    name: "Michael Ross",
    avatar: "",
    rating: 4.6,
    industry: "Technology",
    skillsToTeach: ["Python", "Machine Learning", "Data Analysis"],
    experienceLevel: "Advanced",
    availability: "both",
    availableTimeSlots: ["11:00", "13:00", "14:00", "15:00"],
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "",
    rating: 4.9,
    industry: "Education",
    skillsToTeach: ["JavaScript", "React", "UI/UX Design"],
    experienceLevel: "Expert",
    availability: "weekends",
    availableTimeSlots: ["10:00", "11:00", "14:00", "15:00"],
  },
];

interface MatchSuggestionsProps {
  filters: MatchFiltersType;
}

const MatchSuggestions = ({ filters }: MatchSuggestionsProps) => {
  // Filter matches based on selected filters
  const filteredMatches = mockMatches.filter((match) => {
    if (filters.skillToLearn && !match.skillsToTeach.includes(filters.skillToLearn)) {
      return false;
    }
    if (filters.industry && match.industry !== filters.industry) {
      return false;
    }
    if (filters.experienceLevel && match.experienceLevel !== filters.experienceLevel) {
      return false;
    }
    if (filters.availability && match.availability !== filters.availability && match.availability !== "both") {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {filteredMatches.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          No matches found with the selected filters. Try adjusting your criteria.
        </Card>
      ) : (
        filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))
      )}
    </div>
  );
};

export default MatchSuggestions;
