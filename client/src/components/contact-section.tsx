import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  service: z.string().min(1, { message: "Please select a service." }),
  address: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      address: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const res = await apiRequest('POST', '/api/contact', data);
      const result = await res.json();
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you shortly.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-heading font-bold text-primary mb-4">
            Contact Us
          </h3>
          <p className="max-w-2xl mx-auto text-dark">
            Ready to transform your outdoor space? Contact us today for a free
            estimate or to learn more about our services.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Service Interested In</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="lawn-mowing">Lawn Mowing</SelectItem>
                          <SelectItem value="fertilization">Lawn Fertilization</SelectItem>
                          <SelectItem value="landscaping">Landscaping</SelectItem>
                          <SelectItem value="irrigation">Irrigation Services</SelectItem>
                          <SelectItem value="snow-removal">Snow Removal</SelectItem>
                          <SelectItem value="seasonal-cleanup">Seasonal Cleanup</SelectItem>
                          <SelectItem value="other">Other (Please specify)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Property Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Street, City, ZIP"
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Tell us more about your needs..."
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition duration-200"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-8 h-full">
              <h4 className="text-2xl font-heading font-bold text-primary mb-6">
                Get In Touch
              </h4>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center text-primary">
                    <i className="fas fa-phone-alt text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h5 className="font-bold">Phone</h5>
                    <p className="text-dark">(509) 555-9876</p>
                    <p className="text-sm text-secondary">
                      Available 7am-7pm, Monday-Saturday
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center text-primary">
                    <i className="fas fa-envelope text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h5 className="font-bold">Email</h5>
                    <p className="text-dark">info@lilyslawnandsnow.com</p>
                    <p className="text-sm text-secondary">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center text-primary">
                    <i className="fas fa-map-marker-alt text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h5 className="font-bold">Location</h5>
                    <p className="text-dark">Spokane, Washington</p>
                    <p className="text-sm text-secondary">
                      Serving Spokane and surrounding areas
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center text-primary">
                    <i className="fas fa-clock text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h5 className="font-bold">Business Hours</h5>
                    <p className="text-dark">Monday-Friday: 7am-7pm</p>
                    <p className="text-dark">Saturday: 8am-5pm</p>
                    <p className="text-dark">Sunday: Closed</p>
                    <p className="text-sm text-secondary mt-1">
                      24/7 emergency snow removal available during winter
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h5 className="font-bold mb-4">Follow Us</h5>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center text-primary hover:bg-opacity-30 transition duration-200"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center text-primary hover:bg-opacity-30 transition duration-200"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center text-primary hover:bg-opacity-30 transition duration-200"
                  >
                    <i className="fab fa-nextdoor"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center text-primary hover:bg-opacity-30 transition duration-200"
                  >
                    <i className="fab fa-google"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
