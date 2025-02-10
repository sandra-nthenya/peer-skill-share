
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, UserCircle, LogOut } from "lucide-react";

const DashboardNav = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // TODO: Add sign out logic here
    navigate("/sign-in");
  };

  return (
    <div className="h-full space-y-2">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard Menu</h2>
        <div className="space-y-1">
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/dashboard" className="flex items-center">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/skill-matching" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Find Learning Partners
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-start">
            <Link to="/dashboard/profile" className="flex items-center">
              <UserCircle className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
