
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScheduleSessionDialogProps {
  match: {
    id: number;
    name: string;
    availability: string;
    availableTimeSlots: string[];
  };
}

export const ScheduleSessionDialog = ({ match }: ScheduleSessionDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");

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

  return (
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
  );
};
