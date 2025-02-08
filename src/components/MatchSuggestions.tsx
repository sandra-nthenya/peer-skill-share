
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Star, UserCheck } from "lucide-react";
import type { MatchFilters } from "@/pages/SkillMatching";
import { toast } from "@/components/ui/use-toast";

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
  },
];

interface MatchSuggestionsProps {
  filters: MatchFilters;
}

const MatchSuggestions = ({ filters }: MatchSuggestionsProps) => {
  const handleConnect = (matchId: number) => {
    toast({
      title: "Connection request sent!",
      description: "You'll be notified when they respond.",
    });
  };

  const handleMessage = (matchId: number) => {
    toast({
      title: "Coming soon!",
      description: "Messaging feature will be available soon.",
    });
  };

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
          <Card key={match.id} className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={match.avatar} />
                <AvatarFallback>{match.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{match.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{match.rating}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <Badge variant="secondary" className="mr-2">{match.industry}</Badge>
                  <Badge variant="secondary">{match.experienceLevel}</Badge>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Skills to teach:</p>
                  <div className="flex flex-wrap gap-2">
                    {match.skillsToTeach.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleConnect(match.id)}
                  >
                    <UserCheck className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleMessage(match.id)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default MatchSuggestions;
