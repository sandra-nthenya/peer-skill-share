
import { Card } from "@/components/ui/card";

const UpcomingSessions = () => {
  // Mock data - replace with real data later
  const sessions = [
    {
      id: 1,
      partner: "Jane Smith",
      skill: "JavaScript",
      date: "2024-03-20",
      time: "15:00",
    },
    {
      id: 2,
      partner: "John Doe",
      skill: "React",
      date: "2024-03-22",
      time: "16:30",
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
      {sessions.length > 0 ? (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between border-b pb-4 last:border-0"
            >
              <div>
                <p className="font-medium">{session.skill} with {session.partner}</p>
                <p className="text-sm text-gray-500">
                  {session.date} at {session.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No upcoming sessions scheduled.</p>
      )}
    </Card>
  );
};

export default UpcomingSessions;
