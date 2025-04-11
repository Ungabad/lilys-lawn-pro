import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/user");
      if (res.ok) {
        const userData = await res.json();
        if (userData && userData.isAdmin) {
          setLocation("/admin");
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Error checking auth status:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check auth status on component mount
  useState(() => {
    checkAuthStatus();
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const res = await apiRequest("POST", "/api/login", data);
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/user"], data);
      toast({
        title: "Login successful",
        description: "Welcome back, admin!",
      });
      setLocation("/admin");
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-primary mb-2">Admin Login</h1>
            <p className="text-gray-600">
              Login to access the admin dashboard for Lily's Lawn & Snow Pro's LLC
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your username" 
                        {...field} 
                        autoComplete="username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        {...field}
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <div className="flex items-center">
                    <span className="mr-2">Logging in</span>
                    <div className="h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              <a href="/" className="text-primary hover:underline">
                &larr; Return to website
              </a>
            </p>
          </div>
        </div>

        <div className="hidden md:block">
          <Card className="bg-primary text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Lily's Lawn & Snow Pro's LLC</CardTitle>
              <CardDescription className="text-gray-200">Admin Portal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Welcome to the administration portal for Lily's Lawn & Snow Pro's. This secure area allows administrators to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Manage customer appointments and schedules</li>
                  <li>Process payments with Square integration</li>
                  <li>View customer inquiries and contact messages</li>
                  <li>Track service history and maintain customer records</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-200">
                For security purposes, this portal is restricted to authorized administrators only.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}