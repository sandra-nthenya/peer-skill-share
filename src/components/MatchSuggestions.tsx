
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { MessageSquare, Star, UserCheck, Calendar as CalendarIcon } from "lucide-react";
import type { MatchFiltersType } from "@/pages/SkillMatching";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");

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

  const handleSchedule = (matchId: number) => {
    if (!date || !selectedTime) {
      toast({
        title: "Please select both date and time",
        description: "You need to select both a date and time slot to schedule a session.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Session Scheduled!",
      description: `Your session has been scheduled for ${date.toLocaleDateString()} at ${selectedTime}. Check your dashboard for details.`,
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        className="flex-1"
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Schedule a Session with {match.name}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              return (
                                date < today ||
                                (match.availability === "weekdays" && date.getDay() === 0 || date.getDay() === 6) ||
                                (match.availability === "weekends" && date.getDay() !== 0 && date.getDay() !== 6)
                              );
                            }}
                          />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="time" className="text-sm font-medium">Select Time</label>
                          <Select
                            value={selectedTime}
                            onValueChange={setSelectedTime}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {match.availableTimeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={() => handleSchedule(match.id)} className="w-full">
                          Confirm Session
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
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

