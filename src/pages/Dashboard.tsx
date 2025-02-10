
import DashboardNav from "@/components/DashboardNav";
import UpcomingSessions from "@/components/UpcomingSessions";
import ProgressOverview from "@/components/ProgressOverview";

const Dashboard = () => {
  // Mock user data - replace with real data later
  const user = {
    name: "Alex Johnson",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white/80 backdrop-blur-sm border-r">
          <DashboardNav />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Welcome back, {user.name}!
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
              <ProgressOverview />
              <UpcomingSessions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
