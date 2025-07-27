import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, FileText, Monitor } from "lucide-react";

const Index = () => {
  const userRoles = [
    {
      title: "Admin Dashboard",
      description: "Manage departments and SGS administrators",
      icon: Monitor,
      href: "/admin",
      color: "bg-blue-500",
    },
    {
      title: "Department Dashboard", 
      description: "Monitor students and supervisors in your department",
      icon: Users,
      href: "/department",
      color: "bg-green-500",
    },
    {
      title: "Supervisor Dashboard",
      description: "Review student progress and provide feedback",
      icon: FileText,
      href: "/supervisor", 
      color: "bg-purple-500",
    },
    {
      title: "Student Dashboard",
      description: "Track your thesis progress and communicate with supervisor",
      icon: GraduationCap,
      href: "/student",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Thesis Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive platform for managing thesis supervision, student progress tracking, 
            and academic collaboration across departments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userRoles.map((role, index) => {
            const IconComponent = role.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <div className={`${role.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">{role.description}</p>
                  <Button 
                    className="w-full" 
                    onClick={() => window.location.href = role.href}
                  >
                    Access Dashboard
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">System Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <h3 className="font-semibold mb-2">Progress Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor thesis milestones, chapter submissions, and student progress in real-time.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Communication Hub</h3>
                  <p className="text-sm text-muted-foreground">
                    Facilitate seamless communication between students, supervisors, and departments.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Analytics & Reports</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate insights on supervision effectiveness and departmental performance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
