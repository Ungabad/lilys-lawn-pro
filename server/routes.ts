import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema,
  insertAppointmentSchema,
  updateAppointmentSchema,
  insertPaymentSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { setupAuth } from "./auth";

// Authentication middleware
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ success: false, message: "Not authenticated" });
}

// Admin authorization middleware
function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ success: false, message: "Not authorized" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);

  // ------ PUBLIC ROUTES ------

  // Contact form endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body against schema
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Store the contact message
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Return success response
      res.status(201).json({ 
        success: true, 
        message: "Thank you for your message. We'll get back to you shortly.",
        data: contactMessage
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: error instanceof Error ? error.message : "An unexpected error occurred" 
        });
      }
    }
  });

  // ------ PROTECTED ROUTES (AUTHENTICATED USERS) ------

  // Create appointment
  app.post("/api/appointments", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      res.status(201).json({ success: true, data: appointment });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, message: validationError.message });
      } else {
        res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to create appointment" });
      }
    }
  });

  // Get user's appointments
  app.get("/api/appointments", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const appointments = await storage.getAppointments();
      res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to retrieve appointments" });
    }
  });

  // Get appointment by ID
  app.get("/api/appointments/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID format" });
      }

      const appointment = await storage.getAppointment(id);
      if (!appointment) {
        return res.status(404).json({ success: false, message: "Appointment not found" });
      }

      res.status(200).json({ success: true, data: appointment });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to retrieve appointment" });
    }
  });

  // ------ ADMIN ROUTES ------

  // Get all contact messages (admin only)
  app.get("/api/contact", isAdmin, async (_req: Request, res: Response) => {
    try {
      const messages = await storage.getContactMessages();
      res.status(200).json({ success: true, data: messages });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to retrieve contact messages" });
    }
  });

  // Update appointment (admin only)
  app.patch("/api/appointments/:id", isAdmin, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID format" });
      }

      const validatedData = updateAppointmentSchema.partial().parse(req.body);
      const updatedAppointment = await storage.updateAppointment(id, validatedData);

      if (!updatedAppointment) {
        return res.status(404).json({ success: false, message: "Appointment not found" });
      }

      res.status(200).json({ success: true, data: updatedAppointment });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, message: validationError.message });
      } else {
        res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to update appointment" });
      }
    }
  });

  // ------ PAYMENT ROUTES ------

  // Create payment
  app.post("/api/payments", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const validatedData = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(validatedData);

      // Update appointment with payment information
      if (payment && payment.status === "completed") {
        await storage.updateAppointment(payment.appointmentId, {
          paymentStatus: "paid",
          paymentId: payment.squarePaymentId || null
        });
      }

      res.status(201).json({ success: true, data: payment });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, message: validationError.message });
      } else {
        res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to process payment" });
      }
    }
  });

  // Get payments for an appointment
  app.get("/api/appointments/:id/payments", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID format" });
      }

      const payments = await storage.getPaymentsByAppointment(id);
      res.status(200).json({ success: true, data: payments });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to retrieve payments" });
    }
  });

  // Initialize Square payment (generate nonce etc.)
  app.post("/api/square/initialize", isAuthenticated, (req: Request, res: Response) => {
    try {
      // In a real application, we would initialize Square SDK here
      // This would typically involve creating a payment intent or nonce
      
      // For now, we're just returning a placeholder response
      res.status(200).json({ 
        success: true, 
        data: {
          clientSecret: "square_client_secret_placeholder",
          applicationId: process.env.SQUARE_APP_ID || "sandbox-sq0idb-placeholder"
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Failed to initialize payment" });
    }
  });

  // Process Square payment
  app.post("/api/square/process", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { sourceId, appointmentId, amount } = req.body;
      
      if (!sourceId || !appointmentId || !amount) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required payment information" 
        });
      }
      
      // In a real application, we would process the payment with Square SDK here
      // For now, we're simulating a successful payment
      
      // Create a payment record
      const payment = await storage.createPayment({
        appointmentId,
        squarePaymentId: `square_${Date.now()}`,
        amount,
        currency: "USD",
        status: "completed"
      });
      
      // Update the appointment
      await storage.updateAppointment(appointmentId, {
        paymentStatus: "paid",
        paymentId: payment.squarePaymentId || null
      });
      
      res.status(200).json({ 
        success: true, 
        data: payment
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: error instanceof Error ? error.message : "Failed to process payment" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
