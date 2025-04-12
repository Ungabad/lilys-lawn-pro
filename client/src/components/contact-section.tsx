import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";

// Define the schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  service: z.string().min(1, "Service is required"),
  address: z.string().min(1, "Address is required"),
  message: z.string().min(1, "Message is required"),
});
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the ContactFormValues type
type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  message: string;
};

export default function ContactSection() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      address: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch("https://formspree.io/f/xkgjygya", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description:
            "Thank you for your message. We'll get back to you shortly.",
        });
        form.reset(); // Reset the form after successful submission
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id='contact' className='py-16 bg-light'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='text-center mb-12'>
          <h3 className='text-3xl font-heading font-bold text-primary mb-4'>
            Contact Us
          </h3>
          <p className='max-w-2xl mx-auto text-dark'>
            Ready to transform your outdoor space? Contact us today for a free
            estimate or to learn more about our services.
          </p>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='lg:w-1/2'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-medium'>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='font-medium'>
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='tel'
                            className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='email'
                          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='service'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>
                        Service Interested In
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'>
                            <SelectValue placeholder='Select a service' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='lawn-mowing'>
                            Lawn Mowing
                          </SelectItem>
                          <SelectItem value='fertilization'>
                            Lawn Fertilization
                          </SelectItem>
                          <SelectItem value='landscaping'>
                            Landscaping
                          </SelectItem>
                          <SelectItem value='irrigation'>
                            Irrigation Services
                          </SelectItem>
                          <SelectItem value='snow-removal'>
                            Snow Removal
                          </SelectItem>
                          <SelectItem value='seasonal-cleanup'>
                            Seasonal Cleanup
                          </SelectItem>
                          <SelectItem value='other'>
                            Other (Please specify)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>
                        Property Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Street, City, ZIP'
                          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-medium'>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder='Tell us more about your needs...'
                          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='w-full bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition duration-200'
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
