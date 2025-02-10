
import { Card } from "@/components/ui/card";
import { Brain, Users } from "lucide-react";

const ProgressOverview = () => {
  // Mock data - replace with real data later
  const progress = {
    skillsLearned: 3,
    sessionsCompleted: 12,
    teachingHours: 8,
    learningHours: 10,
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span className="font-medium">Skills Learned</span>
          </div>
          <p className="text-2xl font-bold text-purple-600 mt-2">
            {progress.skillsLearned}
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="font-medium">Sessions</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {progress.sessionsCompleted}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Teaching Hours</span>
          <span className="font-medium">{progress.teachingHours}h</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Learning Hours</span>
          <span className="font-medium">{progress.learningHours}h</span>
        </div>
      </div>
    </Card>
  );
};

export default ProgressOverview;
