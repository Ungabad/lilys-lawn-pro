import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, LogOut } from "lucide-react";

// Appointment creation schema
const appointmentSchema = z.object({
  customerName: z.string().min(2, { message: "Name is required" }),
  customerEmail: z.string().email({ message: "Valid email is required" }),
  customerPhone: z.string().min(10, { message: "Valid phone number is required" }),
  serviceType: z.string().min(1, { message: "Service type is required" }),
  serviceAddress: z.string().min(5, { message: "Address is required" }),
  scheduledDate: z.string().min(1, { message: "Date is required" }),
  scheduledTime: z.string().min(1, { message: "Time is required" }),
  notes: z.string().optional(),
});

// Payment schema
const paymentSchema = z.object({
  appointmentId: z.number(),
  amount: z.number().min(1, { message: "Amount must be greater than 0" }),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;
type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function AdminPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [openAppointmentDialog, setOpenAppointmentDialog] = useState(false);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Check if user is authenticated and is an admin
  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/user");
      if (!res.ok) {
        setLocation("/auth");
        return false;
      }
      
      const userData = await res.json();
      if (!userData || !userData.isAdmin) {
        setLocation("/auth");
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error checking auth status:", error);
      setLocation("/auth");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check auth status on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Fetch appointments
  const { 
    data: appointments = [], 
    isLoading: isLoadingAppointments,
    refetch: refetchAppointments 
  } = useQuery({
    queryKey: ["/api/appointments"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/appointments");
      const data = await res.json();
      return data.data || [];
    },
    enabled: !isLoading,
  });

  // Fetch contact messages
  const { 
    data: contactMessages = [], 
    isLoading: isLoadingMessages,
    refetch: refetchMessages 
  } = useQuery({
    queryKey: ["/api/contact"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/contact");
      const data = await res.json();
      return data.data || [];
    },
    enabled: !isLoading,
  });

  // Setup form for creating appointments
  const appointmentForm = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      serviceType: "",
      serviceAddress: "",
      scheduledDate: "",
      scheduledTime: "",
      notes: "",
    },
  });

  // Setup form for processing payments
  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      appointmentId: 0,
      amount: 0,
    },
  });

  // Create appointment mutation
  const createAppointmentMutation = useMutation({
    mutationFn: async (data: AppointmentFormValues) => {
      const res = await apiRequest("POST", "/api/appointments", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Appointment created",
        description: "The appointment has been successfully created",
      });
      appointmentForm.reset();
      setOpenAppointmentDialog(false);
      refetchAppointments();
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating appointment",
        description: error.message || "Failed to create appointment",
        variant: "destructive",
      });
    },
  });

  // Process payment mutation
  const processPaymentMutation = useMutation({
    mutationFn: async (data: PaymentFormValues) => {
      // In a real app, we would integrate with Square SDK here
      const res = await apiRequest("POST", "/api/square/process", {
        sourceId: "simulated_card_nonce",
        appointmentId: data.appointmentId,
        amount: data.amount,
      });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Payment processed",
        description: "The payment has been successfully processed",
      });
      paymentForm.reset();
      setOpenPaymentDialog(false);
      refetchAppointments();
    },
    onError: (error: Error) => {
      toast({
        title: "Error processing payment",
        description: error.message || "Failed to process payment",
        variant: "destructive",
      });
    },
  });

  // Handle appointment form submission
  const onSubmitAppointment = (data: AppointmentFormValues) => {
    createAppointmentMutation.mutate(data);
  };

  // Handle payment form submission
  const onSubmitPayment = (data: PaymentFormValues) => {
    processPaymentMutation.mutate(data);
  };

  // Handle date selection for appointment scheduling
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      appointmentForm.setValue("scheduledDate", format(date, "yyyy-MM-dd"));
    }
  };

  // Handle payment button click for an appointment
  const handlePaymentClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    
    // Set default payment amount based on service type (simplified example)
    let amount = 0;
    if (appointment.serviceType.includes("lawn-mowing")) {
      amount = 5000; // $50.00
    } else if (appointment.serviceType.includes("fertilization")) {
      amount = 7500; // $75.00
    } else if (appointment.serviceType.includes("snow-removal")) {
      amount = 10000; // $100.00
    } else {
      amount = 5000; // Default $50.00
    }
    
    setPaymentAmount(amount);
    paymentForm.setValue("appointmentId", appointment.id);
    paymentForm.setValue("amount", amount);
    
    setOpenPaymentDialog(true);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/logout");
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      setLocation("/auth");
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-xs opacity-80">Lily's Lawn & Snow Pro's LLC</p>
            </div>
          </div>
          <Button variant="ghost" className="text-white hover:bg-primary-foreground" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-6">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="messages">Contact Messages</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Manage Appointments</h2>
              <Button onClick={() => setOpenAppointmentDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </div>

            {isLoadingAppointments ? (
              <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : appointments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-gray-500 mb-4">No appointments scheduled</p>
                  <Button onClick={() => setOpenAppointmentDialog(true)}>
                    Schedule an Appointment
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Table>
                <TableCaption>List of all scheduled appointments</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment: any) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{appointment.customerName}</p>
                          <p className="text-sm text-gray-500">{appointment.customerPhone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{appointment.serviceType.replace(/-/g, ' ')}</TableCell>
                      <TableCell>
                        {appointment.scheduledDate} at {appointment.scheduledTime}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          appointment.status === "completed" 
                            ? "bg-green-100 text-green-800" 
                            : appointment.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {appointment.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          appointment.paymentStatus === "paid" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {appointment.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {appointment.paymentStatus !== "paid" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handlePaymentClick(appointment)}
                            >
                              Process Payment
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          {/* Contact Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Customer Messages</h2>

            {isLoadingMessages ? (
              <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : contactMessages.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <p className="text-gray-500">No contact messages received</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactMessages.map((message: any) => (
                  <Card key={message.id}>
                    <CardHeader>
                      <CardTitle>{message.name}</CardTitle>
                      <CardDescription>
                        {message.email} | {message.phone}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="font-semibold">Service:</span>{" "}
                          {message.service.replace(/-/g, ' ')}
                        </div>
                        {message.address && (
                          <div>
                            <span className="font-semibold">Address:</span> {message.address}
                          </div>
                        )}
                        <div>
                          <span className="font-semibold">Message:</span>
                          <p className="mt-1 text-gray-700">{message.message}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-gray-500">
                        Received: {new Date(message.createdAt).toLocaleString()}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setOpenAppointmentDialog(true);
                          appointmentForm.setValue("customerName", message.name);
                          appointmentForm.setValue("customerEmail", message.email);
                          appointmentForm.setValue("customerPhone", message.phone);
                          appointmentForm.setValue("serviceType", message.service);
                          if (message.address) {
                            appointmentForm.setValue("serviceAddress", message.address);
                          }
                        }}
                      >
                        Schedule Appointment
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Payment Management</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Square Payment Integration</CardTitle>
                <CardDescription>
                  Process payments for appointments using Square
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Use this section to process payments for scheduled appointments.
                    Payment processing is powered by Square.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <h3 className="font-semibold text-yellow-800">Payment Processing Instructions</h3>
                    <ul className="list-disc list-inside mt-2 text-yellow-700 space-y-1">
                      <li>Go to the Appointments tab to see all scheduled appointments</li>
                      <li>Click "Process Payment" next to any appointment with a "pending" payment status</li>
                      <li>Enter the payment amount and complete the transaction</li>
                      <li>The appointment will be automatically updated with payment information</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Create Appointment Dialog */}
      <Dialog open={openAppointmentDialog} onOpenChange={setOpenAppointmentDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule New Appointment</DialogTitle>
            <DialogDescription>
              Enter the customer and appointment details below.
            </DialogDescription>
          </DialogHeader>

          <Form {...appointmentForm}>
            <form onSubmit={appointmentForm.handleSubmit(onSubmitAppointment)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={appointmentForm.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={appointmentForm.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={appointmentForm.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={appointmentForm.control}
                name="serviceAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={appointmentForm.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="lawn-mowing">Lawn Mowing</SelectItem>
                        <SelectItem value="fertilization">Lawn Fertilization</SelectItem>
                        <SelectItem value="landscaping">Landscaping</SelectItem>
                        <SelectItem value="spring-cleanup">Spring Cleanup</SelectItem>
                        <SelectItem value="fall-cleanup">Fall Cleanup</SelectItem>
                        <SelectItem value="snow-removal">Snow Removal</SelectItem>
                        <SelectItem value="snow-plowing">Snow Plowing</SelectItem>
                        <SelectItem value="ice-management">Ice Management</SelectItem>
                        <SelectItem value="other">Other Service</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={appointmentForm.control}
                  name="scheduledDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Appointment Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full justify-start text-left font-normal ${
                                !field.value && "text-muted-foreground"
                              }`}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={appointmentForm.control}
                  name="scheduledTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                          <SelectItem value="17:00">5:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={appointmentForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Add any additional notes or instructions"
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit" disabled={createAppointmentMutation.isPending}>
                  {createAppointmentMutation.isPending ? "Creating..." : "Create Appointment"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Process Payment Dialog */}
      <Dialog open={openPaymentDialog} onOpenChange={setOpenPaymentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
            <DialogDescription>
              Enter payment details for appointment with {selectedAppointment?.customerName}
            </DialogDescription>
          </DialogHeader>

          <Form {...paymentForm}>
            <form onSubmit={paymentForm.handleSubmit(onSubmitPayment)} className="space-y-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="text-sm text-gray-500">Appointment Details</div>
                  <div className="font-medium">{selectedAppointment?.customerName}</div>
                  <div className="text-sm">
                    {selectedAppointment?.serviceType.replace(/-/g, ' ')} | 
                    {selectedAppointment?.scheduledDate} at {selectedAppointment?.scheduledTime}
                  </div>
                </div>

                <FormField
                  control={paymentForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Amount ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field}
                          onChange={(e) => {
                            // Convert input to cents for storage
                            const dollars = parseFloat(e.target.value);
                            const cents = Math.round(dollars * 100);
                            field.onChange(cents);
                            setPaymentAmount(cents);
                          }}
                          value={paymentAmount / 100} // Display in dollars
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <h3 className="font-semibold text-green-800">Payment Method</h3>
                  <p className="text-sm text-green-700 mt-1">
                    This is a simulated payment for demonstration purposes. 
                    In a production environment, this would integrate with Square's Web Payments SDK 
                    to securely collect and process payment information.
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" disabled={processPaymentMutation.isPending}>
                  {processPaymentMutation.isPending ? "Processing..." : "Process Payment"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}