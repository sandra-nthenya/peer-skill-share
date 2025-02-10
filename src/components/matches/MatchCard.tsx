
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Star, UserCheck } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ScheduleSessionDialog } from "./ScheduleSessionDialog";

interface MatchCardProps {
  match: {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    industry: string;
    skillsToTeach: string[];
    experienceLevel: string;
    availability: string;
    availableTimeSlots: string[];
  };
}

export const MatchCard = ({ match }: MatchCardProps) => {
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

  return (
    <Card className="p-6">
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
            <ScheduleSessionDialog match={match} />
          </div>
        </div>
      </div>
    </Card>
  );
};
