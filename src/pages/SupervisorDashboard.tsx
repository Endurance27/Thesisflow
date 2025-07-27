import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, FileText, MessageSquare, Users, CheckCircle, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const SupervisorDashboard = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [isVisitingHourOpen, setIsVisitingHourOpen] = useState(false);
  const [visitingHours, setVisitingHours] = useState([
    { day: "Monday", time: "10:00 AM - 12:00 PM" },
    { day: "Wednesday", time: "2:00 PM - 4:00 PM" },
    { day: "Friday", time: "9:00 AM - 11:00 AM" },
  ]);
  const { toast } = useToast();

  const handleAddVisitingHour = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newHour = {
      day: formData.get('day') as string,
      time: `${formData.get('startTime')} - ${formData.get('endTime')}`,
    };
    setVisitingHours([...visitingHours, newHour]);
    toast({
      title: "Visiting Hour Added",
      description: `New slot added for ${newHour.day} at ${newHour.time}`,
    });
    setIsVisitingHourOpen(false);
  };

  const students = [
    {
      id: 1,
      name: "John Doe",
      program: "PhD Computer Science",
      progress: 75,
      lastMeeting: "2024-01-25",
      status: "on-track",
      pendingSubmissions: 1,
    },
    {
      id: 2,
      name: "Jane Smith",
      program: "MSc Data Science",
      progress: 45,
      lastMeeting: "2024-01-20",
      status: "needs-attention",
      pendingSubmissions: 2,
    },
    {
      id: 3,
      name: "Mike Johnson",
      program: "PhD AI Research",
      progress: 90,
      lastMeeting: "2024-01-28",
      status: "on-track",
      pendingSubmissions: 0,
    },
  ];

  const upcomingMeetings = [
    { student: "John Doe", date: "2024-02-08", time: "10:00 AM", type: "Progress Review" },
    { student: "Jane Smith", date: "2024-02-09", time: "2:00 PM", type: "Chapter Discussion" },
    { student: "Mike Johnson", date: "2024-02-10", time: "11:00 AM", type: "Final Review" },
  ];

  const pendingReviews = [
    { student: "John Doe", chapter: "Methodology", submitted: "2024-02-05", priority: "medium" },
    { student: "Jane Smith", chapter: "Literature Review", submitted: "2024-02-03", priority: "high" },
    { student: "Jane Smith", chapter: "Results", submitted: "2024-02-04", priority: "medium" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
          <p className="text-muted-foreground">Manage your students and review their progress</p>
        </div>
        <Button onClick={() => setIsVisitingHourOpen(true)}>
          <Clock className="h-4 w-4 mr-2" />
          Set Visiting Hours
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Active supervision</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReviews.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting feedback</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week's Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingMeetings.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students On Track</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.filter(s => s.status === "on-track").length}
            </div>
            <p className="text-xs text-muted-foreground">Meeting milestones</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">My Students</TabsTrigger>
          <TabsTrigger value="reviews">Pending Reviews</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="visiting-hours">Visiting Hours</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-muted-foreground">{student.program}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={student.status === "on-track" ? "default" : "secondary"}>
                          {student.status === "on-track" ? "On Track" : "Needs Attention"}
                        </Badge>
                        {student.pendingSubmissions > 0 && (
                          <Badge variant="outline">
                            {student.pendingSubmissions} pending
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{student.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="ml-4 text-sm text-muted-foreground">
                        Last meeting: {new Date(student.lastMeeting).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Chapter Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReviews.map((review, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{review.student}</h3>
                        <p className="text-sm text-muted-foreground">
                          {review.chapter} • Submitted: {new Date(review.submitted).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={review.priority === "high" ? "destructive" : "secondary"}>
                          {review.priority} priority
                        </Badge>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{meeting.student}</h3>
                        <p className="text-sm text-muted-foreground">
                          {meeting.type} • {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button size="sm">Join Meeting</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visiting-hours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Visiting Hours</CardTitle>
              <p className="text-sm text-muted-foreground">
                Students can book appointments during these hours
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {visitingHours.map((hour, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">{hour.day}</span>
                      <span className="text-muted-foreground ml-2">{hour.time}</span>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Visiting Hour Dialog */}
      <Dialog open={isVisitingHourOpen} onOpenChange={setIsVisitingHourOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Visiting Hours</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddVisitingHour}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="day">Day of Week</Label>
                <select name="day" className="w-full mt-1 p-2 border rounded-md" required>
                  <option value="">Select day...</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input name="startTime" type="time" required />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input name="endTime" type="time" required />
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setIsVisitingHourOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Hours</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupervisorDashboard;