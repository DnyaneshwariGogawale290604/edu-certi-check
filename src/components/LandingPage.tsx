import { Shield, CheckCircle, Building2, Users, FileCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Blockchain-powered verification with zero-knowledge proofs and cryptographic validation"
    },
    {
      icon: CheckCircle,
      title: "AI-Powered Detection",
      description: "Detect tampered grades, forged signatures, and invalid certificate numbers using advanced OCR"
    },
    {
      icon: FileCheck,
      title: "Bulk Verification",
      description: "Upload CSV files to verify hundreds of certificates simultaneously"
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description: "Secure handling of student information with role-based access control"
    }
  ];

  const userTypes = [
    {
      title: "Universities & Colleges",
      description: "Issue and manage digital certificates with blockchain security",
      icon: Building2,
      role: "university",
      bgColor: "bg-primary"
    },
    {
      title: "Employers & Agencies",
      description: "Verify academic credentials quickly and securely",
      icon: Users,
      role: "employer",
      bgColor: "bg-accent"
    },
    {
      title: "Government Bodies",
      description: "Monitor verification activities and detect forgery trends",
      icon: Shield,
      role: "admin",
      bgColor: "bg-warning"
    }
  ];

  const handleRoleSelection = (role: string) => {
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Hero Section */}
      <header className="relative container mx-auto px-6 pt-20 pb-16 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src={heroImage} 
            alt="Certificate Security Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-primary mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              CertSecure
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Jharkhand's first comprehensive digital platform for authenticating and detecting fake degrees. 
            Protecting academic integrity with advanced AI, blockchain technology, and zero-knowledge proofs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-300 border-0">
              <CardHeader className="pb-3">
                <feature.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </header>

      {/* User Type Selection */}
      <section className="container mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Portal</h2>
          <p className="text-muted-foreground text-lg">Select your role to access the appropriate dashboard</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {userTypes.map((type, index) => (
            <Card 
              key={index} 
              className="shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer group border-0"
              onClick={() => handleRoleSelection(type.role)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`${type.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">{type.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{type.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRoleSelection(type.role);
                  }}
                >
                  Access Portal
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">50K+</h3>
              <p className="text-primary-foreground/80">Certificates Verified</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">200+</h3>
              <p className="text-primary-foreground/80">Institutions Connected</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">99.9%</h3>
              <p className="text-primary-foreground/80">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-semibold">CertSecure</span>
          </div>
          <p className="text-muted-foreground">
            Powered by Government of Jharkhand - Higher Education Department
          </p>
        </div>
      </footer>
    </div>
  );
};