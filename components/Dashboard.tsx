import React from "react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Building2,
  Files,
  HelpCircle,
  Home,
  Settings,
  SwitchCamera,
} from "lucide-react";

interface DashboardProps {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
}

const Dashboard: React.FC<DashboardProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const menuItems = [
    { icon: <Home className="w-4 h-4 mr-2" />, label: "Applications" },
    { icon: <Building2 className="w-4 h-4 mr-2" />, label: "Status" },
    { icon: <Files className="w-4 h-4 mr-2" />, label: "Documents" },
    { icon: <Settings className="w-4 h-4 mr-2" />, label: "Settings" },
    { icon: <HelpCircle className="w-4 h-4 mr-2" />, label: "Support" },
  ];

  const propertyCards = [
    { image: "../static/house1.webp", status: "Approved" },
    { image: "../static/house2.webp", status: "Pending" },
    { image: "../static/house3.webp", status: "Needs detail" },
    { image: "../static/house4.webp", status: "Approved" },
    { image: "../static/house5.webp", status: "Pending" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Needs detail":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold text-orange-600">Dashboard</div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r">
          <nav className="p-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-600 rounded-lg hover:bg-gray-50"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <Button
              className="flex items-center w-full px-4 py-2 mt-4 text-sm opacity-0"
              variant="outline"
              onClick={() => setCurrentPage("admin")}
            >
              <SwitchCamera className="w-4 h-4 mr-2" />
              Switch View
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-3 gap-6">
            {/* New Application Card */}
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="flex items-center justify-center h-64">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => setCurrentPage("application")}
                >
                  New Application
                </Button>
              </CardContent>
            </Card>

            {/* Property Cards */}
            {propertyCards.map((card, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={card.image}
                      alt="Property"
                      className="w-full h-48 object-cover"
                    />
                    <span
                      className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        card.status
                      )}`}
                    >
                      {card.status}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => setCurrentPage("status")}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
