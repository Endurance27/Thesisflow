import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, FileText, TrendingUp, Upload, Monitor } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const DepartmentDashboard = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"manual" | "bulk">("manual");
  const [userType, setUserType] = useState<"student" | "supervisor">("student");
  const { toast } = useToast();

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    toast({
      title: "User Added Successfully",
      description: `${formData.get('name')} has been added to the system.`,
    });
    setIsAddUserOpen(false);
  };

  const handleBulkUpload = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Bulk Upload Initiated",
      description: "Processing your file. You'll be notified when complete.",
    });
    setIsAddUserOpen(false);
  };

  const students = [
    { id: 1, name: "John Doe", supervisor: "Dr. Smith", progress: 75, status: "on-track" },
    { id: 2, name: "Jane Smith", supervisor: "Dr. Johnson", progress: 45, status: "needs-attention" },
    { id: 3, name: "Mike Johnson", supervisor: "Dr. Brown", progress: 90, status: "on-track" },
  ];

  const supervisors = [
    { id: 1, name: "Dr. Smith", students: 8, capacity: 10, load: "80%" },
    { id: 2, name: "Dr. Johnson", students: 6, capacity: 8, load: "75%" },
    { id: 3, name: "Dr. Brown", students: 10, capacity: 10, load: "100%" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Department Dashboard</h1>
          <p className="text-muted-foreground">Computer Science Department</p>
        </div>
        <Button onClick={() => setIsAddUserOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
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
            <p className="text-xs text-muted-foreground">Active students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supervisors</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supervisors.length}</div>
            <p className="text-xs text-muted-foreground">Active supervisors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="supervisors">Supervisors</TabsTrigger>
          <TabsTrigger value="progress">Progress Monitor</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Supervisor: {student.supervisor} • Progress: {student.progress}%
                      </p>
                    </div>
                    <Badge variant={student.status === "on-track" ? "default" : "secondary"}>
                      {student.status === "on-track" ? "On Track" : "Needs Attention"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supervisors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supervisor Workload</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supervisors.map((supervisor) => (
                  <div key={supervisor.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{supervisor.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Students: {supervisor.students}/{supervisor.capacity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={parseInt(supervisor.load) > 90 ? "destructive" : "default"}>
                        {supervisor.load} load
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Progress Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Monitor className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Progress Monitoring</h3>
                <p className="text-muted-foreground mb-4">
                  Track meeting frequency and thesis progress correlation
                </p>
                <Button>View Detailed Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          
          <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as "manual" | "bulk")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="manual">
              <form onSubmit={handleAddUser}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="userType">User Type</Label>
                    <Select value={userType} onValueChange={(value) => setUserType(value as "student" | "supervisor")} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {userType === "student" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input name="studentId" placeholder="e.g., CS2024001" required />
                      </div>
                      <div>
                        <Label htmlFor="name">Student Name</Label>
                        <Input name="name" placeholder="e.g., John Doe" required />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select name="gender" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="programmeLevel">Programme Level</Label>
                        <Select name="programmeLevel" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select programme level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="masters">Masters</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                            <SelectItem value="postdoc">Post-Doctorate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" type="email" placeholder="john.doe@university.edu" required />
                      </div>
                      <div>
                        <Label htmlFor="programmeName">Programme Name</Label>
                        <Input name="programmeName" placeholder="e.g., Computer Science" required />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="thesisTopic">Thesis Topic</Label>
                        <Input name="thesisTopic" placeholder="e.g., Machine Learning in Healthcare" />
                      </div>
                      <div>
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input name="contactNumber" placeholder="e.g., +1234567890" required />
                      </div>
                    </div>
                  )}

                  {userType === "supervisor" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="staffId">Staff ID</Label>
                        <Input name="staffId" placeholder="e.g., STF2024001" required />
                      </div>
                      <div>
                        <Label htmlFor="staffName">Staff Name</Label>
                        <Input name="staffName" placeholder="e.g., Dr. Jane Smith" required />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select name="gender" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input name="email" type="email" placeholder="jane.smith@university.edu" required />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="researchArea">Research Area</Label>
                        <Input name="researchArea" placeholder="e.g., Machine Learning, Computer Vision" required />
                      </div>
                      <div>
                        <Label htmlFor="contactNumber">Contact Number</Label>
                        <Input name="contactNumber" placeholder="e.g., +1234567890" required />
                      </div>
                    </div>
                  )}
                </div>
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add {userType === "student" ? "Student" : "Supervisor"}</Button>
                </DialogFooter>
              </form>
            </TabsContent>

            <TabsContent value="bulk">
              <form onSubmit={handleBulkUpload}>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload CSV or Excel File</h3>
                    <p className="text-muted-foreground mb-4">
                      Upload a file containing multiple user records
                    </p>
                    <Input type="file" accept=".csv,.xlsx,.xls" required />
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported formats: CSV, Excel (.xlsx, .xls)
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="userType">User Type</Label>
                    <Select name="userType" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user type for bulk upload" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="supervisors">Supervisors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Upload File</Button>
                </DialogFooter>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentDashboard;