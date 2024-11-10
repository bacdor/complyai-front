"use client";

import ApplicationSteps from "@/components/ApplicationSteps";
import Dashboard from "@/components/Dashboard";
import PropertyStatus from "@/components/PropertyStatus";
import React, { useState } from "react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        );
      case "application":
        return (
          <ApplicationSteps
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onClose={() => setCurrentPage("dashboard")}
            onComplete={() => setCurrentPage("dashboard")}
          />
        );
      case "status":
        return (
          <PropertyStatus
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onClose={() => setCurrentPage("dashboard")}
            onComplete={() => setCurrentPage("dashboard")}
          />
        );
      default:
        return null;
    }
  };

  return renderPage();
}
