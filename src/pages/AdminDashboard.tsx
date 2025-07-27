import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Building, UserCheck, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false);
  const [isSGSDialogOpen, setIsSGSDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    toast({
      title: "Department Added",
      description: `${formData.get('name')} has been successfully onboarded.`,
    });
    setIsDepartmentDialogOpen(false);
  };

  const handleAddSGSAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    toast({
      title: "SGS Admin Added",
      description: `${formData.get('name')} has been successfully added as SGS Admin.`,
    });
    setIsSGSDialogOpen(false);
  };

  const departments = [
    { id: 1, name: "Computer Science", coordinator: "Dr. Smith", students: 45, status: "active" },
    { id: 2, name: "Engineering", coordinator: "Dr. Johnson", students: 67, status: "active" },
    { id: 3, name: "Mathematics", coordinator: "Dr. Brown", students: 23, status: "pending" },
  ];

  const sgsAdmins = [
    { id: 1, name: "Dr. Alice Wilson", email: "alice@university.edu", status: "active" },
    { id: 2, name: "Dr. Bob Chen", email: "bob@university.edu", status: "active" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage departments and SGS administrators</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsDepartmentDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Department
          </Button>
          <Button onClick={() => setIsSGSDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add SGS Admin
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SGS Admins</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">All active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Departments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Departments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departments.map((dept) => (
              <div key={dept.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{dept.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Coordinator: {dept.coordinator} • Students: {dept.students}
                  </p>
                </div>
                <Badge variant={dept.status === "active" ? "default" : "secondary"}>
                  {dept.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SGS Admins Section */}
      <Card>
        <CardHeader>
          <CardTitle>SGS Administrators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sgsAdmins.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{admin.name}</h3>
                  <p className="text-sm text-muted-foreground">{admin.email}</p>
                </div>
                <Badge variant="default">{admin.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Department Dialog */}
      <Dialog open={isDepartmentDialogOpen} onOpenChange={setIsDepartmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Department</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddDepartment}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Department Name</Label>
                <Input name="name" placeholder="e.g., Computer Science" required />
              </div>
              <div>
                <Label htmlFor="coordinator">Coordinator</Label>
                <Input name="coordinator" placeholder="e.g., Dr. John Smith" required />
              </div>
              <div>
                <Label htmlFor="email">Coordinator Email</Label>
                <Input name="email" type="email" placeholder="coordinator@university.edu" required />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setIsDepartmentDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Department</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add SGS Admin Dialog */}
      <Dialog open={isSGSDialogOpen} onOpenChange={setIsSGSDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add SGS Administrator</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSGSAdmin}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input name="name" placeholder="e.g., Dr. Alice Wilson" required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input name="email" type="email" placeholder="admin@university.edu" required />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select name="role" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary Administrator</SelectItem>
                    <SelectItem value="secondary">Secondary Administrator</SelectItem>
                    <SelectItem value="reviewer">Reviewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setIsSGSDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Administrator</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;