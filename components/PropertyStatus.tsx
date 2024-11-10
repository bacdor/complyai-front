import React, { useState, useRef } from "react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText,
  CheckCircle2,
  XCircle,
  Send,
  Upload,
  MessageSquare,
} from "lucide-react";
// import { Separator } from "@/components/ui/separator";

interface PropertyStatusProps {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  onClose: () => void;
  onComplete: () => void;
}

const PropertyStatus: React.FC<PropertyStatusProps> = ({
  currentPage,
  setCurrentPage,
  onClose,
  onComplete,
}) => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Hello! I can help you understand your project documents and city codes. What would you like to know?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const documents = [
    { name: "Construction_Permit.pdf", url: "#" },
    { name: "Building_Plans.pdf", url: "#" },
    { name: "Site_Survey.pdf", url: "#" },
  ];

  const codeChecklist = [
    {
      code: "Building Height",
      codeRef: "NYC-BC-503.2",
      codeUrl: "https://codes.iccsafe.org/content/NYC-BC-503.2",
      status: "compliant",
      description: "Maximum height requirements met for residential zone R-2",
      recommendation: null,
    },
    {
      code: "Setback Requirements",
      codeRef: "NYC-ZR-23-45",
      codeUrl: "https://zr.planning.nyc.gov/article-ii/chapter-3/23-45",
      status: "compliant",
      description:
        "Proper distance from property lines in residential district",
      recommendation: null,
    },
    {
      code: "Parking Spaces",
      codeRef: "NYC-ZR-25-23",
      codeUrl: "https://zr.planning.nyc.gov/article-ii/chapter-5/25-23",
      status: "non-compliant",
      description: "Insufficient parking spaces for residential development",
      recommendation:
        "Current plan shows 3 spaces, minimum requirement is 5 spaces for R-2 zone. Add 2 more parking spaces or apply for parking requirement modification.",
    },
    {
      code: "Fire Safety",
      codeRef: "NYC-FC-503",
      codeUrl: "https://codes.iccsafe.org/content/NYC-FC-503",
      status: "compliant",
      description:
        "Fire protection systems and access routes meet requirements",
      recommendation: null,
    },
    {
      code: "Accessibility",
      codeRef: "NYC-BC-1101.3",
      codeUrl: "https://codes.iccsafe.org/content/NYC-BC-1101.3",
      status: "non-compliant",
      description: "ADA compliance issues in common areas",
      recommendation:
        "1. Increase door widths to minimum 32 inches clear width\n2. Add ramps at entrances with slopes not exceeding 1:12\n3. Modify bathroom layouts to provide required clearances",
    },
    {
      code: "Zoning Laws",
      codeRef: "NYC-ZR-11-12",
      codeUrl: "https://zr.planning.nyc.gov/article-i/chapter-1/11-12",
      status: "non-compliant",
      description: "Floor Area Ratio (FAR) exceeds zoning district maximum",
      recommendation:
        "Current FAR is 1.8, maximum allowed is 1.6. Either:\n1. Reduce building floor area by 800 sq ft\n2. Apply for zoning variance\n3. Purchase development rights from adjacent lot",
    },
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { role: "user", content: inputMessage }]);
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content:
              "I understand your question. Based on the documents provided...",
          },
        ]);
      }, 1000);
      setInputMessage("");
    }
  };

  const handleFileUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content:
            "I've processed your new document. What would you like to know about it?",
        },
      ]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              123 Main Street Project
            </h1>

            {/* Documents Section */}
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => window.open(doc.url, "_blank")}
                  >
                    <FileText className="h-6 w-6 text-blue-500" />
                    <span className="flex-1">{doc.name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Output Section */}
            <Card>
              <CardHeader>
                <CardTitle>AI Code Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {codeChecklist.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-4">
                      {/* Status Icon */}
                      {item.status === "compliant" && (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      )}
                      {item.status === "non-compliant" && (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      )}
                      {item.status === "n/a" && (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs text-gray-400 font-medium mt-0.5 flex-shrink-0">
                          N/A
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{item.code}</div>
                          <a
                            href={item.codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            {item.codeRef}
                          </a>
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.description}
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              item.status === "compliant"
                                ? "bg-green-100 text-green-800"
                                : item.status === "non-compliant"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.status === "compliant"
                              ? "Compliant"
                              : item.status === "non-compliant"
                              ? "Non-Compliant"
                              : "Pending Review"}
                          </span>
                        </div>

                        {/* Recommendation for non-compliant items */}
                        {item.status === "non-compliant" &&
                          item.recommendation && (
                            <div className="mt-2 text-sm bg-red-50 p-3 rounded-md">
                              <div className="font-medium text-red-800">
                                Recommended Actions:
                              </div>
                              <div className="text-red-700 whitespace-pre-line">
                                {item.recommendation}
                              </div>
                            </div>
                          )}

                        {/* Recommendation for N/A items */}
                        {item.status === "n/a" && item.recommendation && (
                          <div className="mt-2 text-sm bg-gray-100 p-3 rounded-md">
                            <div className="font-medium text-gray-800">
                              Required Action:
                            </div>
                            <div className="text-gray-700">
                              {item.recommendation}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Chat */}
          <div className="h-[calc(100vh-2rem)]">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Chat with your docs using AI</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages Area */}
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Upload Bar */}
                <div className="mt-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <Button
                    variant="outline"
                    className="w-full mb-2"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? "Uploading..." : "Upload Document or Image"}
                  </Button>
                </div>

                {/* Input Area */}
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Ask a question..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyStatus;
