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
      // Show a success message
      toast({
        title: "Message Sent!",
        description:
          "Thank you for your message. We'll get back to you shortly.",
      });

      // Clear the form
      form.reset(); // Reset the form fields to their default values
    } else {
      // Show an error message if the response is not OK
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  } catch (error) {
    // Show an error message if an exception occurs
    toast({
      title: "Error",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive",
    });
  }
};
