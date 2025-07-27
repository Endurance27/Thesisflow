import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, Clock, Edit, FileText, MessageSquare, X, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const { toast } = useToast();

  const handleViewChapter = (chapterId: string) => {
    toast({
      title: "Opening Chapter",
      description: "Redirecting to chapter details...",
    });
  };

  const handleScheduleMeeting = () => {
    toast({
      title: "Schedule Meeting",
      description: "Redirecting to meeting scheduler...",
    });
  };

  const chapterReviews = [
    {
      id: "ch1",
      title: "Literature Review",
      status: "approved",
      submittedDate: "2024-01-15",
      reviewDate: "2024-01-18",
      feedback: "Excellent work! Well-structured and comprehensive analysis.",
    },
    {
      id: "ch2",
      title: "Methodology",
      status: "revision",
      submittedDate: "2024-01-22",
      reviewDate: "2024-01-25",
      feedback: "Good foundation, but needs more detail on data collection methods.",
    },
    {
      id: "ch3",
      title: "Results & Analysis",
      status: "rejected",
      submittedDate: "2024-01-28",
      reviewDate: "2024-01-30",
      feedback: "Insufficient analysis of data. Please expand statistical interpretation.",
    },
    {
      id: "ch4",
      title: "Discussion",
      status: "pending",
      submittedDate: "2024-02-05",
      reviewDate: null,
      feedback: null,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "revision":
        return <Edit className="h-4 w-4 text-amber-600" />;
      case "rejected":
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "border-green-200 bg-green-50";
      case "revision":
        return "border-amber-200 bg-amber-50";
      case "rejected":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Track your thesis progress and supervisor feedback</p>
        </div>
        <Button onClick={handleScheduleMeeting}>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <Progress value={65} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">3 of 5 chapters approved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supervisor</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">Dr. Sarah Johnson</div>
            <p className="text-sm text-muted-foreground">Computer Science Dept.</p>
            <p className="text-xs text-muted-foreground mt-1">Last meeting: Jan 30, 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">Chapter 3 feedback received</div>
            <p className="text-xs text-muted-foreground">2 hours ago</p>
            <div className="text-sm mt-2">Meeting scheduled</div>
            <p className="text-xs text-muted-foreground">Yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Chapter Reviews Section */}
      <Card>
        <CardHeader>
          <CardTitle>Chapter Reviews</CardTitle>
          <p className="text-sm text-muted-foreground">
            Track your supervisor's feedback on chapter submissions
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chapterReviews.map((chapter) => (
              <div
                key={chapter.id}
                className={`p-4 border rounded-lg ${getStatusColor(chapter.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(chapter.status)}
                      <h3 className="font-semibold">{chapter.title}</h3>
                      <Badge
                        variant={
                          chapter.status === "approved"
                            ? "default"
                            : chapter.status === "revision"
                            ? "secondary"
                            : chapter.status === "rejected"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {chapter.status}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-2">
                      Submitted: {new Date(chapter.submittedDate).toLocaleDateString()}
                      {chapter.reviewDate && (
                        <> • Reviewed: {new Date(chapter.reviewDate).toLocaleDateString()}</>
                      )}
                    </div>
                    
                    {chapter.feedback && (
                      <p className="text-sm bg-white p-3 rounded border">
                        <strong>Supervisor Feedback:</strong> {chapter.feedback}
                      </p>
                    )}
                    
                    {!chapter.feedback && chapter.status === "pending" && (
                      <p className="text-sm text-muted-foreground italic">
                        Awaiting supervisor review...
                      </p>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewChapter(chapter.id)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              Submit Chapter
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Book Meeting
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <MessageSquare className="h-6 w-6 mb-2" />
              Message Supervisor
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              View All Chapters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;