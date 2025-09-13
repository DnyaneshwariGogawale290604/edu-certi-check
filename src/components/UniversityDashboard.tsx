import { useState } from "react";
import { Upload, FileText, Download, Users, Shield, Plus, Search, Filter, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

export const UniversityDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const stats = [
    { title: "Certificates Issued", value: "2,847", icon: FileText, color: "text-primary" },
    { title: "Active Students", value: "15,420", icon: Users, color: "text-accent" },
    { title: "Departments", value: "12", icon: Shield, color: "text-warning" },
    { title: "Pending Requests", value: "34", icon: Upload, color: "text-destructive" }
  ];

  const recentCertificates = [
    { id: "CERT001", student: "Priya Sharma", course: "B.Tech Computer Science", date: "2024-03-15", status: "Issued" },
    { id: "CERT002", student: "Rahul Kumar", course: "MBA Finance", date: "2024-03-14", status: "Pending" },
    { id: "CERT003", student: "Anjali Singh", course: "M.Sc Physics", date: "2024-03-13", status: "Issued" },
    { id: "CERT004", student: "Amit Verma", course: "B.A Economics", date: "2024-03-12", status: "Processing" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Jharkhand University</h1>
              <p className="text-muted-foreground">Certificate Management Portal</p>
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
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </Button>
            <Button className="bg-gradient-primary flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Issue Certificate</span>
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
        <Tabs defaultValue="certificates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="bulk-upload">Bulk Upload</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="certificates" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Certificate Management</CardTitle>
                    <CardDescription>Manage and track all issued certificates</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search certificates..." 
                        className="pl-10 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificate ID</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentCertificates.map((cert, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{cert.id}</TableCell>
                        <TableCell>{cert.student}</TableCell>
                        <TableCell>{cert.course}</TableCell>
                        <TableCell>{cert.date}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={cert.status === 'Issued' ? 'default' : 
                                   cert.status === 'Pending' ? 'secondary' : 'outline'}
                            className={cert.status === 'Issued' ? 'bg-success' : ''}
                          >
                            {cert.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk-upload" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle>Bulk Certificate Upload</CardTitle>
                <CardDescription>Upload multiple certificates at once using CSV or ZIP files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
                  <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Certificate Files</h3>
                  <p className="text-muted-foreground mb-4">Drag and drop your CSV or ZIP files here, or click to browse</p>
                  <Button className="bg-gradient-primary">Select Files</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">CSV Format Requirements</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Student Name, Roll Number, Course</li>
                      <li>• Grades, Issue Date, Certificate ID</li>
                      <li>• Maximum 1000 records per file</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Security Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Automatic blockchain registration</li>
                      <li>• Digital watermark embedding</li>
                      <li>• QR code generation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Manage student records and certificate eligibility</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Student management interface would be implemented here with features for managing student records, eligibility, and certificate requests.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle>University Settings</CardTitle>
                <CardDescription>Configure university information and certificate templates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings interface would include university branding, certificate templates, digital signature configuration, and blockchain settings.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};