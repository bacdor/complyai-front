import React, { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  CheckCircle2,
  XCircle,
  Loader2,
  Building2,
  FileCheck,
  CheckCircle,
  ArrowRight,
  FileText,
  Maximize2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ApplicationStepsProps {
  currentPage: string;
  setCurrentPage: Dispatch<SetStateAction<string>>;
  onClose: () => void;
  onComplete: () => void;
}

interface ProjectDetails {
  //   pdf_file: File | null;
  pdf_file: string;
  address: string;
}

interface RequirementResult {
  code: string;
  codeRef: string;
  status: string;
  description: string;
  recommendation: string | null;
}

const ApplicationSteps: React.FC<ApplicationStepsProps> = ({
  currentPage,
  setCurrentPage,
  onClose,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [addressVerified, setAddressVerified] = useState(false);
  const [results, setResults] = useState<RequirementResult[]>([]);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    pdf_file: "",
    address: "",
  });
  const [projectImage, setProjectImage] = useState<string | null>(null);

  const simulateUpload = async () => {
    setLoading(true);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    try {
      console.log("Project details before analysis:", projectDetails);
      const response = await fetch("http://localhost:8000/analyze-building", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze building");
      }

      const data = await response.json();
      setResults(data.requirements);
      console.log(data.requirements);
      console.log(results);
      // Handle response data as needed
    } catch (error) {
      console.error("Error analyzing building:", error);
      setLoading(false);
    }
  };

  const simulateSubmission = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(4);
      setShowConfetti(true);
    }, 3000);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectDetails((prev) => ({
      ...prev,
      address: e.target.value,
    }));
    console.log("Project details after address change:", projectDetails);
  };

  const handleFileUpload = async (file: File) => {
    try {
      // Save file to public folder
      setFileName(file.name);
      const fileURL = URL.createObjectURL(file);

      setProjectDetails((prev) => ({
        ...prev,
        pdf_file: fileURL,
      }));

      console.log("File saved successfully to public folder");
    } catch (error) {
      console.error("Error saving file:", error);
      // Handle error appropriately
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProjectImage(imageUrl);
    }
  };

  const renderStep1 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="project-name">Project Name</Label>
          <Input id="project-name" placeholder="Enter project name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-image">Project Image</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <input
              type="file"
              id="project-image"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="project-image" className="cursor-pointer">
              {projectImage ? (
                <img
                  src={projectImage}
                  alt="Project preview"
                  className="mx-auto max-h-48 object-contain"
                />
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">Drag and drop or click to upload</div>
                </>
              )}
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street-address">Street Address</Label>
            <Input
              id="street-address"
              placeholder="Enter street address"
              value={projectDetails.address}
              onChange={handleAddressChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="City" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select>
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                  <SelectItem value="IL">Illinois</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipcode">ZIP Code</Label>
              <Input id="zipcode" placeholder="ZIP code" maxLength={5} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit/Apt (Optional)</Label>
              <Input id="unit" placeholder="Unit number" />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full mt-2"
            // onClick={() => setAddressVerified(true)}
          >
            <Building2 className="mr-2 h-4 w-4" />
            Verify Address
          </Button>

          {addressVerified && (
            <Alert className="mt-4 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                The provided address has been verified successfully.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="other-details">Other Details</Label>
          <Textarea id="other-details" placeholder="Enter additional details" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => setCurrentStep(2)}>Continue</Button>
      </CardFooter>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <FileCheck className="mx-auto h-16 w-16 text-gray-400 cursor-pointer" />
          </label>
          <div className="mt-4 text-lg font-medium">
            Upload Construction & Building Permits
          </div>
          <div className="mt-2 text-sm text-gray-500">
            PDF files only, maximum 500MB
          </div>
          {projectDetails.pdf_file && (
            <div className="mt-4 text-sm text-gray-700">
              Selected file: {fileName}
            </div>
          )}
          {loading && (
            <div className="mt-4">
              <Progress value={uploadProgress} className="w-full" />
              <div className="mt-2 text-sm text-gray-500">
                {uploadProgress}% uploaded
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          Back
        </Button>
        <Button
          onClick={() => {
            simulateUpload();
            setTimeout(() => setCurrentStep(3), 5000);
          }}
        >
          Upload & Continue
        </Button>
      </CardFooter>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI Code Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Display uploaded file */}
        {projectDetails.pdf_file && (
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Uploaded Document:</span>
                <span className="text-gray-600">{fileName}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const iframe = document.querySelector("iframe");
                  if (iframe) {
                    if (document.fullscreenElement) {
                      document.exitFullscreen();
                    } else {
                      iframe.requestFullscreen();
                    }
                  }
                }}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
            <iframe
              src={projectDetails.pdf_file}
              className="w-full h-96 border rounded"
              allowFullScreen
            />
          </div>
        )}

        {results.map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-4">
              {/* Status Icon */}
              {item.status === "compliant" && (
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              )}
              {item.status === "non-compliant" && (
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              )}
              {item.status !== "compliant" &&
                item.status !== "non-compliant" && (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-400 flex items-center justify-center text-xs text-gray-400 font-medium mt-0.5 flex-shrink-0">
                    N/A
                  </div>
                )}

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{item.code}</div>
                  <a
                    // href={item.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {item.codeRef}
                  </a>
                </div>
                <div className="text-sm text-gray-600">{item.description}</div>

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
                      : "Warning"}
                  </span>
                </div>

                {/* Recommendation for non-compliant items */}
                {item.status === "non-compliant" && item.recommendation && (
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
                    <div className="text-gray-700">{item.recommendation}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button
            variant="outline"
            onClick={() => {
              setCurrentStep(2);
              setUploadProgress(0);
            }}
          >
            Back
          </Button>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setCurrentPage("dashboard")}>
            Discard
          </Button>
          <Button onClick={simulateSubmission} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  const renderStep4 = () => (
    <Card className="w-full max-w-2xl mx-auto text-center">
      <CardContent className="pt-8 space-y-4">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <CardTitle className="text-2xl">
          Application Submitted Successfully!
        </CardTitle>
        <AlertDescription className="text-gray-500">
          Your application has been submitted and is now under review. We'll
          notify you of any updates.
        </AlertDescription>
        <Button className="mt-6" onClick={onComplete}>
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  const steps = {
    1: renderStep1,
    2: renderStep2,
    3: renderStep3,
    4: renderStep4,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {currentStep < 4 && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between mb-2">
            {["Project Details", "Documents", "AI Review", "Complete"].map(
              (step, index) => (
                <div
                  key={index}
                  className={`text-sm ${
                    currentStep >= index + 1 ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {step}
                </div>
              )
            )}
          </div>
          <Progress value={currentStep * 25} className="w-full" />
        </div>
      )}
      {steps[currentStep as keyof typeof steps]()}
    </div>
  );
};

export default ApplicationSteps;
