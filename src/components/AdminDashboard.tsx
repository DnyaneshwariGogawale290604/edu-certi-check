import { useState } from "react";
import { BarChart, Activity, AlertTriangle, Users, FileCheck, TrendingUp, Shield, Eye, Home } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const stats = [
    { title: "Total Verifications", value: "89,247", change: "+12.5%", icon: FileCheck, color: "text-primary" },
    { title: "Active Institutions", value: "156", change: "+3.2%", icon: Users, color: "text-accent" },
    { title: "Fake Certificates Detected", value: "1,234", change: "+8.7%", icon: AlertTriangle, color: "text-destructive" },
    { title: "System Uptime", value: "99.98%", change: "+0.02%", icon: Activity, color: "text-success" }
  ];

  const recentAlerts = [
    { 
      id: "ALT001", 
      type: "Suspicious Activity", 
      institution: "ABC College", 
      description: "Multiple certificates with similar patterns detected",
      severity: "High",
      time: "2 hours ago" 
    },
    { 
      id: "ALT002", 
      type: "Invalid Certificate", 
      institution: "XYZ University", 
      description: "Certificate number not found in database",
      severity: "Medium",
      time: "4 hours ago" 
    },
    { 
      id: "ALT003", 
      type: "Duplicate Entry", 
      institution: "DEF Institute", 
      description: "Same certificate uploaded from different sources",
      severity: "Low",
      time: "6 hours ago" 
    }
  ];

  const institutionStats = [
    { name: "Jharkhand University", certificates: 15420, verifications: 12847, accuracy: 98.5 },
    { name: "NIT Jamshedpur", certificates: 8934, verifications: 7892, accuracy: 99.2 },
    { name: "BIT Mesra", certificates: 12547, verifications: 11234, accuracy: 97.8 },
    { name: "Ranchi University", certificates: 18729, verifications: 16432, accuracy: 98.1 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-destructive';
      case 'Medium': return 'bg-warning';
      case 'Low': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Government of Jharkhand - Higher Education Department</p>
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
            <Badge variant="outline" className="bg-success text-success-foreground">
              System Online
            </Badge>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              View Reports
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
                    <div className="flex items-center space-x-2 mt-2">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <Badge variant="outline" className="text-success bg-success/10 border-success/20">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
            <TabsTrigger value="institutions">Institutions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Verification Trends</span>
                  </CardTitle>
                  <CardDescription>Daily verification statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Today</span>
                      <span className="font-semibold">2,847 verifications</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">This Week</span>
                      <span className="font-semibold">18,234 verifications</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">This Month</span>
                      <span className="font-semibold">89,247 verifications</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span>Security Overview</span>
                  </CardTitle>
                  <CardDescription>Recent security incidents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fake Certificates Blocked</span>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                        1,234
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Suspicious Activities</span>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                        45
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Blacklisted Entities</span>
                      <Badge variant="outline" className="bg-muted text-muted-foreground">
                        23
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle>Security Alerts</CardTitle>
                <CardDescription>Monitor and manage security incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Institution</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentAlerts.map((alert, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{alert.id}</TableCell>
                        <TableCell>{alert.type}</TableCell>
                        <TableCell>{alert.institution}</TableCell>
                        <TableCell className="max-w-xs truncate">{alert.description}</TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{alert.time}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">Investigate</Button>
                            <Button variant="ghost" size="sm">Resolve</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="institutions" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle>Institution Performance</CardTitle>
                <CardDescription>Monitor certificate issuance and verification accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Institution</TableHead>
                      <TableHead>Certificates Issued</TableHead>
                      <TableHead>Verifications</TableHead>
                      <TableHead>Accuracy Rate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {institutionStats.map((institution, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{institution.name}</TableCell>
                        <TableCell>{institution.certificates.toLocaleString()}</TableCell>
                        <TableCell>{institution.verifications.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{institution.accuracy}%</span>
                            <Progress value={institution.accuracy} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  <span>System Analytics</span>
                </CardTitle>
                <CardDescription>Detailed analytics and reporting dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced analytics interface would include verification trends, fraud detection patterns, 
                  institution performance metrics, and detailed reporting capabilities.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};