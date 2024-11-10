import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Files,
  HelpCircle,
  Home,
  Settings,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  User,
  Calendar,
  FileText,
  Tag,
  Search,
  SwitchCamera,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface AdminDashboardProps {
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({
    title: "",
    message: "",
    type: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  const menuItems = [
    { icon: <Home className="w-4 h-4 mr-2" />, label: "Dashboard" },
    { icon: <Building2 className="w-4 h-4 mr-2" />, label: "Applications" },
    { icon: <Files className="w-4 h-4 mr-2" />, label: "Reports" },
    { icon: <Settings className="w-4 h-4 mr-2" />, label: "Settings" },
    { icon: <HelpCircle className="w-4 h-4 mr-2" />, label: "Help" },
  ];

  const applications = [
    {
      id: "APP-2024-001",
      developer: "Acme Development Corp",
      project: "Downtown Heights",
      submitDate: "2024-03-15",
      status: "Pending Review",
      type: "Commercial",
      urgency: "High",
      description: "20-story mixed-use development with retail space",
      location: "123 Downtown Ave",
      estimatedCost: "$25M",
      zoning: "C-2",
    },
    {
      id: "APP-2024-002",
      developer: "BuildRight LLC",
      project: "Green Valley Residences",
      submitDate: "2024-03-14",
      status: "Under Review",
      type: "Residential",
      urgency: "Medium",
      description: "Luxury apartment complex with 150 units",
      location: "456 Valley Road",
      estimatedCost: "$18M",
      zoning: "R-3",
    },
    {
      id: "APP-2024-003",
      developer: "Urban Developers Inc",
      project: "Tech Hub Plaza",
      submitDate: "2024-03-13",
      status: "On Hold",
      type: "Mixed Use",
      urgency: "Low",
      description: "Innovation center with office spaces and retail",
      location: "789 Innovation Drive",
      estimatedCost: "$30M",
      zoning: "MU-1",
    },
    {
      id: "APP-2024-004",
      developer: "Sustainable Builders Co",
      project: "EcoVillage Community",
      submitDate: "2024-03-12",
      status: "Pending Review",
      type: "Residential",
      urgency: "Medium",
      description: "Net-zero energy residential community with 75 homes",
      location: "321 Green Street",
      estimatedCost: "$22M",
      zoning: "R-2",
    },
    {
      id: "APP-2024-005",
      developer: "Heritage Construction",
      project: "Historic District Renovation",
      submitDate: "2024-03-11",
      status: "Under Review",
      type: "Commercial",
      urgency: "High",
      description: "Restoration of 5 historic buildings for retail use",
      location: "567 Main Street",
      estimatedCost: "$15M",
      zoning: "H-1",
    },
    {
      id: "APP-2024-006",
      developer: "Modern Living Developments",
      project: "Smart City Complex",
      submitDate: "2024-03-10",
      status: "On Hold",
      type: "Mixed Use",
      urgency: "Medium",
      description: "IoT-enabled apartment and office complex",
      location: "890 Future Boulevard",
      estimatedCost: "$35M",
      zoning: "MU-2",
    },
  ];

  const handleAction = (id: string, action: "approve" | "decline") => {
    setShowAlert(true);
    if (action === "approve") {
      setAlertContent({
        title: "Application Approved",
        message: `Application ${id} has been approved successfully.`,
        type: "success",
      });
    } else {
      setAlertContent({
        title: "Application Declined",
        message: `Application ${id} has been declined.`,
        type: "error",
      });
    }

    setTimeout(() => setShowAlert(false), 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending Review":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "Under Review":
        return <Filter className="w-4 h-4 text-blue-500" />;
      case "On Hold":
        return <Clock className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        searchQuery === "" ||
        Object.values(app).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;
      const matchesType = typeFilter === "all" || app.type === typeFilter;
      const matchesUrgency =
        urgencyFilter === "all" || app.urgency === urgencyFilter;

      return matchesSearch && matchesStatus && matchesType && matchesUrgency;
    });
  }, [applications, searchQuery, statusFilter, typeFilter, urgencyFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold text-orange-600">
            City Hall Portal
          </div>
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
          </nav>
          <div className="px-4">
            <Button
              className="flex items-center w-full px-4 py-2 text-sm opacity-0"
              variant="outline"
              onClick={() => setCurrentPage("dashboard")}
            >
              <SwitchCamera className="w-4 h-4 mr-2" />
              Switch View
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {showAlert && (
            <Alert
              className={`mb-6 ${
                alertContent.type === "success"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <AlertTitle>{alertContent.title}</AlertTitle>
              <AlertDescription>{alertContent.message}</AlertDescription>
            </Alert>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Pending Applications
            </h2>
            <p className="text-sm text-gray-600">
              Review and process building permit applications
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search applications..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending Review">Pending Review</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                </SelectContent>
              </Select>

              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High Priority</SelectItem>
                  <SelectItem value="Medium">Medium Priority</SelectItem>
                  <SelectItem value="Low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  No applications match your search criteria
                </CardContent>
              </Card>
            ) : (
              filteredApplications.map((app) => (
                <Card key={app.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-12 gap-6">
                      {/* Application ID and Status */}
                      <div className="col-span-2">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">
                              {app.id}
                            </span>
                          </div>
                          <div className="flex items-center">
                            {getStatusIcon(app.status)}
                            <span className="ml-1 text-sm text-gray-600">
                              {app.status}
                            </span>
                          </div>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(
                              app.urgency
                            )}`}
                          >
                            {app.urgency} Priority
                          </span>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="col-span-3">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Building2 className="w-4 h-4 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-800">
                              {app.project}
                            </h3>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <User className="w-4 h-4 mr-2" />
                            <span className="text-sm">{app.developer}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Tag className="w-4 h-4 mr-2" />
                            <span className="text-sm">{app.type}</span>
                          </div>
                        </div>
                      </div>

                      {/* Location and Zoning */}
                      <div className="col-span-3">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <FileText className="w-4 h-4 mr-2" />
                            <span className="text-sm">{app.description}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Home className="w-4 h-4 mr-2" />
                            <span className="text-sm">{app.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Files className="w-4 h-4 mr-2" />
                            <span className="text-sm">
                              Zoning: {app.zoning}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Dates and Cost */}
                      <div className="col-span-2">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm">
                              Submitted: {app.submitDate}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <span className="text-sm">
                              Est. Cost: {app.estimatedCost}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="col-span-2 flex items-center justify-end space-x-2">
                        <Button
                          className="bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => handleAction(app.id, "approve")}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          className="bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => handleAction(app.id, "decline")}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
