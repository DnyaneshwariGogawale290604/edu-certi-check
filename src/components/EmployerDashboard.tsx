import { useState, useRef } from "react";
import { Upload, Search, CheckCircle, XCircle, Clock, Download, FileCheck, AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export const EmployerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  // ---- new state & refs ----
const fileInputRef = useRef(null);
const [selectedFile, setSelectedFile] = useState(null); // File | null
const [verifying, setVerifying] = useState(false);
const [verificationResult, setVerificationResult] = useState(null);

// Trigger the hidden file input
const handleSelectFile = () => {
  fileInputRef.current?.click();
};

// When user selects a file from picker
const handleFileChange = (e) => {
  const f = e.target.files?.[0] ?? null;
  setSelectedFile(f);
  setVerificationResult(null); // clear previous result
};

// Update your existing handleDrop to set selectedFile
// replace the inside of current handleDrop's if block with:
// if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//   setSelectedFile(e.dataTransfer.files[0]);
// }

// Verify: upload to backend
const handleVerify = async () => {
  if (!selectedFile) {
    alert("Please select a file first.");
    return;
  }

  setVerifying(true);
  setVerificationResult(null);

  try {
    const formData = new FormData();
    formData.append("certificate", selectedFile);

    // backend endpoint - change if needed
    const res = await fetch("http://localhost:5000/api/verify", {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error(`Server returned ${res.status}`);

    const json = await res.json();
    // expected shape: { status: 'Verified'|'Invalid'|'Pending', confidence: number, reportUrl?: string }
    setVerificationResult(json);

    // optional: show a toast or update the verificationHistory table (see notes below)
  } catch (err) {
    console.error("Verification failed", err);
    alert("Verification failed. See console for details.");
  } finally {
    setVerifying(false);
  }
};


  const stats = [
    { title: "Certificates Verified", value: "1,247", icon: CheckCircle, color: "text-success" },
    { title: "Pending Verifications", value: "23", icon: Clock, color: "text-warning" },
    { title: "Invalid Certificates", value: "18", icon: XCircle, color: "text-destructive" },
    { title: "Accuracy Rate", value: "98.5%", icon: FileCheck, color: "text-primary" }
  ];

  const verificationHistory = [
    { 
      id: "VER001", 
      candidateName: "Priya Sharma", 
      certificate: "B.Tech Computer Science", 
      institution: "Jharkhand University", 
      status: "Verified", 
      date: "2024-03-15",
      confidence: 99.8
    },
    { 
      id: "VER002", 
      candidateName: "Rahul Kumar", 
      certificate: "MBA Finance", 
      institution: "NIT Jamshedpur", 
      status: "Invalid", 
      date: "2024-03-14",
      confidence: 15.2
    },
    { 
      id: "VER003", 
      candidateName: "Anjali Singh", 
      certificate: "M.Sc Physics", 
      institution: "BIT Mesra", 
      status: "Verified", 
      date: "2024-03-13",
      confidence: 98.9
    },
    { 
      id: "VER004", 
      candidateName: "Amit Verma", 
      certificate: "B.A Economics", 
      institution: "Ranchi University", 
      status: "Pending", 
      date: "2024-03-12",
      confidence: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-success text-success-foreground';
      case 'Invalid': return 'bg-destructive text-destructive-foreground';
      case 'Pending': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified': return CheckCircle;
      case 'Invalid': return XCircle;
      case 'Pending': return Clock;
      default: return AlertCircle;
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    //   // Handle file upload logic here
    //   console.log("Files dropped:", e.dataTransfer.files);
    // }

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileCheck className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Employer Portal</h1>
              <p className="text-muted-foreground">Certificate Verification System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
            {/* <Button className="bg-gradient-primary">
              <Upload className="h-4 w-4 mr-2" />
              Verify Certificates
            </Button> */}
            <Button
              className="bg-gradient-primary"
              onClick={handleVerify}
              disabled={verifying || !selectedFile}
            >
              <Upload className="h-4 w-4 mr-2" />
              {verifying ? "Verifying..." : "Verify Certificates"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="verify" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="verify">Verify Certificates</TabsTrigger>
            <TabsTrigger value="history">Verification History</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="verify" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle>Single Certificate Verification</CardTitle>
                <CardDescription>Upload a certificate image or PDF for instant verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div 
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                    dragActive ? 'border-primary bg-primary/5' : 'border-muted'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Certificate</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your certificate file here, or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supported formats: PDF, JPG, PNG (Max size: 10MB)
                  </p>
                  <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  />
                  <Button className="bg-gradient-primary" onClick={handleSelectFile}>Select File</Button>
                  {selectedFile && (
                    <div className="mt-3 flex items-center justify-center space-x-3">
                      <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>Remove</Button>
                    </div>
                  )}
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-4 bg-accent/5 border-accent/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <h4 className="font-semibold">AI-Powered Detection</h4>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• OCR text extraction and analysis</li>
                      <li>• Signature and seal verification</li>
                      <li>• Format and layout validation</li>
                      <li>• Blockchain cross-verification</li>
                    </ul>
                  </Card>

                  <Card className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileCheck className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Instant Results</h4>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Real-time verification status</li>
                      <li>• Confidence score (0-100%)</li>
                      <li>• Detailed anomaly reports</li>
                      <li>• Downloadable verification reports</li>
                    </ul>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Verification History</CardTitle>
                    <CardDescription>Track all your certificate verifications</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search verifications..." 
                        className="pl-10 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Verification ID</TableHead>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Certificate</TableHead>
                      <TableHead>Institution</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verificationHistory.map((record, index) => {
                      const StatusIcon = getStatusIcon(record.status);
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{record.id}</TableCell>
                          <TableCell>{record.candidateName}</TableCell>
                          <TableCell>{record.certificate}</TableCell>
                          <TableCell>{record.institution}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(record.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {record.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {record.confidence ? (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">{record.confidence}%</span>
                                <Progress value={record.confidence} className="w-16 h-2" />
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">View Report</Button>
                              <Button variant="ghost" size="sm">Download</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle>Bulk Certificate Verification</CardTitle>
                <CardDescription>Upload multiple certificates for batch processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
                  <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Certificate Archive</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload a CSV file with certificate details or a ZIP file with multiple certificates
                  </p>
                  <Button className="bg-gradient-primary">Select Files</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2 text-primary">CSV Format</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Candidate Name</li>
                      <li>• Certificate Number</li>
                      <li>• Institution Name</li>
                      <li>• Course Details</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2 text-accent">ZIP Archive</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• PDF/Image files</li>
                      <li>• Max 100 files</li>
                      <li>• Total size: 500MB</li>
                      <li>• Automatic processing</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2 text-success">Results</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Detailed CSV report</li>
                      <li>• Individual PDFs</li>
                      <li>• Summary statistics</li>
                      <li>• Email notifications</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};